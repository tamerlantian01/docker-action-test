const core = require("@actions/core");
const fetch = require("node-fetch");
const { exec } = require("@actions/exec");
const { promises: fs } = require("fs");

/**
 * Executes a list of commands.
 * @param {Array<{ cmd: string, args?: string[] }>} commands - List of commands to execute.
 * @returns {Promise<void>} - A Promise that resolves when all commands have been executed.
 */
const executeCommands = async (commands) => {
  try {
    for (const { cmd, ...args } of commands) {
      await exec(cmd, null, args);
    }
  } catch (error) {
    core.setFailed(`Error executing commands: ${error.message}`);
  }
};

/**
 * Fetches user story data and executes associated actions.
 * @param {string} baseUrl - The base URL of the API.
 * @returns {Promise<void>} - A Promise that resolves when actions have been executed.
 */
const executeActions = async (baseUrl) => {
  try {
    let errorMessage = "";
    const userId = await fs.readFile(".userid", "utf8");
    const response = await fetch(
      `${baseUrl}/api/user-story/user-id?search=${userId}`
    );

    if (!response.ok) {
      errorMessage = `Failed to fetch user story data. Status: ${response.status}`;
      core.setFailed(errorMessage);
      throw new Error(errorMessage);
    }

    const { result } = await response.json();
    const story = result?.[0]?.story;

    if (!story?.commands) {
      errorMessage = "Invalid or missing user story data.";
      core.setFailed(errorMessage);
      throw new Error(errorMessage);
    }

    await executeCommands(story.commands);
  } catch (error) {
    core.setFailed(`Error executing actions: ${error.message}`);
  }
};

/**
 * Main entry point of the program.
 * @returns {Promise<void>} - A Promise that resolves when execution is complete.
 */
const main = async () => {
  try {
    const baseUrl = core.getInput('base-url');
    await executeActions(baseUrl);
  } catch (error) {
    core.setFailed(error.message);
  }
};

main();
