import appHeader from "../cmps/app-header.js"
export default {
  template: `
        <section class="home-main">
           <img class="home-responsive" src="./img/responsive.png"/>
           <div class="go-to">
           <div class="try-home"> 
           
             <div class="go-to-home email">
                 <div class="go-to-icon"><i class="fas fa-envelope"></i></div>
                 <h3>email</h3>
                 <p>use email to send and get messeges</p>
                  <button @click="goTo('/mail/inbox')">go to email</button>
                </div>
             <div class="go-to-home notes">
                 <div  class="go-to-icon"><i class="fas fa-sticky-note"></i></div>
                 <h3>notes</h3>
                 <p>use notes to save all the stuff you want</p>
                  <button @click="goTo('/note')" >go to notes</button>
                </div>
</div>
         </div>
         
        </section>
    `,
  methods: {
    goTo(url) {
      this.$router.push(url)
    }
  },
  components: {
    appHeader
  }
}