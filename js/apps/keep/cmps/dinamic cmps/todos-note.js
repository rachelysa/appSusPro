import { notesService } from "../../services/notes-service.js";

export default {
    props: ['note','edit'],
    template: `
    <div class="note-preview-todos">
       <ul> 
           <h3 v-if="!edit">{{todos.info.title}}</h3>
            <input class="edit-txt"type="text" v-else v-model="todos.info.title" >
           <li class="todo"  v-for=" (item ,idx) in todos.info.txt">
              
             <p>{{item.todo}}</p>  
             <input type="checkbox"  :checked="item.doneAt" @click="changeTodo(idx)"/>

           
        </li>
        <form @submit="addTodo()" v-if="edit">
        <input class="edit-txt"type="text"  v-model="newTodo" placeholder="add todo">
    </form>
        <button v-if="edit" class="btn-note-type"  title="save note" @click.stop.prevent="updateTxt()"><i class="far fa-save"></i></button>
       </ul>
    </div>
    `,data(){
        return{
            todos:this.note,
            newTodo:'',
           
        }
    },
    computed:{
       
    },
    methods:{
        isDone(todo){
            if(todo.isDone) return 'styleTodo';
        },
        changeTodo(idx){
            if(this.todos.info.txt[idx].doneAt) this.todos.info.txt[idx].doneAt=null
          else  this.todos.info.txt[idx].doneAt=Date.now();
            notesService.saveTodos(this.todos).then(updateTodos=>{
                this.todos=updateTodos;
            })
        },
        addTodo(){
      
            this.todos.info.txt.push({todo:this.newTodo,doneAt:null});
            notesService.saveTodos(this.todos).then(updateTodos=>{
                this.todos=updateTodos;
                this.newTodo=''
            })
        },
        updateTxt(){
            this.$emit('update',this.todos)
        }
    }
};
