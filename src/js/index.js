"use strict";
var _a = require('ntcore-ts-client'), NetworkTables = _a.NetworkTables, NetworkTablesTypeInfos = _a.NetworkTablesTypeInfos;
var connection = {
    statusIndicator: document.getElementById("status-indicator"),
    retries: 0,
};
var Watcher = /** @class */ (function () {
    function Watcher(name) {
        this.ele = null;
        this.name = null;
        this.name = name;
    }
    Watcher.prototype.getEle = function () {
        if (this.ele) {
            return this.ele;
        }
        this.ele = document.createElement("p");
        document.body.appendChild(this.ele);
        return this.ele;
    };
    Watcher.prototype.update = function (value) {
        if (value !== null) {
            this.getEle().innerText = this.name + ": " + value;
        }
        else {
            this.getEle().innerHTML = "<s>" + this.name + "</s>";
        }
    };
    return Watcher;
}());
var watchers = [
    new Watcher("/AdvantageKit/RealOutputs/RANDOM"),
    new Watcher("/AdvantageKit/RealOutputs/NOTREAL")
];
function log(name, value) {
    console.log(name + ": " + value);
}
log("NetworkTables", NetworkTables.toString());
var INSTANCE = NetworkTables.getInstanceByURI("127.0.0.1", 5810);
INSTANCE.addRobotConnectionListener(function (status) {
    if (status) {
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
}, true);
log("instance", INSTANCE.toString());
var _loop_1 = function (i) {
    var topic = INSTANCE.createTopic(watchers[i].name, NetworkTablesTypeInfos.kDouble);
    topic.subscribe(function (value) {
        watchers[i].update(value);
    }, true);
};
for (var i = 0; i < watchers.length; i++) {
    _loop_1(i);
}
//# sourceMappingURL=index.js.map