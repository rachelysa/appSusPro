import { emailService } from "../services/email-service.js";

export default {
    template: `
    <section>
        <div v-if="email" class="email-details">
                <div class="subject">
                    {{this.email.subject}}
                </div>
                <div class="actions">
                    {{sentTimeDisplay}}
                    <i class="fas fa-star" v-if="email.isStarred"></i>
                    <i class="far fa-star" v-else></i>
                    <i class="fas fa-reply"></i>
                    <i class="far fa-trash-alt" @click="remove"></i>
                    <router-link :to="{ path: '/note', query: { title: email.subject, txt: email.body }}">
                        <i class="far fa-sticky-note" title="Save as Note"></i>
                    </router-link>
                </div>
                <div class="body">
                    {{this.email.body}}
                </div>
            </form>
        </div>
    </section>`,
    data() {
        return {
            email: null
        }
    },
    computed: {
        sentTimeDisplay(){
            return  new Date(this.email.sentAt).toLocaleString();
        }
    },
    watch: {
        '$route.params.emailId': {
            immediate: true,
            handler() {
                const { emailId } = this.$route.params;
                emailService.getEmailById(emailId)
                .then(email => {
                    this.email = email
                })
            }
        }
    },
    methods: {
        remove(){
            this.$emit('deleteEmail', this.email.id)
        }
    }
}