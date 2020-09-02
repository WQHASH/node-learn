/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-08-28 11:24:40
 * @LastEditTime: 2020-09-02 16:58:00
 */
const express = require('express');
const router = express.Router();

router.post('/postList', (req, res, next) => {
    let obj = { "sanme": "wq" };
    res.json(obj);
});

module.exports = router;