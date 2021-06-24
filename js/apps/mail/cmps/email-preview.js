export default {
    props: ['email'],
    template: `
    <!-- <article class="email-preview" :class="{ read: email.isRead }"></> -->
    <article class="email-preview" :class="read"></>
        <i class="fas fa-star" v-if="email.isStarred" @click.stop="toggleStar"></i>
        <i class="far fa-star" v-else @click.stop="toggleStar"></i>
        <p class="email-subjet">{{email.subject}}</p>
        <!-- <p class="email-body">{{email.body}}</p> -->
        <!-- <p class="email-read">read: {{email.isRead}}</p> -->
        <p class="email-time">{{sentTimeDisplay}}</p>
        <i class="far fa-envelope-open" v-if="email.isRead" @click.stop="toggleRead"></i>
        <i class="far fa-envelope" v-else @click.stop="toggleRead"></i>
        <!-- <i class="fas fa-envelope-open" v-if="email.isRead" @click.stop="toggleRead"></i>
        <i class="fas fa-envelope" v-else @click.stop="toggleRead"></i> -->
        <i class="far fa-trash-alt" @click.stop="deleteEmail"></i>
        <!-- <i class="fas fa-trash" @click="deleteEmail"></i> -->
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
            return `${date.getDate()}/${date.getMonth()+1}`
        },
        read(){
            return { read: this.email.isRead }
        }
    },
    methods: {
        deleteEmail(){
            this.$emit("deleteEmail", this.email.id)
        },
        toggleRead(){
            this.email.isRead = !this.email.isRead;
        },
        toggleStar(){
            this.email.isStarred = !this.email.isStarred;
        }
    }
}