

export default {
    props: ['keep','edit'],
    template: `
    <div class="keep-preview-txt" v-if="currkeep">
        <p v-if="!edit">{{currkeep.info.txt}}</p>
        <input class="edit-txt"type="text" v-else v-model="currkeep.info.txt" @input="updateTxt()">
    </div>
    `,
    data(){
        return{
        currkeep:this.keep,
    }
    },
    methods:{
        updateTxt(){
            this.$emit('updateTxt',this.currkeep)
        }
    }
};
