window.requestAnimFrame = (function(callback) {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

var radius = 500

function Target() {
  var incr = 0.9;
  this.x = 0;
  this.y = 0;
  this.rotate = 0;
  this.radius = radius;
  this.rotate_speed = 0.001 * 0.1 + 0.001;
  this.friction = 0.01 * 0.8 + 0.1;
  this.speed = 0.01 * 0.2 + 0.03;
  this.step = 5 * 0.5 + 0.0001;

  this.freq = 0.0001 * 0.09 + 0.01;
  this.bold_rate = 1 * 0.3 + 0.1;
}

function VPoint(x, y) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.target = null;
}

var canvas = document.getElementById("dots");

var w = 100;
var h = 100;

var _targets;
var _pts = [];

var _pre_sec = 0;

var ctx = canvas.getContext("2d");
ctx.fillStyle = "rgba(255, 0, 0, 255)";
ctx.fillRect(0, 0, w, h);

for (var i = 0; i < 5000; i++) {
  var pt = new VPoint(
    Math.random(1) * window.innerWidth,
    Math.random(1) * window.innerHeight
  );
  _pts.push(pt);
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas, false);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  w = canvas.width;
  h = canvas.height;
  refreshTarget();
}
var t;



if (gui) {
  gui.destroy();
}
var gui = new dat.GUI();
gui.add(t, "rotate_speed", -0.1, 0.1).onChange(function(value) {
  t.rotate_speed = value * 0.1 + 0.001;
});

gui.add(t, "friction", -0.5, 0.5).onChange(function(value) {
  t.friction = value * 0.8 + 0.1;
});

gui.add(t, "step", -40, 40).onChange(function(value) {
  t.step = value * 0.5 + 0.0001;
});

gui.add(t, "freq", -1000, 1000).onChange(function(value) {
  t.freq = value * 0.5 + 0.0001;
});

gui.add(t, "bold_rate", -2, 2).onChange(function(value) {
  t.bold_rate = value * 0.5 + 0.0001;
});

gui.add(t, "radius", 0, 3000).onChange(function(value) {
  t.radius = value;
});

gui.add(t, "x", 0, 10000).onChange(function(value) {
  t.x = value;
});

gui.add(t, "y", 0, 10000).onChange(function(value) {
  t.y = value;
});

function refreshTarget() {
  _targets = [];
  t = new Target();

  t.x = w / 2;
  t.y = h / 2;
  _targets.push(t);

  var l = _pts.length;
  for (i = 0; i < l; i++) {
    _pts[i].target = _targets[i % _targets.length];
  }
}

function update() {
  var i = 0;
  var l = _targets.length;
  var t;
  var pt;

  for (i = 0; i < l; i++) {
    t = _targets[i];
    t.rotate += t.rotate_speed;
  }

  l = _pts.length;

  ctx.fillStyle = "rgba(0,0, 0, 255)";
  ctx.fillRect(0, 0, w * 2, h * 2);

  for (i = 0; i < l; i++) {
    pt = _pts[i];
    t = pt.target;
    var t_radius =
      Math.cos(t.rotate * 2.321 + t.freq * i) * t.radius * t.bold_rate +
      t.radius;
    var tx = t.x + Math.cos(t.rotate + t.step * i) * t_radius;
    var ty = t.y + Math.sin(t.rotate + t.step * i) * t_radius;

    pt.vx += (tx - pt.x) * t.speed;
    pt.vy += (ty - pt.y) * t.speed;

    pt.x += pt.vx;
    pt.y += pt.vy;

    pt.vx *= t.friction;
    pt.vy *= t.friction;

    if (pt.x >= 0 && pt.x <= w && pt.y >= 0 && pt.y <= h) {
      ctx.fillStyle = "rgb(255, 255, 255)";
      ctx.fillRect(pt.x, pt.y, 1.3, 1.3);
    }
  }
  requestAnimFrame(update);
}

update();
