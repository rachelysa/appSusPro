import { emailService } from '../services/email-service.js';
import emailPreview from './email-preview.js';
import emailFilter from '../cmps/email-filter.js';
import { showMsg } from '../../../services/event-bus-service.js';

export default {
    template: `
    <div class="container">
        <email-filter class="email-filter" @filtered="setFilter" />
        <ul class="email-list" v-if="emailsToShow">
            <li v-for="email in emailsToShow" :key="email.id">
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
            if (!this.filterBy) return this.emails;
            const searchStr = this.filterBy.text.toLowerCase();
            const emailsToShow = this.emails.filter(email => {
              if (this.filterBy.isRead)
                return (email.subject.toLowerCase().includes(searchStr) ||
                  email.body.toLowerCase().includes(searchStr)) && (
                    this.filterBy.isRead === 'all' ||
                    (this.filterBy.isRead === 'read' && email.isRead) ||
                    (this.filterBy.isRead === 'unread' && !email.isRead))
            });
            return emailsToShow;
        }
    },
    // created() {
    //     this.getAllEmails();
    // },
    methods: {
        getAllEmails() {
            emailService.query()
                .then(emails => {
                    this.emails = emails
                    this.emails.sort((a, b) => b.sentAt - a.sentAt)
                })
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
                    showMsg({txt: 'Message Deleted', type: 'success'})
                    this.getAllEmails()
                })
                .catch(() => {
                    showMsg({ txt: 'Error, please try again', type: 'error' })
                })
        },
        toggleRead(email) {
            console.log(email)
            emailService.updateEmail(email);

        },
        read(email) {
            console.log(email)
            email.isRead = true;
            this.selectedEmail = email;
            console.log(this.$route)
            const path = this.$route.path
            const formattedPath =  path.charAt(path.length-1) === '/' ? path : path + '/';
            emailService.updateEmail(email)
                .then(email => this.$router.push(formattedPath + email.id))
            // this.$emit('read', email) //update unread emails
            //TODO Move to details
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        getUnreadAmount() {
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
                else if (path.startsWith('starred')) this.getStarredEmails()
            }
        }
    },
    components: {
        emailPreview,
        emailFilter
    }
}