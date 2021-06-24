export default {
    // props: ['email'],
    template: `
    <section class="email-compose">
        <div class="email-header">
            New Message
        </div>
        <div class="email-content">
            <form @submit.prevent="sendEmail">
                <div class="subject-container">
                    <!-- Subject: -->
                    <label for="subject"></label>
                    <input type="text" id="subject" v-model="email.subject" autocomplete="off" placeholder="Subject" />
                </div>
                <div class="body-container">
                    <label for="body"></label>
                    <textarea name="" id="body" cols="100" rows="20" v-model="email.body" placeholder="Enter message here..."></textarea>
                </div>
                <div class="email-footer">
                    <button class="send-btn">Send</button>
                    <!-- <button type="button" class="delete-btn" @click="remove">Delete</button> -->
                    <i class="far fa-trash-alt delete-btn" @click="remove"></i>
                    <!-- <router-link to='/mail' class="delete-btn" >Delete</router-link> -->
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
    created(){
        console.log(this.$route)
    },
    methods: {
        sendEmail() {
            console.log('clicked')
            this.$emit('sendEmail', this.email)
        },
        remove(){
            this.$emit('deleteNewEmail', this.email)
        }
    }
}