/**istanbul ignore next */
function satisfyObjectProperty(prop, schema, opts) {
  const values = (opts && opts.values) || {};
  if (schema.type === 'object') {
    return satisfySchema(schema, { ...opts, values: values[prop] || opts.values});
  } else {
    return values[prop] || satisfySchema(schema, opts);
  }
}

/**
 * 
 * @param {Object} schema Schema that you would like to generate a valid test object for
 * @param {Object} options Configuration options
 *  @property {boolean} minimal whether or not non-required properties should be included
 *  @property {Object} values any specific properties that you want to specify values for
 *  @property {Object} defaults any specific default values you want for JSON schema types 
 */

function satisfySchema(schema, { 
    minimal = true,
    values = {},
    defaults = {},
  } = {}) {
  const opts = { minimal, values, defaults };
  try {
    if (schema.type === 'object') {
        let response = {};
        if (schema.required) {
          schema.required.forEach((requiredProp) => {
            const propSchema = schema.properties[requiredProp];
            response = { ...response, [requiredProp]: satisfyObjectProperty(requiredProp, propSchema, opts) };
          });
        }
        if (!opts.minimal) {
          Object.entries(schema.properties).forEach(([propName, propSchema]) => {
              //
              if(!response[propName]) {
                response = { ...response, [propName]: satisfyObjectProperty(propName, propSchema, opts) };
              }
          });
        }
        return response;
    } else if (schema.type === 'string') {
        return opts.defaults.string || 'test';
    } else if (schema.type === 'integer') {
        return opts.defaults.integer || 1;
    } else if (schema.type === 'number') {
        return opts.defaults.number || 1;
    } else if (schema.type === 'boolean') {
        return opts.defaults.boolean || false;
    }
    return {};
  } catch (e) {
    throw new Error('Error in parsing schema.', e);
  }
}

module.exports = satisfySchema;

const messageSchema = {
    type: 'object',
    properties: {
      subject: { type: 'string' },
      message: { type: 'string' },
      notifType: { type: 'string' },
      offer:
      { type: 'object',
        properties: {
          offerId: { type: 'string' },
          offerValue: { type: 'string' },
          endDate: { type: 'string' },
          parentId: { type: 'string' },
        },
        required: ['offerId'],
      },
      user:
      { type: 'object',
        properties: {
          userId: { type: 'string' },
        },
        required: ['userId'],
      },
      product:
      { type: 'object',
        properties: {
          productId: { type: 'string' },
          storeId: { type: 'string' },
          imageUrl: { type: 'string' },
        },
        required: ['productId'],
      },
    },
    required: ['user', 'product', 'offer', 'subject', 'message'],
  };

  const userSchema = { type: 'object',
  properties: {
    userId: { type: 'string' },
  },
  required: ['userId'],
}

  // console.log(satisfySchema(messageSchema, { minimal: false, defaults: { string: 'bob'}}));

