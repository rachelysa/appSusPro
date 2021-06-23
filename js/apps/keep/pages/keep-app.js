
import keepList from '../cmps/keep-list.js';
import addNote from '../cmps/add-note.js';
import { KeepService } from '../services/keep-service.js';
export default {
    template: `
        <section class="keep-app">
           <add-note @saveNote="loadKeeps"/>
           <keep-list :keeps="keeps" @selected="selectKeep" @deleteNote="deleteNote" @changeColor="editNote"/>
          
        </section>
    `,
    data() {
        return {
            keeps: [],

        };
    },
    created() {

        this.loadKeeps();
    },
    methods: {
        loadKeeps() {
            KeepService.query().then(keeps => {
                this.keeps = keeps
            })
        },

        selectKeep(keepId) {

            this.$router.push('/keep/' + keepId)

        },
        deleteNote(noteId) {
            KeepService.removeNote(noteId).then(res => {
                this.loadKeeps()
            })
        },
        editNote(keep) {
            KeepService.update(keep).then(res => {
                this.loadKeeps()
            })
        }



    },
    computed: {

    },
    components: {
        keepList,
        addNote
    }
};
