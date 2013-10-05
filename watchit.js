// watchit.js
var tweening = false;

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
};

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
var main = board.selectAll("rect").data(heroes).enter().append("rect").attr("x",getX).attr("y",getY).attr("height",12).attr("width",12).attr("fill", "white");
board.on("mousemove",function(e){
  main.attr("x",function(){
    return d3.mouse(this)[0]-5;
  });
  main.attr("y",function(){
    return d3.mouse(this)[1]-6;
  });
  if (!tweening) { addEnemies.each(function(d) { checkStaticCollision(d, blah);}); }
  // addEnemies.each(function(d) { if ( ((d.x > main.attr("x")-2) && (d.x < main.attr("x")+2)) && ((d.y > main.attr("y")-2) && (d.y < main.attr("y")+2)) ) { alert('dead'); } });
  // addEnemies.each(function(d) { if ( ((this.getAttribute("cx") > main.attr("x")-5) && (this.getAttribute("cx") < main.attr("x")+5)) && ((this.getAttribute("cy") > main.attr("y")-5) && (this.getAttribute("cy") < main.attr("y")+5)) ) { alert('dead'); } });
  //addEnemies.each(function(d) { if ( ((this.getAttribute("cx") > d3.mouse(this)[0]-10) && (this.getAttribute("cx") < d3.mouse(this)[0]+10)) && ((this.getAttribute("cy") > d3.mouse(this)[1]-10) && (this.getAttribute("cy") < d3.mouse(this)[1]+10)) ) { alert('dead'); } });
  // addEnemies.each(function(d) { console.log(d3.mouse(this)[0]);  console.log(this.getAttribute("cx"))})
    // if ((d.x)  === main.x && d.y === main.y) { alert("You accidently the enemy.");} });
});
var addEnemies = board.selectAll("circle").data(enemies).enter().append("circle").attr("cx", getX).attr("cy", getY).attr("r", 5).attr("fill", "red");

var checkStaticCollision = function(enemy, collidedCallback) {
  var radiusSum =  15;
  var xDiff = enemy.x - parseFloat(main.attr("x"));
  var yDiff = enemy.y - parseFloat(main.attr("y"));
  var separation = Math.sqrt( Math.pow(xDiff,2) + Math.pow(yDiff,2) );
  if (separation < radiusSum) { collidedCallback(); }
};

var checkCollision = function(enemy,collidedCallback) {
  var radiusSum =  parseFloat(enemy.attr("r")) + 10;
  var xDiff = parseFloat(enemy.attr("cx")) - parseFloat(main.attr("x"));
  var yDiff = parseFloat(enemy.attr("cy")) - parseFloat(main.attr("y"));
  // if (parseFloat(main.attr("x")) === 0) { collidedCallback(); }
  // if ( (parseFloat(enemy.getAttribute("cx")) > parseFloat(main.attr("x"))-20) && (parseFloat(enemy.getAttribute("cx")) < parseFloat(main.attr("x"))+20) && ((parseFloat(enemy.getAttribute("cy")) > parseFloat(main.attr("y"))-20) && (parseFloat(enemy.getAttribute("cy")) < parseFloat(main.attr("y"))+20)) ) { collidedCallback(); }
  var separation = Math.sqrt( Math.pow(xDiff,2) + Math.pow(yDiff,2) );
  if (separation < radiusSum) { collidedCallback(); }
};

var blah = function(){ console.log("collision"); };

var beginMove = function() {
  setInterval(function() {
    d3.selectAll("circle").transition().duration(getRandom(500,2000)).tween('custom', tweenConstructor);
  }, getRandom(1800,2400));
};
beginMove();

var tweenConstructor = function(endData) {
  tweening = true;
  var enemy = d3.select(this);
  var startPos = {
    x: parseFloat(enemy.attr('cx')),
    y: parseFloat(enemy.attr('cy'))
  };
  endData.move();
  var endPos = {
    x: endData.x,
    y: endData.y
  };
  return function(t) {

    checkCollision(enemy, blah);

    enemyNextPos = {
      x: startPos.x + (endPos.x - startPos.x)*t,
      y: startPos.y + (endPos.y - startPos.y)*t
    };
    enemy.attr('cx', enemyNextPos.x).attr('cy', enemyNextPos.y);
    if (enemyNextPos.x === endPos.x && enemyNextPos.y === endPos.y) {
      tweening = false;
      enemy.datum().x = endPos.x;
      enemy.datum().y = endPos.y;
    }
  };
};


