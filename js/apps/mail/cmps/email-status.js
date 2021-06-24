export default {
    props: ['emails'],
    template: `
    <section>
        <!-- {{readPercent}} -->
        ---Status-here---

    </section>`,
    computed: {
        readPercent(){
            console.log(this.emails)
            const total = this.emails.length;
            const read = this.emails.filter(email => email.isRead).length;
            console.log(read/total)
            return read/total
        }

    }
}