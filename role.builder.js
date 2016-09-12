var roleRepair = require('role.repair');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('building');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                 if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
                //if(creep.build(creep.pos.findClosestByPath(targets)) == ERR_NOT_IN_RANGE) {
                //    creep.moveTo(creep.pos.findClosestByPath(targets));
                //}
            }
            else
            {
                roleRepair.run(creep);
            }
	    }
        else {
            
            var sources = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN) && structure.energy == structure.energyCapacity;
                    }
            });
           if (sources.length){
               if(creep.withdraw(creep.pos.findClosestByPath(sources),RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                   creep.moveTo(creep.pos.findClosestByPath(sources));
               }
           }
           else {
                var sources = creep.room.find(FIND_SOURCES);
               
                if(creep.harvest(creep.pos.findClosestByPath(sources)) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.pos.findClosestByPath(sources));
                }
           }
	    }
	},
    getBodyParts: function() {
      return [WORK,WORK,CARRY,CARRY,MOVE,MOVE];
    }
};

module.exports = roleBuilder;