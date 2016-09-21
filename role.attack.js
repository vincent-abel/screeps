/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.attack');
 * mod.thing == 'a thing'; // true
 */

var roleAttack = {
    run: function (myGame,creep){
        var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(target) {
            if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    },
   getBodyParts: function(myroom){
      return [TOUGH,TOUGH,ATTACK,ATTACK,ATTACK,MOVE,CARRY,MOVE,MOVE];
   }
};


module.exports = roleAttack;