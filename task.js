let cols, rows;
let scl = 20;
let w = 1400;
let h = 1400;
let v = 700;
let n = 100;
let p = 1000;
let o = 0;
let k = 0;
let flying = 0;
let q = 0;
let terrain = [];

function setup() {
  createCanvas(800, 800, WEBGL);
  checkbox = createCheckbox();
  checkbox.position(0, 800);
  cols = w / scl;
  rows = h / scl;

  for (let x = 0; x < cols; x++) {
    terrain[x] = [];
    for (let y = 0; y < rows; y++) {
      terrain[x][y] = 0; 
    }
  }
  noStroke();
}

function draw() {
  orbitControl();
  pointLight(255,255,0,300,-300,100);
  let locX = mouseX - width / 2;            
  let locY = mouseY - height / 2;           
  if (checkbox.checked()){                                     
  directionalLight(40,40,255,-400,1500,-1000);  
  }
  specularMaterial(30);
  flying -= 0.1;
  let yoff = flying;
  for (let y = 0; y < rows; y++) {
    var xoff = 0;
    for (let x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.2;
    }
    yoff += 0.2;
  }
  background(0, 20, 60);
  rotateX(PI / 3);
  fill(10, 50, 100, 180); 
  translate(-w / 2, -h / 2);
  for (var y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }
  moon(500,-600,150,0,1);
  flight(v,p,n,o,0.5,q);
}
function moon(x,y,z,r,s){
  push();
  translate(x, y, z);
  rotate(r);
  scale(s);
  translate(w / 2, h / 5);
  rotate(PI / 5);
  emissiveMaterial(140,100,0);
  sphere(50); 
  pop();
} 
function flight(x,y,z,r,s,rz){
  translate(v,p,n);
  rotate(r);
  scale(s);
  k=PI/2;
  rotateY(k);
  rotateZ(HALF_PI+PI);
  rotateZ(rz);
  fill(200);
  ambientLight(250);
  push();
  translate(-200,-200,0);
  ellipsoid(150,50,50);
  pop();
  
  push();
  translate(-190,-150);
  box(20,10,10);
  pop();
  
  push();
  translate(-310,-170);
  box(50,30,3);
  translate(0,-60);
  box(50,30,3);
  translate(0,30,-30);
  box(50,3,30);
  translate(0,0,60);
  box(50,3,30);
  pop();
  if (keyIsDown(LEFT_ARROW)) {
    v -= 2;
    o+=-PI/1000;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    v += 2;
    o+=PI/1000;
  }
  if (keyIsDown(CONTROL)) {
    n -= 2;
    q+=PI/1000;
  }
  if (keyIsDown(SHIFT)) {
    n += 2;
    q+=-PI/1000;
  }
  if (keyIsDown(DOWN_ARROW)) {
    p += 2;
  }
  if (keyIsDown(UP_ARROW)) {
    p -= 2;
  } 
}
