/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-08-28 10:03:55
 * @LastEditTime: 2020-09-02 16:57:04
 */
var express = require('express');
var router = express.Router();

var usersRouter = require('./users');
var postListRouter = require('./postList');
var setInfoRouter = require('./setInfo');

router.use(postListRouter);
router.use(usersRouter);
router.use(setInfoRouter);

module.exports = router;
