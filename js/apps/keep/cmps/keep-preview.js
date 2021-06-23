import imgNote from "./img-note.js";
import txtNote from "./txt-note.js";
import todosNote from "./todos-note.js";
import videoNote from "./video-note.js";
import { KeepService } from "../services/keep-service.js";
export default {
    props: ['currKeep'],
    template: `
    <div class="keep-preview":style="currKeep.style" >
    <component  
        :is="currKeep.type"
        
        :keep="currKeep">
            </component> 
            <div class="action-note-container">
            <button class="btn-note-type" @click="deleteNote()"><i :class="typeIcon"></i></button>
             <button class="btn-note-type" @click="deleteNote()"><i class="far fa-trash-alt"></i></button>
             <button class="btn-note-type" @click="deleteNote()"><i class="fas fa-thumbtack"></i></button> 
            
             <div class="color-container"> 
   
               <div class="color-palete"><i class="fas fa-palette"></i></div> 
                <input class="color-input" type="color" v-model="currKeep.style.backgroundColor"/>
                 </div>
                 <button class="btn-note-type" @click="deleteNote()"><i class="far fa-edit"></i></button>
            </div>
            
            
    </div>
   
    `,
    data(){
        return{
          
        }
    },
    methods: {
        deleteNote() {
            this.$emit('deleteNote', this.currKeep.id)
        },
        setBackColor(color) {
            this.styleObject.backgroundColor = color
            this.$emit('changeColor', this.currKeep)
          },
    },
computed:{
    typeIcon(){
        switch (this.currKeep.type) {
            case 'txtNote':{ 
             return 'fas fa-font'
            }
            case 'imgNote':{ 
              return 'far fa-image'
            }
            case 'videoNote':{ 
             return 'fab fa-youtube'
            }
            case 'todosNote':{ 
              return 'fas fa-list-ul'
            }
          }
    }
},
    components: {
        imgNote,
        txtNote,
        todosNote,
        videoNote
    }
};
