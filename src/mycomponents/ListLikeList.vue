<script>
import axios from 'axios';

export default {
    name: 'ListLikeList',
    props: [],
    data() {
        return {
            likelist:[],
            msg: 'List'
        }
    },
    setup(){
    },
    methods:{
        retrieve_likelist(){
            axios.get("/likelist").then(res => {
                this.likelist = res.data;
            });
        }
    },
    mounted(){
        this.retrieve_likelist();
    }
}

</script>

<template>
    <div class="container"><!--v-on:click="retrieve_likelist"-->
        <h1>列出所有偏好金融商品</h1>
        <div class="col-6 mb-2" v-for="item in likelist">
            <div class="card">
                <h5 class="card-header">商品名稱: {{ item.Product_Name }}</h5>
                <div class="card-body">
                    <h5 class="card-title">扣款帳號: {{ item.Account }}，帳號所有人: {{ item.User_Name}}<br>
                    Email: {{ item.Email }}</h5>
                    <p class="card-text">
                        <ul>
                            <li>商品價格: NT$ {{ item.Price }}</li>
                            <li>商品手續費率: {{ (item.Fee_Rate*100).toFixed(3) }}%</li>
                        </ul>
                        <ul>
                            <li>訂購數量: {{ item.OrderAmount }} 個</li>
                            <li>總手續費: NT$ {{ item.TotalFee }}</li>
                            <li>總應扣款金額: NT$ {{ item.TotalAmount }}</li>
                        </ul>
                    </p>
                    <router-link :to="/update/+item.SN" class="btn btn-warning d-inline-block mr-2">更新</router-link>
                    <router-link to="/delete" class="btn btn-danger d-inline-block">刪除</router-link>
                </div>
            </div>
        </div>
    </div>
</template>