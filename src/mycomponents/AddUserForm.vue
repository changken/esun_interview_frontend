<script>
import axios from 'axios';

export default {
    name: 'AddUserForm',
    props: [],
    setup(){
        
    },
    data(){
        return {
            add_user_form:{
                userId: '',
                userName: '',
                email: '',
                account: '',
            },
            user: null,
            msgStatus: -1,//0->primary, 1=>success, 2=>warning, 3=>error
            msg: '',
            msgClass: 'alert alert-primary',
        }
    },
    methods:{
        retrieve_user(){
            axios.get('/user/'+this.add_user_form.userId).then(res=>{
                this.user = res.data;
                if(res.data){
                    //alert(res.data);
                    this.msgStatus = 2;
                    this.msg = "使用者已存在!";
                }else{
                    this.msgStatus = 0;
                    this.msg = "可以安心新增使用者!";
                }
            }).catch(err=>{
                this.msgStatus = 3;
                this.msg = "查詢發生錯誤!";
            });
        },
        add_user_form_on_submit(e){
            if(this.add_user_form.userName === '' || this.add_user_form.userId === '' || this.add_user_form.email === '' || this.add_user_form.account === ''){
                this.msgStatus = 2;
                this.msg = "請填寫表單!";
                return;
            }
            axios.post('/user', this.add_user_form).then(res=>{
                this.msgStatus = 1;
                this.msg = "使用者新增成功!";
            }).catch(err=>{
                this.msgStatus = 3;
                this.msg = "使用者新增失敗!";
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
        "add_user_form.userId": function(val){
            this.retrieve_user();
            this.verificationResult =  /^[A-Z][12]\d{8}$/.test(val);
        },
        "add_user_form.userName": function(val){
            this.verificationResult = val.length > 1 && val.length <= 20;
        },
        "add_user_form.account": function(val){
            this.verificationResult = /^\d{1,16}$/.test(val);
        },
        "add_user_form.email": function(val){
            this.verificationResult = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        },
        "msgStatus": function(val){
            this.msgClass = this.get_msg_status();
        }
    }
}
</script>

<template>
    <div class="container">
        <h1>新增使用者</h1>
        <div class="col-6">
            <form>
                <div v-if="msgStatus !== -1" v-bind:class="msgClass">
                    {{ msg }}
                </div>
                <div class="mb-3">
                    <label for="userId" class="form-label">使用者身分證字號:</label>
                    <input type="text" class="form-control" id="userId" v-model="add_user_form.userId" maxlength="10">
                </div>
                <div class="mb-3">
                    <label for="userName" class="form-label">使用者姓名:</label>
                    <input type="text" class="form-control" id="userName" v-model="add_user_form.userName" maxlength="20">
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">使用者電子郵件:</label>
                    <input type="email" class="form-control" id="email" aria-describedby="emailHelp" v-model="add_user_form.email">
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="account" class="form-label">使用者預扣款帳號:</label>
                    <input type="text" class="form-control" id="account" v-model="add_user_form.account" maxlength="16">
                </div>
                <button type="button" class="btn btn-primary" v-on:click="add_user_form_on_submit()">新增</button>
            </form>
        </div>
    </div>
    
</template>