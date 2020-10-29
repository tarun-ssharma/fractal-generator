var len=200
var currentGenLines = []
var nextGenLines = []

function setup() {
  createCanvas(600, 600);
  nextGenLines = nextGenLines.concat([[width/2, height/2, width/2 + len, height/2]])
}

function draw() {
  background(220);
  // noFill() makes sure intersecting borders get drawn
  noFill()
  stroke('red')
  noLoop()
  //drawSerpinski(width/2, height/2, 200)
}

function mouseClicked(){
  //TODO: Failing for third and 4th quadrant vectors -- probably sdomething to do with angles 
  background(220);
  drawCurrentGenKochCurve()
  updatecurrentGenLines()
}

//serpinski triangle
function drawSerpinski(x,y,d){
  if(d<=1)
    return
  circle(x,y,d)
  drawSerpinski(x-d/2, y, d/2)
  drawSerpinski(x+d/2,y,d/2)
  drawSerpinski(x,y+d/2,d/2)
}

// Cantor set
function drawCantorSet(x,y, len){
  if(len <= 1)
    return
  line(x,y,x+len,y)
  drawCantorSet(x, y+10, len/3)
  drawCantorSet(x+2*len/3, y+10, len/3)
}

// Koch curve
function updatecurrentGenLines(){
  currentGenLines = nextGenLines
  nextGenLines = []
  currentGenLines.forEach(divideTheLine)
}

function divideTheLine(l){
  [x1, y1, x2, y2] = l;
  if(len<1)
    return
  
  //compute vectors here
  vec = createVector(x2-x1, y2-y1)
  vec.div(3)
  vec_copy = vec.copy()
  pt1 = [x1,y1]
  pt2 = pt1.map((a, i) => a + vec.array()[i]);
  vec.rotate(PI/3);
  pt3 = pt2.map((a, i) => a + vec.array()[i]);
  pt4 = pt2.map((a, i) => a + vec_copy.array()[i]);
  pt5 = [x2, y2]
  line1 = [].concat(pt1).concat(pt2)
  line2 = [].concat(pt2).concat(pt3)
  line3 = [].concat(pt3).concat(pt4)
  line4 = [].concat(pt4).concat(pt5)

  nextGenLines = nextGenLines.concat([line1, line2, line3, line4])
}

function drawCurrentGenKochCurve(){
  console.log(currentGenLines)
  currentGenLines.forEach(drawLine)
}

function drawLine(entry){
  [x1, y1, x2, y2] = entry
  line(x1, y1, x2, y2)
}

//TODO
function drawBranchingTree(){
  //https://www.youtube.com/watch?v=RWAcbV4X7C8
}
