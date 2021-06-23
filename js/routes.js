import app from './pages/app.js'
import appMail from './apps/mail/pages/mail-app.js'
import appkeep from './apps/keep/pages/keep-app.js'
const routes = [
    {
        path: '/',
        component: app
    },
    {
        path: '/mail',
        component: appMail,
    },
    {
        path: '/keep',
        component: appkeep,
      
    },

   
];

export const router = new VueRouter({ routes });