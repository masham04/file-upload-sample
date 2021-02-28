const express = require('express');
const router = express.Router();
const data = [
    {
        id: 1,
        name: 'picture',
        image: '/images/abc.jpg'
    }    
];
router.get('/', function(req, res, next) {
    res.send(data);
  });