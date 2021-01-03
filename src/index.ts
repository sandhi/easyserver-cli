#!/usr/bin/env node

var pkg = require("../package.json");
var inquirer = require("inquirer");
import { program } from "commander";

import * as nginx_service from "./nginx_service";

type PACKAGE_TYPE = "install nginx on ubuntu 20.04";

const package_list: PACKAGE_TYPE[] = ["install nginx on ubuntu 20.04"];

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
            case "install nginx on ubuntu 20.04":
                nginx_service.init();
                break;
            default:
                console.log("salah pilih");
                break;
        }
    });
