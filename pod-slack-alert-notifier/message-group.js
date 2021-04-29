
module.exports = {
  addAttachment: (attachment, messages, hashField) => {
    const hashCode = genHashCode(attachment[hashField]);
    const message = messages[hashCode];
    if (message) {
      message._count=(1+(message._count || 1));
    } else {
      messages[hashCode] = attachment;
    }
  },

  getAttachments: (messages) => {
    const attachments = [];
    for (const hash in messages) {
      if (Object.prototype.hasOwnProperty.call(messages, hash)) {
        const message = messages[hash];
        if (message._count) {
          message.title += ` (${message._count})`;
          if (message.author_name) {
            message.author_name = `First ${message.author_name}`;
          }
          message.title_link = message._batchMessageLink;
        }
        attachments.push(message);
      }
    }

    return attachments;
  },
};

const genHashCode = (str) => {
  let hash = 0; let i; let chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
