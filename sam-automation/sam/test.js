const index = require('./index');

const input = require('./test/input/participant_delivery_input.json');

const main = () => {
  index.handler(input);
};
main();
