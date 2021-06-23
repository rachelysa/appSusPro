import { emailService } from '../services/email-service.js';
import emailList from '../cmps/email-list.js';
import emailStatus from '../cmps/email-status.js';
import emailCompose from '../cmps/email-compose.js';
import emailDetails from '../pages/email-details.js';

export default {
  template: `
    <section class="email-app app-main">
          <!-- Mister Email -->
        <nav>
            <ul>
              <li @click="setCompose"><button class="compose-btn">+ Compose</button></li>
              <li @click="setInbox">Inbox</li>
              <li @click="setRead">Starred</li>
              <li >Sent Mail</li>
              <li>Drafts</li>
              <li><email-status /></li>
            </ul> 
        </nav>
        <div class="main-content">
            <email-list v-if="type==='list'" :emails="emailsToShow" @deleteEmail="deleteEmail" @read="readDetails" />
            <email-details v-else-if="type==='details'" :email="selectedEmail"  />
            <email-compose v-else-if="type==='compose'" @sendEmail="sendEmail" @deleteNewEmail="deleteNewEmail" />
        </div>
    </section>
    `,
  data() {
    return {
      emails: null,
      type: 'list',
      selectedEmail: null,
      filterBy: {
        text: '',
        isRead: null,
      }
    }
  },
  computed: {
    emailsToShow() {
      return this.emails;
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
      emailService.query()
        //add first filter for inbox
        .then(emails => this.emails = emails);
    },
    setInbox() {
      const newFilter = { text: '', isRead: null };
      this.filterBy = newFilter;
      this.type = 'list';
    },
    setRead() {
      this.filterBy = { text: '', isRead: true }
    },
    setCompose(){
      this.type = 'compose';
    },
    sendEmail(email){
      emailService.addEmail(email)
      .then(res => {
        console.log(res)
        this.type = 'list';
        this.getAllEmails()
      })
    },
    deleteNewEmail(){
      this.type = 'list';
    },
    deleteEmail(emailId){
      emailService.deleteEmail(emailId)
      .then(res => { 
        console.log('email removed:')
        this.getAllEmails()
      })
    },
    readDetails(email){
      this.type = 'details'
      this.selectedEmail = email;
    }
  },
  components: {
    emailList,
    emailStatus,
    emailCompose,
    emailDetails
  }
}