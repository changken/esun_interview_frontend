<script>
import axios from 'axios';

export default {
    name: 'AddProductForm',
    props: [],
    setup(){

    },
    data(){
        return {
            add_product_form:{
                productName: '',
                price: 1,
                feeRate: 0.00001,
            },
            msgStatus: -1,//0->primary, 1=>success, 2=>warning, 3=>error
            msg: '',
            msgClass: 'alert alert-primary',
            verificationResult:{
                productName: false,
                price: false,
                feeRate: false
            }
        };
    },
    methods:{
        add_product_form_on_submit(e){
            if(this.add_product_form.productName=='' || !this.verificationResult.productName){
                this.msgStatus = 2;
                this.msg = "請先填寫好金融商品名稱!";
                return;
            }

            if(this.add_product_form.price==-1 || !this.verificationResult.price){
                this.msgStatus = 2;
                this.msg = "請先填寫好商品價格或檢查商品價格是否在1元~10兆之間!";
                return;
            }
            if(this.add_product_form.feeRate==-1 || !this.verificationResult.feeRate){
                this.msgStatus = 2;
                this.msg = "請先填寫好商品手續費率或檢查商品手續費率是否在0.00001~0.99之間!";
                return;
            }

            axios.post('/product', this.add_product_form).then(res=>{
                this.msgStatus = 1;
                this.msg = "新增金融商品成功!";
            }).catch(err=>{
                this.msgStatus = 3;
                this.msg = "新增金融商品失敗!";
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

    },
    watch:{
        "msgStatus": function(val){
            this.msgClass = this.get_msg_status();
        },
        "add_product_form.productName": function(val){
            this.verificationResult.productName = /^[\u4e00-\u9fa5a-zA-Z0-9]{1,254}$/.test(val);
            if(!this.verificationResult.productName){
                this.msgStatus = 2;
                this.msg = "請先填寫好金融商品名稱!(1~254個中英文數字)";
            }else{
                this.msgStatus = 1;
                this.msg = "金融商品名稱格式正確!";
            }
        },
        "add_product_form.price": function(val){
            this.verificationResult.price = this.add_product_form.price > 0 && this.add_product_form.price <= 1e13;
            if(!this.verificationResult.price){
                this.msgStatus = 2;
                this.msg = "請先檢查金融商品價格是否在1元~10兆之間!";
            }else{
                this.msgStatus = 1;
                this.msg ="金融商品價格格式正確!";
            }
        },
        "add_product_form.feeRate": function(val){
            this.verificationResult.feeRate = this.add_product_form.feeRate >= 0.00001 && this.add_product_form.feeRate <= 0.99
            if(!this.verificationResult.feeRate){
                this.msgStatus = 2;
                this.msg = "請先檢查金融商品手續費率是否在0.00001~0.99之間!";
            }else{
                this.msgStatus = 1;
                this.msg ="金融商品手續費率格式正確!";
            }
        }
    }
}
</script>

<template>
    <div class="container">
        <h1>新增金融商品</h1>
        <div class="col-6">
            <div v-if="msgStatus !== -1" v-bind:class="msgClass">
                {{ msg }}
            </div>
            <form>
                <div class="mb-3">
                    <label for="productName" class="form-label">金融商品名稱:</label>
                    <input type="text" class="form-control" id="productName" v-model="add_product_form.productName">
                </div>
                <div class="mb-3">
                    <label for="price" class="form-label">金融商品價格:</label>
                    <input type="number" class="form-control" id="price" min="1" max="1000000000000" step="1" v-model="add_product_form.price">
                </div>
                <div class="mb-3">
                    <label for="feeRate">手續費率</label>
                    <input step=".00001" min="0.00001" max="0.99"  type="number" class="form-control" id="feeRate" v-model="add_product_form.feeRate">
                </div>
                <button type="button" class="btn btn-primary" v-on:click="add_product_form_on_submit">Submit</button>
            </form>
        </div>
    </div>
</template>