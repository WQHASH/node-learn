/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-08-28 11:24:40
 * @LastEditTime: 2020-08-28 11:33:34
 */
const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
    let obj = { "sanme": "wq" };
    res.json(obj);
});

module.exports = router;