## satisfy
Testing Utility to generate JSON Objects that pass schemas

## Motivation
Various services (i.e. Google Pub/Sub Subscribers) often expect inputs that satisfy a certain schema in order to correctly function. Creating objects that satisfy these schemas can be a painstaking and laborious process. This package relieves you of that stress.

## Code Example

```js
  // import the module
  const satisfy = require('@sriramb2000/satisfy');
  
  const testSchema = { 
    type: 'object',
    properties: {
      userId: { type: 'string' },
      userName: { type: 'string' ),
      userNumber: { type: 'number' },
      userInt: { type: 'integer' },
      loggedIn: { type: 'boolean' },
    },
    required: ['userId', 'userNumber', 'userInt'],
  };
  
  console.log(satisfy(testSchema));
  console.log(satisfy(testSchema, { minimal: false, values: { userName: 'yeet' }, defaults: { string: 'test2' } }));
```
Output:
```
{
    userId: 'test',
    userNumber: 1,
    userInt: 1,
    loggedIn: false,
}
{
    userId: 'test2',
    userName: 'yeet',
    userNumber: 1,
    userInt: 1,
    loggedIn: false,
}
```

## Installation
```
npm install @sriramb2000/satisfy
```

## API Reference

### satisfy(schema, opts={ minimal, values, defaults })

```js
/**
 * 
 * @param {Object} schema Schema that you would like to generate a valid test object for
 * @param {Object} options Configuration options
 *  @property {boolean} minimal should non-required properties be included (true means only required, false means non-require too)
 *  @property {Object} values any specific properties that you want to specify values for. These can either be specified at the root level or wrapped inside other properties too.
 *  @property {Object} defaults any specific default values you want for JSON schema types 
      i.e. { string: 'test2', integer: 10 }
 * @returns {Object} JSON object that satisfies the schema
 */
```

## Tests
```
npm test
```

## Contribute

I'm interested in being able to objects that satisfy a JSDoc typedef/class in the future. If you would like to help out feel free to email me or just open a PR :).

## License
MIT

MIT © [Sriram Balachandran]()
