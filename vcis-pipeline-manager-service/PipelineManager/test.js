const index = require('./index');

const input = require('./test/input/input.json');

const main = () => {
  index.handler(input);
};
main();
