#!/usr/bin/env python

'''
@author: Santiago Villarreal
Created on October, 2019

Description:
Launches the SAM template of pod-slack-notifier lambda function, for each config file exists in the env to process, so that it gets integrated to the related Slack channel

Inputs:
    Parameter 1: the directory to process (dev, it, prod, non-prod). It should match with the folder inside the config directory of the pod-slack-alert-notifier cloned repo
    Parameter 2: the path of the pod-slack-alert-notifier cloned repo
    Parameter 3: s3 location of the pod-slack-notifier artifact

NOTE 1: Check that an session to awssso is opened
NOTE 2: Before running, clone the following repo: git@github.platforms.engineering:POD-Inc/pod-slack-alert-notifier.git

Example 1 (Will find all the configuration files for all the channels in the dev environment):
    python slack_notifiers.py dev /Users/svill4/dev/repos/pod-slack-alert-notifier s3://vcis-lambda-github-source-infra/badb7daac156e951c522a52c879ea548

Example 2 - If we want to run the same but for prod, just change the folder:
    python slack_notifiers.py prod /Users/svill4/dev/repos/pod-slack-alert-notifier s3://vcis-lambda-github-source-infra/badb7daac156e951c522a52c879ea548
'''

import boto3
import sys
import json
import glob
from botocore.exceptions import ClientError
from colorama import Fore, Style, Style
from ruamel.yaml import YAML
import os
import atexit

sam_location = sys.argv[2] + '/saml.yaml'

def exit_handler():
    print(Style.RESET_ALL + 'The stack creator has ended!')
    os.remove(sam_location + '.tmp')
atexit.register(exit_handler)

cf = boto3.client('cloudformation', region_name='us-east-1')

def stack_exists(name):
    try:
        data = cf.describe_stacks(StackName = name)
    except ClientError:
        return False
    return data['Stacks'][0]['StackStatus'] == 'CREATE_COMPLETE' or data['Stacks'][0]['StackStatus'] == 'ROLLBACK_COMPLETE'

def parse_parameters(parameters):
    with open(parameters) as parameter_fileobj:
        parameter_data = json.load(parameter_fileobj)
    return parameter_data

def parse_sam_template(template):
    yaml=YAML()
    yaml.preserve_quotes = True
    with open(template) as template_fileobj:
        cf_yaml_obj = yaml.load(template_fileobj)

    # Set the S3 location of the lambda function implementation
    cf_yaml_obj['Resources']['LogProccesor']['Properties']['CodeUri'] = sys.argv[3]

    with open(template + '.tmp', 'w') as fp:
        yaml.dump(cf_yaml_obj, fp)

    with open(template + '.tmp') as template_fileobj:
        template_data = template_fileobj.read()

    cf.validate_template(TemplateBody=template_data)

    return template_data

def _create_stack(stack_name, template_data, parameter_data):
    print('\tStack is being created..')
    cf.create_stack(
        StackName=stack_name,
        TemplateBody=template_data,
        Parameters=parameter_data,
        Capabilities=['CAPABILITY_IAM','CAPABILITY_AUTO_EXPAND']
    )
    print('\t... Waiting for the stack to be ready...')
    waiter = cf.get_waiter('stack_create_complete')
    waiter.wait(StackName=stack_name)
    print(Fore.GREEN)
    print('\tStack has just been created.')

def _delete_stack(stack_name):
    print('\tStack is being deleted..')
    cf.delete_stack(
        StackName=stack_name
    )
    waiter = cf.get_waiter('stack_delete_complete')
    waiter.wait(StackName=stack_name)
    print(Fore.GREEN)
    print('\tStack has been deleted.')

def main():
    template_data = parse_sam_template(sam_location)
    config_files = glob.glob(sys.argv[2] + '/config/' + sys.argv[1] + '/*')
    for config_file in config_files:
        parameter_data = parse_parameters(config_file)
        file_name = config_file.split('/')[-1]
        stack_name = file_name.replace('-params.json', '')
        print(Style.RESET_ALL + Fore.BLUE + '------------------------------------------------------------------------------------------')
        print('Processing stack ' + stack_name)
        print('------------------------------------------------------------------------------------------' + Style.DIM)
        try:
            if not stack_exists(stack_name):
                print('\tStack does not exists')
                _create_stack(stack_name, template_data, parameter_data)
            else:
                print('\tStack already exists, deleting..')
                _delete_stack(stack_name)
                _create_stack(stack_name, template_data, parameter_data)

        except Exception as e:
            print(Fore.RED + '\t' + str(e))
            print('\tCould not create the stack, skipping...')
        print(Style.RESET_ALL)
    print(Style.RESET_ALL)
if __name__ == '__main__':
    main()
