import { emailService } from '../services/email-service.js';
import emailStatus from '../cmps/email-status.js';

export default {
  template: `
  <section class="email-app app-main">
        <nav> 
            <router-link to="/mail/compose" class="nav">
                <button class="compose-btn"><i class="fas fa-plus"></i> Compose</button>
            </router-link> 
            <router-link to="/mail/inbox" active-class="active-link">
                <i class="fas fa-inbox"></i> Inbox
            </router-link>
            <router-link to="/mail/starred" active-class="active-link">
                <i class="fas fa-star"></i> Starred
            </router-link> 
            <router-link to="#" active-class="active-link">
                <i class="fas fa-share-square"></i> Sent Email
            </router-link> 
            <router-link to="#" active-class="active-link"> Drafts</router-link>
            <!-- <li><email-status :emails="emailsToStatus" /></li>s -->
        </nav>
      <div class="main-content">
          <router-view></router-view>
      </div>
  </section>`,
  created() {
    this.$router.push('/mail/inbox')
  },
  components: {
    emailStatus,
  }
}