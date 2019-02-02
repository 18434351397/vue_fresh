<template>
    <div>
        <el-tabs v-model="activeName" >
            <el-tab-pane label="查看轮播" name="show">
                <el-table :data="tabledata" :border="true" @expand-change="change">
                    <el-table-column
                        type="expand"
                    >
                        <template slot-scope="data">
                            <el-form label-width="80px">
                                <el-form-item label="排序">
                                    <el-input
                                            style="width: 50%"
                                            v-model.number="data.row.sort"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="图片">
                                    <el-upload
                                            class="avatar-uploader"
                                            action="/api/upload"
                                            :show-file-list="false"
                                            :on-success="updateSuccess"
                                    >
                                        <img v-if="newImageUrl" :src="newImageUrl" class="avatar">
                                        <img v-else :src="data.row.src" class="avatar">
                                    </el-upload>
                                </el-form-item>
                                <el-form-item>
                                    <el-button @click="update(data.row)" type="primary">修改</el-button>
                                </el-form-item>

                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="图片"
                            align="center"
                    >
                        <template slot-scope="data">
                            <img width="200" :src="data.row.src" alt="">
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="排序"
                            prop="sort"
                            align="center"
                            :sortable="true"
                    >
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            align="center"
                    >
                        <template slot-scope="data">
                            <el-button type="danger" @click="del(data.row._id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="添加轮播" name="add">
                <el-form label-width="80px">
                    <el-form-item label="排序">
                        <el-input
                            style="width: 50%"
                            v-model="sort"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="图片">
                        <el-upload
                                class="avatar-uploader"
                                action="/api/upload"
                                :show-file-list="false"
                                :on-success="success"
                        >
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="submit" type="primary">提交</el-button>
                    </el-form-item>

                </el-form>
            </el-tab-pane>

        </el-tabs>

    </div>
</template>

<script>
    export default {
        name: "banner",
        data(){
            return {
                tabledata:[],
                url:"/api/banner",
                activeName:"show",
                sort:1,
                imageUrl:"",
                newImageUrl:""
            }
        },
        methods:{
            change(){
              this.newImageUrl="";
            },
            update(row){
                if (this.sort===""){
                    this.$message({
                        message:"请输入排序",
                        type:"error"
                    })
                }
                if (this.newImageUrl!==""){
                    row.src=this.newImageUrl;
                }
                this.$http.put(this.url,row).then((res)=>{
                    if (res.data.status==="ok") {
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                        this.fetchData();
                        this.newImageUrl="";
                    }else{
                        this.$message({
                            type: 'error',
                            message: '修改失败!'
                        });
                        this.fetchData();
                    }
                })
            },
            submit(){
                if (this.imageUrl===""|| this.src===""){
                    this.$message({
                        type:"error",
                        message:"请完善内容"
                    });
                }else{
                    this.$http.post(this.url,{src:this.imageUrl,sort:this.sort}).then((res)=>{
                        console.log(res.data.status);
                        if (res.data.status==="ok"){
                            this.$message({
                                type: 'success',
                                message: '添加成功!'
                            });
                            this.activeName="show";
                            this.fetchData();
                        }
                    });
                }

            },
            success(res){
                this.imageUrl="/upload/"+res.path;
            },
            updateSuccess(res){
                this.newImageUrl="/upload/"+res.path;
            },
            fetchData(){
                this.$http.get(this.url).then((res)=>{
                    this.tabledata=res.data.data;
                    this.$message({
                        type: 'success',
                        message: '获取成功!'
                    });
                })
            },
            del(id){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.delete(this.url+"/"+id).then((res)=>{
                        if (res.data.status==="ok"){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.fetchData();
                        } else{
                            this.$message({
                                type: 'error',
                                message: '删除失败!'
                            });
                        }
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
        mounted(){
            this.fetchData();
        }
    }
</script>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 278px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 278px;
        height: 178px;
        display: block;
    }
</style>