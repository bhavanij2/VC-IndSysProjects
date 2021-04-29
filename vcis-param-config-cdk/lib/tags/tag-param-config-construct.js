"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk_1 = require("@aws-cdk/cdk");
const vcis_cdk_utils_1 = require("@monsantoit/vcis-cdk-utils");
const vcis_ssm_string_parameter_construct_1 = require("../vcis-ssm-parameter/vcis-ssm-string-parameter-construct");
class TagParamConfigConstruct extends cdk_1.Construct {
    constructor(scope, id) {
        super(scope, id);
        this.scope = scope;
        this.persistOwnerTag();
        this.persistCostCenterTag();
        this.persistProjectTag();
        this.persistEnvironmentTag();
        this.persistRegulatedTag();
        this.persistDataClassificationTag();
    }
    persistOwnerTag() {
        new vcis_ssm_string_parameter_construct_1.VcisSsmStringParameterConstruct(this.scope, 'ownerTagSsmParam', {
            description: vcis_cdk_utils_1.InputParameterHolder.get(TagParamConfigConstruct.TAGS_SSM_PARAM_PATH_HOLDER).owner,
            name: vcis_cdk_utils_1.InputParameterHolder.get(TagParamConfigConstruct.TAGS_SSM_PARAM_PATH_HOLDER).owner,
            stringValue: vcis_cdk_utils_1.InputParameterHolder.get(TagParamConfigConstruct.TAGS_INPUT_PARAMS_HOLDER).owner
        });
    }
    persistCostCenterTag() {
        new vcis_ssm_string_parameter_construct_1.VcisSsmStringParameterConstruct(this.scope, 'costCenterSsmParam', {
            description: vcis_cdk_utils_1.InputParameterHolder.get(TagParamConfigConstruct.TAGS_SSM_PARAM_PATH_HOLDER).costCenter,
            name: vcis_cdk_utils_1.InputParameterHolder.get(TagParamConfigConstruct.TAGS_SSM_PARAM_PATH_HOLDER).costCenter,
            stringValue: vcis_cdk_utils_1.InputParameterHolder.get(TagParamConfigConstruct.TAGS_INPUT_PARAMS_HOLDER).costCenter
        });
    }
    persistProjectTag() {
        new vcis_ssm_string_parameter_construct_1.VcisSsmStringParameterConstruct(this.scope, 'projectSsmParam', {
            description: vcis_cdk_utils_1.InputParameterHolder.get(TagParamConfigConstruct.TAGS_SSM_PARAM_PATH_HOLDER).project,
            name: vcis_cdk_utils_1.InputParameterHolder.get(TagParamConfigConstruct.TAGS_SSM_PARAM_PATH_HOLDER).project,
            stringValue: vcis_cdk_utils_1.InputParameterHolder.get(TagParamConfigConstruct.TAGS_INPUT_PARAMS_HOLDER).project
        });
    }
    persistEnvironmentTag() {
        new vcis_ssm_string_parameter_construct_1.VcisSsmStringParameterConstruct(this.scope, 'environmentSsmParam', {
            description: vcis_cdk_utils_1.InputParameterHolder.get(TagParamConfigConstruct.TAGS_SSM_PARAM_PATH_HOLDER).environment,
            name: vcis_cdk_utils_1.InputParameterHolder.get(TagParamConfigConstruct.TAGS_SSM_PARAM_PATH_HOLDER).environment,
            stringValue: vcis_cdk_utils_1.InputParameterHolder.get(TagParamConfigConstruct.TAGS_INPUT_PARAMS_HOLDER).environment
        });
    }
    persistRegulatedTag() {
        new vcis_ssm_string_parameter_construct_1.VcisSsmStringParameterConstruct(this.scope, 'regulatedSsmParam', {
            description: vcis_cdk_utils_1.InputParameterHolder.get(TagParamConfigConstruct.TAGS_SSM_PARAM_PATH_HOLDER).regulated,
            name: vcis_cdk_utils_1.InputParameterHolder.get(TagParamConfigConstruct.TAGS_SSM_PARAM_PATH_HOLDER).regulated,
            stringValue: vcis_cdk_utils_1.InputParameterHolder.get(TagParamConfigConstruct.TAGS_INPUT_PARAMS_HOLDER).regulated
        });
    }
    persistDataClassificationTag() {
        new vcis_ssm_string_parameter_construct_1.VcisSsmStringParameterConstruct(this.scope, 'dataClassificationSsmParam', {
            description: vcis_cdk_utils_1.InputParameterHolder.get(TagParamConfigConstruct.TAGS_SSM_PARAM_PATH_HOLDER).dataClassification,
            name: vcis_cdk_utils_1.InputParameterHolder.get(TagParamConfigConstruct.TAGS_SSM_PARAM_PATH_HOLDER).dataClassification,
            stringValue: vcis_cdk_utils_1.InputParameterHolder.get(TagParamConfigConstruct.TAGS_INPUT_PARAMS_HOLDER).dataClassification
        });
    }
}
TagParamConfigConstruct.TAGS_SSM_PARAM_PATH_HOLDER = 'tags-ssm-param-path';
TagParamConfigConstruct.TAGS_INPUT_PARAMS_HOLDER = "tags";
exports.TagParamConfigConstruct = TagParamConfigConstruct;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLXBhcmFtLWNvbmZpZy1jb25zdHJ1Y3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YWctcGFyYW0tY29uZmlnLWNvbnN0cnVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5QztBQUN6QywrREFBa0U7QUFDbEUsbUhBQTRHO0FBRTVHLE1BQWEsdUJBQXdCLFNBQVEsZUFBUztJQUtsRCxZQUE2QixLQUFnQixFQUFFLEVBQVU7UUFDckQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQURRLFVBQUssR0FBTCxLQUFLLENBQVc7UUFHekMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFTyxlQUFlO1FBQ25CLElBQUkscUVBQStCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxrQkFBa0IsRUFBRTtZQUNoRSxXQUFXLEVBQUUscUNBQW9CLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLDBCQUEwQixDQUFDLENBQUMsS0FBSztZQUMvRixJQUFJLEVBQUUscUNBQW9CLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLDBCQUEwQixDQUFDLENBQUMsS0FBSztZQUN4RixXQUFXLEVBQUUscUNBQW9CLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLHdCQUF3QixDQUFDLENBQUMsS0FBSztTQUNoRyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU8sb0JBQW9CO1FBQ3hCLElBQUkscUVBQStCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxvQkFBb0IsRUFBRTtZQUNsRSxXQUFXLEVBQUUscUNBQW9CLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLDBCQUEwQixDQUFDLENBQUMsVUFBVTtZQUNwRyxJQUFJLEVBQUUscUNBQW9CLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLDBCQUEwQixDQUFDLENBQUMsVUFBVTtZQUM3RixXQUFXLEVBQUUscUNBQW9CLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLHdCQUF3QixDQUFDLENBQUMsVUFBVTtTQUNyRyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU8saUJBQWlCO1FBQ3JCLElBQUkscUVBQStCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxpQkFBaUIsRUFBRTtZQUMvRCxXQUFXLEVBQUUscUNBQW9CLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLDBCQUEwQixDQUFDLENBQUMsT0FBTztZQUNqRyxJQUFJLEVBQUUscUNBQW9CLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLDBCQUEwQixDQUFDLENBQUMsT0FBTztZQUMxRixXQUFXLEVBQUUscUNBQW9CLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLHdCQUF3QixDQUFDLENBQUMsT0FBTztTQUNsRyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU8scUJBQXFCO1FBQ3pCLElBQUkscUVBQStCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxxQkFBcUIsRUFBRTtZQUNuRSxXQUFXLEVBQUUscUNBQW9CLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLDBCQUEwQixDQUFDLENBQUMsV0FBVztZQUNyRyxJQUFJLEVBQUUscUNBQW9CLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLDBCQUEwQixDQUFDLENBQUMsV0FBVztZQUM5RixXQUFXLEVBQUUscUNBQW9CLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLHdCQUF3QixDQUFDLENBQUMsV0FBVztTQUN0RyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU8sbUJBQW1CO1FBQ3ZCLElBQUkscUVBQStCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxtQkFBbUIsRUFBRTtZQUNqRSxXQUFXLEVBQUUscUNBQW9CLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLDBCQUEwQixDQUFDLENBQUMsU0FBUztZQUNuRyxJQUFJLEVBQUUscUNBQW9CLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLDBCQUEwQixDQUFDLENBQUMsU0FBUztZQUM1RixXQUFXLEVBQUUscUNBQW9CLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLHdCQUF3QixDQUFDLENBQUMsU0FBUztTQUNwRyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU8sNEJBQTRCO1FBQ2hDLElBQUkscUVBQStCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSw0QkFBNEIsRUFBRTtZQUMxRSxXQUFXLEVBQUUscUNBQW9CLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLDBCQUEwQixDQUFDLENBQUMsa0JBQWtCO1lBQzVHLElBQUksRUFBRSxxQ0FBb0IsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxrQkFBa0I7WUFDckcsV0FBVyxFQUFFLHFDQUFvQixDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLGtCQUFrQjtTQUM3RyxDQUFDLENBQUM7SUFDUCxDQUFDOztBQTVEYyxrREFBMEIsR0FBRyxxQkFBcUIsQ0FBQztBQUNuRCxnREFBd0IsR0FBRyxNQUFNLENBQUM7QUFIckQsMERBK0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSBcIkBhd3MtY2RrL2Nka1wiO1xuaW1wb3J0IHsgSW5wdXRQYXJhbWV0ZXJIb2xkZXIgfSBmcm9tIFwiQG1vbnNhbnRvaXQvdmNpcy1jZGstdXRpbHNcIjtcbmltcG9ydCB7IFZjaXNTc21TdHJpbmdQYXJhbWV0ZXJDb25zdHJ1Y3QgfSBmcm9tIFwiLi4vdmNpcy1zc20tcGFyYW1ldGVyL3ZjaXMtc3NtLXN0cmluZy1wYXJhbWV0ZXItY29uc3RydWN0XCI7XG5cbmV4cG9ydCBjbGFzcyBUYWdQYXJhbUNvbmZpZ0NvbnN0cnVjdCBleHRlbmRzIENvbnN0cnVjdCB7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBUQUdTX1NTTV9QQVJBTV9QQVRIX0hPTERFUiA9ICd0YWdzLXNzbS1wYXJhbS1wYXRoJztcbiAgICBwcml2YXRlIHN0YXRpYyBUQUdTX0lOUFVUX1BBUkFNU19IT0xERVIgPSBcInRhZ3NcIjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZykge1xuICAgICAgICBzdXBlcihzY29wZSwgaWQpO1xuXG4gICAgICAgIHRoaXMucGVyc2lzdE93bmVyVGFnKCk7XG4gICAgICAgIHRoaXMucGVyc2lzdENvc3RDZW50ZXJUYWcoKTtcbiAgICAgICAgdGhpcy5wZXJzaXN0UHJvamVjdFRhZygpO1xuICAgICAgICB0aGlzLnBlcnNpc3RFbnZpcm9ubWVudFRhZygpO1xuICAgICAgICB0aGlzLnBlcnNpc3RSZWd1bGF0ZWRUYWcoKTtcbiAgICAgICAgdGhpcy5wZXJzaXN0RGF0YUNsYXNzaWZpY2F0aW9uVGFnKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwZXJzaXN0T3duZXJUYWcoKSB7XG4gICAgICAgIG5ldyBWY2lzU3NtU3RyaW5nUGFyYW1ldGVyQ29uc3RydWN0KHRoaXMuc2NvcGUsICdvd25lclRhZ1NzbVBhcmFtJywge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IElucHV0UGFyYW1ldGVySG9sZGVyLmdldChUYWdQYXJhbUNvbmZpZ0NvbnN0cnVjdC5UQUdTX1NTTV9QQVJBTV9QQVRIX0hPTERFUikub3duZXIsXG4gICAgICAgICAgICBuYW1lOiBJbnB1dFBhcmFtZXRlckhvbGRlci5nZXQoVGFnUGFyYW1Db25maWdDb25zdHJ1Y3QuVEFHU19TU01fUEFSQU1fUEFUSF9IT0xERVIpLm93bmVyLFxuICAgICAgICAgICAgc3RyaW5nVmFsdWU6IElucHV0UGFyYW1ldGVySG9sZGVyLmdldChUYWdQYXJhbUNvbmZpZ0NvbnN0cnVjdC5UQUdTX0lOUFVUX1BBUkFNU19IT0xERVIpLm93bmVyXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgcGVyc2lzdENvc3RDZW50ZXJUYWcoKSB7XG4gICAgICAgIG5ldyBWY2lzU3NtU3RyaW5nUGFyYW1ldGVyQ29uc3RydWN0KHRoaXMuc2NvcGUsICdjb3N0Q2VudGVyU3NtUGFyYW0nLCB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogSW5wdXRQYXJhbWV0ZXJIb2xkZXIuZ2V0KFRhZ1BhcmFtQ29uZmlnQ29uc3RydWN0LlRBR1NfU1NNX1BBUkFNX1BBVEhfSE9MREVSKS5jb3N0Q2VudGVyLFxuICAgICAgICAgICAgbmFtZTogSW5wdXRQYXJhbWV0ZXJIb2xkZXIuZ2V0KFRhZ1BhcmFtQ29uZmlnQ29uc3RydWN0LlRBR1NfU1NNX1BBUkFNX1BBVEhfSE9MREVSKS5jb3N0Q2VudGVyLFxuICAgICAgICAgICAgc3RyaW5nVmFsdWU6IElucHV0UGFyYW1ldGVySG9sZGVyLmdldChUYWdQYXJhbUNvbmZpZ0NvbnN0cnVjdC5UQUdTX0lOUFVUX1BBUkFNU19IT0xERVIpLmNvc3RDZW50ZXJcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwZXJzaXN0UHJvamVjdFRhZygpIHtcbiAgICAgICAgbmV3IFZjaXNTc21TdHJpbmdQYXJhbWV0ZXJDb25zdHJ1Y3QodGhpcy5zY29wZSwgJ3Byb2plY3RTc21QYXJhbScsIHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBJbnB1dFBhcmFtZXRlckhvbGRlci5nZXQoVGFnUGFyYW1Db25maWdDb25zdHJ1Y3QuVEFHU19TU01fUEFSQU1fUEFUSF9IT0xERVIpLnByb2plY3QsXG4gICAgICAgICAgICBuYW1lOiBJbnB1dFBhcmFtZXRlckhvbGRlci5nZXQoVGFnUGFyYW1Db25maWdDb25zdHJ1Y3QuVEFHU19TU01fUEFSQU1fUEFUSF9IT0xERVIpLnByb2plY3QsXG4gICAgICAgICAgICBzdHJpbmdWYWx1ZTogSW5wdXRQYXJhbWV0ZXJIb2xkZXIuZ2V0KFRhZ1BhcmFtQ29uZmlnQ29uc3RydWN0LlRBR1NfSU5QVVRfUEFSQU1TX0hPTERFUikucHJvamVjdFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHBlcnNpc3RFbnZpcm9ubWVudFRhZygpIHtcbiAgICAgICAgbmV3IFZjaXNTc21TdHJpbmdQYXJhbWV0ZXJDb25zdHJ1Y3QodGhpcy5zY29wZSwgJ2Vudmlyb25tZW50U3NtUGFyYW0nLCB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogSW5wdXRQYXJhbWV0ZXJIb2xkZXIuZ2V0KFRhZ1BhcmFtQ29uZmlnQ29uc3RydWN0LlRBR1NfU1NNX1BBUkFNX1BBVEhfSE9MREVSKS5lbnZpcm9ubWVudCxcbiAgICAgICAgICAgIG5hbWU6IElucHV0UGFyYW1ldGVySG9sZGVyLmdldChUYWdQYXJhbUNvbmZpZ0NvbnN0cnVjdC5UQUdTX1NTTV9QQVJBTV9QQVRIX0hPTERFUikuZW52aXJvbm1lbnQsXG4gICAgICAgICAgICBzdHJpbmdWYWx1ZTogSW5wdXRQYXJhbWV0ZXJIb2xkZXIuZ2V0KFRhZ1BhcmFtQ29uZmlnQ29uc3RydWN0LlRBR1NfSU5QVVRfUEFSQU1TX0hPTERFUikuZW52aXJvbm1lbnRcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwZXJzaXN0UmVndWxhdGVkVGFnKCkge1xuICAgICAgICBuZXcgVmNpc1NzbVN0cmluZ1BhcmFtZXRlckNvbnN0cnVjdCh0aGlzLnNjb3BlLCAncmVndWxhdGVkU3NtUGFyYW0nLCB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogSW5wdXRQYXJhbWV0ZXJIb2xkZXIuZ2V0KFRhZ1BhcmFtQ29uZmlnQ29uc3RydWN0LlRBR1NfU1NNX1BBUkFNX1BBVEhfSE9MREVSKS5yZWd1bGF0ZWQsXG4gICAgICAgICAgICBuYW1lOiBJbnB1dFBhcmFtZXRlckhvbGRlci5nZXQoVGFnUGFyYW1Db25maWdDb25zdHJ1Y3QuVEFHU19TU01fUEFSQU1fUEFUSF9IT0xERVIpLnJlZ3VsYXRlZCxcbiAgICAgICAgICAgIHN0cmluZ1ZhbHVlOiBJbnB1dFBhcmFtZXRlckhvbGRlci5nZXQoVGFnUGFyYW1Db25maWdDb25zdHJ1Y3QuVEFHU19JTlBVVF9QQVJBTVNfSE9MREVSKS5yZWd1bGF0ZWRcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwZXJzaXN0RGF0YUNsYXNzaWZpY2F0aW9uVGFnKCkge1xuICAgICAgICBuZXcgVmNpc1NzbVN0cmluZ1BhcmFtZXRlckNvbnN0cnVjdCh0aGlzLnNjb3BlLCAnZGF0YUNsYXNzaWZpY2F0aW9uU3NtUGFyYW0nLCB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogSW5wdXRQYXJhbWV0ZXJIb2xkZXIuZ2V0KFRhZ1BhcmFtQ29uZmlnQ29uc3RydWN0LlRBR1NfU1NNX1BBUkFNX1BBVEhfSE9MREVSKS5kYXRhQ2xhc3NpZmljYXRpb24sXG4gICAgICAgICAgICBuYW1lOiBJbnB1dFBhcmFtZXRlckhvbGRlci5nZXQoVGFnUGFyYW1Db25maWdDb25zdHJ1Y3QuVEFHU19TU01fUEFSQU1fUEFUSF9IT0xERVIpLmRhdGFDbGFzc2lmaWNhdGlvbixcbiAgICAgICAgICAgIHN0cmluZ1ZhbHVlOiBJbnB1dFBhcmFtZXRlckhvbGRlci5nZXQoVGFnUGFyYW1Db25maWdDb25zdHJ1Y3QuVEFHU19JTlBVVF9QQVJBTVNfSE9MREVSKS5kYXRhQ2xhc3NpZmljYXRpb25cbiAgICAgICAgfSk7XG4gICAgfVxufSJdfQ==