## ECS Fargate - CloudFormation and Codepipeline


### Description
This directory contains CloudFormation templates for ECS/Fargate

- `ecs-cluster.yaml`
    CF Template to create ECS Cluster      
    - `config/ecs-cluster-non-prod-config.json` - Config params for ECS Cluster Creation in Non-Prod Environment

- `ecs-alb.yaml`
    CF Template to Create Application Load Balancer
    - `config/ecs-alb-non-prod-config.json` - Config params for ALB Creation in Non-Prod Environment
      
- `ecs-service.yaml`
    CF Template to create ECS Service
    - `config/ecs-service.json` - Config params for Service Creation in Non-Prod Environment
    
- `ecs-codepipeline.yaml`
    CF Template to create CodePipeline to deploy ECS Fargate services     
    - `config/ecs-codepipeline-non-prod-config.json` - Config params for CodePipeline to deploy ECS Fargate servies in Non-Prod Environment
   