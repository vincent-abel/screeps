var roleManager = require('role.manager');
var toolsmain = require('tools.main');

module.exports.loop = function () {
    toolsmain.cleanmem(Game,Memory);
    roleManager.run(Game);
}