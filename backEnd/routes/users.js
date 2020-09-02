/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-08-28 10:03:55
 * @LastEditTime: 2020-09-02 16:57:51
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
