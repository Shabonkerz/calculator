# Calculator

### What is left to do:

* Have it work with keyboard input. (Shouldn't take but an hour tops?)
* AC/C button. Currently, it performs and "all clear" upon press.
* Add unit tests/integration tests.
* Find a way to integrate eslint in ember. I attempted such with Ember 1.13.8 and hit a brick wall since jshint was more tightly coupled with Ember than thought. Will revisit with Ember 2.4+ as time allows.
* Investigate whether generators are supported in Ember. I know for sure they work with babel, but it requires a plugin or two, which Ember may not support.
* Complete 2nd iteration milestone. This includes clearing the outstanding issues, as well as possibly refactoring to allow for history of operations. (Calls for encapsulating operations and implementing something analogous to the command pattern.)
* Add documentation. DocBlockr and jsDocs would be sufficient, but it'll wait until after the 2nd iteration.
* Make the calculator responsive. (Entails writing media queries).
* Allow user to specify width and height of the calculator via component attributes.
* Some code cleanup/application of DRY principle.

### Choice of framework, etc.

* Multiple frameworks were explored(React, AngularJS, etc.), but Ember is most familiar, and project setup time wasn't an issue with Ember CLI. Initially, scaffolding out my project with yo, gulp, react, babel, browserify, etc. didn't quite hit the mark regarding preferred ES6/ES7 usage, testing framework preference, gulp/browserify functionality specifically, so it was abandoned for the easier route.
* SASS is used so I need not repeat myself.

### Calculator inner-workings.

Simply put, this calculator only supports the unary(+/-, %) and binary(+, -, ×, /) operations, and does so by managing up to 2 operands, and the current operation as dictated by the user, and performs the calculation and saves the result as the left operand, and awaits the next operand/operator.

### Additional Notes

The calculator is actually two pieces: a component, and an Ember one at that, thus it is reusable, extendible, skinnable, etc., and the "manager" piece that contains the operations and operation logic.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
