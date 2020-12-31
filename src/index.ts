#!/usr/bin/env node

var pkg = require("../package.json");
var inquirer = require("inquirer");
import { program } from "commander";

type PACKAGE_TYPE = "ionic3" | "ionic4" | "loopback4" | "reactapp";

const package_list: PACKAGE_TYPE[] = ["ionic3", "ionic4", "loopback4", "reactapp"];

program.version(pkg.version, "-v, --version", "show cli version");
program.parse(process.argv);

inquirer
    .prompt([
        {
            type: "list",
            name: "project",
            message: "apa yang ingin anda lakukan ?",
            choices: package_list,
        },
    ])
    .then((res: { project: PACKAGE_TYPE }) => {
        switch (res.project) {
            case "ionic3":
                break;
            case "ionic4":
                break;
            case "loopback4":
                break;
            case "reactapp":
                break;
            default:
                console.log("salah pilih");
                break;
        }
    });
