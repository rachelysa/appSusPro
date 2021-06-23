export default {
    props: ['keep'],
    template: `
    <div class="keep-preview-txt">
    <iframe  width="200px" class="note-video" :src="keep.info.url" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <!-- <iframe class="note-video" :src="keep.info.url" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
        <!-- <iframe  :src="keep.info.url" ></iframe> -->
         <p>{{keep.info.title}}</p>
    </div>
    `,
};
