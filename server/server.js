const express = require('express');
const path = require('path');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();


app.use(express.static(publicPath));

//-------requests-------\\


app.listen(port, () => console.log(`Server is running on port ${port}`));