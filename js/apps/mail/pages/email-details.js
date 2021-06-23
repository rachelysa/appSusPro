export default {
    props: ['email'],
    template: `
    <section>
        <div class="email-content">
                <div class="subject-container">
                    {{this.email.subject}}
                </div>
                <div class="body-container">
                    {{this.email.body}}
                </div>
            </form>
        </div>
    </section>`,
    data() {
        return {
        }
    },
    methods: {
        // sendEmail() {
        //     console.log('clicked')
        //     this.$emit('sendEmail', this.email)
        // },
        remove(){
            this.$emit('deleteNewEmail', this.email)
        }
    }
}