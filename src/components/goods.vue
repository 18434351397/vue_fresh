<template>
    <div>
        <el-tabs v-model="activeName" >
            <el-tab-pane label="查看轮播" name="show">
                <el-row type="flex" style="margin-bottom:20px;">
                    <el-form :inline="true">
                        <el-form-item label="名称">
                            <el-input v-model="name" style="width:200px;"></el-input>
                        </el-form-item>
                        <el-form-item label="一级" prop="pid">
                            <el-select v-model="pid" placeholder="请选择" @change="selectChange">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="二级" prop="cid">
                            <el-select v-model="cid" placeholder="请选择">
                                <el-option
                                        v-for="item in options1"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-button @click="search" style="margin-left:20px;" type="primary" icon="el-icon-search" circle></el-button>
                    </el-form>
                </el-row>
                <el-table :data="tableData" :border="true" @selection-change="change">
                    <el-table-column type="selection">
                    </el-table-column>
                    <el-table-column
                            label="商品名称"
                            prop="name"
                            align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            label="原价"
                            prop="price"
                            align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            label="特价"
                            prop="special_price"
                            align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            label="进价"
                            prop="bid"
                            align="center"
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
                <el-row type="flex" justify="center">
                    <el-pagination
                            layout="prev, pager, next"
                            :total="total"
                            :pageSize="5"
                            @current-change="pagechange"
                    >
                    </el-pagination>
                </el-row>
                <el-button style="margin-top:20px;" type="danger" @click="delAll">批量删除</el-button>
            </el-tab-pane>
            <el-tab-pane label="添加轮播" name="add">
                <el-form label-width="80px" :model="formData" ref="formData" :rules="rules">
                    <el-form-item label="一级分类" prop="pid">
                        <el-select v-model="formData.pid" placeholder="请选择" @change="selectChange">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="二级分类" prop="cid">
                        <el-select v-model="formData.cid" placeholder="请选择">
                            <el-option
                                    v-for="item in options1"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                   >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="名称" prop="name">
                        <el-input
                                style="width: 50%"
                                v-model="formData.name"
                        ></el-input>
                    </el-form-item >
                    <el-form-item label="价格" prop="price">
                        <el-input
                                style="width: 50%"
                                v-model.number="formData.price"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="特价" prop="special_price">
                        <el-input
                                style="width: 50%"
                                type="number"
                                v-model.number="formData.special_price"
                        ><template slot="prepend">￥</template></el-input>
                    </el-form-item>
                    <el-form-item label="成本" prop="bid">
                        <el-input
                                style="width: 50%"
                                v-model.number="formData.bid"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="描述" prop="description">
                        <el-input
                                style="width: 50%"
                                v-model="formData.description"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="排序" prop="sort">
                        <el-input
                                style="width: 50%"
                                v-model.number="formData.sort"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="图片" prop="src">
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
        name: "goods",
        data(){
            return {
                tableData:[],
                url:"/api/goods",
                ids:[],
                total:10,
                pageSize:5,
                p:1,
                name:"",
                pid:"",
                cid:"",
                activeName:"show",
                imageUrl:"",
                options:[],
                options1:[],
                category:"",
                formData:{
                    name:"",
                    price:"",
                    special_price:"",
                    description:"",
                    sort:"",
                    bid:"",
                    cid:"",
                    pid:"",
                    src:""
                    },
                rules:{
                    src:[{required:true,message:"请选择商品图片"}],
                    name:[{required:true,message:"请填写商品名称",trigger:"blur"}],
                    price:[{required:true,message:"请填写商品价格",trigger:"blur"}],
                    special_price:[{required:true,message:"请填写商品特价",trigger:"blur"}],
                    description:[{required:true,message:"请填写商品描述",trigger:"blur"}],
                    cid:[{required:true,message:"请选择二级分类"}],
                    bid:[{required:true,message:"请填写商品成本",trigger:"blur"}],
                    pid:[{required:true,message:"请选择一级分类"}],
                    sort:[{required:true,message:"请填写排序",trigger:"blur"}],
                }
            }
        },
        methods:{

            getCat(){
                this.$http.get("/api/category").then(res=>{
                    this.category=res.data.data;
                    this.options=res.data.data.map(v=>({label:v.label,value:v._id}));
                })
            },
            selectChange(v){
                this.formData.cid="";
                let obj=this.category.find(val=>val._id===v);
                this.options1=obj.children.map(val=>({label:val.label,value:val._id}));
            },
            submit(){
                this.formData.src=this.imageUrl;
                this.$http.post(this.url,this.formData).then(res=>{
                    if (res.data.status==="ok"){
                        this.$message({
                            type:"success",
                            message:"添加成功"
                        });

                        this.imageUrl="";
                        this.formData={};
                        this.fetchData();
                    } else {
                        this.$message({
                            type:"success",
                            message:"添加失败"
                        })
                    }
                }).catch(()=>{
                    this.$message({
                        type:"success",
                        message:"添加失败"
                    })
                })

            },
            success(res){
                this.imageUrl="/upload/"+res.path;
            },
            search(){
              this.fetchData();
            },
            pagechange(p){
                this.p=p;
                this.fetchData();
            },
            delAll(){
                this.$confirm('此操作将永久删除此数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.delete(this.url+"?id="+JSON.stringify(this.ids)).then((res)=>{
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
            },
            change(v){
                this.ids=v.map(v=>v._id);
            },
            del(id){
                this.$confirm('此操作将永久删除此数据, 是否继续?', '提示', {
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
            },
            fetchData(){
                this.$http.get(this.url,{params:{page:this.p,pageSize:this.pageSize,name:this.name,pid:this.pid,cid:this.cid}}).then(res=>{
                    this.tableData=res.data.data;
                    this.total=res.data.total;
                })
            }
        },
        mounted(){
            this.fetchData();
            this.getCat();
        }
    }
</script>

<style>

    .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
        content: '';
        color: #f56c6c;
        margin-right: 4px;
    }
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
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>