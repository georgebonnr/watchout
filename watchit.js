// watchit.js

var getRandom = function (min, max) {
  return Math.random() * (max - min) + min;
};

var Enemy = function (x,y) {
  var enemy = {};
  enemy.x = x;
  enemy.y = y;
  enemy.move = function() {
    this.x = getRandom(10,490);
    this.y = getRandom(10,490);
  };
  return enemy;
};

var Hero = function () {
  var hero = {};
  hero.x = 250;
  hero.y = 250;
  return hero;
}

var hero = Hero();

var enemies = [];
var heroes = [hero];

for (var i=0; i<15; i++) {
  enemies.push(Enemy(getRandom(10,490),getRandom(10,490)));
}

var getX = function(d) {
  return d.x;
};

var getY = function(d) {
  return d.y;
};

// var svgContainer = d3.select(".board").append("svg").attr("width", 500).attr("height", 500).style("background-color", "black");

// var addEnemies = svgContainer.append("circle").attr("cx", 30).attr("cy", 30).attr("r", 5).attr("fill", "red");
var board = d3.select("svg");
board.selectAll("rect").data(heroes).enter().append("rect").attr("x",getX).attr("y",getY).attr("height",12).attr("width",12).attr("fill", "white");
var addEnemies = board.selectAll("circle").data(enemies).enter().append("circle").attr("cx", getX).attr("cy", getY).attr("r", 5).attr("fill", "red");

var beginMove = function() {
  setInterval(function() {
    d3.selectAll("circle").each(function(d){d.move();}).transition().attr("cx",getX).attr("cy",getY).duration(getRandom(500,2000));
  }, getRandom(1800,2400));
};
beginMove();