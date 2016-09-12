var roleManager = {

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
                
                if(creep.build(creep.pos.findClosestByPath(targets)) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.pos.findClosestByPath(targets));
                }
            }
	    }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(creep.pos.findClosestByPath(sources)) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.pos.findClosestByPath(sources));
            }
	    }
	}
};

module.exports = roleManager;