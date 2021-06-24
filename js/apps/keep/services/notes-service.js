

import { storageService } from '../../../services/async-storage-service.js';

export const notesService = {
    query,
    saveTodos,
    save,
    getKeepById,
    update,
    removeNote
   

}


var gNotes = [{
    id:storageService._makeId(),
    type: "txtNote",
    isPinned: true,
    info: {
        title:'aaa',
        txt: "Fullstack Me Baby!"
    },
    style: {
        backgroundColor: "#fff475"
    }
},
{
    id:storageService._makeId(),
    type: "imgNote",
    isPinned: true,
    info: {
        txt: "data:image/jpeg;base64,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a2Q0hqUEa91Bva/va9v7n8mYrUEyDj1kxyKzV8fTKfUC5NgTyQR9uTx6ya4EizHqJiagkzyQRVKzSN6lpg1Qn2kcxtyb00rX9hMREyXIiIG1EROliREQEREBERAREQEREBERAREQEREBERAREQEREBERASCrzJ5BV5lL9LV7YRETFoREQEREBERAT7t7fmZKs857l13xdQxBOKeBbHkLyf8AUWnbwfjeXalrY9NiImahEpnVe5dVQqvSK0tjscW3U/Kfm9P3vOz231j9ShLBQ6GzBdhY/KQCSfUc8ibW4bRXynpGu1ERMUkREBERAREQEREBERAREQEREBERAREQEREBIKvMnkFXmUv0tXthERMWhERAREQEzAnxVmU6uLi+ZVmXO67rvg0HcGzWxT+pth+Nz9p5pLN3trsqi0QdkGTf1sNvwtv9UrM9fgr4139sbz7exRETx1nG650SnqChZirLcXW24Pkb+/8AcyHo/bqad/iLUc7FSDaxB8jYetj9oidH8lvDDHfiInOEREBERAREQEREBERAREQEREBERAREQEREBIKvMRKX6Wr2wiImLQiIgJmguYiWp/aET0lwjERE6POzJRO7+jsjnULco58Xnix/9T5eh29JWoiet+LabUjVLP/Z",
        title: "Me playing Mi"
    },
    style: {
        backgroundColor: "#cbf0f8"
    }
},
{
    id:storageService._makeId(),
    type: "videoNote",
    isPinned: false,
    info: {
        txt: "https://www.youtube.com/embed/tupHY8CCZXs",
        title: "Me playing Mi"
    },
    style: {
        backgroundColor: "#cbf0f8"
    }
},
{
    id:storageService._makeId(),
    type: "todosNote",
    isPinned: false,
    info: {
        title: "How was it:",
        txt: [
            { todo: "Do that", doneAt: null },
            { todo: "Do this", doneAt: 187111111 }
        ]
    },
    style: {
        backgroundColor: "#fdcfe8"
    }
}]

const NOTES_KEY='keeps'

function query() {
//  localStorage.setItem(KEEP_KEY,JSON.stringify(gKeeps))
    return storageService.query(NOTES_KEY)
    .then(notes => {
        if (!notes || !notes.length) {
            localStorage.setItem(NOTES_KEY, JSON.stringify(gNotes))
            return gNotes
        }
        return notes
    })
     
}
function getKeepById(id) {
    return storageService.get(NOTES_KEY, id);
}
function saveTodos(todos){
    return storageService.put(NOTES_KEY,todos);
}
function save(note){
    note.id=storageService._makeId();
    return storageService.post(NOTES_KEY,note);
}
function update(keep){
    return storageService.put(NOTES_KEY,keep);
}
function removeNote(noteId){
    return storageService.remove(NOTES_KEY,noteId);
}