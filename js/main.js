
import { router } from './routes.js';
const options = {
    el: '#app',
    router,
    template: `
        <section>

            <router-view />
        </section>
    `,
    components: {
       
    }
};

const app = new Vue(options);

