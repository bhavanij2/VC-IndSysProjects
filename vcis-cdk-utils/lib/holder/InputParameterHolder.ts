import cdk = require("@aws-cdk/cdk");
import AWS = require("aws-sdk");
import { EnvironmentHolder } from "./EnvironmentHolder";
import { Tags } from '../tags/Tags';


let inputParameters: any;
let inputParametersPromises: Promise<any>[];
let env: string;

export class InputParameterHolder {

  static setup(node: cdk.ConstructNode, loadTags: boolean = true): Promise<any> {
    inputParametersPromises = [];
    env = EnvironmentHolder.getEnv();

    const inputParams = node.getContext("InputParameters");
    if (inputParams === undefined) {
      throw Error("InputParameters needs to be defined on cdk.context file");
    }

    inputParameters = {};

    if(loadTags){
      inputParams['generic'][Tags.tagKey] = Tags.tagsParameterStorePaths;
    }

    this.loadParametersFromPath(inputParams, 'generic');
    this.loadParametersFromPath(inputParams, env);

    return Promise.all(inputParametersPromises).then((params: flatParam[]) => {
      const flatJson = params.reduce((obj: any, itm: flatParam) => {
        obj[itm.paramName] = itm.value;
        return obj;
      }, {});

      inputParameters = this.unflatten(flatJson);
    });
  }

  static unflatten(data: any) {
    "use strict";
    if (Object(data) !== data || Array.isArray(data))
      return data;
    var regex = /\.?([^.\[\]]+)|\[(\d+)\]/g,
      resultholder: any = {};
    for (var p in data) {
      var cur: any = resultholder,
        prop = "",
        m;
      while (m = regex.exec(p)) {
        cur = cur[prop] || (cur[prop] = (m[2] ? [] : {}));
        prop = m[2] || m[1];
      }
      cur[prop] = data[p];
    }
    return resultholder[""] || resultholder;
  };

  private static loadParametersFromPath(inputParams: any, rootParamPath: string) {
    const parameterStorePaths = inputParams[rootParamPath] ? inputParams[rootParamPath] : inputParams["non-prod"];
    this.populateParameters(parameterStorePaths);
  }

  private static populateParameters(parameterStorePaths: any, fullKey?: string) {
    if (parameterStorePaths) {
      Object.keys(parameterStorePaths).forEach(key => {
        const _fullKey = [fullKey, key].filter(key => key).join(".");
        const parameterValue: any = parameterStorePaths[key];
        if (typeof parameterValue === 'string') {
          const parameterStringValue: string = parameterValue;
          inputParametersPromises.push(this.fetchParameterValuePromise(parameterStringValue, _fullKey));
        }
        else {
          this.populateParameters(parameterValue, _fullKey);
        }
      });
    }
  }

  static fetchParameterValuePromise(parameterValue: string, path: string) {
    const [prefix, paramValue, version] = parameterValue.split(":", 3);

    if (prefix.startsWith('ssm')) {
      if (version === undefined) {
        throw Error(`Version is required for entry ${paramValue}`)
      }

      return this.fetchParameterFromSSMAsync(paramValue, version, path);
    }

    return this.fetchConstantValueAsync(parameterValue, path);
  }

  static fetchConstantValueAsync(paramValue: string, path: string) {
    return new Promise(function (resolve) {
      resolve({ paramName: path, value: paramValue.replace('{ENV}', env) });
    })
  }


  static fetchParameterFromSSMAsync(paramValue: string, version: any, path: string) {
    const paramName = paramValue.replace('{ENV}', env);
    const ssm_sdk = new AWS.SSM();
    return ssm_sdk.getParameter({
      Name: `${paramName}:${version}`,
      WithDecryption: false
    }, function (err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
        throw new Error(`Error occurred fetching param ${paramName}`);
      } else {
        if (data.Parameter === undefined) {
          throw new Error(`Error occurred fetching param ${paramName}`);
        }
      }
    }).promise().then(result => {
      const _type = result.Parameter ? result.Parameter.Type : 'String';
      const _value = result.Parameter ? result.Parameter.Value : '';
      return {
        paramName: path,
        value: _type === 'StringList' && _value ? _value.split(",") : _value
      }
    }, error => { console.log(error) });
  }


  static get = (paramName: string) => inputParameters[paramName];
}

export interface flatParam {
  paramName: string;
  value: string;
}

