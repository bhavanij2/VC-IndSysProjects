#!/bin/bash
#set -xe
red='\e[1;31m%s\e[0m\n'
green='\e[1;32m%s\e[0m\n'
yellow='\e[1;33m%s\e[0m\n'
blue='\e[1;34m%s\e[0m\n'
magenta='\e[1;35m%s\e[0m\n'
cyan='\e[1;36m%s\e[0m\n'

printf "${cyan}" "Cleaning up temp files from previous runs"
rm -fr ./temp_app_cloudformation_templates

pushd . > /dev/null
SCRIPT_PATH="${BASH_SOURCE[0]}";
while([ -h "${SCRIPT_PATH}" ]); do
    cd "`dirname "${SCRIPT_PATH}"`"
    SCRIPT_PATH="$(readlink "`basename "${SCRIPT_PATH}"`")";
done
cd "`dirname "${SCRIPT_PATH}"`" > /dev/null
SCRIPT_PATH="`pwd`";
popd  > /dev/null
script_dir=${SCRIPT_PATH}
current_dir=`pwd`
input_skip_script_validation=0

#######################################################
# Check if we have aws, jq installed
#######################################################
command -v aws >/dev/null 2>&1
if [[ $? -eq 1 ]]; then
  echo "AWS CLI not installed!"
  echo "Please see the documentation for installation instructions:"
  echo "http://docs.aws.amazon.com/cli/latest/userguide/cli-install-macos.html"
  echo "http://docs.aws.amazon.com/cli/latest/userguide/awscli-install-linux.html"
  exit 1
fi

command -v jq >/dev/null 2>&1
if [[ $? -eq 1 ]]; then
  echo "JQ not installed!"
  echo "For macOS with brew installed, you can simply run `brew install jq`"
  echo "For other distributions, check the documentation:"
  echo "https://stedolan.github.io/jq/"
  exit 1
fi

######################################################################
# Check if there vcis-create-lambda-pipeline.config alread exists
######################################################################
CONFIG_FILE=~/.vcis/vcis-create-lambda-pipeline.config
if [[ -f "$CONFIG_FILE" ]]; then
    echo "$CONFIG_FILE exist"
    . ~/.vcis/vcis-create-lambda-pipeline.config
fi

 if ! [[ -z $default_features_names ]]; then
    IFS=',' read -ra default_features_names_array <<< "Enter new feature,${default_features_names}"
fi

if [[ $# -ge 1 ]]; then
    while [ $# -gt 0 ]; do

    if [[ $1 == *"--"* ]]; then
            KEY="${1/--/}"
            case "$KEY" in
                ENV)                    input_env=$2 ;;
                FEATURE)                input_feature=$2 ;;
                TEAM)                   input_team=$2 ;;
                CUSTOM_TAGS)            input_custom_tags=$2 ;;
                SKIP_SCRIPT_VALIDATION) input_skip_script_validation=$2 ;;
                *)                      printf "\033[1;31m${KEY} is not a valid argument\033[0m\n" exit -1 ;;
            esac
    fi

    shift
    done
fi 

##############################################################################################################
# Doing validation of script
##############################################################################################################
printf "$cyan" "Fetching last version of vcis-create-infra-pipeline.sh from vcis-app-cloudformation-templates repo"
git clone -b develop -n git@github.platforms.engineering:POD-Inc/vcis-app-cloudformation-templates.git temp_app_cloudformation_templates --depth 1

if ! [[ -z $input_skip_script_validation ]]; then
    cd temp_app_cloudformation_templates
    if ! [ $? -eq 0 ]; then
        printf "\033[0;31mError: Could not fetch last version of vcis-create-infra-pipeline.sh from vcis-app-cloudformation-templates repo \033[0m\n"
        exit 1
    fi
    git checkout HEAD templates/foundations/scripts/pipeline/vcis-create-infra-pipeline.sh
    check=`diff ${script_dir}/vcis-create-infra-pipeline.sh templates/foundations/scripts/pipeline/vcis-create-infra-pipeline.sh`
    if ! [[ -z ${check}  ]]; then
        cd ..
        printf "\033[0;31mError: Please verify that vcis-create-infra-pipeline.sh you are running is up to date. More info could be find in vcis-create-infra-pipeline.txt file \033[0m\n"
        echo "File ${script_dir}/vcis-create-infra-pipeline.sh differs from last version stored in https://github.platforms.engineering/POD-Inc/vcis-app-cloudformation-templates/blob/develop/templates/foundations/scripts/pipeline/vcis-create-infra-pipeline.sh" > vcis-create-infra-pipeline-error.txt
        echo "${check}" >> vcis-create-infra-pipeline-error.txt
        exit 1
    fi
    cd ..
