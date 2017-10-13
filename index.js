const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('express-hbs')
const logger = require('morgan')
const path = require('path')
var http = require('http')
const app = express()
var porta = process.env.PORT || 8080;

app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'hbs')



app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.engine('hbs', hbs.express4({
    defaultLayout: path.join(app.get('views'), 'layouts/home.hbs'),
    partialsDir: path.join(app.get('views'), 'partials'),
    layoutDir: path.join(app.get('views'), 'layouts'),
}))

require('./src/routes')(app)


http
  .createServer(app)
  .listen(porta, function(){
    console.log('Serviço iniciado na porta '+porta);
  });

module.exports = app

