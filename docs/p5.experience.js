/*

Written by Felix Meichelboeck
Contact: felix.meichelboeck@icloud.com



-- p5.experience.js --

USAGE:

p5.experience.js is an additive javascript library for the p5 library.
To use it you need to add p5.js or p5.min.js to your project. (https://p5js.org/download/)

Browser compatibility: You need ES6 to use the p5.experience.js library.

More Infos / Reference / Tutorials & ReadMe: github.com/loneboarder/p5.experience.js



--- Structure & Development Info ---

p5.experience.js is based on the class modell, which was introduced with ES6.
The library adds additional event-handling to the standart p5-library.

The heart of the library is the new uxElement-object (uxShape). It contains two basic concepts:
1. Shape drawing
2. Mouse input detection

uxElements don´t get created in the draw() function. They can be created inside the setup() function.
This function gets called once just before the first draw loop. p5.experience.js renders those objects for the user.
They don´t need to be redrawn every loop. This library contains a render function, that draws all uxElements at the end of every draw loop.

1.---

The user doesn´t need to worry about drawing the shapes. If there is a need to render an uxElement somewhere else,
p5.experience.js has the uxRender() function.
This function removes the render-part out of the basic render-function and draws the shape when uxRender() is called.

2.---

The input function get´s set for every uxElement seperatly. There are three modes, which get triggered differently (hover, press, click).



--- Improvement needed ---

- Mouse click function is written with setTimeout() - function, there is definitly a better way
- General performance
*/

