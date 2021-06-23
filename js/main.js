import appHeader from "./cmps/app-header.js"
import { router } from './routes.js';
const options = {
    el: '#app',
    router,
    template: `
        <section>
        <app-header/>
            <router-view />
        </section>
    `,
    components: {
        appHeader
    }
};

const app = new Vue(options);

