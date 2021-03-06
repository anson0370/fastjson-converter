const test = require('ava');
const fjson = require('../index');

test('object', t => {
  const jsonStr = `{"k":"root","obj":{"k":1,"obj2":{"k":"string","obj":{"$ref":".."}}},"objSame":{"$ref":"$.obj"}}`;
  const obj = fjson.parse(jsonStr);

  t.is(obj.k, "root");
  t.is(obj.obj.k, 1);
  t.is(obj.obj.obj2.k, "string")
  t.is(obj.obj, obj.objSame);
  t.is(obj.obj, obj.obj.obj2.obj);
});

test('array', t => {
  const jsonStr = `[{"k":1,"inner":{"k":"inner"}},{"$ref":"$[0]"},{"$ref":"$[0]"},{"k":true,"arr":[{"$ref":"$[0]"},{"$ref":"$[0].inner"}]}]`;
  const obj = fjson.parse(jsonStr);

  t.is(obj[0].k, 1);
  t.is(obj[0].inner.k, "inner");
  t.is(obj[0], obj[1]);
  t.is(obj[1], obj[2]);
  t.is(obj[3].k, true);
  t.is(obj[3].arr[0], obj[0]);
  t.is(obj[3].arr[1], obj[0].inner);
});
