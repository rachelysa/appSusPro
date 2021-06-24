import { storageService } from "../../../services/async-storage-service.js"
import { emailsData } from './email-data.js'; //add id to emails

const EMAILS_KEY = 'AS-emails';

export const emailService = {
    query,
    getEmailById,
    addEmail,
    deleteEmail
}

function query() { //TODO fix
    return storageService.query(EMAILS_KEY)
    .then(emails => {
        if (!emails || !emails.length) {
            return localStorage.setItem(EMAILS_KEY, JSON.stringify(emailsData))
        }
        return emails
    })
}

function getEmailById(emailId){
    return storageService.get(EMAILS_KEY, emailId)
}

function addEmail(email){
    email.isRead = false;
    email.isStarred = false;
    email.sentAt = Date.now();
    return storageService.post(EMAILS_KEY, email)
}

function deleteEmail(emailId){
    return storageService.remove(EMAILS_KEY, emailId)
}