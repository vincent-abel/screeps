var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepair = require('role.repair');

var roleManager = {

    /** @param {Creep} creep **/
    run: function(Game) {
        for(var room_it in Game.rooms) {
            var my_room = Game.rooms[room_it];
            break;
        }
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');   
        var repairs = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair');
        
        console.log('Harvesters: ' + harvesters.length + ' Upgraders: ' + upgraders.length + ' Builders: ' + builders.length + ' Repairs: ' + repairs.length);
        
        if(harvesters.length < 10) {
            var newName = Game.spawns['Spawn1'].createCreep(roleManager.getBodyParts(my_room), 'Ha'+(Game.time-13610000), {role: 'harvester'});
        }
        else if(upgraders.length<8) {
            var newName = Game.spawns['Spawn1'].createCreep(roleManager.getBodyParts(my_room), 'Up'+(Game.time-13610000), {role: 'upgrader'});
        }
        else if(builders.length < 2) {
            var newName = Game.spawns['Spawn1'].createCreep(roleManager.getBodyParts(my_room), 'Bu'+(Game.time-13610000), {role: 'builder'});
        }
        else if(repairs.length < 1) {
            var newName = Game.spawns['Spawn1'].createCreep(roleManager.getBodyParts(my_room), 'Re'+(Game.time-13610000), {role: 'repair'});
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
    },
    getBodyParts: function(myroom){
        var en=myroom.energyCapacityAvailable;
        if (en<=300){
             return [WORK,CARRY,MOVE];
        }
        else if (en<400)
        {
            return [WORK,WORK,CARRY,MOVE];
        }
        else if (en<500)
        {
            return [WORK,WORK,CARRY,CARRY,MOVE,MOVE];
        }
        else if (en<600)
        {
            return [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE];
        }
        else if (en<700)
        {
            return [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE];
        }
        else if (en<800)
        {
            return [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
        }
    }
};

module.exports = roleManager;