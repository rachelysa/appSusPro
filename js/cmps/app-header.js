export default {
    template: `
    <header class="app-header">
        <img class="logo" src="./img/logo.png"/>
        <nav>
            <router-link to="/" active-class="active-link" exact>Home</router-link> |
            <router-link to="/mail/inbox" active-class="active-link">mail</router-link> |
            <router-link to="/note" active-class="active-link">notes</router-link> 
            
        </nav>
    </header>
    `,
};

