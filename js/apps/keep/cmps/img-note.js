export default {
    props: ['keep'],
    template: `
    <div class="keep-preview-txt">
       
        <img class="note-img" width="200px" :src="keep.info.url"/>
         <p>{{keep.info.title}}</p>
    </div>
    `,
};
