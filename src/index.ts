"use strict";

const {NetworkTables, NetworkTablesTypeInfos} = require('ntcore-ts-client');

function log(name: string, value: string): void {
    console.log(name + ": " + value)
}

log("NetworkTables", NetworkTables.toString());

const INSTANCE = NetworkTables.getInstanceByURI("127.0.0.1", 5810);

log("instance", INSTANCE.toString());

const testTopic = INSTANCE.createTopic<number>("/AdvantageKit/RealOutputs/RANDOM", NetworkTablesTypeInfos.kDouble);

log("testTopic", testTopic.toString());

testTopic.subscribe((value) => {
    console.log(`Got Test Value: ${value}`);
});
