export default {
    props: ['email'],
    template: `
    <article class="email-preview">
        <p class="email-subjet">{{email.subject}}</p>
        <!-- <p class="email-body">{{email.body}}</p> -->
        <!-- <p class="email-read">read: {{email.isRead}}</p> -->
        <p class="email-time">{{sentTimeDisplay}}</p>
        <i class="fas fa-envelope-open" v-if="email.isRead"></i>
        <i class="fas fa-envelope" v-else></i>
        <i class="fas fa-trash" @click="deleteEmail"></i>
    </article>
    `,    
    computed: {
        sentTimeDisplay() {
            const date = new Date(this.email.sentAt);
            const today = new Date().getDay()
            // console.log(date);
            if (date.getDay() === today){
                //display time
                let hours = date.getHours()
                let ampm = hours >= 12 ? 'PM' : 'AM';
                hours = hours % 12;
                hours = hours ? hours : 12;
                const minutes = date.getMinutes();
                // console.log(hours, minutes)
                return `${(hours + '').padStart(2, '0')}:${(minutes + '').padStart(2, '0')} ${ampm}`
            }
            //display date - fix
            return `${date.getDate()}/${date.getMonth()}`
            
        }
    },
    methods: {
        deleteEmail(){
            this.$emit("deleteEmail", this.email.id)
        }
    }
}