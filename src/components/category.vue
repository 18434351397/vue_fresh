<template>
    <div>
        <el-button class="el-icon-plus" circle size="small" @click="add"></el-button>
        <el-tree
                :data="data"
                show-checkbox
                node-key="id"
                default-expand-all
                :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span style="margin-right: 20px;">{{ node.label }}</span>
        <span>
          <el-button
                  type="text"
                  size="mini"
                  v-if="node.level===1"
                  @click="append(node,data)">
            添加
          </el-button>
          <el-button
                  type="text"
                  size="mini"
                  @click="remove(node, data)">
            删除
          </el-button>
            <el-button
                    type="text"
                    size="mini"
                    @click="edit(node,data)">
            编辑
          </el-button>
        </span>
      </span>

        </el-tree>

        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
        >
            <span>
                <el-form label-width="80px" ref="form" :model="formData" :rules="rules">
                    <el-form-item label="排序" prop="sort">
                        <el-input
                                style="width: 50%"
                                v-model="formData.sort"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="分类" prop="label">
                        <el-input
                                style="width: 50%"
                                v-model="formData.label"
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
                </el-form>
            </span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="insert">确 定</el-button>
  </span>
        </el-dialog>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible2"
                width="30%"
        >
            <span>
                <el-form label-width="80px" ref="form2" :model="updateData" :rules="rules">
                    <el-form-item label="排序" prop="sort">
                        <el-input
                                style="width: 50%"
                                v-model="updateData.sort"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="分类" prop="label">
                        <el-input
                                style="width: 50%"
                                v-model="updateData.label"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="图片" prop="src">
                        <el-upload
                                class="avatar-uploader"
                                action="/api/upload"
                                :show-file-list="false"
                                :on-success="success2"
                        >
                            <img v-if="newImageUrl" :src="newImageUrl" class="avatar">
                            <img v-else :src="updateData.src" class="avatar">
                        </el-upload>
                    </el-form-item>
                </el-form>
            </span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="update">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "category",
        data() {
            return {
                imageUrl:"",
                url: "/api/category",
                data: [],
                dialogVisible: false,
                dialogVisible2: false,
                formData: {
                    sort:"",
                    label:"",
                    src:"",
                    children:[]
                    },
                rules:{sort: [
                        { required: true, message: '请输入排序', trigger: 'blur' }
                    ],
                    label: [
                        { required: true, message: '请输入分类', trigger: 'blur' }
                    ],
                    src: [
                        { required: true, message: '请选择图片',  }
                    ],
                },
                updateData:{},
                newImageUrl:"",
                parent:""

            }
        },
        methods: {
            // enter:function (){
            //   let that = this;
            //   console.log(document.onkeydown);
            //   document.onkeydown=function () {
            //       let key=window.event.keyCode;
            //       console.log(key);
            //   }
            // },
            edit(node,data){
                for (let i in data){
                    this.updateData[i]=data[i];
                }
              //   console.log(this.updateData);
                this.dialogVisible2=true;
                if (node.level===2){
                    this.parent=node.parent.data;
                }
                // document.onkeydown=function (ev) {
                //     let that=this;
                //     if (ev.keyCode==13){
                //         that.update();
                //     }
                // }
            },
            update(){
                if (this.newImageUrl) {
                    this.updateData.src = this.newImageUrl;
                }
                this.$refs.form2.validate((valid)=>{
                    if (valid){
                        if (this.parent){
                            // console.log(this.parent.children);
                            // console.log(this.updateData._id);
                            let index=this.parent.children.findIndex(v=>v._id==this.updateData._id);
                            this.parent.children[index]=this.updateData;
                            this.updatechildren();
                        } else{
                            this.$http.put(this.url,this.updateData).then(res=>{
                                if (res.data.status==="ok"){
                                    this.$message({
                                        type:"success",
                                        message:"修改成功"
                                    });
                                    this.fetchData();
                                    this.dialogVisible2=false;
                                    this.newImageUrl="";
                                }
                            })
                        }

                    }
                })
            },
            insert(){

                this.formData.src=this.imageUrl;
                this.$refs.form.validate((valid)=>{
                    if (valid){
                        if (this.parent){
                            this.$http.put(this.url,this.parent).then(res=>{
                                if (res.data.status==="ok"){
                                    this.$message({
                                        type:"success",
                                        message:"添加成功"
                                    });
                                    this.fetchData();
                                    this.dialogVisible=false;
                                    this.parent=null;
                                }
                            })
                        }else{
                            this.$http.post(this.url,this.formData).then(res=>{
                                if (res.data.status==="ok"){
                                    this.$message({
                                        type:"success",
                                        message:"添加成功"
                                    });
                                    this.fetchData();
                                    this.dialogVisible=false;

                                }
                            })
                        }

                    }
                })
            },
            success(res){
                this.imageUrl="/upload/"+res.path;
            },
            success2(res){
                this.newImageUrl="/upload/"+res.path;
            },
            add() {
                this.dialogVisible = true
            },
            fetchData() {
                this.$http.get(this.url).then((res) => {
                    // console.log(res);
                    this.data = res.data.data;
                    this.$message({
                        type: 'success',
                        message: '获取成功!'
                    });
                })
            },
            append(node,data) {
                // console.log(data);
                this.parent=data;
                if (this.parent){
                    this.dialogVisible=true;
                    this.parent.children.push(this.formData);
                }
                // let id = 1000;
                // const newChild = {id: id++, label: 'testtest', children: []};
                // if (!data.children) {
                //     this.$set(data, 'children', []);
                // }
                // data.children.push(newChild);
            },
            remove(node, data) {
                if (node.level===1){
                    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$http.delete(this.url + "/" + data._id).then((res) => {
                            if (res.data.status === "ok") {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                this.fetchData();
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '删除失败!'
                                });
                            }

                        })
                        // const parent = node.parent;
                        // const children = parent.data.children || parent.data;
                        // const index = children.findIndex(d => d.id === data.id);
                        // children.splice(index, 1);
                    })
                }else{
                    this.parent= node.parent.data;
                    let index=this.parent.children.findIndex(v=>v._id==data._id);
                    this.parent.children.splice(index,1);
                    this.updatechildren();
                    // this.parent= node.parent.children;
                }


            },
            updatechildren(){
                this.$http.put(this.url,this.parent).then(res=>{
                    if (res.data.status==="ok"){
                        this.$message({
                            type:"success",
                            message:"修改成功"
                        });
                        this.fetchData();
                        this.dialogVisible=false;
                        this.dialogVisible2=false;
                        this.imageUrl="";
                        this.newImageUrl="";
                        this.parent=null;
                        this.formData={};
                        this.updateData={};

                    }
                })
            }
        },
        created(){

        },
        mounted() {
            this.fetchData();

        }
    }
</script>

<style>
    .el-form-item__label::before{
        content: '';
    }
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        /*justify-content: space-between;*/
        font-size: 14px;
        padding-right: 8px;

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
        width: 78px;
        height: 78px;
        line-height: 78px;
        text-align: center;
    }
    .avatar {
        width: 78px;
        height: 78px;
        display: block;
    }
</style>