(function() {

  let objectIDs = [];

  let renderUxObjects = [];

  let inputUxObjects = [];

  let uxFillColor = 0;
  let uxNoFillState = false;
  let uxStrokeColor = 0;
  let uxStrokeWeight = 1;
  let uxNoStrokeState = false;


  /*
  These functions should get called in setup(),
  they set fill and stroke values just like the normal fill() and stroke() functions in p5.
  They only work with the uxElement objects (Shapes).
  */

  //Shape drawing functions to be called in setup()

  p5.prototype.uxRect = function(a, b, c, d, e) {
    return new UXelement('rect', a, b, c, d, e)

  }

  p5.prototype.uxSquare = function(a, b, c, d) {
    return new UXelement('square', a, b, c, d)

  }

  p5.prototype.uxTriangle = function(a, b, c, d, e, f) {
    return new UXelement('triangle', a, b, c, d, e, f)

  }

  p5.prototype.uxCircle = function(a, b, c) {
    return new UXelement('circle', a, b, c)

  }

  p5.prototype.uxEllipse = function(a, b, c, d) {
    return new UXelement('ellipse', a, b, c, d)

  }

  //Utility functions to be also called in setup()

  //Set fill value for app
  p5.prototype.uxFill = function(a, b, c, d) {
    uxFillColor = processColorInput(a, b, c, d);
    uxNoFillState = false;

  }

  //Set noFill Value
  p5.prototype.uxNoFill = function() {
    uxNoFillState = true;

  }

  //Set stroke-color value for app
  p5.prototype.uxStroke = function(a, b, c, d) {
    uxStrokeColor = processColorInput(a, b, c, d);
    uxNoStrokeState = false;

  }

  //Set stroke-weight value for app
  p5.prototype.uxStrokeWeight = function(s) {
    uxStrokeWeight = s;

  }

  //Set noStroke Value
  p5.prototype.uxNoStroke = function() {
    uxNoStrokeState = true;

  }


  /* This is the main class for the uxElement. The constructor is very extensive as it sets the input and rendering functions.
  Every property of uxElement can be changed everywhere in draw().

  this.renderShape() adds the drawing function as object to the renderUxObjects-Array
  this.inputObject() adds the input function as object to the inputUxObjects-Array

  */

  class UXelement {

    constructor(a, b, c, d, e, f, g) {

      this.UxID = generateUxID();

      this.kindOfRender = 'intern';
      this.shape = a;

      this.uxFill = uxFillColor;
      this.uxStrokeColor = uxStrokeColor;
      this.uxStrokeWeight = uxStrokeWeight;

      this.uxNoStrokeState = uxNoStrokeState;
      this.uxNoFillState = uxNoFillState;

      switch (this.shape) {

        case 'rect':

          this.x = b;
          this.y = c;
          this.w = d;
          this.h = e;
          this.cor = f;
          this.renderShape = () => {

            if (this.uxNoStrokeState === false) {
              stroke(this.uxStrokeColor);
            } else {
              noStroke();
            }
            strokeWeight(this.uxStrokeWeight);

            if (this.uxNoFillState === false) {
              fill(this.uxFill);
            } else {
              noFill()
            }

            rect(this.x, this.y, this.w, this.h, this.cor);

          }
          this.inputObject = (input) => {

            if (checkRectHover(this.x, this.y, this.w, this.h, mouseX, mouseY) && input === this.kindOfInput) {
              this.callback();
            }

          }

          break;

        case 'square':

          this.x = b;
          this.y = c;
          this.s = d;
          this.cor = e;
          this.renderShape = () => {

            if (this.uxNoStrokeState === false) {
              stroke(this.uxStrokeColor);
            } else {
              noStroke();
            }
            strokeWeight(this.uxStrokeWeight);

            if (this.uxNoFillState === false) {
              fill(this.uxFill);
            } else {
              noFill()
            }

            square(this.x, this.y, this.s, this.cor);

          }
          this.inputObject = (input) => {

            if (checkRectHover(this.x, this.y, this.s, this.s, mouseX, mouseY) && input === this.kindOfInput) {
              this.callback();
            }

          }

          break;

        case 'triangle':

          this.x1 = b;
          this.y1 = c;
          this.x2 = d;
          this.y2 = e;
          this.x3 = f;
          this.y3 = g;
          this.renderShape = () => {

            if (this.uxNoStrokeState === false) {
              stroke(this.uxStrokeColor);
            } else {
              noStroke();
            }
            strokeWeight(this.uxStrokeWeight);

            if (this.uxNoFillState === false) {
              fill(this.uxFill);
            } else {
              noFill()
            }

            triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);

          }
          this.inputObject = (input) => {

            if (checkTriangleHover(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3, mouseX, mouseY) && input === this.kindOfInput) {
              this.callback();
            }

          }

          break;

        case 'circle':

          this.x = b;
          this.y = c;
          this.d = d;
          this.renderShape = () => {

            if (this.uxNoStrokeState === false) {
              stroke(this.uxStrokeColor);
            } else {
              noStroke();
            }
            strokeWeight(this.uxStrokeWeight);

            if (this.uxNoFillState === false) {
              fill(this.uxFill);
            } else {
              noFill()
            }

            circle(this.x, this.y, this.d);

          }
          this.inputObject = (input) => {

            if (checkCircleHover(this.x, this.y, this.d, mouseX, mouseY) && input === this.kindOfInput) {
              this.callback();
            }

          }

          break;

        case 'ellipse':

          this.x = b;
          this.y = c;
          this.w = d;
          this.h = e;
          this.renderShape = () => {

            if (this.uxNoStrokeState === false) {
              stroke(this.uxStrokeColor);
            } else {
              noStroke();
            }
            strokeWeight(this.uxStrokeWeight);

            if (this.uxNoFillState === false) {
              fill(this.uxFill);
            } else {
              noFill()
            }

            ellipse(this.x, this.y, this.w, this.h);

          }
          this.inputObject = (input) => {

            if (checkEllipseHover(this.x, this.y, this.w, this.h, mouseX, mouseY) && input === this.kindOfInput) {
              this.callback();
            }

          }

          break;

        case 'none':

          break;

        default: //create invisible click-detection object
          this.renderShape = () => {

            this.x = b;
            this.y = c;
            this.w = d;
            this.h = e;

          }
          this.inputObject = (input) => {

            if (checkRectHover(this.x, this.y, this.w, this.h, mouseX, mouseY) && input === this.kindOfInput) {
              this.callback();
            }

          }
      }

      //This lines push the render and input-functions to the specific array

      renderUxObjects.push([this.renderShape, this.UxID]);

      if (this.kindOfInput != 'none') {
        inputUxObjects.push([this.inputObject, this.UxID]);
      }

    }

    //This method can be called by the user in setup() (sets input for the specific uxElement)

    uxEvent(kindOfInput, callback) {
      this.kindOfInput = kindOfInput; // press, click, hover
      this.callback = callback;
    }



    //This function can be called by the user in draw() (removes uxElement from render-Array and draws it in place)

    uxRender() {
      if (this.kindOfRender === 'intern') {

        for (let i in renderUxObjects) {
          if (renderUxObjects[i][1] === this.UxID) {
            renderUxObjects.splice(i, 1);
          }
        }

        this.kindOfRender = 'manual';
      }

      //Now draw at "new" place
      this.renderShape();

    }

  }

  //Run App (rendering + input detection trigger)

  p5.prototype.runApp = function() {
    renderApp();
    mouseInput();
  }

  function renderApp() {
    for (let i in renderUxObjects) {
      renderUxObjects[i][0]();
    }
  }

  function mouseInput() {

    let lock = true;

    if (mouseIsPressed) {
      uxMousePressed();

      if (lock) {
        setTimeout(function() {
          if (mouseIsPressed === false) {
            uxMouseClicked();
            clicked = true;
          }
        }, 15);

        lock = false;
      }
    }

    uXMouseHover();

  }

  //Input detection

  function uxMousePressed() {
    for (let i in inputUxObjects) {
      inputUxObjects[i][0]('press');
    }

  }

  function uxMouseClicked() {
    for (let i in inputUxObjects) {
      inputUxObjects[i][0]('click');
    }
  }

  function uXMouseHover() {
    for (let i in inputUxObjects) {
      inputUxObjects[i][0]('hover');
    }
  }

  //Helping functions for specific shapes

  function checkRectHover(x, y, w, h, xP, yP) {
    if (
      xP >= x &&
      xP <= x + w &&
      yP >= y &&
      yP <= y + h
    ) {
      return true;
    }
  }

  function checkTriangleHover(x1, y1, x2, y2, x3, y3, xP, yP) {

    let totalArea = Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2);
    let firstArea = Math.abs((xP * (y1 - y2) + x1 * (y2 - yP) + x2 * (yP - y1)) / 2);
    let secondArea = Math.abs((xP * (y2 - y3) + x2 * (y3 - yP) + x3 * (yP - y2)) / 2);
    let thirdArea = Math.abs((xP * (y1 - y3) + x1 * (y3 - yP) + x3 * (yP - y1)) / 2);

    if (totalArea === firstArea + secondArea + thirdArea) {
      return true;
    } else {
      return false;
    }
  }

  function checkCircleHover(x, y, d, xP, yP) {

    let distance = Math.sqrt(Math.pow(x - xP, 2) + Math.pow(y - yP, 2));
    if (distance <= d / 2) {
      return true;
    } else {
      return false;
    }

  }

  function checkEllipseHover(x, y, w, h, xP, yP) {

    w = w / 2;
    h = h / 2;

    let equ = Math.pow(xP - x, 2) / Math.pow(w, 2) + Math.pow(yP - y, 2) / Math.pow(h, 2);

    if (equ <= 1) {
      return true;
    } else {
      return false;
    }
  }

  //Basic helping functions

  function generateUxID() {
    let newID = 0;

    if (objectIDs.length != 0) {
      newID = objectIDs.length
    }

    objectIDs.push(newID)

    return newID;
  }

  function processColorInput(a, b, c, d) {
    let output;

    if (b === undefined && c === undefined && d === undefined) {
      output = a;

    } else if (c === undefined && d === undefined) {
      if (typeof a === 'string') {
        console.log('No valid color-input');

      } else {
        output = [a, b];
      }

    } else if (d === undefined) {

      if (typeof a === 'string') {
        console.log('No valid color-input');

      } else {
        output = [a, b, c];
      }

    } else {
      output = [a, b, c, d];
    }
    return output;
  }

  //----------Register method in p5 library----------------

  p5.prototype.registerMethod('post', p5.prototype.runApp);

})();

//The End
