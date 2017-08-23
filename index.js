var five = require("johnny-five");
var keypress = require("keypress");
var board = new five.Board();

board.on("ready", function() {
  /**
   * Motor A: PWM 11, dir 12
   * Motor B: PWM 5, dir 4
   */
   var motors = new five.Motors([
     { pins: { dir: 12, pwm: 11 }, invertPWM: true },
     { pins: { dir: 4, pwm: 5}, invertPWM: true }
   ]);

  board.repl.inject({
    motors: motors
  });

  function controller(ch, key) {
    if (key) {
      if (key.name === "space") {
           motors.stop();
      }
      if (key.name === "up") {
          motors.forward(255);
      }
      if (key.name === "down") {
         motors.reverse(255);
      }
      if (key.name === "right") {
        motors[0].reverse(200);
        motors[1].forward(200);
      }
      if (key.name === "left") {
        motors[0].forward(200);
        motors[1].reverse(200);
      }

      commands = [].slice.call(arguments);
    } else {
      if (ch >= 1 && ch <= 9) {
        speed = five.Fn.scale(ch, 1, 9, 0, 255);
        controller.apply(null, commands);
      }
    }
  }

  keypress(process.stdin);

  process.stdin.on("keypress", controller);
  process.stdin.setRawMode(true);
  process.stdin.resume();
});
