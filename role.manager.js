var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepair = require('role.repair');

var roleManager = {

    /** @param {Creep} creep **/
    run: function(Game) {
    
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');   
        var repairs = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair');
        
        console.log('Harvesters: ' + harvesters.length + ' Upgraders: ' + upgraders.length + ' Builders: ' + builders.length + ' Repairs: ' + repairs.length);
        
        if(harvesters.length < 10) {
            var newName = Game.spawns['Spawn1'].createCreep(roleHarvester.getBodyParts(), 'Ha'+(Game.time-13610000), {role: 'harvester'});
        }
        else if(upgraders.length<8) {
            var newName = Game.spawns['Spawn1'].createCreep(roleUpgrader.getBodyParts(), 'Up'+(Game.time-13610000), {role: 'upgrader'});
        }
        else if(builders.length < 2) {
            var newName = Game.spawns['Spawn1'].createCreep(roleBuilder.getBodyParts(), 'Bu'+(Game.time-13610000), {role: 'builder'});
        }
        else if(repairs.length < 1) {
            var newName = Game.spawns['Spawn1'].createCreep(roleBuilder.getBodyParts(), 'Re'+(Game.time-13610000), {role: 'repair'});
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
};

module.exports = roleManager;