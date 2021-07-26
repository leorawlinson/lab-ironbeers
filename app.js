// Leo was last to push(24/07/2021)

const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + '/views/partials');

// ...

// Add the route handlers here:

//route to home
app.get('/', (req, res) => {
  res.render('index');
});

//route to beer
app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beers => {
      res.render('beers', { beers });
    })
    .catch(err => console.error(err));
});

//route to random beer
app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(beers => {
      // console.log(data);
      res.render('randomBeer', { beers: beers, extraInfo: true });
    })
    .catch(err => console.error(err));
});

app.get('/beers/:id', (req, res) => {
  const { id } = req.params;
  punkAPI
    .getBeer(id)
    .then(beers => {
      res.render('oneBeer', { beers, moreInfo: true });
    })
    .catch(err => console.error(err));
});

//app.get('/beers/:id', (request, response, next) => {
//console.log(request.params);
//response.sendFile(__dirname + "/views/home.html");
//});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
