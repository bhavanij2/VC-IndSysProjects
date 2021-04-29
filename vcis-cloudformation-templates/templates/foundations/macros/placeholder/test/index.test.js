const placeholder = require('../placeholder');
const index = require('../index');

jest.mock('../placeholder');


beforeEach(() => {
  jest.resetModules();
});

test('handler should call placeholder $timestamp with current timestamp', async () => {
  const aTimestamp = 1487076708000;
  Date.now = jest.fn(() => aTimestamp);

  const event = {
    fragment: {Root: {}},
    requestId: 'requestId',
  };

  await index.handler(event);

  expect(placeholder.replace).toHaveBeenCalledWith({Root: {}}, '$timestamp', aTimestamp);
});

test('handler should return success status when there is no error', async () => {
  const event = {
    fragment: {Root: {}},
    requestId: 'requestId',
  };

  const result = await index.handler(event);

  expect(result).toEqual({
    requestId: 'requestId',
    fragment: {Root: {}},
    status: 'success'});
});

test('handler should return error message and failed status when there is an error', async () => {
  placeholder.replace = jest.fn().mockImplementation(() => {
    throw new Error('anError');
  });

  const event = {
    fragment: {Root: {}},
    requestId: 'requestId',
  };

  const result = await index.handler(event);

  expect(result).toEqual({
    requestId: 'requestId',
    fragment: {Root: {}},
    errorMessage: 'anError',
    status: 'failed'});
});
