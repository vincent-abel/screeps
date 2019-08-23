var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if (creep.carry.energy==0) { creep.memory.harvest=true;}
            if (creep.carry.energy == creep.carryCapacity) { creep.memory.harvest = false;}

	    if(creep.memory.harvest) {
	            var sources = creep.room.find(FIND_SOURCES_ACTIVE);
	            if(creep.harvest(creep.pos.findClosestByPath(sources)) == ERR_NOT_IN_RANGE) {
	                creep.moveTo(creep.pos.findClosestByPath(sources));
		    }
	    }
            else {
	        var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER ||
				structure.structureType == STRUCTURE_STORAGE ||
                                structure.structureType == STRUCTURE_CONTAINER) && (structure.energy < structure.energyCapacity || structure.store < structure.storeCapacity) ;
                    }
		    });
		if(targets.length > 0) {
            
                if(creep.transfer(creep.pos.findClosestByPath(targets), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
			creep.moveTo(creep.pos.findClosestByPath(targets));
                }
		else {creep.memory.harvest=true;}
                }
	    }
	},
        getBodyParts: function() {
		return [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE];
	}
};

module.exports = roleHarvester;
