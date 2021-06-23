import { KeepService } from "../services/keep-service.js";

export default {
    props: ['keep'],
    template: `
    <div class="keep-preview-todos">
       <ul> 
           <h4>{{todos.info.label}}</h4>
           <li class="todo" v-for=" (item ,idx) in todos.info.todos">
              
             <p>{{item.txt}}</p>  
             <input type="checkbox"  :checked="item.doneAt" @click="changeTodo(idx)"/>

           
        </li>
       </ul>
    </div>
    `,data(){
        return{
            todos:this.keep,
        }
    },
    methods:{
        changeTodo(idx){
            if(this.todos.info.todos[idx].doneAt) this.todos.info.todos[idx].doneAt=null
          else  this.todos.info.todos[idx].doneAt=Date.now();
            KeepService.saveTodos(this.todos).then(updateTodos=>{
                this.todos=updateTodos;
            })
        }
    }
};
