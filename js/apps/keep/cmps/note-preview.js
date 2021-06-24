import imgNote from "./dinamic cmps/img-note.js";
import txtNote from "./dinamic cmps/txt-note.js";
import todosNote from "./dinamic cmps/todos-note.js";
import videoNote from "./dinamic cmps/video-note.js";
import audioNote from "./dinamic cmps/audio-note.js";
import { notesService } from "../services/notes-service.js";
export default {
    props: ['currNote'],
    template: `
    <div class="note-preview":style="currNote.style" >
        <div @mouseover="togglehover(true)"  @mouseleave="togglehover(false)">
    <component  
    class="dinamic-preview"
        :is="currNote.type"
        :edit="isEdit"
        :note="currNote"
        @update="update"
        @click.native="editNode(false)"

        
  
       > 
       <!-- -->
            </component> 
            <div  class="note-container">
                 <button class="btn-note-type type-icon-preview" ><i :class="typeIcon"></i></button>
                <div class="action-note-container" v-if="isHover">
           
             <button class="btn-note-type" @click="deleteNote()"><i class="far fa-trash-alt"></i></button>
             <button class="btn-note-type" @click="changePin" :class="isPinned"><i class="fas fa-thumbtack" ></i></button> 
            
             <div class="color-container"> 
   
               <div class="color-palete"><i class="fas fa-palette"></i></div> 
                <input class="color-input" type="color" @input="setBackColor()" v-model="currNote.style.backgroundColor"/>
                 </div>
                 <button class="btn-note-type"   @click="editNode(isEdit)"><i class="far fa-edit"></i></button>
            </div></div>
            
            
    </div>
</div>
   
    `,
    data() {
        return {
            isEdit: false,
            isHover: false
        }
    },
    methods: {
        deleteNote() {
            this.$emit('deleteNote', this.currNote.id)
        },
        setBackColor() {

            this.$emit('change', this.currNote)
        },
        update(Note) {
            notesService.update(Note).then(res => {
                this.currNote = res;
                this.isEdit = false
            })
        },
        editNode(isTrue) {
            this.isEdit = !isTrue
        },
        changePin() {
            this.currNote.isPinned = !this.currNote.isPinned;
            this.$emit('change', this.currNote)
        },
        togglehover(isTrue) {
            this.isHover = isTrue
        }
    },
    computed: {
        isPinned() {
            return this.currNote.isPinned ? 'pinned' : ''
        },
        typeIcon() {
            switch (this.currNote.type) {
                case 'txtNote': {
                    return 'fas fa-font'
                }
                case 'imgNote': {
                    return 'far fa-image'
                }
                case 'videoNote': {
                    return 'fab fa-youtube'
                }
                case 'todosNote': {
                    return 'fas fa-list-ul'
                }
                case 'audioNote': {
                    return 'fas fa-music'
                }
            }
        }
    },
    components: {
        imgNote,
        txtNote,
        todosNote,
        videoNote,
        audioNote
    }
};
