const Migration = require('./migration');

exports.handler = async (event) => {
  console.log(event);

  const errors = [];

  for (let i=0; i<event.length; i++) {
    const item = event[i];
    try {
      await Migration.migrate(item);
    } catch (e) {
      console.log(`Error on index ${i}`, e, event);
      errors.push(i);
    }
  }

  if (errors.length > 0) throw new Error(`Errors in the following event indexes [${errors.join(',')}]. Check the logs.`);

  return event;
};