else
    echo "Skipping script version validation"
fi

while [[ -z ${team_name} ]]; do
    if ! [[ -z ${default_team_name} ]] || ! [[ -z ${input_team} ]]; then
        if ! [[ -z ${input_team} ]]; then
            default_team_name=${input_team}
        fi
        printf "\033[0;33mWrite the name of the team that owns this lambda (enter for '${default_team_name}'): \033[0m" & \
    else
        printf "\033[0;33mWrite the name of the team that owns this lambda: \033[0m" & \
    fi
    read team_name
    if [[ -z ${team_name} ]] && ! [[ -z ${default_team_name} ]]; then
        team_name=${default_team_name}
    fi
done

while [[ -z ${feature_name} ]]; do
    if ! [[ -z $default_features_names ]]; then
        echo "Feature:"
        for index in "${!default_features_names_array[@]}"
        do
            echo "[$index] ${default_features_names_array[index]}"
        done

        option_selected_feature_name=${#default_features_names_array[@]}
        while [[ $option_selected_feature_name =~ ^[^0-9]+$ || $option_selected_feature_name -ge ${#default_features_names_array[@]} ]];
        do
            printf "\033[0;33mSelect option: \033[0m" & \
            read option_selected_feature_name
            if ! [[ option_selected_feature_name -eq 0 ]]; then
                feature_name=${default_features_names_array[option_selected_feature_name]}
            fi
        done
    fi
    
    if [[ -z $feature_name ]]; then
        if ! [[ -z ${input_feature} ]]; then
            printf "\033[0;33mWrite the feature name (enter for '${input_feature}'): \033[0m" & \
        else
            printf "\033[0;33mWrite the feature name: \033[0m" & \
        fi
    
        read feature_name
    fi 

    if [[ -z ${feature_name} ]] && ! [[ -z ${input_feature} ]]; then
        feature_name=${input_feature}
    fi
done

while [[ -z ${env} ]]; do
    if ! [[ -z ${input_env} ]]; then
        printf "\033[0;33mWrite the env for where you wanna create lambda pipeline (enter for '${input_env}'): \033[0m" & \
    else
        printf "\033[0;33mWrite the env for where you wanna create lambda pipeline: \033[0m" & \
    fi
    read env
    if [[ -z ${env} ]] && ! [[ -z ${input_env} ]]; then
        env=${input_env}
    fi
    if [[ (${env} != "dev" && ${env} != "it" && ${env} != "prod" && ${env} != "poc" && ${env} != "non-prod") ]]; then
      printf "\033[1;31mValid values are {'dev','it', 'prod', 'poc', 'non-prod'}\033[0m\n" & \
      env=''
    fi
done

defined_custom_tags=0
until [[ $defined_custom_tags -eq 1 ]]; do
    if ! [[ -z ${input_custom_tags} ]]; then
        printf "\033[0;33mWrite the custome tags you want to apply to the stack. Key=string,Value=string ... (enter for '${input_custom_tags}'): \033[0m" & \
    else
        printf "\033[0;33mWrite the custome tags you want to apply to the stack. Key=string,Value=string ... (enter to skip): \033[0m" & \
    fi
    read custom_tags
    if [[ -z ${custom_tags} ]] && ! [[ -z ${input_custom_tags} ]]; then
        custom_tags=${input_custom_tags}
    fi

    defined_custom_tags=1

    if ! [[ -z ${custom_tags} ]] && ! [[ $custom_tags =~ ^Key=[a-zA-z0-9\\:\\.\\-\\_]+,Value=[a-zA-z0-9\\:\\.\\-\\_]+(,Key=[a-zA-z0-9\\:\\.\\-\\_]+,Value=[a-zA-z0-9\\:\\.\\-\\_]+)*$ ]]; then
        printf "\033[0;31mError: '${custom_tags}' must matches the form of Key=string,Value=string ... \033[0m\n"
        defined_custom_tags=0
    fi
done

##############################################################################################################
# Fetching needed template and config files to create infra pipelines for given feature
##############################################################################################################
printf "$cyan" "Fetching last version of infra-pipeline.yaml from vcis-app-cloudformation-templates repo"

cd temp_app_cloudformation_templates

# Fetch last version of infra-pipeline.yaml from vcis-app-cloudformation-templates and stores in temp folder
git checkout HEAD templates/foundations/pipeline/infrastructure/infra-pipeline.yaml

# Fetch params files from infra resources for given feature
git checkout HEAD templates/features/${feature_name}
cd ..

###########################################################################################################################
# Reading directory from temp_app_cloudformation_templates/features/${feature_name} to create or update needed infra pipelines
###########################################################################################################################
cd ${script_dir}/temp_app_cloudformation_templates/templates/features/${feature_name}
dirs=(*/)
if (( ${#dirs[@]} == 0 )); then
    echo "No subdirectories found" >&2
fi

for dir in "${dirs[@]}"
do
    case $dir in
        event-sources/)      stack_name="vcis-app-infra-pipeline-${feature_name}-event-sources-${env}"; _dir=${dir%?};;
        rest-api/)           stack_name="vcis-app-infra-pipeline-apigw-${feature_name}-${env}"; _dir="${dir%?}/vcis-app-apigw-${feature_name}" ;;
        *)                  printf "\033[1;31m${dir} is not a valid directory\033[0m\n" exit -1 ;;
    esac

    stack_status=`(aws cloudformation describe-stacks --stack-name=${stack_name} --query 'Stacks[0].StackStatus' --output text) 2> /dev/null`

    if [[ ${stack_status} == "UPDATE_ROLLBACK_COMPLETE" ]]; then
        printf "\033[0;31mError: Stack ${stack_name} for BuildProject already exists but is in a failure state (UPDATE_ROLLBACK_COMPLETE) \033[0m\n"
        exit 10
    fi

    if [[ ${stack_status} == "CREATE_COMPLETE" ]] || [[ ${stack_status} == "UPDATE_COMPLETE" ]]; then
        printf "\033[0;36m\t`date '+%Y-%m-%d %H:%M:%S'`: Stack ${stack_name} already exist, updating it..\033[0m\n"
        cfn_operation="update-stack"
        wait_operation="stack-update-complete"
    else
        printf "\033[0;36m\t`date '+%Y-%m-%d %H:%M:%S'`: Creating stack ${stack_name}..\033[0m\n"
        cfn_operation="create-stack"
        wait_operation="stack-create-complete"
    fi


    tags="Key=mon:team,Value=${team_name},Key=mon:feature,Value=${feature_name}"
    if ! [[ -z ${custom_tags} ]]; then
        tags="${tags},${custom_tags}"
    fi

    cmd="aws cloudformation ${cfn_operation} \
        --stack-name ${stack_name} \
        --template-body file://${script_dir}/temp_app_cloudformation_templates/templates/foundations/pipeline/infrastructure/infra-pipeline.yaml \
        --parameters file://${script_dir}/temp_app_cloudformation_templates/templates/features/${feature_name}/${_dir}/config/${env}/cd-param-${env}.json \
        --tags ${tags} \
        --capabilities CAPABILITY_IAM CAPABILITY_AUTO_EXPAND"
    
    printf "\t${green}" "${cmd}"

    eval $cmd

done

#######################################################
# Clean up temporal folder
#######################################################
printf "$cyan" "Cleaning up temp files"
rm -fr ${script_dir}/temp_app_cloudformation_templates


#######################################################
# Saving new config file if needed
#######################################################
if ! [[ -f "$CONFIG_FILE" ]] || [[ $option_selected_feature_name -eq 0 ]]; then
    while ! [[ ${save_config_file} == 'y' ]] || [[ ${save_config_file} == 'n' ]]; do
        printf "\033[0;33mDo you wanna save a new config file?: \033[0m" & \
        read save_config_file

        if [[ ${save_config_file} == 'n' ]]; then
            exit 0
        fi

        echo "Creating file"
        if [ ! -d ~/.vcis ]; then
            mkdir -p ~/.vcis
        fi
        > ~/.vcis/vcis-create-lambda-pipeline.config
        echo "default_team_name=${team_name}" > ~/.vcis/vcis-create-lambda-pipeline.config
        [ -z $default_features_names ] && features_old='' || features_old="${default_features_names},"
        echo "default_features_names=${features_old}${feature_name}" >> ~/.vcis/vcis-create-lambda-pipeline.config
        chmod 755 ~/.vcis/vcis-create-lambda-pipeline.config
    done

fi