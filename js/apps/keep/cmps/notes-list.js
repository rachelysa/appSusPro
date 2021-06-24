import { notesService } from '../services/notes-service.js';
import notePreview from './note-preview.js';

export default {
    props: ['notes'],
    template: `
    <div class="notes-list">
        <div  v-for="note in notes"  >

            <note-preview  :currNote="note"   @deleteNote="deletenote"  :style="note.style" @change="change" />

        </div>
    </div>
    `,
    computed: {
      
    },
    methods: {
     
        selectednote(noteId) {
            this.$emit('selected', noteId);
        },
        deletenote(noteId) {
            this.$emit('deleteNote', noteId)
        },
        change(note) {

            this.$emit('change', note)
        },

    },
    components: {
        notePreview
    }

};