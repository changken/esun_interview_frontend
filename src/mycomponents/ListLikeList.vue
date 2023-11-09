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
        //this.retrieve_likelist();
    },
    methods:{
        retrieve_likelist(){
            axios.get("/likelist").then(res => {
                this.likelist = res.data;
                this.msg=this.likelist;
                if(this.likelist){
                    //display
                }else{
                    this.msg = "nothing to display";
                }
            });
        }
    }
}

</script>

<template>
    <div class="container" v-on:click="retrieve_likelist">
        <h1>List</h1>
        <div class="col-4" v-for="item in this.likelist">
            <div class="card">
                <h5 class="card-header">SN: {{ item.SN }}, Product No: {{ item.Product_No }}</h5>
                <div class="card-body">
                    <h5 class="card-title">UserId: {{ item.UserID }}, Account: {{ item.Account }}</h5>
                    <p class="card-text">Order Amount: {{ item.OrderAmount }}, Total Fee: {{ item.TotalFee }}, Total Amount: {{ item.TotalAmount }}</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>
    </div>
</template>