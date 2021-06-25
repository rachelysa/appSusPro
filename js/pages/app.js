import appHeader from "../cmps/app-header.js"
export default {
    template:`
        <section class="app-main">
           <img class="home-responsive" src="../../img/responsive.png"/>
           <div class="go-to">
           <div class="try-home"> 
           
             <div class="go-to-home email">
                 <div class="go-to-icon"><i class="fas fa-envelope"></i></div>
                 <h3>email</h3>
                 <p>jbuodac kbuiubbpisckbou;</p>
                  <button>go to email</button>
                </div>
             <div class="go-to-home notes">
                 <div  class="go-to-icon"><i class="fas fa-sticky-note"></i></div>
                 <h3>notes</h3>
                 <p>jbuodac kbuiubbpisckbou;</p>
                  <button>go to notes</button>
                </div>
           <div>
         </div>
         
        </section>
    `,
      methods: {

    },
    components:{
        appHeader
    }
}