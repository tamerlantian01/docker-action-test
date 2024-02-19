/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 885:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 378:
/***/ ((module) => {

module.exports = eval("require")("@actions/exec");


/***/ }),

/***/ 129:
/***/ ((module) => {

module.exports = eval("require")("node-fetch");


/***/ }),

/***/ 147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(885);
const fetch = __nccwpck_require__(129);
const { exec } = __nccwpck_require__(378);
const { promises: fs } = __nccwpck_require__(147);

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
    const baseUrl = core.getInput("base-url");
    await executeActions(baseUrl);
  } catch (error) {
    core.setFailed(error.message);
  }
};

main();

})();

module.exports = __webpack_exports__;
/******/ })()
;