var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepair = require('role.repair');
var roleAttacker = require('role.attack');

var roleManager = {

    /** @param {Creep} creep **/
    run: function(Game) {
        for(var room_it in Game.rooms) {
            var my_room = Game.rooms[room_it];
            break;
        }

        var my_spawn = my_room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_SPAWN}});
       //console.log(my_spawn[0].name);
        console.log(Game.spawns[my_spawn[0].name].pos);

        if (my_room.createConstructionSite(Game.spawns[my_spawn[0].name].pos.x + 3 , Game.spawns[my_spawn[0].name].pos.y + 3, STRUCTURE_EXTENSION))
        {
            if (my_room.createConstructionSite(Game.spawns[my_spawn[0].name].pos.x + 0 , Game.spawns[my_spawn[0].name].pos.y + 3, STRUCTURE_EXTENSION))
            {
               if ( my_room.createConstructionSite(Game.spawns[my_spawn[0].name].pos.x + 3 , Game.spawns[my_spawn[0].name].pos.y - 3, STRUCTURE_EXTENSION))
               {
                   if ( my_room.createConstructionSite(Game.spawns[my_spawn[0].name].pos.x + 3 , Game.spawns[my_spawn[0].name].pos.y - 0, STRUCTURE_EXTENSION))
                   {
                       if ( my_room.createConstructionSite(Game.spawns[my_spawn[0].name].pos.x - 3 , Game.spawns[my_spawn[0].name].pos.y - 3, STRUCTURE_EXTENSION))
                       {
                           if(my_room.createConstructionSite(Game.spawns[my_spawn[0].name].pos.x - 3 , Game.spawns[my_spawn[0].name].pos.y + 0, STRUCTURE_EXTENSION))
                           {
                              // my_room.createConstructionSite(Game.spawns[my_spawn[0].name].pos.x - 2 , Game.spawns[my_spawn[0].name].pos.y + 0, STRUCTURE_STORAGE);
                           }

                       }
                   }
               }
            }

        }

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var repairs = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair');
        var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');


           if(harvesters.length < 8) {
            var newName = Game.spawns['Spawn1'].createCreep(roleManager.getBodyParts(my_room), 'Ha'+(Game.time-13610000), {role: 'harvester'});
        }
        else if(upgraders.length<1) {
            var newName = Game.spawns['Spawn1'].createCreep(roleManager.getBodyParts(my_room), 'Up'+(Game.time-13610000), {role: 'upgrader'});
        }
        else if(builders.length < 5) {
            var newName = Game.spawns['Spawn1'].createCreep(roleManager.getBodyParts(my_room), 'Bu'+(Game.time-13610000), {role: 'builder'});
        }
        else if(repairs.length < 1) {
            var newName = Game.spawns['Spawn1'].createCreep(roleManager.getBodyParts(my_room), 'Re'+(Game.time-13610000), {role: 'repair'});
        }
        else if(attackers.length < 1 && (my_room.find(FIND_HOSTILE_CREEPS)).length>0) {
            var newName = Game.spawns['Spawn1'].createCreep(roleAttacker.getBodyParts(my_room), 'AT'+(Game.time-13610000), {role: 'attacker'});
        }
       //console.log("room" + my_room + " " + my_room.find(FIND_HOSTILE_CREEPS).length);
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];

        if(!creep.memory.role){
                creep.memory.role='harvester';
                roleHarvester.run(creep);
            }
            if(creep.memory.role == 'attacker') {
                roleAttacker.run(Game,creep);
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

        //console.log('Harvesters: ' + harvesters.length + ' Upgraders: ' + upgraders.length + ' Builders: ' + builders.length + ' Repairs: ' + repairs.length);

        }
    },
    getBodyParts: function(myroom){
        var en=myroom.energyCapacityAvailable;
        if (en<=300 || (_.filter(Game.creeps, (creep) => creep.memory.role == 'harvester')).length < 1){
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
            return [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
        }
        else if (en>=800)
        {
            return [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
        }
    }
};

module.exports = roleManager;
