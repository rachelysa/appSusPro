export default {
    template: `
    <header class="app-header">
        <nav>
            <router-link to="/" active-class="active-link nav" exact>Home</router-link> |
            <router-link to="/mail" class="nav">mail</router-link> |
            <router-link to="/keep" class="nav">keep</router-link> |
            
        </nav>
    </header>
    `,
};

