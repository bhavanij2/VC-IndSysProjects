const messageGroup = require('../message-group');

test('addAttachment should add the attachment on messages with the key hashed and no count when it does not exists', async () => {
  const attachment = {
    'field': 'value',
    'field-2': 'value-2',
  };

  const messages = {};
  messageGroup.addAttachment(attachment, messages, 'field');

  expect(messages['111972721']).toEqual(attachment);
});

test('addAttachment should add the attachment on messages with the key hashed and count 2 when it does exists with no count', async () => {
  const attachment = {
    'field': 'value',
    'field-2': 'value-2',
  };

  const messages = {};
  messageGroup.addAttachment(attachment, messages, 'field');
  messageGroup.addAttachment(attachment, messages, 'field');

  const expectedAttachment = {
    'field': 'value',
    'field-2': 'value-2',
    '_count': 2,
  };

  expect(messages['111972721']).toEqual(expectedAttachment);
});

test('getAttachments should return an array with the attachment added without modification if is with no count', async () => {
  const attachment = {
    'field': 'value',
    'field-2': 'value-2',
  };

  const messages = {};
  messageGroup.addAttachment(attachment, messages, 'field');

  const result = messageGroup.getAttachments(messages);

  expect(result[0]).toEqual(attachment);
  expect(result.length).toEqual(1);
});

test('getAttachments should return an array with the attachment added with count on title and prefix First on author_name when count exists and has author_name setted', async () => {
  const attachment = {
    'field': 'value',
    'author_name': 'value-2',
    'title': 'title',
    '_batchMessageLink': 'link',
  };

  const messages = {};
  messageGroup.addAttachment(attachment, messages, 'field');
  messageGroup.addAttachment(attachment, messages, 'field');

  const result = messageGroup.getAttachments(messages);

  const expectedAttachment = {
    'field': 'value',
    'author_name': 'First value-2',
    'title': 'title (2)',
    'title_link': 'link',
    '_count': 2,
    '_batchMessageLink': 'link',
  };

  expect(result[0]).toEqual(expectedAttachment);
  expect(result.length).toEqual(1);
});

