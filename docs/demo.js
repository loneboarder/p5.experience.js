let s1;
let s2;
let s3;

let lock1 = false;
let lock2 = false;


function setup() {
  var thisCanvas = createCanvas(600, 100);
  thisCanvas.parent('Canvas');

  uxNoStroke();

  uxFill('#5DC6B2');
  s1 = uxRect(140, 10, 80, 80);
  s1.uxEvent('click', trigger1);

  uxFill('#C69E5D');
  s2 = uxTriangle(260, 90, 300, 10, 340, 90);
  s2.uxEvent('press', trigger2);


  uxFill('#C65D5D');
  s3 = uxEllipse(420, 50, 80, 80);
  s3.uxEvent('hover', trigger3);

}

function draw() {

  // background(200);
  if (lock1) {
    s2.uxFill = '#C65D5D';
    lock1 = false;
  } else {
    s2.uxFill = '#C69E5D';
  }

  if (lock2) {
    s3.uxFill = '#5DC6B2';
    lock2 = false;
  } else {
    s3.uxFill = '#C65D5D';
  }

}

function trigger1() {
  s1.uxFill = '#C69E5D';

  setTimeout(function() {
    s1.uxFill = '#5DC6B2';
  }, 500);
}

function trigger2() {
  lock1 = true;

}

function trigger3() {
  lock2 = true;
}
