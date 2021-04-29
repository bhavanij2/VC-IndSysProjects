const moment = require('moment');
const baseUrlCloudWatch = `https://console.aws.amazon.com/cloudwatch/home?region=${process.env.REGION}`;

module.exports = {

  withFilter: (logGroup, timestamp, filter) => {
    return encodeURI(`${withDate(logGroup, timestamp)};filter="${filter}"`);
  },

  withStream: (logGroup, timestamp, filter, logStream) => {
    return encodeURI(`${module.exports.withFilter(logGroup, timestamp, filter)};stream=${logStream}`);
  },
};

const withDate = (logGroup, timestamp) => {
  return encodeURI(`${baseUrlCloudWatch}#logEventViewer:group=${logGroup};start=${fromDate(timestamp)};end=${toDate(timestamp)}`);
};

const fromDate = (timestamp) => {
  return moment.utc(timestamp).add(-5, 'minutes').format('YYYY-MM-DDTHH:mm:ssZ');
};

const toDate = (timestamp) => {
  return moment.utc(timestamp).add(5, 'minutes').format('YYYY-MM-DDTHH:mm:ssZ');
};

