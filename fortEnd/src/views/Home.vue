<!--
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-08-28 10:01:31
 * @LastEditTime: 2020-08-28 16:43:30
-->
<template>
<div class="home">
    <el-row>
        <el-button type="primary" @click="addInfo">新增</el-button>
    </el-row>

    <template>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="日期" width="180"> </el-table-column>
            <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="editInfo(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="delInfo(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>

        </el-table>

    </template>

    <el-dialog :title='titleInfo' :visible.sync="isShow">
        <el-form :model="form">
            <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" label-width="100px"></el-input>
            </el-form-item>
            <el-form-item label="地址" :label-width="formLabelWidth">
                <el-input v-model="form.address" autocomplete="off" label-width="100px"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="isShow = false">取 消</el-button>
            <el-button type="primary" @click="submitInfo">确 定</el-button>
        </div>
    </el-dialog>

</div>
</template>

<script>
import {
    getInfo
} from "@/api/index.js";

export default {
    name: "Home",
    components: {},
    data() {
        return {
            // 列表数据
            tableData: [],
            //控制弹框显影
            isShow: false,
            // 弹框信息字段
            titleInfo: '新增',
            form: {
                name: "",
                address: "",
            },
            formLabelWidth: "120px",
        };
    },

    created() {

        // 获取表格信息
        getInfo()
            .then((data) => {
                if (data["code"] == 200) {
                    this.tableData = data.tableData;
                }
            })
            .catch((err) => {
                console.log("请求失败~");
            });
    },
    methods: {
        /**
         * @description: 新增信息
         * @param {type} 
         * @return {type} 
         */
        addInfo() {
            this.titleInfo = '新增信息';
            this.form = {
                name: "",
                address: "",
            };
            this.isShow = true;
        },

        /**
         * @description: 编辑信息 
         * @param {type} 
         * @return {type} 
         */
        editInfo(row) {
            console.log(row)
            this.titleInfo = '编辑信息';
            this.isShow = true;
            this.form = {
                name: row.name,
                address: row.address,
            };
            

        },

        /**
         * @description: 提交信息
         * @param {type} 
         * @return {type} 
         */
        submitInfo() {
            this.isShow = false;
            let result = {};
            result['sname'] = this.form.name;
            result['address'] = this.form.address;
            result['date'] = +new Date();
            console.log(result, "result");
            

        },

        /**
         * @description: 删除行信息
         * @param {type} 
         * @return {type} 
         */
        delInfo(row) {
            console.log(row, "row");
        },
    },
};
</script>

<style lang="scss">
.home {
    h3 {
        font-size: 28px;
    }
}
</style>
