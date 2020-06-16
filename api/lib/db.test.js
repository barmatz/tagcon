import { connect, disconnect, isConnected, insert, find, dumpCollection } from './db.js';

const TestCollection = 'TestCollection';

describe('Database', () => {
  beforeEach(async () => {
    await dumpCollection(TestCollection);
    await disconnect();
  });

  afterAll(async () => {
    await disconnect();
  });

  test('It should not be connected at first', () => {
    expect(isConnected()).toBe(false);
  });

  test('It should connect', async () => {
    expect(isConnected()).toBe(false);

    await connect();

    expect(isConnected()).toBe(true);
  });

  test.skip('It should disconnect', async () => {
    await connect();

    expect(isConnected()).toBe(true);

    await disconnect();

    expect(isConnected()).toBe(false);
  });

  test('It should insert an item into a collection', async () => {
    const item = { foo: 'bar' }
        , { insertedCount, ops } = await insert(TestCollection, item);

    expect(insertedCount).toEqual(1);
    expect(ops[0].foo).toEqual(item.foo);
  });

  test('It should insert many items into a collection', async () => {
    const items = [
			    { foo: 'bar' },
			    { baz: 'qux' }
		    ]
        , { insertedCount, ops } = await insert(TestCollection, items);

    expect(insertedCount).toEqual(2);
    expect(ops[0].foo).toEqual(items[0].foo);
    expect(ops[1].foo).toEqual(items[1].foo);
  });

  test('It should find results within a collection', async () => {
    const items = [
			    { foo: 'bar' },
			    { baz: 'qux' }
		    ];

  	let res = await find(TestCollection);

  	expect(res.length).toEqual(0);

    await insert(TestCollection, items);

  	res = await find(TestCollection);

  	expect(res.length).toEqual(2);
  });

  test('It should find results within a collection by query', async () => {
    const items = [
          { foo: 'bar' },
          { baz: 'qux' }
        ];

    let res = await find(TestCollection);

    expect(res.length).toEqual(0);

    await insert(TestCollection, items);

    res = await find(TestCollection, { foo: items[0].foo });

    expect(res.length).toEqual(1);

    res = await find(TestCollection, { foo: items[0].foo }, true);

    expect(res.foo).toEqual(items[0].foo);
  });
});
