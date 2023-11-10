<script>
import axios from 'axios';

export default {
    name: 'UpdateProductForm',
    props: [],
    setup(){

    },
    data(){
        return {
            add_product_form:{
                no: 0,
                productName: '',
                price: -1,
                feeRate: -1,
            },
            msgStatus: -1,//0->primary, 1=>success, 2=>warning, 3=>error
            msg: '',
            msgClass: 'alert alert-primary',
        };
    },
    methods:{
        add_product_form_on_submit(e){
            if(this.add_product_form.productName=='' || this.add_product_form.price==-1 || this.add_product_form.feeRate==-1){
                this.msgStatus = 2;
                this.msg = "請先填寫好金融商品名稱或金融商品價格或手續費率!";
                return;
            }
            axios.put('/product/'+this.$route.params.id, this.add_product_form).then(res=>{
                this.msgStatus = 1;
                this.msg = "編輯金融商品成功!";
            }).catch(err=>{
                this.msgStatus = 3;
                this.msg = "編輯金融商品失敗!";
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
        axios.get('/product/'+this.$route.params.id).then(res=>{
            this.add_product_form.no = res.data.no;
            this.add_product_form.productName = res.data.productName;
            this.add_product_form.price = res.data.price;
            this.add_product_form.feeRate = res.data.feeRate;
            this.msgStatus = 1;
            this.msg = "取得金融商品成功!";
        }).catch(err=>{
            this.msgStatus = 3;
            this.msg = "取得金融商品失敗!";
            this.$router.push('/');
        })
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
        <h1>編輯金融商品資訊</h1>
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
                    <input type="number" class="form-control" id="price" min="1" max="1000000000000" v-model="add_product_form.price">
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