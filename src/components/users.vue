<template>
    <div>
        <el-form :inline="true">
            <el-form-item label="名称">
                <el-input v-model="name" style="width:200px;"></el-input>
            </el-form-item>
            <el-button @click="search" style="margin-left:20px;" type="primary" icon="el-icon-search" circle></el-button>
        </el-form>
        <el-table :data="tabledata">
            <el-table-column
            label="用户名"
            align="center"
            prop="name"
            >

            </el-table-column>
            <el-table-column
                    label="手机号"
                    align="center"
                    prop="phone"
            >

            </el-table-column>
            <el-table-column
                    label="头像"
                    align="center"
            >
                <template slot-scope="data">
                    <img v-if="data.row.header_img" :src="data.row.header_img" alt="">
                    <img v-else src="/upload/28.png" alt="">
                </template>
            </el-table-column>
            <el-table-column
                    label="注册时间"
                    align="center"
                    prop="create_time"
            >
            </el-table-column>
        </el-table>
        <el-row type="flex" justify="center">
            <el-pagination
                    layout="prev, pager, next"
                    :total="total"
                    :pageSize="5"
                    @current-change="pagechange"
            >
            </el-pagination>
        </el-row>
    </div>
</template>
<script>
    export default {
        name: "users",
        data(){
            return {
                pageSize:5,
                p:1,
                name:"",
                url:"/api/user",
                tabledata:[],
                imgUrl:"",
                total:10
            }
        },
        methods:{
            search(){
                this.fetchData();
            },
            pagechange(p){
                this.p=p;
                this.fetchData();
            },
            fetchData(){
                this.$http.get(this.url,{params:{page:this.p,pageSize:this.pageSize,name:this.name,pid:this.pid,cid:this.cid}}).then(res=>{
                    this.tabledata=res.data.data;
                    this.total=res.data.total;
                })
            }
        },
        mounted(){
            this.fetchData();
        }
    }
</script>

<style>
    .el-form-item__label::before{
        content: '';
    }
</style>