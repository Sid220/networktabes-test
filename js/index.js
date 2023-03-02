"use strict";
var _a = require('ntcore-ts-client'), NetworkTables = _a.NetworkTables, NetworkTablesTypeInfos = _a.NetworkTablesTypeInfos;
function log(name, value) {
    console.log(name + ": " + value);
}
log("NetworkTables", NetworkTables.toString());
var INSTANCE = NetworkTables.getInstanceByURI("127.0.0.1", 5810);
log("instance", INSTANCE.toString());
var testTopic = INSTANCE.createTopic("/AdvantageKit/RealOutputs/RANDOM", NetworkTablesTypeInfos.kDouble);
log("testTopic", testTopic.toString());
testTopic.subscribe(function (value) {
    console.log("Got Test Value: ".concat(value));
});
//# sourceMappingURL=index.js.map