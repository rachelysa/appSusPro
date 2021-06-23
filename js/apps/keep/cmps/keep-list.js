import { KeepService } from '../services/keep-service.js';
import keepPreview from './keep-preview.js';

export default {
    props: ['keeps'],
    template: `
    <div class="keeps-list">
        <div  v-for="keep in keeps"  >
            <keep-preview :currKeep="keep"  @click.native.self="selectedKeep(keep.id)" @deleteNote="deleteKeep"  :style="keep.style" @changeColor="changeColor" />
       <!-- @click.native="selectedKeep(book.id)" -->
        </div>
    </div>
    `,
  
    methods: {

        selectedKeep(keepId) {
            this.$emit('selected', keepId);
        },
        deleteKeep(noteId){
            this.$emit('deleteNote',noteId)
        },
        changeColor(keep) {
          
            this.$emit('changeColor', keep)
          },

    },
    components: {
        keepPreview
    }

};