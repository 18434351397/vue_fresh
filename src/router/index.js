import Vue from 'vue'
import Router from 'vue-router'
import Banner from '@/components/banner'
import category from '@/components/category'
import Goods from '@/components/goods'
import Users from '@/components/users'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/user',
            name: "users",
            component: Users
        },
        {
            path: '/goods',
            name: "goods",
            component: Goods
        },
        {
            path: '/banner',
            name: "banner",
            component: Banner
        },
        {
            path: '/category',
            name: "category",
            component: category
        }
    ]
})
