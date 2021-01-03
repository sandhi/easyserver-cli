import execa from "execa";
import inquirer from "inquirer";
import program from "commander";
import chalk from "chalk";
import ora from "ora";
const listr = require("listr");
import { Observable } from "rxjs";

export function init() {
    do_apt_update();
}

async function do_apt_update() {
    let task = new listr([
        {
            title: "update apt",
            task: () => {
                return new Observable((observable) => {
                    try {
                        let apt_update = execa("sudo", ["apt", "update"]);

                        apt_update.on("data", (data) => {
                            observable.next(chalk.greenBright(data.toString()));
                        });

                        apt_update.on("exit", () => {
                            observable.complete();
                        });
                    } catch (e) {
                        observable.error(chalk.red(e.toString()));
                    }
                });
            },
        },
    ]);

    await task.run();
}
