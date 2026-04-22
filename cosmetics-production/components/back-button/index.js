export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <div style="margin-bottom: 20px; text-align: left;">
                <button id="back-button" style="background-color: #ffb319; border: none; color: #333; font-weight: bold; padding: 10px 25px; border-radius: 25px; transition: all 0.3s ease; cursor: pointer;" onmouseover="this.style.backgroundColor='#e69d00';this.style.transform='scale(1.02)'" onmouseout="this.style.backgroundColor='#ffb319';this.style.transform='scale(1)'">← Назад к ингредиентам</button>
            </div>
        `;
    }

    addListeners(listener) {
        const button = document.getElementById("back-button");
        if (button) {
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            newButton.addEventListener("click", listener);
        }
    }

    render(listener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(listener);
    }
}