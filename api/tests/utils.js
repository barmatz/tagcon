import req from 'supertest';

export function sendAndExpectReq(server) {
  return (method, uri, options) => {
	  const { payload, expectedStatus } = options || {};

	  let deferred = req(server)[method.toLowerCase()](uri);

	  if (payload) {
	    deferred = deferred.send(payload);
	  }

	  return deferred
	    .expect(expectedStatus || 200)
	    .expect('Content-Type', /json/);
  };
}
