const core = require("@actions/core");
const github = require("@actions/github");
const exec = require("@actions/exec");

const executeCommands = async () => {
  try {
    core.notice("Start action");
    
    await exec.exec("ls");
    await exec.exec("pwd");

  } catch (error) {
    core.setFailed(error.message)
  }
};

const main = async () => {
  try {
    await executeCommands();
  } catch (error) {
    core.setFailed(error.message);
  }
};

main();
