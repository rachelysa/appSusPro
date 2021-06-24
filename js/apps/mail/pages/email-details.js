import { emailService } from "../services/email-service.js";

export default {
    props: ['email'],
    template: `
    <section>
        <div class="email-details">
                <div class="subject">
                    {{this.email.subject}}
                </div>
                <div class="actions">
                    {{sentTimeDisplay}}
                    <i class="fas fa-star" v-if="email.isStarred"></i>
                    <i class="far fa-star" v-else></i>
                    <i class="fas fa-reply"></i>
                    <i class="far fa-trash-alt" @click="remove"></i>
                </div>
                <div class="body">
                    {{this.email.body}}
                </div>
            </form>
        </div>
    </section>`,
    data() {
        return {
        }
    },
    computed: {
        sentTimeDisplay(){
            return  new Date(this.email.sentAt).toLocaleString();
        }
    },
    // watch: {
    //     '$route.params.emailId': {
    //         immediate: true,
    //         handler() {
    //             const { emailId } = this.$route.params;
    //             emailService.getEmailById(emailId)
    //             .then(email => this.email = email)
    //         }
    //     }
    // },
    methods: {
        // sendEmail() {
        //     console.log('clicked')
        //     this.$emit('sendEmail', this.email)
        // },
        remove(){
            this.$emit('deleteEmail', this.email.id)
        }
    }
}