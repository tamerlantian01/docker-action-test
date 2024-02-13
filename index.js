const core = require("@actions/core");
const github = require("@actions/github");

const main = () => {
  try {
    core.notice("Custom action is working");
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed(error.message)
  }
};

main();
