var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepair = require('role.repair');

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');   
    var repairs = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair');

    console.log('Harvesters: ' + harvesters.length + ' Upgraders: ' + upgraders.length + ' Builders: ' + builders.length + ' Repairs: ' + repairs.length);

    if(harvesters.length < 15) {
        var newName = Game.spawns['Spawn1'].createCreep(roleHarvester.getBodyParts(), 'Ha'+Game.time, {role: 'harvester'});
    }
    else if(upgraders.length<4) {
        var newName = Game.spawns['Spawn1'].createCreep(roleUpgrader.getBodyParts(), 'Up'+Game.time, {role: 'upgrader'});
    }
    else if(builders.length < 2) {
        var newName = Game.spawns['Spawn1'].createCreep(roleBuilder.getBodyParts(), 'B'+Game.time, {role: 'builder'});
    }
    else if(repairs.length < 1) {
        var newName = Game.spawns['Spawn1'].createCreep(roleBuilder.getBodyParts(), 'R'+Game.time, {role: 'repair'});
    }
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(!creep.memory.role){
            creep.memory.role='harvester';
        roleHarvester.run(creep);
        }
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
          roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repair') {
            roleRepair.run(creep);
        }
    }
}