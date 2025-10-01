// --- Core: Virtual Renderer (Hanya Update Perubahan) ---

export const virtualRender = (parentElement, newHTML) => {
    if (!parentElement) return false; 

    const currentHTML = parentElement.innerHTML.trim();
    const newHTMLTrimmed = newHTML.trim();

    if (currentHTML === newHTMLTrimmed) {
        return false; // Tidak ada perubahan
    }

    parentElement.innerHTML = newHTMLTrimmed;
    return true; // Perubahan dilakukan
};

export const createLayoutRoot = (headerHTML, mainHTML, footerHTML) => {
    const appRoot = document.getElementById('app-root');
    appRoot.innerHTML = `
        ${headerHTML}
        <main id="content-area">${mainHTML}</main>
        ${footerHTML}
    `;
};
