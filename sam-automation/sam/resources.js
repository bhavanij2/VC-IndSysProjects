
module.exports.sharedResources = (input) => {
  const stacks = new Set();

  let consumerSQS = null;
  if (input.consumerSQS) {
    stacks.add(input.consumerSQS.stack);
    consumerSQS = {
      resource: '${'+input.consumerSQS.stack+'}-'+input.consumerSQS.name,
      batchSize: input.consumerSQS.batchSize,
    };
  }

  let consumerSNS = null;
  if (input.consumerSNS) {
    stacks.add(input.consumerSNS.stack);
    consumerSNS = {
      resource: '${'+input.consumerSNS.stack+'}-'+input.consumerSNS.name,
      batchSize: input.consumerSNS.batchSize,
    };
  }
  input.producerSQS.forEach((item) => stacks.add(item.stack));
  input.producerSNS.forEach((item) => stacks.add(item.stack));

  return {
    stacks: stacks,
    consumerSQS: consumerSQS,
    consumerSNS: consumerSNS,
    producerSQS: input.producerSQS.map((item) => '${'+item.stack+'}-'+item.name),
    producerSNS: input.producerSNS.map((item) => '${'+item.stack+'}-'+item.name),
  };
};
