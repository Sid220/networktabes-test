"use strict";

const {NetworkTables, NetworkTablesTypeInfos} = require('ntcore-ts-client');

const connection = {
    statusIndicator: document.getElementById("status-indicator"),
    retries: 0,
};

class Watcher<T> {
    private ele: HTMLElement = null;
    public readonly name: string = null;

    constructor(name: string) {
        this.name = name
    }


    getEle(): HTMLElement {
        if(this.ele) {
            return this.ele;
        }
        this.ele = document.createElement("p");
        document.body.appendChild(this.ele);
        return this.ele;
    }

    update(value: T): void {
        if(value !== null) {
            this.getEle().innerText = this.name + ": " + value;
        }
        else {
            this.getEle().innerHTML = "<s>" + this.name + "</s>"
        }
    }
}

const watchers = [
    new Watcher<number>("/AdvantageKit/RealOutputs/RANDOM"),
    new Watcher<number>("/AdvantageKit/RealOutputs/NOTREAL")
];

function log(name: string, value: string): void {
    console.log(name + ": " + value)
}

log("NetworkTables", NetworkTables.toString());

const INSTANCE = NetworkTables.getInstanceByURI("127.0.0.1", 5810);

INSTANCE.addRobotConnectionListener((status: boolean): void => {
    if(status) {
        connection.retries = 0;
        connection.statusIndicator.classList.remove("bad");
        connection.statusIndicator.classList.add("good");
        connection.statusIndicator.innerText = "Connected";
    }
    else {
        connection.statusIndicator.classList.remove("good");
        connection.statusIndicator.classList.add("bad");
        connection.statusIndicator.innerText = "Cannot connect, retrying" + (connection.retries++ > 1 ? " (" + connection.retries + ")" : "...");
    }
}, true)

log("instance", INSTANCE.toString());

for(let i: number = 0; i < watchers.length; i++) {
    const topic = INSTANCE.createTopic<number>(watchers[i].name, NetworkTablesTypeInfos.kDouble);
    topic.subscribe((value) => {
        watchers[i].update(value);
    }, true)
}
