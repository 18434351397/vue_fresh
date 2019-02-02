<template>
    <div id="app">
        <el-container id="container">
            <el-header style="display: flex;align-items: center;">
                <el-button type="primary" style="color:#fff;font-size: 26px;margin:20px 20px 20px 0;">生鲜管理系统</el-button>
            </el-header>
            <el-container>
                <el-aside width="200px" style=" margin-right: 10px;" align="center">
                    <el-menu style="border-radius: 20px; overflow:hidden;" :default-openeds="['system','goods']" :router="true">
                        <el-submenu index="system">
                            <template slot="title">系统管理</template>
                            <el-menu-item index="banner">
                                轮播管理
                            </el-menu-item>
                        </el-submenu>
                        <el-submenu index="goods">
                            <template slot="title">销售管理</template>
                            <el-menu-item index="category">
                                分类管理
                            </el-menu-item>
                            <el-menu-item index="goods">
                                商品管理
                            </el-menu-item>
                        </el-submenu>
                        <el-submenu index="user">
                            <template slot="title">用户管理</template>
                            <el-menu-item index="user">
                                用户管理
                            </el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main style=" background-color: #fff; border-radius: 20px; overflow-y: hidden;height:100%;" ><router-view/></el-main>
            </el-container>
        </el-container>

    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style>
    *{
        padding:0;
        margin:0;
        list-style: none;
    }
    #container{
        width: 1200px;
        margin:0 auto;
        height: auto;

    }
    .el-header{
        height:auto !important;
        padding:0;
    }
    html,body{
        width: 100%;
        height:100%;
        background-color: #ccc;
    }

    #app {
        width:100%;
        height:100%;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
</style>
