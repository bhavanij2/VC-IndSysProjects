const util = require('util');
const placeholder = require('./placeholder');

exports.handler = async (event) => {
  try {
    console.log('in', util.inspect(event.fragment));

    placeholder.replace(event.fragment, '$timestamp', Date.now());

    console.log('out', util.inspect(event.fragment));

    return {
      requestId: event.requestId,
      fragment: event.fragment,
      status: 'success',
    };
  } catch (e) {
    console.log(e);

    return {
      requestId: event.requestId,
      fragment: event.fragment,
      errorMessage: e.message,
      status: 'failed',
    };
  }
};
