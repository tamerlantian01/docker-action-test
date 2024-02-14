const core = require("@actions/core");
const github = require("@actions/github");
const exec = require("@actions/exec");

const executeCommands = async () => {
  core.notice("Start action flow");

  await exec.exec('ls');
  await exec.exec('pwd');
};

const main = async () => {
  try {
    await executeCommands();
  } catch (error) {
    core.setFailed(error.message);
  }
};

main();
