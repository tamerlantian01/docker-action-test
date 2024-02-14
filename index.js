const core = require("@actions/core");
const github = require("@actions/github");
const exec = require("@actions/exec");

const executeCommands = async () => {
  await exec.exec('npm install');
  await exec.exec('ls');
  await exec.exec('pwd');

  core.notice("Start action");
};

const main = async () => {
  try {
    await executeCommands();
  } catch (error) {
    core.setFailed(error.message);
  }
};

main();
