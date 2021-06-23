import imgNote from "../cmps/img-note.js";
import txtNote from "../cmps/txt-note.js";
import todosNote from "../cmps/todos-note.js";
import videoNote from "../cmps/video-note.js";
// import editItems from "../cmps/edit-items.js"
import { KeepService } from "../services/keep-service.js";
export default {
    // props: ['currKeep'],
    template: `
    <div class="keep-preview note-details" v-if="keep" :style="keep.style">
    <component  
        :is="keep.type" 
        :keep="keep" :edit="true" @updateTxt="update">
            </component>
           
            <!-- <edit-items @backColor="setBackColor"/> -->
    </div>
    `,
    data(){
        return{
            keep:null        }
    },
     created() {
        const { noteId } = this.$route.params;
        this.getKeepById(noteId)
    },
    methods: {
        getKeepById(id) {
            KeepService.getKeepById(id)
                .then(keep => this.keep = keep);
        },
        update(){
            KeepService.update(this.keep).then(res=>{
                this.keep=res
            })
        },
        setBackColor(color) {
            this.keep.style.backgroundColor = color
            this.update()
          },
    },
    components:{
        imgNote,
        txtNote,
        todosNote,
        videoNote,
        // editItems
    }
};
