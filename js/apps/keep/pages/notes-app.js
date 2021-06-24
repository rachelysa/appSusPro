
import noteList from '../cmps/notes-list.js';
import addNote from '../cmps/add-note.js';
import noteFilter from '../cmps/notes-filter.js'
import { notesService } from '../services/notes-service.js';
export default {
    template: `
        <section class="note-app">
           <add-note @saveNote="loadnotes"/>
           <note-filter @filtered="filternotes" />
           <note-list :notes="pinned" @selected="selectnote" @deleteNote="deleteNote" @change="editNote"/>
        
          <note-list :notes="notPinned" @selected="selectnote" @deleteNote="deleteNote" @change="editNote"/>
        </section>
    `,
    data() {
        return {
            notes: [],
             filterednotes:[]
        };
    },
    created() {

        this.loadnotes();
    },
    methods: {
        loadnotes() {
            notesService.query().then(notes => {
                this.notes = notes;
                this.filterednotes=this.notes;
            })
        },
        filterByPinned(isPinned) {
            return this.filterednotes.filter(note => {
                return note.isPinned === isPinned
            })
            
        },
        filternotes(txt){
            txt=txt.toLowerCase();
            var filterednotes= this.notes.filter(note=>{
                if(note.type==='todosNote'){
                    if(note.info.title.toLowerCase().includes(txt)) return note.info.title.toLowerCase().includes(txt);
                    return note.info.txt.filter(todo=>{
                        return todo.todo.toLowerCase().includes(txt);
                    })
                    
                }
                return note.info.title.toLowerCase().includes(txt) ||note.info.txt.toLowerCase().includes(txt)
            });
            this.filterednotes=filterednotes
        },
        selectnote(noteId) {

            this.$router.push('/note/' + noteId)

        },
        deleteNote(noteId) {
            notesService.removeNote(noteId).then(res => {
                this.loadnotes()
            })
        },
        editNote(note) {
            notesService.update(note).then(res => {
                this.loadnotes()
            })
        }



    },
    computed: {
        pinned() {
            return this.filterByPinned(true);
          
        },
        notPinned(){
            return this.filterByPinned(false)
        }
    },
    components: {
        noteList,
        addNote,
        noteFilter
    }
};
