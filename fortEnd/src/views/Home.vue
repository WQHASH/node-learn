<!--
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-08-28 10:01:31
 * @LastEditTime: 2020-08-28 18:12:21
-->
<template>
<div class="home">
    <el-row>
        <el-button type="primary" @click="addInfoMethod">新增</el-button>
    </el-row>

    <template>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="日期" width="180"> </el-table-column>
            <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="editInfo(scope)" type="text" size="small">编辑</el-button>
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
    getInfo,
    addInfo,
    editInfo
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
            titleTytpe: 'add',
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
        addInfoMethod() {
            this.titleInfo = '新增信息';
            this.titleTytpe = 'add';
            this.form = {
                name: "",
                address: "",
                id: this.tableData.length - 1,
            };
            this.isShow = true;
        },

        /**
         * @description: 编辑信息 
         * @param {type} 
         * @return {type} 
         */
        editInfo(scope) {
            console.log(scope)
            this.titleInfo = '编辑信息';
            this.titleTytpe = 'edit';
            this.isShow = true;
            this.form = {
                name: scope.row.name,
                address: scope.row.address,
                id: scope.row.$index,
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
            result['name'] = this.form.name;
            result['address'] = this.form.address;
            result['date'] = +new Date();
             result['id'] =  this.form.id;

            // 发送请求
            this.submitInfoPublic(result);

        },

        /**
         * @description: 提交信息后发送请求
         * @param {type} 
         * @return {type} 
         */
        submitInfoPublic(result) {
            console.log(result, "result");

            switch (this.titleTytpe) {
                case 'add':
                    addInfo(result).then((data) => {
                        console.log(data)
                    }).catch((err) => {
                        console.log("增加信息失败!");
                    });
                    break;
                case 'edit':
                    editInfo(result).then((data) => {
                        console.log(data)
                    }).catch((err) => {
                        console.log("编辑信息失败!");
                    });
                    break;
                default:
                    break;
            }
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
