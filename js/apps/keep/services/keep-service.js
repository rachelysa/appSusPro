

import { storageService } from '../../../services/async-storage-service.js';

export const KeepService = {
    query,
    saveTodos,
    saveTxt,
    getKeepById,
    update,
    removeNote
   

}


var gKeeps = [{
    id:"123",
    type: "txtNote",
    isPinned: true,
    info: {
        txt: "Fullstack Me Baby!"
    },
    style: {
        backgroundColor: "#fff475"
    }
},
{
    id:"456",
    type: "imgNote",
    info: {
        url: "blob:http://127.0.0.1:5500/487e75f5-293b-45cd-9969-0acb9dd1a7d2",
        title: "Me playing Mi"
    },
    style: {
        backgroundColor: "#cbf0f8"
    }
},
{
    id:"456",
    type: "videoNote",
    info: {
        url: "https://www.youtube.com/watch?v=ruCl8X-xWPA",
        title: "Me playing Mi"
    },
    style: {
        backgroundColor: "#cbf0f8"
    }
},
{
    id:"789",
    type: "todosNote",
    info: {
        label: "How was it:",
        todos: [
            { txt: "Do that", doneAt: null },
            { txt: "Do this", doneAt: 187111111 }
        ]
    },
    style: {
        backgroundColor: "#fdcfe8"
    }
}]

const KEEP_KEY='keeps'

function query() {
//  localStorage.setItem(KEEP_KEY,JSON.stringify(gKeeps))
    return storageService.query(KEEP_KEY);
    
     
}
function getKeepById(id) {
    return storageService.get(KEEP_KEY, id);
}
function saveTodos(todos){
    return storageService.put(KEEP_KEY,todos);
}
function saveTxt(txt){
    return storageService.post(KEEP_KEY,txt);
}
function update(keep){
    return storageService.put(KEEP_KEY,keep);
}
function removeNote(noteId){
    return storageService.remove(KEEP_KEY,noteId);
}