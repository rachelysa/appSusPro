import { emailService } from '../services/email-service.js';
import emailPreview from './email-preview.js';
import emailFilter from '../cmps/email-filter.js';

export default {
    template: `
    <div class="container">
        <email-filter class="email-filter" @filtered="setFilter" />
        <ul class="email-list">
            <li v-for="email in emails" :key="email.id">
                <email-preview :email="email" @deleteEmail="deleteEmail(email.id)" @click.native="read(email)" @toggleRead="toggleRead(email)"></email-preview>
            </li>
        </ul>
    </div>
    `,
    data() {
        return {
            emails: null,
            filterBy: null
        }
    },
    computed: {
        emailsToShow() {
            return this.emails;
        }
    },
    // created() {
    //     this.getAllEmails();
    // },
    methods: {
        getAllEmails() {
            //add first filter for inbox
            emailService.query()
                .then(emails => {
                    this.emails = emails
                    this.emails.sort((a, b) => b.sentAt - a.sentAt)
                })
            // this.filterBy = { text: '', isRead: 'all' }
        },
        getStarredEmails() {
            emailService.query()
                .then(emails => {
                    this.emails = emails.filter(email => email.isStarred)
                    this.emails.sort((a, b) => b.sentAt - a.sentAt)
                })
        },
        deleteEmail(emailId) {
            console.log(emailId)
            emailService.deleteEmail(emailId)
                .then(res => {
                    this.getAllEmails()
                })
        },
        toggleRead(email){
            console.log(email)
            emailService.updateEmail(email);

        },
        read(email) {
            console.log(email)
            email.isRead = true;
            this.selectedEmail = email;
            console.log(this.$route)
            emailService.updateEmail(email)
            .then(email => this.$router.push(this.$route.path + '/' + email.id))
            // this.$emit('read', email) //update unread emails
            //TODO Move to details
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        getUnreadAmount(){
            let sum = 0;
            this.emails.forEach(email => {
                if (!email.isRead) sum++
            })
            return sum
        },
    },
    watch: {
        '$route': {
            immediate: true,
            handler() {
                //update filter and getEmails 
                const path = this.$route.path.substring(6)
                if (path.startsWith('inbox')) this.getAllEmails();
                else if (path.startsWith('starred')) {
                    console.log('starred')
                    this.getStarredEmails()
                }
            }
        }
    },
    components: {
        emailPreview,
        emailFilter
    }
}