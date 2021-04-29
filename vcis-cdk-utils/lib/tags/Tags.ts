import cdk = require('@aws-cdk/cdk');
import { InputParameterHolder } from '../holder/InputParameterHolder';

export class Tags {

    static tagsParameterStorePaths = {
            "owner": "ssm:/vcis/{ENV}/infra/tags/owner:1",
            "costCenter": "ssm:/vcis/{ENV}/infra/tags/costCenter:1",
            "project": "ssm:/vcis/{ENV}/infra/tags/project:1",
            "env": "ssm:/vcis/{ENV}/infra/tags/env:1",
            "regulated": "ssm:/vcis/{ENV}/infra/tags/regulated:1",
            "dataClassification": "ssm:/vcis/{ENV}/infra/tags/dataClassification:1"
    };

    static tagKey = 'vcis_tags';
    
    private static owner: cdk.Tag;
    private static costCenter: cdk.Tag;
    private static project: cdk.Tag;
    private static env: cdk.Tag;
    private static regulated: cdk.Tag;
    private static dataClassification: cdk.Tag;

    static setup(){
        this.owner = new cdk.Tag('mon:owner', InputParameterHolder.get(this.tagKey).owner);
        this.costCenter = new cdk.Tag('mon:cost-center', InputParameterHolder.get(this.tagKey).costCenter);
        this.project = new cdk.Tag('mon:project', InputParameterHolder.get(this.tagKey).project);
        this.env = new cdk.Tag('mon:env', InputParameterHolder.get(this.tagKey).env);
        this.regulated = new cdk.Tag('mon:regulated', InputParameterHolder.get(this.tagKey).regulated);
        this.dataClassification = new cdk.Tag('mon:data-classification', InputParameterHolder.get(this.tagKey).dataClassification);
    }

    static get OWNER(): cdk.Tag {
        return this.owner;
    }

    static get COST_CENTER(): cdk.Tag {
        return this.costCenter;
    }

    static get PROJECT(): cdk.Tag {
        return this.project;
    }

    static get ENV(): cdk.Tag {
        return this.env;
    }

    static get REGULATED(): cdk.Tag {
        return this.regulated;
    }

    static get DATA_CLASSIFICATION(): cdk.Tag {
        return this.dataClassification;
    }
}
