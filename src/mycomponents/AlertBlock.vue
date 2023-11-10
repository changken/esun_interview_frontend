<script>
export default {
    name: 'AlertBlock',
    props: {
        msgStatus:{
            type: Number,//0->primary, 1=>success, 2=>warning, 3=>error
            default: 0
        }, 
        msg:{
            type: String,
            default: ''
        
        }},
    setup(){
        
    },
    data(){
        return {
           msgClass: 'alert alert-primary'
        };
    },
    methods:{
        get_msg_status(){
            switch(this.props.msgStatus){
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
        'msgStatus': function(val){
            this.msgClass = this.get_msg_status();
        }
    }
}
</script>

<template>
    <div v-bind:class="msgClass">
        {{ props.msg }}
    </div>
</template>