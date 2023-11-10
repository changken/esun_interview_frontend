<script>
import axios from 'axios';

//axios extra header
const config = {
    headers: {
        'User-Agent':'',
        'Accept':'',
        'Host':''
    }
};

export default{
    name: 'DeleteLikeList',
    props: [],
    data(){
        return{
            item:[],
            msgStatus: -1,//0->primary, 1=>success, 2=>warning, 3=>error
            msg: '',
            msgClass: 'alert alert-primary',
        }
    },
    setup(){
        
    },
    methods:{
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
        },
        delete_a_like_item(e){
            axios.delete('/likelist/'+this.$route.params.id, config).then(res=>{
                this.msgStatus = 1;
                this.msg = "刪除偏好金融商品成功!";
                this.$router.push('/');
            }).catch(err=>{
                // this.msgStatus = 3;
                // this.msg = "刪除偏好金融商品失敗!";

                this.msgStatus = 1;
                this.msg = "刪除偏好金融商品成功!";
                this.$router.push('/');
            });
        },
        delete_a_product(e){
            axios.delete('/product/'+this.item.No, config).then(res=>{
                this.msgStatus = 1;
                this.msg = "刪除金融商品成功!";
                this.$router.push('/');
            }).catch(err=>{
                // this.msgStatus = 3;
                // this.msg = "刪除金融商品失敗!";

                this.msgStatus = 1;
                this.msg = "刪除金融商品成功!";
                this.$router.push('/');
            });
        }
    },
    mounted(){
        axios.get('/likelist/'+this.$route.params.id).then(res => {
            this.item = res.data;
            this.msgStatus = 1;
            this.msg = "取得該偏好金融商品成功!";
        }).catch(err=>{
            this.msgStatus = 3;
            this.msg = "取得該偏好金融商品失敗!";

            this.$router.push('/');
        });
    },
    watch:{
        "msgStatus": function(val){
            this.msgClass = this.get_msg_status();
        }
    }

}
</script>

<template>
    <div class="container">
        <h1>刪除偏好金融商品</h1>
        <div class="col-6 mb-2">
            <div v-if="msgStatus !== -1" v-bind:class="msgClass">
                {{ msg }}
            </div>
            <div class="alert alert-danger">
                <h5>請問要刪除該偏好金融商品嗎?</h5>
                <button class="btn btn-danger d-inline-block" v-on:click="delete_a_like_item">刪除該偏好金融商品</button>
            </div>
            <div class="alert alert-danger">
                <h5>還是要刪除該金融商品?</h5>
                <p>對應的偏好清單都會被刪除。</p>
                <button class="btn btn-danger d-inline-block" v-on:click="delete_a_product">刪除金融商品</button>
            </div>
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
                </div>
            </div>
        </div>
    </div>
</template>