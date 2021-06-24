import { emailService } from '../services/email-service.js';

export default {
    template: `
    <section class="email-compose">
        <div class="email-header">
            New Message
        </div>
        <div class="email-content">
            <form @submit.prevent="sendEmail">
                <div class="subject-container">
                    <label for="subject"></label>
                    <input type="text" id="subject" v-model="email.subject" autocomplete="off" placeholder="Subject" />
                </div>
                <div class="body-container">
                    <label for="body"></label>
                    <textarea name="" id="body" cols="100" rows="20" v-model="email.body" placeholder="Enter message here..."></textarea>
                </div>
                <div class="email-footer">
                    <button class="send-btn">Send</button>
                    <i class="far fa-trash-alt delete-btn" @click="remove"></i>
                </div>
            </form>
        </div>
    </section>`,
    data() {
        return {
            email: {
                subject: '',
                body: ''
            }
        }
    },
    created() {
        console.log(this.$route)
    },
    methods: {
        sendEmail(email) {
            emailService.addEmail(this.email)
                .then(res => this.$router.push('/mail/inbox/'))
        },
        remove() {
            this.$router.push('/mail/inbox/')
        }
    },
}