export default {
    template: `
    <header class="app-header">
        <nav>
            <router-link to="/" active-class="nav" exact>Home</router-link> |
            <router-link to="/mail/inbox" active-class="nav">mail</router-link> |
            <router-link to="/note" active-class="nav">notes</router-link> 
            
        </nav>
    </header>
    `,
};

