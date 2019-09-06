const test = require('ava');
const satisfy = require('../../src');

test.serial('should return {} if unsupported property type', (t) => {
  const testSchema = { 
      type: 'unsupported',
      properties: {
      userId: { type: 'string' },
    },
    required: ['userId'],
  };
  const expected = {};
  const actual = satisfy(testSchema);

  t.deepEqual(actual, expected);
});

test.serial('should return default default values for supported basic property types if no defaults specified', (t) => {
  const testSchema = { 
    type: 'object',
    properties: {
      userId: { type: 'string' },
      userNumber: { type: 'number' },
      userInt: { type: 'integer' },
      loggedIn: { type: 'boolean' },
    },
    required: ['userId', 'userNumber', 'userInt', 'loggedIn'],
  };
  const expected = {
    userId: 'test',
    userNumber: 1,
    userInt: 1,
    loggedIn: false,
  };
  
  const actual = satisfy(testSchema);

  t.deepEqual(actual, expected);
});

test.serial('should return default values if specified', (t) => {
  const testSchema = { 
    type: 'object',
    properties: {
      userId: { type: 'string' },
      userNumber: { type: 'number' },
      userInt: { type: 'integer' },
      loggedIn: { type: 'boolean' },
    },
    required: ['userId', 'userNumber', 'userInt', 'loggedIn'],
  };
  const testDefaults = { string: 'testString', number: 5.6, integer: 4, boolean: true };
  const expected = {
    userId: testDefaults.string,
    userNumber: testDefaults.number,
    userInt: testDefaults.integer,
    loggedIn: testDefaults.boolean,
  };
  
  const actual = satisfy(testSchema, { defaults: testDefaults });

  t.deepEqual(actual, expected);
});

test.serial('should only return required properties if minimal not false', (t) => {
  const testSchema = { 
    type: 'object',
    properties: {
      userId: { type: 'string' },
      userNumber: { type: 'number' },
      userInt: { type: 'integer' },
      loggedIn: { type: 'boolean' },
    },
    required: ['userId', 'userInt', 'loggedIn'],
  };
  const expected = {
    userId: 'test',
    userInt: 1,
    loggedIn: false,
  };
  
  const actual = satisfy(testSchema);

  t.deepEqual(actual, expected);
});

test.serial('should return values for all properties if minimal is false', (t) => {
  const testSchema = { 
    type: 'object',
    properties: {
      userId: { type: 'string' },
      userNumber: { type: 'number' },
      userInt: { type: 'integer' },
      loggedIn: { type: 'boolean' },
    },
  };
  const expected = {
    userId: 'test',
    userNumber: 1,
    userInt: 1,
    loggedIn: false,
  };
  
  const actual = satisfy(testSchema, { minimal: false });

  t.deepEqual(actual, expected);
});

test.serial('should return specific property values if specified', (t) => {
  const testSchema = { 
    type: 'object',
    properties: {
      userId: { type: 'string' },
      userNumber: { type: 'number' },
      userNumber2: { type: 'number' },
      userInt: { type: 'integer' },
      loggedIn: { type: 'boolean' },
      obj: {
        type: 'object',
        properties: {
          someProp: { type: 'string' },
        },
        required: ['someProp'],
      }
    },
    required: ['userId', 'userNumber', 'userNumber2', 'userInt', 'loggedIn', 'obj'],
  };
  const testValues = { userNumber: 12, obj: { someProp: 'val' } };
  const expected = {
    userId: 'test',
    userNumber: testValues.userNumber,
    userNumber2: 1,
    userInt: 1,
    loggedIn: false,
    obj: { someProp: testValues.obj.someProp },
  };
  
  const actual = satisfy(testSchema, { values: testValues });

  t.deepEqual(actual, expected);
});

test.serial('should throw error if error in parsing schema', (t) => {
  const testSchema = { 
    type: 'object',
    properties: {
      userId: { type: 'string' },
      userNumber: { type: 'number' },
      userNumber2: { type: 'number' },
      userInt: { type: 'integer' },
      loggedIn: { type: 'boolean' },
      obj: {
        type: 'object',
        properties: {
          someProp: { type: 'string' },
        },
        required: ['fake', 'someProp'],
      }
    },
    required: ['userId', 'userNumber', 'userNumber2', 'userInt', 'loggedIn', 'obj'],
  };
  const error = new Error('Error in parsing schema.');
  const actual = t.throws(() => { satisfy(testSchema); });
  
  t.deepEqual(actual, error);
})