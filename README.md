# p5.experience.js
Extensive library for p5.js that adds additional functionality for creating canvas-based web applications. 

## The core concept of p5.experience.js
p5.experience.js introduces two new main concepts to p5: 

### 1. The uxElement
The uxElement is an object that consists of shape-drawing and input-handling. 

### 2. The createApp() function
The createApp() function gets called once just before draw() loops the first time. You can build your app here! 

## Beginner Tutorial - Getting started
To build your first web-application with p5.experience.js you need to add the createApp() function to your sketch:

```
function setup() {
  createCanvas(400, 400);
}

function createApp() {
 //This is where the magic happens!
}

function draw() {
  background(200);
}
```

Now you´re ready to add new your first uxElement to your sketch. You can create one as follows:

```
function createApp() {
  uxElement('rect', 100, 100, 50, 50);
}
```
p5.experience.js now creates an uxElement for you in the background. You don´t have to draw the object to the canvas, the library takes care of that for you. 

Let´s add a simple mouse-input to that uxElement!

```
function createApp() {
  uxElement('rect', 100, 100, 50, 50).inp('click', trigger());
}

function trigger() {
  console.log('uxElement just got clicked!')
}
```
You now have created a rectangle, that calls the trigger() function when it gets clicked.

Let´s take some control over our app! You can assign your uxElements to variables like that:

```
let one;

function createApp() {
  one = uxElement('rect', 100, 100, 50, 50)
  one.inp('click', trigger());
}

function trigger() {
  console.log('uxElement just got clicked!')
}
```

Well done, you now created your first simple Web-Application with p5.experience.js! You can now look up all the possible functions and object-properties, to build wonderful interfaces.

## Reference

The reference contains the following functions & methods: 
* createApp()
* uxElement()
* uxFillColor()
* uxnoFill()
* uxStroke()
* uxStrokeWeight()
* uxnoStroke()]
* .inp()
* .place()

### createApp() 
```
createApp() {
  //define your uxObjects here
}
```

This function gets called once, just before the draw() function loops for the first time. You can design your web-app in the body of this function. Please do not call this function somewhere else.

### uxElement()
```
uxElement('shape', a, b, c, d)
```

This function creates a new object, 'shape' controls drawing and input detection. 

The following shapes are supported: 
  * *rectangle (rect)*
  * *square (square)*
  * *triangle (triangle)*
  * *circle (circle)*
  * *ellipse (ellipse)*
  
This function returns the object. The following properties can be changed anywhere after initalising the uxElement: 
  * *.shape*
  * *.uxFill*
  * *.uxStrokeColor*
  * *.uxStrokeWeight*
 
Please not that a, b, c, d may change or extend for different shapes. The shape properties are the same as in the p5.js reference for the specific shape.

### uxFill()
```
uxFill(color)
```

This function works like the p5.js fill-function. For more information see [p5 fill reference](https://p5js.org/reference/#/p5/fill)
This function can only be called in createApp() and is for uxElements only. 

### uxNoFill()
```
uxNoFill()
```

This function works like the p5.js noFill-function. Just call it and every uxElement that get´s created after will have no fill.
This function can only be called in createApp() and is for uxElements only. 

### uxStroke()
```
uxStroke(color)
```

This function works like the p5.js stroke-function. For more information see [p5 stroke reference](https://p5js.org/reference/#/p5/stroke)
This function can only be called in createApp() and is for uxElements only. 

### uxNoStroke()
```
uxNoStroke()
```

This function works like the p5.js noStroke-function. Just call it and every uxElement that get´s created after will have no stroke.
This function can only be called in createApp() and is for uxElements only. 

### uxStrokeWeight()
```
uxStrokeWeight(weight)
```

This function works like the p5.js strokeWeight-function. For more information see [p5 strokeWeight reference](https://p5js.org/reference/#/p5/strokeweight)
This function can only be called in createApp() and is for uxElements only. 

### .inp()
```
.inp('inputType', callback)
```

This method gets added to an uxElement and sets the event listener for this exact element. The callback-function gets called, when the user interacts with the element. 

There are three types of inputs: 
* *click* User needs to click on the shape (callback gets called after releasing the left mouse-button)
* *press* User needs to press on the shape (callback gets called when the user clicks on shape)
* *hover* User needs to hover over shape to call callback-function

This function can only be called in createApp() and is for uxElements only. 

### .place()
```
.place()
```

This method disables the automatic drawing of the chosen element and draws it where .place() gets called. You can call this method anywhere in draw to display the uxElement exactly where you want it.
