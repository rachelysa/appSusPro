import { eventBus } from '../services/event-bus-service.js';

export default {
    template: `
        <div v-if="msg" class="user-msg" :class="msg.type">
            <button class="close-btn" @click="close">X</button>
            <p class="type">{{msg.type}}</p>
            <p>{{msg.txt}}</p>
        </div>`,
    data() {
        return {
            msg: null
        }
    },
    created() {
        eventBus.$on('show-msg', this.showMsg)
    },
    destoryed() {
        eventBus.$off('show-msg', this.showMsg)
    },
    methods: {
        showMsg(msg) {
            this.msg = msg;
            this.timeoutId = setTimeout(() => {
                this.msg = null;
            }, 3000);
        },
        close(){
            this.msg = null;
        }
    },
}