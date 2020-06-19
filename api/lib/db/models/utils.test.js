import { toClient } from './utils.js';

describe('DB Model Utils', () => {
  test('It should return a formatted object', () => {
    const object = { _id: 1, __v: 2, string: 'bar', number: 1, boolean: true }
        , expectedObject = { id: 1, string: 'bar', number: 1, boolean: true }
        , formattedObject = toClient(object);

    expect(formattedObject).not.toBe(object);
    expect(formattedObject).toEqual(expectedObject);
  });

  test('It should return a deep formatted object', () => {
    const object = { _id: 1, __v: 2, array: [{ _id: 1, __v: 2, string: 'bar' }], object: { _id: 1, foo: 'bar' }}
        , expectedObject = { id: 1, array: [{ id: 1, string: 'bar' }], object: { id: 1, foo: 'bar' }}
        , formattedObject = toClient(object);

    expect(formattedObject).not.toBe(object);
    expect(formattedObject.array).not.toBe(object.array);
    expect(formattedObject.array[0]).not.toBe(object.array[0]);
    expect(formattedObject.object).not.toBe(object.object);
    expect(formattedObject).toEqual(expectedObject);
  });

  test('It should be assigned as a prototype of an object', () => {
    const object = { _id: 1, foo: 'bar' }
        , expectedObject = { id: 1, foo: 'bar', toClient };

    object.toClient = toClient;

    expect(object.toClient()).toEqual(expectedObject);
  });
});
