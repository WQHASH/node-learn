<!--
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-08-28 10:01:31
 * @LastEditTime: 2020-09-16 16:26:14
-->
<template>
<div class="home">
    <el-row>
        <el-button type="primary" @click="addInfoMethod">新增</el-button>
        <el-button type="primary"> <input @change="uploadFile($event)" type="file"></el-button>
    </el-row>
    <div class="img-preview"> <img :src=valueUrl v-if="valueUrl"></div>
    <template>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="日期" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="editInfo(scope)" type="text" size="small">编辑</el-button>
                    <el-button @click="delInfo(scope)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </template>

    <el-dialog :title="titleInfo" :visible.sync="isShow">
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
    editInfo,
    delInfo,
    uploadImage,
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
            titleInfo: "新增",
            titleTytpe: "add",
            form: {
                name: "",
                address: "",
            },
            formLabelWidth: "120px",
            valueUrl: "",
        };
    },

    created() {
        // 获取表格信息
        getInfo()
            .then((data) => {
                if (data["code"] == 200) {
                    this.tableData = data.data;
                }
            })
            .catch((err) => {
                console.log("请求失败~");
            });
    },
    methods: {
        /**
         * @description: 图片上传
         * @param {type}
         * @return {type}
         */
        uploadFile(el) {
            if (!el.target.files[0].size) return; // 如果文件大小为0，则返回
            if (el.target.files[0].type.indexOf("image") === -1) {
                //如果不是图片格式
                // this.$dialog.toast({ mes: '请选择图片文件' });
                console.log("请选择图片文件");
            } else {
                const that = this;
                const reader = new FileReader(); // 创建读取文件对象
                reader.readAsDataURL(el.target.files[0]); // 发起异步请求，读取文件
                reader.onload = function () {
                    // 文件读取完成后
                    // 读取完成后，将结果赋值给img的src
                    that.valueUrl = this.result;
                    // console.log(this.result);
                };
                const uid = "e0c9dd3de0418e698d49984ae035992a"; //后台需要的参数
                const formData = new FormData(); // 创建一个formdata对象
                formData.append("res", el.target.files[0]);
                formData.append("uid", uid);
                console.log(formData, "formData");
                uploadImage(formData).then((res) => {
                    // 发送请求，保存图片
                    if (res.status === 0) {
                        this.valueUrl = res.data;
                    } else {
                        console.log(res);
                    }
                });
            }
        },

        /**
         * @description: 新增信息
         * @param {type}
         * @return {type}
         */
        addInfoMethod() {
            this.titleInfo = "新增信息";
            this.titleTytpe = "add";
            // let id = this.tableData[this.tableData.length - 1] ?
            //     this.tableData[this.tableData.length - 1]["id"] + 1 :
            //     1;

            this.form = {
                name: "",
                address: "",
                // id,
            };
            this.isShow = true;
        },

        /**
         * @description: 编辑信息
         * @param {type}
         * @return {type}
         */
        editInfo(scope) {
            console.log(scope, "editInfo");
            this.titleInfo = "编辑信息";
            this.titleTytpe = "edit";
            this.isShow = true;
            this.form = {
                name: scope.row.name,
                address: scope.row.address,
                id: scope.row.id,
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
            result["name"] = this.form.name;
            result["address"] = this.form.address;
            result["date"] = +new Date();

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
                case "add":
                    addInfo(result)
                        .then((data) => {
                            console.log(data);
                        })
                        .catch((err) => {
                            console.log("增加信息失败!");
                        });
                    break;
                case "edit":
                    result["id"] = this.form.id;
                    editInfo(result)
                        .then((data) => {
                            console.log(data);
                        })
                        .catch((err) => {
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
        delInfo(scope) {
            console.log(scope, "row");
            let args = {
                id: scope.row.id,
            };
            delInfo(args)
                .then((data) => {
                    console.log(`删除数据成功`);
                    console.log(data, "data");
                })
                .catch((err) => {
                    console.log(`删除数据失败`);
                });
        },
    },
};
</script>

<style lang="scss">
.home {
    h3 {
        font-size: 28px;
    }

    .img-preview {
        width: 400px;
        height: 300px;
        border: 1px dotted red;
        overflow: hidden;
    }
}
</style>
