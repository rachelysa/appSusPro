import emailPreview from './email-preview.js';

export default {
    props: ['emails'],
    template: `
    <ul class="email-list">
        <li v-for="email in emails"> <!--add id to emails -->
            <email-preview :email="email" @deleteEmail="deleteEmail" @click.native="read(email)"></email-preview>
        </li>
    </ul>
    `,
    components: {
        emailPreview
    },
    methods: {
        deleteEmail(emailId){
            this.$emit('deleteEmail', emailId)
        },
        read(email){
            email.isRead = true;
            this.$emit('read', email)
        }
    }
}