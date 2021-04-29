const placeholder = require('../placeholder');

test('replace should not modify fragment if there is no placeholder', () => {
  const fragment = {
    Root: {
      OneResource: {
        Properties: {
          OneProperty: 'value1',
          AnotherProperty: 'value2',
        },
      },
    },
  };

  placeholder.replace(fragment, '$placeholder', 'placeholderValue');

  expect(fragment).toEqual({
    Root: {
      OneResource: {
        Properties: {
          OneProperty: 'value1',
          AnotherProperty: 'value2',
        },
      },
    },
  });
});


test('replace should modify fragment if there is one placeholder on the key', () => {
  const fragment = {
    Root: {
      OneResource$placeholder: {
        Properties: {
          OneProperty: 'value1',
          AnotherProperty: 'value2',
        },
      },
    },
  };

  placeholder.replace(fragment, '$placeholder', 'placeholderValue');

  expect(fragment).toEqual({
    Root: {
      OneResourceplaceholderValue: {
        Properties: {
          OneProperty: 'value1',
          AnotherProperty: 'value2',
        },
      },
    },
  });
});

test('replace should modify fragment if there is one placeholder on the leaf of type string', () => {
  const fragment = {
    Root: {
      OneResource: {
        Properties: {
          OneProperty: 'value1$placeholder',
          AnotherProperty: 'value2',
        },
      },
    },
  };

  placeholder.replace(fragment, '$placeholder', 'placeholderValue');

  expect(fragment).toEqual({
    Root: {
      OneResource: {
        Properties: {
          OneProperty: 'value1placeholderValue',
          AnotherProperty: 'value2',
        },
      },
    },
  });
});

test('replace should not break and mapped the value when a leaf is null', () => {
  const fragment = {
    Root: {
      OneResource: {
        Properties: {
          OneProperty: null,
          AnotherProperty: 'value2',
        },
      },
    },
  };

  placeholder.replace(fragment, '$placeholder', 'placeholderValue');

  expect(fragment).toEqual({
    Root: {
      OneResource: {
        Properties: {
          OneProperty: null,
          AnotherProperty: 'value2',
        },
      },
    },
  });
});

test('replace should not break and mapped the value when a leaf is boolean', () => {
  const fragment = {
    Root: {
      OneResource: {
        Properties: {
          OneProperty: true,
          AnotherProperty: 'value2',
        },
      },
    },
  };

  placeholder.replace(fragment, '$placeholder', 'placeholderValue');

  expect(fragment).toEqual({
    Root: {
      OneResource: {
        Properties: {
          OneProperty: true,
          AnotherProperty: 'value2',
        },
      },
    },
  });
});

test('replace should not break and mapped the value when a leaf is number', () => {
  const fragment = {
    Root: {
      OneResource: {
        Properties: {
          OneProperty: 123,
          AnotherProperty: 'value2',
        },
      },
    },
  };

  placeholder.replace(fragment, '$placeholder', 'placeholderValue');

  expect(fragment).toEqual({
    Root: {
      OneResource: {
        Properties: {
          OneProperty: 123,
          AnotherProperty: 'value2',
        },
      },
    },
  });
});

test('replace should modify fragment if there are two placeholders on an array leaf', () => {
  const fragment = {
    Root: {
      OneResource: {
        Properties: {
          OneProperty: 'value1',
          AnotherProperty: ['value2$placeholder', 'value3$placeholder', 'value4$placeholder'],
        },
      },
    },
  };

  placeholder.replace(fragment, '$placeholder', 'placeholderValue');

  console.log(fragment);

  expect(fragment).toEqual({
    Root: {
      OneResource: {
        Properties: {
          OneProperty: 'value1',
          AnotherProperty: ['value2placeholderValue', 'value3placeholderValue', 'value4placeholderValue'],
        },
      },
    },
  });
});


test('replace should modify fragment if there is two placeholders one the key and other on the leaf of type string', async () => {
  const fragment = {
    Root: {
      OneResource$placeholder: {
        Properties: {
          OneProperty: 'value1$placeholder',
          AnotherProperty: 'value2',
        },
      },
    },
  };

  placeholder.replace(fragment, '$placeholder', 'placeholderValue');

  expect(fragment).toEqual({
    Root: {
      OneResourceplaceholderValue: {
        Properties: {
          OneProperty: 'value1placeholderValue',
          AnotherProperty: 'value2',
        },
      },
    },
  });
});

test('replace should modify fragment if there is four placeholders on the key and on the leaf of type string with multiple objects', async () => {
  const fragment = {
    Root: {
      OneResource: {
        Properties$placeholder: {
          OneProperty: 'value1$placeholder',
          AnotherProperty: 'value2',
        },
      },
      AnotherResource$placeholder: {
        Properties: {
          OneProperty: 'value1',
          AnotherProperty: 'value2$placeholder',
        },
      },
    },
  };

  placeholder.replace(fragment, '$placeholder', 'placeholderValue');

  expect(fragment).toEqual({
    Root: {
      OneResource: {
        PropertiesplaceholderValue: {
          OneProperty: 'value1placeholderValue',
          AnotherProperty: 'value2',
        },
      },
      AnotherResourceplaceholderValue: {
        Properties: {
          OneProperty: 'value1',
          AnotherProperty: 'value2placeholderValue',
        },
      },
    },
  });
});
