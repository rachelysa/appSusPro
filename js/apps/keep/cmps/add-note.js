import { KeepService } from "../services/keep-service.js";

export default {
  template: `
        <section class="add-node" :style="styleObject" > 
          <!--  -->
        <input class="edit-txt" type="text"  v-model="txt" :placeholder="title" />
      <button class="btn-note-type" title="text type" @click="setType('txtNote','enter note')"><i class="fas fa-font"></i></button>
      <button class="btn-note-type" title="img type" @click="setType('imgNote','enter img url')"><i class="far fa-image"></i></button>
      <button class="btn-note-type" title="video type" @click="setType('videoNote','enter video url')"><i class="fab fa-youtube"></i></button>
      <button class="btn-note-type" title="todos type" @click="setType('todosNote','enter todos')"><i class="fas fa-list-ul"></i></button>
      <!-- <div class="color-container">
   
    <div class="color-palete"><i class="fas fa-palette"></i></div> 
    <input class="color-input" type="color" v-model="styleObject.backgroundColor"/>
  </div> -->
        <button class="btn-note-type"  title="save note" @click="saveNote()"><i class="far fa-save"></i></button>
        </section>
    `,
  data() {
    return {

      txt: '',
title:'enter txt',
      type: 'txtNode',
      styleObject: {
        backgroundColor: '#fff',

      }

    }
  },
  computed: {
    imgSrc() {
      console.log(this.img.src);
      return this.img.src || ''
    },

  },
  methods: {
    setImgSrc(src) {
      this.img.src = src
    },
    setBackColor(color) {
      this.styleObject.backgroundColor = color

    },
    setType(type,title) {
      this.type = type
      this.title=title

    },
    createTxtNote() {
      return {
        id: '',
        type: this.type,
        info: {
          txt: this.txt
        },
        style: {
          backgroundColor: this.styleObject.backgroundColor
        }
      }
    },
    createImgVideoNote() {
      return {
        id:'',
        type: this.type,
        info: {
            url: this.txt,
            title: ''
        },
        style: {
            backgroundColor:this.styleObject.backgroundColor
        }
      }
    }, 
    createTodosNote() {
      return {
        id:'',
        type: this.type,
        info: {
          label: '',
          todos: [
              { txt: this.txt, doneAt: null },
             
          ]
        },
        style: {
            backgroundColor:this.styleObject.backgroundColor
        }
      }
    }, 
   
    saveNote() {
      var note;
      switch (this.type) {
        case 'txtNote':{ 
          note = this.createTxtNote();
          break;
        }
        case 'imgNote':{ 
          note = this.createImgVideoNote();
          break;
        }
        case 'videoNote':{ 
          note = this.createImgVideoNote();
          break;
        }
        case 'todosNote':{ 
          note = this.createTodosNote();
          break;
        }
      }
   
        KeepService.saveTxt(note).then(res => {
          this.txt = '';
          this.styleObject.backgroundColor = '#fff'
          this.$emit('saveNote', true)
        })
    }
  },
  computed: {
    // backColor() {
    //   return 'background-color:' + this.backColor
    // }
  },
  components: {

  }
}