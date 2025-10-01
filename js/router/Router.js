// --- Router Klien Sederhana (SPA) ---
import { ROUTES } from '../config/AppConfig.js';
import { setRouteState } from '../state/actions.js';
import { renderLayout } from '../views/Layout.js';
import { renderHomePage } from '../views/HomePage.js';
import { renderDebatersPage } from '../views/DebatersPage.js';
import { renderProfilePage } from '../views/ProfilePage.js';
import { UI_Templates } from '../components/UI_Templates.js'; // Untuk 404

const routesMap = {
    [ROUTES.HOME]: renderHomePage,
    [ROUTES.DEBATERS]: renderDebatersPage,
    // Menggunakan regex sederhana untuk rute dinamis
    [`^${ROUTES.PROFILE}(?<name>[a-zA-Z0-9]+)$`]: renderProfilePage,
    // ... rute lainnya (EventsPage, RankingsPage) ...
};

const parseLocation = () => {
    const path = window.location.hash.slice(1) || ROUTES.HOME;
    const pathWithoutHash = path.startsWith('/') ? path : '/' + path;

    for (const routeRegex in routesMap) {
        if (routeRegex.startsWith('^')) {
            const regex = new RegExp(routeRegex);
            const match = pathWithoutHash.match(regex);
            if (match) {
                // Mencari nama rute dari ROUTES yang cocok
                const routeName = Object.keys(ROUTES).find(key => ROUTES[key].includes(routeRegex.substring(1, routeRegex.lastIndexOf('(') - 1)));
                return { 
                    route: ROUTES[routeName], 
                    params: match.groups || {} 
                };
            }
        } else if (routeRegex === pathWithoutHash) {
            return { route: routeRegex, params: {} };
        }
    }
    return { route: null, params: {} }; // 404
};

export const navigateTo = (url) => {
    const target = url.startsWith('#') ? url : `#${url}`; 
    window.location.hash = target;
};

const handleLocation = async () => {
    const { route, params } = parseLocation();
    
    const contentArea = document.getElementById('content-area');

    if (route) {
        // Perbarui state aplikasi
        setRouteState(route, params);
        
        const renderFunc = routesMap[route];
        
        // Render View
        await renderFunc(params);

    } else if (contentArea) {
        // 404
        setRouteState(null, params); 
        contentArea.innerHTML = UI_Templates.pageTitle('404', 'Halaman Tidak Ditemukan');
    }
    
    // Update active class pada navigasi
    renderLayout().updateNav(route);
};

export const initializeRouter = () => {
    window.addEventListener('hashchange', handleLocation);
    
    // Event Delegation untuk link internal SPA (data-link)
    document.body.addEventListener('click', e => {
        const link = e.target.closest('[data-link]');
        if (link) {
            e.preventDefault();
            navigateTo(link.getAttribute('href').slice(1));
        }
    });
    
    handleLocation();
};
