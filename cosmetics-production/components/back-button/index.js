// components/back-button/index.js
export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <div style="margin-bottom: 20px; text-align: left; display: flex; gap: 15px;">
                <button id="back-button" style="background-color: #ffb319; border: none; color: #333; font-weight: bold; padding: 10px 25px; border-radius: 25px; transition: all 0.3s ease; cursor: pointer;" onmouseover="this.style.backgroundColor='#e69d00';this.style.transform='scale(1.02)'" onmouseout="this.style.backgroundColor='#ffb319';this.style.transform='scale(1)'">← Назад к ингредиентам</button>
                <button id="create-button" style="background-color: #28a745; border: none; color: white; font-weight: bold; padding: 10px 25px; border-radius: 25px; transition: all 0.3s ease; cursor: pointer;" onmouseover="this.style.backgroundColor='#218838';this.style.transform='scale(1.02)'" onmouseout="this.style.backgroundColor='#28a745';this.style.transform='scale(1)'">➕ Создать ингредиент</button>
            </div>
        `;
    }

    addListeners(backListener, createListener) {
        const backButton = document.getElementById("back-button");
        if (backButton) {
            const newBackButton = backButton.cloneNode(true);
            backButton.parentNode.replaceChild(newBackButton, backButton);
            newBackButton.addEventListener("click", backListener);
        }
        
        const createButton = document.getElementById("create-button");
        if (createButton) {
            const newCreateButton = createButton.cloneNode(true);
            createButton.parentNode.replaceChild(newCreateButton, createButton);
            newCreateButton.addEventListener("click", createListener);
        }
    }

    render(backListener, createListener = null) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(backListener, createListener);
    }
}