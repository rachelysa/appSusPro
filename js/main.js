import appHeader from "./cmps/app-header.js"
import { router } from './routes.js';
import userMsg from './cmps/user-msg.js';

const options = {
    el: '#app',
    router,
    template: `
        <section>
            <user-msg />
            <app-header />
            <router-view />
        </section>
    `,
    components: {
        appHeader,
        userMsg
    }
};

const app = new Vue(options);

