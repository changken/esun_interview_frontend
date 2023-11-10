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
            verificationResult:{
                userId: false,
                userName: false,
                email: false,
                account: false,
            
            }
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
                this.msg = "請確實填寫表單!";
                return;
            }

            if(!this.verificationResult.userId || !this.verificationResult.userName || !this.verificationResult.email || !this.verificationResult.account){
                this.msgStatus = 2;
                this.msg = "請填寫正確的表單!";
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
            this.verificationResult.userId =  /^[A-Z][12]\d{8}$/.test(val);
            if(!this.verificationResult.userId){
                this.msgStatus = 2;
                this.msg = "身分證格式錯誤!";
            }else{
                this.msgStatus = 1;
                this.msg = "身分證格式正確!";
                this.retrieve_user();
            }
        },
        "add_user_form.userName": function(val){
            this.verificationResult.userName = /^[\u4e00-\u9fa5]{2,4}$/.test(val);
            if(!this.verificationResult.userName){
                this.msgStatus = 2;
                this.msg = "姓名格式錯誤!(2~4個字元)";
            }else{
                this.msgStatus = 1;
                this.msg = "姓名格式正確!";
            }
        },
        "add_user_form.account": function(val){
            this.verificationResult.account = /^\d{8,14}$/.test(val);
            if(!this.verificationResult.account){
                this.msgStatus = 2;
                this.msg = "帳號格式錯誤!(8~14個數字)";
            }else{
                this.msgStatus = 1;
                this.msg = "帳號格式正確!";
            }
        },
        "add_user_form.email": function(val){
            this.verificationResult.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
            if(!this.verificationResult.email){
                this.msgStatus = 2;
                this.msg = "電子郵件格式錯誤!";
            }else{
                this.msgStatus = 1;
                this.msg = "電子郵件格式正確!";
            }
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
                    <input type="text" class="form-control" id="userId" v-model="add_user_form.userId" maxlength="10" placeholder="您的身分證字號">
                </div>
                <div class="mb-3">
                    <label for="userName" class="form-label">使用者姓名:</label>
                    <input type="text" class="form-control" id="userName" v-model="add_user_form.userName" minlength="2" maxlength="4" placeholder="您的姓名">
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">使用者電子郵件:</label>
                    <input type="email" class="form-control" id="email" v-model="add_user_form.email" placeholder="example@example.com">
                </div>
                <div class="mb-3">
                    <label for="account" class="form-label">使用者預扣款帳號:</label>
                    <input type="text" class="form-control" id="account" v-model="add_user_form.account" minlength="8" maxlength="14" placeholder="8~14位數字">
                </div>
                <button type="button" class="btn btn-primary" v-on:click="add_user_form_on_submit()">新增</button>
            </form>
        </div>
    </div>
    
</template>