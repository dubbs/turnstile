/*global console */
/*jslint indent:2, nomen: true */
(function (window, machina) {
  'use strict';
  var turnstile = new machina.Fsm({
    initialState: "locked",
    states: {
      "locked": {
        _onEnter: function () {
          console.log('Currently locked, try entering a coin.');
        },
        "coin": function () {
          console.log('You entered a coin, unlocking...');
          this.transition("unlocked");
        },
        "push": function () {
          console.log('You can\'t open without entering a coin first.');
        }
      },
      "unlocked": {
        _onEnter: function () {
          console.log('Currently unlocked, push me!');
        },
        "coin": function () {
          console.log('You entered a coin when already unlocked, try pushing.');
        },
        "push": function () {
          console.log('You pushed and walked through, have a nice day, locking for next person.');
          this.transition("locked");
        }
      }
    }
  });

  // currently locked
  turnstile.handle("push");
  turnstile.handle("coin");
  turnstile.handle("push");

}(this, this.machina));
