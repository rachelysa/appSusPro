import app from './pages/app.js'
import appMail from './apps/mail/pages/mail-app.js'
import appNotes from './apps/keep/pages/notes-app.js'

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
        path: '/note',
        component: appNotes,
        children:[
         
        ]
      
    },



   
];

export const router = new VueRouter({ routes });