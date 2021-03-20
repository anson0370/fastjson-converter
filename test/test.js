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

test('case', t => {
  const jsonStr = '{"code":200,"res":{"__trantorExtendFields":{},"createdAt":1616232995000,"createdBy":{"__trantorExtendFields":{},"id":1},"id":102012,"isTerminus":"NO","level":2,"networkStructureCode":"NS20210320000010","parentNetworkStructure":{"__trantorExtendFields":{},"id":102013},"parentWarehouse":{"__trantorExtendFields":{},"companyEntity":{"__trantorExtendFields":{},"id":20},"createdAt":1577808000000,"createdBy":{"__trantorExtendFields":{},"id":1},"entity":{"__trantorExtendFields":{},"id":19},"id":3,"isVirtualSite":false,"openTime":"1577808000000","siteCode":"testFrontSourcing","siteLevel":1,"siteName":"交易寻源测试仓","siteStatus":"ENABLED","siteType":"SHOP","updatedAt":1614935792000,"updatedBy":{"__trantorExtendFields":{},"id":1}},"requisitionNetworkStructureBOList":[{"__trantorExtendFields":{},"createdAt":1616234127000,"createdBy":{"__trantorExtendFields":{},"id":1},"id":102024,"isTerminus":"YES","level":3,"networkStructureCode":"NS20210320000013","parentNetworkStructure":{"__trantorExtendFields":{},"id":102012},"parentWarehouse":{"__trantorExtendFields":{},"channel":{"__trantorExtendFields":{},"id":1},"channelType":"OFFLINE","companyEntity":{"__trantorExtendFields":{},"id":20},"createdAt":1577808000000,"createdBy":{"__trantorExtendFields":{},"id":1},"entity":{"__trantorExtendFields":{},"id":19},"id":1,"isVirtualSite":false,"openTime":"1614588540000","siteCode":"testSite01","siteLevel":1,"siteName":"Gaia测试店铺01","siteStatus":"ENABLED","siteType":"SHOP","updatedAt":1615884574000,"updatedBy":{"__trantorExtendFields":{},"id":1}},"requisitionWarehouse":{"__trantorExtendFields":{},"createdAt":1616221823000,"createdBy":{"__trantorExtendFields":{},"id":6001},"id":112005,"isLeaf":true,"isVirtualSite":false,"openTime":"1584684000000","siteCode":"NIKESHOP001","siteLevel":1,"siteName":"耐克体育天猫旗舰店","siteStatus":"DRAFT","siteType":"SHOP","updatedAt":1616221823000,"updatedBy":{"__trantorExtendFields":{},"id":6001}},"supplier":{"__trantorExtendFields":{},"id":20},"supplyCategory":"MINORITY","supplyWarehouse":{"__trantorExtendFields":{},"channel":{"__trantorExtendFields":{},"id":1},"channelType":"OFFLINE","companyEntity":{"__trantorExtendFields":{},"id":20},"createdAt":1577808000000,"createdBy":{"__trantorExtendFields":{},"id":1},"entity":{"__trantorExtendFields":{},"id":19},"id":1,"isVirtualSite":false,"openTime":"1614588540000","siteCode":"testSite01","siteLevel":1,"siteName":"Gaia测试店铺01","siteStatus":"ENABLED","siteType":"SHOP","updatedAt":1615884574000,"updatedBy":{"__trantorExtendFields":{},"id":1}},"updatedAt":1616234127000,"updatedBy":{"__trantorExtendFields":{},"id":1},"warehouse":{"__trantorExtendFields":{},"createdAt":1616221823000,"createdBy":{"__trantorExtendFields":{},"id":6001},"id":112005,"isLeaf":true,"isVirtualSite":false,"openTime":"1584684000000","siteCode":"NIKESHOP001","siteLevel":1,"siteName":"耐克体育天猫旗舰店","siteStatus":"DRAFT","siteType":"SHOP","updatedAt":1616221823000,"updatedBy":{"__trantorExtendFields":{},"id":6001}}}],"requisitionWarehouse":{"__trantorExtendFields":{},"channel":{"__trantorExtendFields":{},"id":1},"channelType":"OFFLINE","companyEntity":{"__trantorExtendFields":{},"id":20},"createdAt":1577808000000,"createdBy":{"__trantorExtendFields":{},"id":1},"entity":{"__trantorExtendFields":{},"id":19},"id":1,"isVirtualSite":false,"openTime":"1614588540000","siteCode":"testSite01","siteLevel":1,"siteName":"Gaia测试店铺01","siteStatus":"ENABLED","siteType":"SHOP","updatedAt":1615884574000,"updatedBy":{"__trantorExtendFields":{},"id":1}},"supplier":{"__trantorExtendFields":{},"id":20},"supplyCategory":"MINORITY","supplyNetworkStructureBOList":[{"__trantorExtendFields":{"$ref":"$.res.\\_\\_trantorExtendFields"},"createdAt":1616232995000,"createdBy":{"$ref":"$.res.createdBy"},"id":102012,"isTerminus":"NO","level":2,"networkStructureCode":"NS20210320000010","parentNetworkStructure":{"$ref":"$.res.parentNetworkStructure"},"parentWarehouse":{"$ref":"$.res.parentWarehouse"},"requisitionWarehouse":{"__trantorExtendFields":{},"channel":{"__trantorExtendFields":{},"id":1},"channelType":"OFFLINE","companyEntity":{"__trantorExtendFields":{},"id":20},"createdAt":1577808000000,"createdBy":{"__trantorExtendFields":{},"id":1},"entity":{"__trantorExtendFields":{},"id":19},"id":1,"isVirtualSite":false,"openTime":"1614588540000","siteCode":"testSite01","siteLevel":1,"siteName":"Gaia测试店铺01","siteStatus":"ENABLED","siteType":"SHOP","updatedAt":1615884574000,"updatedBy":{"__trantorExtendFields":{},"id":1}},"supplier":{"$ref":"$.res.supplier"},"supplyCategory":"MINORITY","supplyWarehouse":{"__trantorExtendFields":{},"companyEntity":{"__trantorExtendFields":{},"id":20},"createdAt":1577808000000,"createdBy":{"__trantorExtendFields":{},"id":1},"entity":{"__trantorExtendFields":{},"id":19},"id":3,"isVirtualSite":false,"openTime":"1577808000000","siteCode":"testFrontSourcing","siteLevel":1,"siteName":"交易寻源测试仓","siteStatus":"ENABLED","siteType":"SHOP","updatedAt":1614935792000,"updatedBy":{"__trantorExtendFields":{},"id":1}},"updatedAt":1616234127000,"updatedBy":{"__trantorExtendFields":{},"id":1},"warehouse":{"$ref":"$.res.requisitionWarehouse"}}],"supplyWarehouse":{"$ref":"$.res.parentWarehouse"},"updatedAt":1616234127000,"updatedBy":{"$ref":"$.res.supplyNetworkStructureBOList[0].updatedBy"},"warehouse":{"$ref":"$.res.requisitionWarehouse"}},"success":true}';
  const obj = fjson.parse(jsonStr);
  t.is(obj.code, 200);
})
