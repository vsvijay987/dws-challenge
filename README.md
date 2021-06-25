# Updating Table Dev Challenge

A development challenge for DWS Technology recruitment aimed at experienced web UI developers.

## Getting Started

```
npm install
npm start
```

This will start a development server that supports hot reloading but also provides a stomp/ws endpoint providing fake fx updates.

Once you've started the development server, navigate to http://localhost:8080. This page is served from `./src/index.html`. 

Within a short time from loading the bundled page, it will connect over websockets to a stomp server that also runs when you run the development server.

We have included a couple of libraries to help you complete this task:

* [stomp.js](http://jmesnil.net/stomp-websocket/doc/) for connecting to a streaming pub/sub system over websockets
* [sparklines](https://github.com/mariusGundersen/sparkline) which can be used for drawing sparklines.

Examples to help you get started with these libraries can be found in the bundled `./src/index.js`.

## Your Task

We want you to submit a modification of this project where this `index.html` page has been replaced with a page showing a live updating table of sorted data.

You should request the topic `/fx/prices`, to receive update messages with a body that looks like this:

```js
{
  "name": "usdjpy",
  "bestBid": 106.7297012204255,
  "bestAsk": 107.25199883791178,
  "openBid": 107.22827132623534,
  "openAsk": 109.78172867376465,
  "lastChangeAsk": -4.862314256927661,
  "lastChangeBid": -2.8769211401569663
}
```

Show those currency pairs in a table with rows for each currency pair, which includes columns for at least the name, the current best bid price, current best ask price, the amount that the best bid last changed, and the amount the best ask price last changed. This data can be read out of the price updates that are sent via stomp. There are a limited number of currency pairs, and multiple updates will be sent for each one. 

The table should be sorted (and remain sorted) by the column that indicates how much the best bid price last changed (`lastChangeBid` in the response data).

This page should also mention or link to anything else you want us to consider. For example:

* A high level description of your approach
* Anything you had to change or assume about this task to make your solution
* If you added any other development-time steps, what they are, why you added them and how to run them
* Which libraries/frameworks you would have liked to have used (if any), and how they would have made the result better
* We are most interested in readable, simple, well structured code. While how good the solution looks visually is not a key factor, it will also be considered during evaluation. 
* We will be testing in a recent version of chrome, so there's no need to do extra cross browser testing, but we may run this on a mac or a windows machine, so you shouldn't include anything excessively platform specific.
* A good solution will include some form of testing.

### Sparklines

The last column should be a live updating sparkline which shows the midprice over the last 30 seconds. The x axis should be time. The midprice can be calculated by adding the bestBid and bestAsk fields together and dividing by 2.

You can get a new element with a spark line drawn in it like so:

```js
const sparks = document.createElement('span')
Sparkline.draw(sparks, [1, 2, 3, 4])
```
Or you can get a sparkline that you can repeatedly update with rendered values:

```js
const sparkElement = document.createElement('span')
const sparkline = new Sparkline(sparkElement)
sparkline.draw([1,2,3,4,5])
/** sometime later... */
sparkline.draw([2,3,4,5,1])
```

### Restrictions

Because we want to assess your web programming ability, there is a requirement that you do not use libraries or frameworks that you haven't written yourself (e.g. React, Angular etc.) for the updating table other than those already included.

Although adding dependencies you haven't written yourself to the page that features the updating table is not allowed, dev dependencies that you only use during build or development e.g. for testing, etc are allowed. If you do add such dependencies they should be in the public default npmjs registry.