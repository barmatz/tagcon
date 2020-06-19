import { normalizePort } from './utils.js';

describe('Utils', () => {
  test('It should normalize a value to a port', () => {
    expect(normalizePort('foo')).toEqual('foo');
    expect(normalizePort(80)).toEqual(80);
    expect(normalizePort(80.1)).toEqual(80);
    expect(normalizePort(-1)).toEqual(false);
  });
});
