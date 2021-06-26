import { emailService } from '../services/email-service.js';
import emailPreview from './email-preview.js';
import emailFilter from '../cmps/email-filter.js';
import { showMsg } from '../../../services/event-bus-service.js';

export default {
    template: `
    <div class="list-container">
        <email-filter @filtered="setFilter" @sorted="setSort" />
        <ul class="email-list" v-if="emailsToShow">
            <li v-for="email in emailsToShow" :key="email.id">
                <email-preview :email="email" 
                    @deleteEmail="deleteEmail(email.id)" 
                    @click.native="read(email)" 
                    @toggleRead="toggleRead(email)" 
                    @toggleStar="toggleStar(email)">
                </email-preview>
            </li>
        </ul>
        <p class="no-results" v-else>No emails found</p>
    </div>
    `,
    data() {
        return {
            emails: null,
            category: null,
            filterBy: null,
            sortBy: { key: 'date', isAsc: false },
            unreadEmails: null,
            readEmails: null
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
            return (emailsToShow.length === 0) ? null : emailsToShow;
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
                    // this.updateAmount();
                })
        },
        renderEmailsByCategory() {
            if (this.category === 'inbox') this.getInboxEmails();
            else if (this.category === 'starred') this.getStarredEmails();
            else if (this.category === 'sent') this.getSentEmails();
        },
        getInboxEmails() {
        this.category = 'inbox';
        emailService.query()
            .then(emails => {
                this.emails = emails.filter(email => email.to === 'me')
                this.emails.sort((a, b) => b.sentAt - a.sentAt)
                this.calcUnreadAmount();
            })
    },
    getStarredEmails() {
        this.category = 'starred';
        emailService.query()
            .then(emails => {
                this.emails = emails.filter(email => email.isStarred)
                this.emails.sort((a, b) => b.sentAt - a.sentAt)
            })
    },
    getSentEmails() {
        this.category = 'sent';
        emailService.query()
            .then(emails => {
                this.emails = emails.filter(email => email.from === 'me')
                this.emails.sort((a, b) => b.sentAt - a.sentAt)
            })
    },
    deleteEmail(emailId) {
        console.log(emailId)
        emailService.deleteEmail(emailId)
            .then(res => {
                showMsg({ txt: 'Message Deleted', type: 'success' })
                this.renderEmailsByCategory();
            })
            .catch(() => {
                showMsg({ txt: 'Error, please try again', type: 'error' })
            })
    },
    toggleRead(email) {
        emailService.updateEmail(email);
        if (this.category === 'inbox') this.calcUnreadAmount();
    },
    toggleStar(email) {
        emailService.updateEmail(email)
            .then(res => {
                if (this.category === 'starred') this.getStarredEmails();
            })
    },
    read(email) {
        email.isRead = true;
        this.selectedEmail = email;
        console.log(this.$route)
        const path = this.$route.path
        const formattedPath = path.charAt(path.length - 1) === '/' ? path : path + '/';
        emailService.updateEmail(email)
            .then(email => {
                if (this.category === 'inbox') this.calcUnreadAmount();
                this.$router.push(formattedPath + email.id)
            })
        // this.$emit('read', email) //update unread emails
        //TODO Move to details
    },
    setFilter(filterBy) {
        this.filterBy = filterBy;
    },
    setSort(sortBy) {
        this.sortBy = sortBy;
        if (this.sortBy.key === 'date') this.sortByDate(this.sortBy.isAsc)
        else this.sortBySubject(this.sortBy.isAsc)
    },
    calcUnreadAmount() {
        let sum = 0;
        this.emails.forEach(email => {
            if (!email.isRead) sum++
        })
        this.$emit('unreadAmount', sum);
    },
    updateAmount() {
        let readAmount = 0;
        let unreadAmount = 0;
        this.emails.forEach(email => {
            if (email.read) readAmount++
            else unreadAmount++
        })
        this.unreadEmails = unreadAmount;
        this.readEmails = readAmount;
        const total = this.emails.length;
        console.log(this.readEmails / total)
        this.$emit('status', { read: this.readEmails, total })
    },
    sortBySubject(isAsc) {
        this.emails.sort((a, b) => {
            var emailA = a.subject.toUpperCase();
            var emailB = b.subject.toUpperCase();
            if (emailA < emailB) return -1;
            if (emailA > emailB) return 1;
            return 0;
        })
        if (!isAsc) this.emails.reverse();
    },
    sortByDate(isAsc) {
        this.emails.sort((a, b) => {
            var emailA = a.sentAt;
            var emailB = b.sentAt;
            return emailA - emailB
        })
        if (!isAsc) this.emails.reverse();
    },

},
watch: {
    '$route': {
        immediate: true,
            handler() {
            const path = this.$route.path.substring(6);
            if (path.startsWith('inbox')) this.getInboxEmails();
            else if (path.startsWith('starred')) this.getStarredEmails();
            else if (path.startsWith('sent')) this.getSentEmails();
        }
    }
},
components: {
    emailPreview,
        emailFilter
}
}