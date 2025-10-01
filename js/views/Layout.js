// --- View: Layout (Kerangka Aplikasi) ---
import { APP_NAME, ROUTES } from '../config/AppConfig.js';

const generateHeader = () => `
    <header id="main-header" class="main-header">
        <div class="container">
            <a href="#/" class="logo" data-link>${APP_NAME}</a>
            <nav class="main-nav">
                <a id="nav-home" href="${ROUTES.HOME}" data-link>Home</a>
                <a id="nav-debaters" href="${ROUTES.DEBATERS}" data-link>Debaters</a>
                <a id="nav-events" href="${ROUTES.EVENTS}" data-link>Events</a>
                <a id="nav-rankings" href="${ROUTES.RANKINGS}" data-link>Rankings</a>
            </nav>
        </div>
    </header>
`;

const generateFooter = () => `
    <footer class="main-footer">
        <div class="container">
            <p>&copy; 2025 ${APP_NAME}. Arsitektur Maksimal v3.0.</p>
        </div>
    </footer>
`;

const updateNav = (currentRoute) => {
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        // Logic pencocokan rute yang kompleks
        if (currentRoute && currentRoute.startsWith(href)) {
            link.classList.add('active');
        } else if (currentRoute === ROUTES.HOME && href === ROUTES.HOME) {
            link.classList.add('active');
        }
    });
};

export const renderLayout = () => ({
    headerHTML: generateHeader(),
    mainHTML: '<div id="content-area"></div>',
    footerHTML: generateFooter(),
    updateNav: updateNav,
});
