<script>
import axios from 'axios';

export default {
    name: 'UpdateLikeList',
    props: [],
    data() {
        return {
            products: [],
            users: [],
            add_form_data:{
                productNo: -999,
                userId: -999,
                orderAmount: 0,
                totalAmount: 0,
                totalFee: 0,
                account: '',
            },
            product:{
                price: 0,
                feeRate: 0
            },
            msgStatus: -1,//0->primary, 1=>success, 2=>warning, 3=>error
            msg: '',
            msgClass: 'alert alert-primary',
        }
    },
    setup(){
        
    },
    methods:{
        retrieve_products(){
            axios.get('/product').then(res => {
                this.products = res.data;
            });
        },
        retrieve_users(){
            axios.get('/user').then(res => {
                this.users = res.data;
            });
        },
        calc_total_amount(){
            this.add_form_data.totalAmount = this.add_form_data.orderAmount * this.product.price * (1+this.product.feeRate);
            this.add_form_data.totalAmount.toFixed(2);
        },
        calc_total_fee(){
            this.add_form_data.totalFee = this.add_form_data.orderAmount * this.product.price * this.product.feeRate;
            this.add_form_data.totalFee.toFixed(2);
        },
        add_form_data_on_submit(e){
            if(this.add_form_data.productNo==-999 || this.add_form_data.userId==-999 || this.add_form_data.orderAmount==0){
                this.msgStatus = 1;
                this.msg = "請先選擇好金融商品或使用者或選擇數量!";
                return;
            }
            axios.put('/likelist/'+this.$route.params.id, this.add_form_data).then(res => {
                this.msgStatus = 1;
                this.msg = "編輯偏好金融商品成功!";
            }).catch(err => {
                this.msgStatus = 3;
                this.msg = "編輯偏好金融商品失敗!";
            });
        },
        get_msg_status(){
            switch(this.msgStatus){
                case 0:
                    return "alert alert-primary";
                case 1:
                    return "alert alert-success";
                case 2:
                    return "alert alert-warning";
                case 3:
                    return "alert alert-danger";
                default:
                    return "alert alert-info";
            }
        }
    },
    mounted(){
        this.retrieve_products();
        this.retrieve_users();

        if(this.$route.params != undefined){
            axios.get("/likelist/"+this.$route.params.id).then(res => {
                this.add_form_data.productNo = res.data.No;
                this.add_form_data.userId = res.data.UserID;
                this.add_form_data.orderAmount = res.data.OrderAmount;
                this.add_form_data.totalAmount = res.data.TotalAmount;
                this.add_form_data.totalFee = res.data.TotalFee;
                this.add_form_data.account = res.data.Account;
            });
        }
    },
    watch:{
        "add_form_data.productNo": function(val){
            if(val==-1){
                this.msgStatus = 2;
                this.msg = "請先新增(選擇)偏好金融商品!";
            }else{
                axios.get('/product/' + val).then(res => {
                    this.product.price = res.data.price;
                    this.product.feeRate = res.data.feeRate;
                    this.calc_total_amount();
                    this.calc_total_fee();
                });
            }
        },
        "add_form_data.userId": function(val){
            if(val==-1){
                this.msgStatus = 2;
                this.msg = "請先新增(選擇)使用者!";
            }else{
                axios.get('/user/' + val).then(res => {
                    this.add_form_data.account = res.data.account;
                });
            }
        },
        "add_form_data.orderAmount": function(val){
            this.calc_total_amount();
            this.calc_total_fee();
        },
        "msgStatus": function(val){
            this.msgClass = this.get_msg_status();
        }
    }
}
</script>

<template>
    <div class="container">
        <h1>編輯偏好金融商品</h1>
        <div class="col-6">
            <div v-if="msgStatus !== -1" v-bind:class="msgClass">
                {{ msg }}
            </div>
            <form>
                <div class="mb-3">
                    <label for="product"></label>金融商品:
                    <select id="product" class="form-select" aria-label="Default select example" v-model="add_form_data.productNo">
                        <option value="-1">新增偏好金融商品</option>
                        <option v-for="product in products" v-bind:value="product.no">{{ product.no + ", " + product.productName }}</option>
                    </select>
                </div>
                <div class="mb-3" v-if="product.price">
                    <router-link :to="/updateproduct/+add_form_data.productNo" class="btn btn-warning d-inline-block">編輯金融商品資訊</router-link>
                </div>
                <div class="mb-3" v-if="product.price">
                    <label for="price">商品價格:</label>
                    <input type="text" class="form-control" id="price" v-bind:value="'NT$ '+ product.price" readonly>
                </div>
                <div class="mb-3" v-if="product.feeRate">
                    <label for="feeRate">商品手續費率:</label>
                    <input type="text" class="form-control" id="feeRate" v-bind:value="(product.feeRate*100).toFixed(2)+'%'" readonly>
                </div>
                <div class="mb-3">
                    <label for="user">使用者:</label>
                    <select id="user" class="form-select" aria-label="Default select example" v-model="add_form_data.userId">
                        <option value="-1">新增使用者</option>
                        <option v-for="user in users" v-bind:value="user.userId">{{ user.userId + ", " + user.userName }}</option>
                    </select>
                </div>
                <div class="mb-3" v-if="add_form_data.account">
                    <label for="account" class="form-label">訂購帳號</label>
                    <input type="text" class="form-control" id="account" v-bind:value="add_form_data.account" readonly>
                </div>
                <div class="mb-3">
                    <label for="orderAmount">訂購數量:</label>
                    <select id="orderAmount" class="form-select" aria-label="Default select example" v-model="add_form_data.orderAmount">
                        <option v-for="amount in [...Array(999).keys()]" v-bind:value="amount">{{ amount }}</option>
                    </select>
                </div>
                <div class="mb-3" v-if="add_form_data.orderAmount">
                    <label for="totalAmount" class="form-label">總應扣款金額:</label>
                    <input type="text" class="form-control" id="totalAmount" v-bind:value="'NT$ '+ add_form_data.totalAmount" readonly>
                </div>
                <div class="mb-3" v-if="add_form_data.orderAmount">
                    <label for="totalFee" class="form-label">總手續費:</label>
                    <input type="text" class="form-control" id="totalFee" v-bind:value="'NT$ '+ add_form_data.totalFee" readonly>
                </div>
                <button type="button" class="btn btn-primary" v-on:click="add_form_data_on_submit">新增偏好金融商品</button>
            </form>
        </div>
    </div>
</template>