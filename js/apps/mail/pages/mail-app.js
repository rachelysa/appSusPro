import { emailService } from '../services/email-service.js';
import emailList from '../cmps/email-list.js';
import emailStatus from '../cmps/email-status.js';
import emailCompose from '../cmps/email-compose.js';
import emailFilter from '../cmps/email-filter.js';
import emailDetails from '../pages/email-details.js';

export default {
  template: `
    <section class="container app-main">
          <!-- Mister Email -->
         <email-filter class="email-filter" @filtered="setFilter" />
         <div class="email-app">
           <nav>
             <ul>
               <li @click="setCompose"><button class="compose-btn">+ Compose</button></li>
               <li @click="setInbox">Inbox</li>
               <li @click="setRead">Starred</li>
               <li >Sent Mail</li>
               <li>Drafts</li>
               <!-- <li><email-status :emails="emailsToStatus" /></li> -->
               <li><email-status /></li>
              </ul> 
            </nav>
            <div class="main-content">
              <email-list v-if="type==='list'" :emails="emailsToShow" @deleteEmail="deleteEmail" @read="readDetails" />
              <email-details v-else-if="type==='details'" :email="selectedEmail"  @deleteEmail="deleteEmail" />
              <email-compose v-else-if="type==='compose'" @sendEmail="sendEmail" @deleteNewEmail="deleteNewEmail" />
            </div>
          </div>
    </section>
    `,
  data() {
    return {
      emails: null,
      type: 'list',
      selectedEmail: null,
      filterBy: null
    }
  },
  computed: {
    emailsToShow() {
      return this.emails;
      // this.getAllEmails();

      // if (this.filterBy) return this.emails;
      // const searchStr = this.filterBy.text.toLowerCase();
      // const emailsToShow = this.emails.filter(email => {
      //   if (this.filterBy.isRead)
      //     return (email.subject.toLowerCase().includes(searchStr) ||
      //       email.body.toLowerCase().includes(searchStr)) && (
      //         this.filterBy.isRead === 'all' ||
      //         (this.filterBy.isRead === 'read' && email.isRead) ||
      //         (this.filterBy.isRead === 'unread' && !email.isRead))
      // });
      // return emailsToShow;

      // return this.emails;
      // if (!this.filterBy.text && !this.filterBy.isRead) {
      //   console.log('returning all emails')
      //   return this.getAllEmails(); ///or this.emails;
      // }
      // console.log(this.emails)
      // return this.emails.filter(email => {
      //   //fix in case of name=null (and price is filtered)

      //   console.log('returning only unread emails')
      //   return !email.isRead
      // })
    }
  },
  created() {
    this.getAllEmails();
  },
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
    setInbox() {
      this.filterBy = { text: '', isRead: null };
      this.type = 'list';
    },
    setRead() {
      this.filterBy = { text: '', isRead: true }
    },
    setCompose() {
      this.type = 'compose';
    },
    sendEmail(email) {
      emailService.addEmail(email)
        .then(res => {
          console.log(res)
          this.type = 'list';
          this.getAllEmails()
        })
    },
    deleteNewEmail() {
      this.type = 'list';
    },
    deleteEmail(emailId) {
      emailService.deleteEmail(emailId)
        .then(res => {
          console.log('email removed:')
          this.getAllEmails()
          this.type = 'list';
        })
    },
    readDetails(email) {
      this.type = 'details'
      this.selectedEmail = email;
    },
    setFilter(filterBy) {
      this.filterBy = filterBy;
    },

  },
  // watch: {
  //   '$route.params.emailId': {
  //     immediate: true,
  //     handler() {
  //       console.log(this.$route)
  //       const { emailId } = this.$route.params;
  //       emailService.getEmailById(emailId)
  //         .then(email => {
  //           this.selectedEmail = email
  //           this.type = 'details'
  //         })
  //     }
  //   }
  // },
  components: {
    emailList,
    emailStatus,
    emailCompose,
    emailDetails,
    emailFilter
  }
}