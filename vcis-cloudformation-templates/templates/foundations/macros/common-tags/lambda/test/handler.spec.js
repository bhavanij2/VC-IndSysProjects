const SSMService = require('../services/ssm.service');
const lambda = require('../index');
const mockEvent = require('./mock/lambda-event.mock.json');
const mockEventWithParamenters = require('./mock/lambda-event-with-macro-parameters.mock.json');
const mockEventWithoutEnv = require('./mock/lambda-event-without-env.mock.json');
const taggableResources = require('../config/taggable-resources.config.json');

const checkResourceTags = (taggableResources, resources) => {
  return Object.keys(resources).every(key => {
    const isTaggable = taggableResources.includes(resources[key].Type);
    return (isTaggable && 'Tags' in resources[key].Properties) || true;
  });
};

// mock ssm service
beforeAll(done => {
  SSMService.getSSMParameters = jest.fn(async () =>
    Promise.resolve([
      { name: 'mon:data-classification', value: 'internal' },
      { name: 'mon:env', value: 'non-prod' },
      { name: 'mon:owner', value: 'GAMITCH' },
      { name: 'mon:project', value: 'VC-Industry-System' },
      { name: 'mon:regulated', value: 'sox' }
    ])
  );
  done();
});

describe('macro common tags transform', () => {
  test('lambda handler success state', async () => {
    const response = await lambda.handler(mockEvent);

    expect(response.status).toBe('success');
  });

  test('if env parameter is present', async () => {
    const response = await lambda.handler(mockEventWithoutEnv);

    expect(response.status).toBe('failed');
    expect(response.errorMessage).toBe('Required Env parameter not found!');
  })

  test('if tags are added to taggable resources', async () => {
    const {
      fragment: { Resources: resources }
    } = await lambda.handler(mockEvent);

    expect(checkResourceTags(taggableResources, resources)).toBe(true);
  });

  test('if existing resource tags override default tags', async () => {
    const {
      fragment: { Resources: resources }
    } = await lambda.handler(mockEvent);
    const { VcisPublicSubnet2RouteTable: resourceWithTags } = resources;

    expect(resourceWithTags.Properties.Tags.find(tag => tag.Key === 'mon:project').Value).toBe('OVERRIDDEN');
  });

  test('if macro parameters tags override default tags', async () => {
    const {
      fragment: { Resources: resources }
    } = await lambda.handler(mockEventWithParamenters);
    
    const resourceWithParameterTags = resources[Object.keys(resources)[0]];

    expect(resourceWithParameterTags.Properties.Tags.find(tag => tag.Key === 'mon:owner').Value).toBe('SOME_OTHER_USER');
    expect(resourceWithParameterTags.Properties.Tags.find(tag => tag.Key === 'mon:regulated').Value).toBe('ISO_MAYBE');
  })
});
