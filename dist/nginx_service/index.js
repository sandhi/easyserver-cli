"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const execa_1 = __importDefault(require("execa"));
const chalk_1 = __importDefault(require("chalk"));
const listr = require("listr");
const rxjs_1 = require("rxjs");
function init() {
    do_apt_update();
}
exports.init = init;
async function do_apt_update() {
    let task = new listr([
        {
            title: "update apt",
            task: () => {
                return new rxjs_1.Observable((observable) => {
                    try {
                        let apt_update = execa_1.default("sudo", ["apt", "update"]);
                        apt_update.on("data", (data) => {
                            observable.next(chalk_1.default.greenBright(data.toString()));
                        });
                        apt_update.on("exit", () => {
                            observable.complete();
                        });
                    }
                    catch (e) {
                        observable.error(chalk_1.default.red(e.toString()));
                    }
                });
            },
        },
    ]);
    await task.run();
}
