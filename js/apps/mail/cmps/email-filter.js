export default {
    template: `
    <section class="email-filter">
        <input v-model="filterBy.text" type="search" placeholder="Search mail" @input="filter" />  
        <select v-model="filterBy.isRead" name="read" @change="filter">
            <option value="all">All</option>
            <option value="read">Read</option>
            <option value="unread">Unread</option>
        </select>
    </section>
    `,
    data() {
        return {
            filterBy: {
                text: '',
                isRead: 'all'
            }
        };
    },
    methods: {
        filter() {
            console.log(this.filterBy);
            this.$emit('filtered', {...this.filterBy});
        }
    }
};