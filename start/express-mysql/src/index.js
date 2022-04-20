const express = require('express');
const app = express();
const bodyparser = require('body-parser')
const path = require('path')

app.set("port", process.env.PORT || 3000)

// Middleware

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')


app.use(bodyparser.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', express.static(path.join(__dirname, 'public')))

// Routes
app.use(require('./routes/employees'))

app.listen(app.get("port"), () => {
    console.log(`JaibeyPisco server en puerto: ${app.get('port')}`);
})