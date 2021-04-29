const deepIterator = require('deep-iterator').default;

exports.replace = (fragment, placeholderName, placeholderValue) => {
  const it = deepIterator(fragment, {circularReference: 'noCheck'});

  for (const {parent, key, value, _isLeaf} of it) {
    if (!parent) continue;

    if (_isLeaf) {
      replaceLeaf(parent, key, value, placeholderName, placeholderValue);
    } else if (isObject(value)) {
      replaceKeys(parent, key, value, placeholderName, placeholderValue);
    }
  }
};

const replaceLeaf = (parent, key, value, placeholderName, placeholderValue) => {
  if (!value) return value;

  const valueString = value.toString();
  if (valueString.includes(placeholderName)) {
    parent[key] = valueString.replace(placeholderName, placeholderValue);
  }
};

const replaceKeys = (parent, key, value, placeholderName, placeholderValue) => {
  Object.keys(value).forEach((subKey) => {
    const valueString = subKey.toString();
    if (valueString.includes(placeholderName)) {
      const newKey = valueString.replace(placeholderName, placeholderValue);
      parent[key][newKey] = value[subKey];
      delete parent[key][subKey];
    }
  });
};

const isObject = (value) => typeof value === 'object' && value !== null;
