/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-08-28 11:24:46
 * @LastEditTime: 2020-08-28 13:15:30
 */
const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    let tableData = [{
        date: "2016-05-02",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄",
    },
    {
        date: "2016-05-04",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1517 弄",
    },
    {
        date: "2016-05-01",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1519 弄",
    },
    {
        date: "2016-05-03",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1516 弄",
    },
    ];
    let result = {
        code:200,
        message:"ok",
        tableData
    };
    console

    res.json(result);
});

module.exports = router;