const util = require('util');
const messageGroup = require('./message-group');

module.exports = {

  message: (input) => {
    const messages = {};
    input.Records.forEach((item) => {
      messageGroup.addAttachment(createAttachmentSQS(item.Sns), messages, 'text');
    });
    return {attachments: messageGroup.getAttachments(messages), text: `*Alarm*`};
  },
};

const createAttachmentSQS = (item) => {
  const message = parseBody(item.Message);
  const time = new Date(item.Timestamp).getTime();

  const text = '*Data*\n```' + util.inspect(message, {depth: null}) + '```';

  return {
    '_batchMessageLink': null,
    'fallback': '',
    'color': 'danger',
    'pretext': '',
    'title': null,
    'author_name': null,
    'author_link': null,
    'author_icon': '',
    'text': text,
    'image_url': '',
    'thumb_url': '',
    'footer': '',
    'ts': time / 1000 | 0,
  };
};

const parseBody = (body) => {
  try {
    return JSON.parse(unescape(body));
  } catch (e) {
    return unescape(body);
  }
};
