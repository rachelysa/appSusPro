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
                <i class="fas fa-inbox"></i> Inbox <span v-if="unread">{{unread}}</span>
            </router-link>
            <router-link to="/mail/starred" active-class="active-link">
                <i class="fas fa-star"></i> Starred
            </router-link> 
            <router-link to="/mail/sent" active-class="active-link">
                <i class="fas fa-share-square"></i> Sent
            </router-link> 
            <email-status v-if="status" :status="status" />
        </nav>
      <div class="main-content">
          <router-view @status="updateStatus" @unreadAmount="updateUnread"></router-view>
      </div>
  </section>`,
    data() {
        return {
            status: { total: 5, read: 2},
            unread: null
        }
    },
    methods: {
        updateStatus(status) {
            this.status = { ...status }
        },
        updateUnread(amount) {
            this.unread = amount;
        }
    },
    components: {
        emailStatus,
    },
}