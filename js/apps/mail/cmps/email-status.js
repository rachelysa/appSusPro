export default {
    props: ['status'],
    template: `
    <section class="email-status">
        {{readPercent}}
        <!-- ---Status-here--- -->

    </section>`,
    computed: {
        readPercent(){
            // console.log(this.emails)
            // const total = this.emails.length;
            // const read = this.emails.filter(email => !email.isRead).length;
            console.log(this.status.read/this.status.total)
            return this.status.read/this.status.total
        }

    }
}