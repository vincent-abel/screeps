/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.attack');
 * mod.thing == 'a thing'; // true
 */

var roleAttack = {
    run: function (myGame){
        var attacker = myGame.creeps.Attacker1;
    var enemies= attacker.room.find(myGame.HOSTILE_CREEPS);
    attacker.moveTo(enemies[0]);
    attacker.attack(enemies[0]);
    },
   getBodyParts: function(myroom){
      return [TOUGH,TOUGH,ATTACK,ATTACK,ATTACK,MOVE,CARRY,MOVE,MOVE];
   }
};


module.exports = roleAttack;