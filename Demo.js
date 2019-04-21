let a;
let b;
let c;

function setup() {
  createCanvas(400, 400);
}

function createApp() {

  a = uxElement('rect', 50, 50, 50, 30);
  b = uxElement('ellipse', 300, 300, 100, 150);
  c = uxElement('triangle', 100, 100, 150, 100, 125, 150);

  a.inp('hover', triggered);


}

function draw() {
  background(200);

}

function triggered() {
  a.uxFill = [100, 200, 300];
}
