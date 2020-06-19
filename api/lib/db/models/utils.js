/* eslint no-underscore-dangle: "off" */

function removeObjectFields(object) {
  if (object instanceof Array) {
    return object.map(removeObjectFields);
  }

  if (typeof object === 'object') {
    const newObject = { ...object };

    if ('_id' in newObject) {
      newObject.id = typeof newObject._id === 'object' ? newObject._id.toString() : newObject._id;

      delete newObject._id;
    }

    if ('__v' in newObject) {
      delete newObject.__v;
    }

    Object.keys(newObject).forEach(key => {
      newObject[key] = removeObjectFields(newObject[key]);
    });

    return newObject;
  }

  return object;
}

export function toClient(object) {
  let scope;

  if (object) {
    scope = object;
  } else if ('toObject' in this) {
    scope = this.toObject();
  } else if ('toJSON' in this) {
    scope = this.toJSON();
  } else {
    scope = this;
  }

  return removeObjectFields(scope);
}
