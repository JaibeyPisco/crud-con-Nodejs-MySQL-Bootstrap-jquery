const express = require('express');

const app = express();

app.set("port", process.env.PORT || 3000)

// Middleware
app.use(express.json())

// Routes
app.use(require('./routes/employees'))

app.listen(app.get("port"), () => {
    console.log(`lechucero server en puerto: ${app.get('port')}`);
})