export class ContactsPage {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <div style="display: flex; justify-content: center; align-items: center; min-height: calc(100vh - 200px); padding: 20px;">
                <div style="background: rgba(255, 255, 255, 0.95); text-align: center; padding: 50px 30px; max-width: 450px; width: 100%; border-radius: 20px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);">
                    <img src="images/avatar.jpg" alt="Аватарка" style="width: 150px; height: 150px; border-radius: 50%; margin-bottom: 20px; object-fit: cover; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);">
                    <h1 style="color: #6fb600; margin-bottom: 20px; font-weight: bold;">Контакты</h1>
                    <p style="font-size: 18px; margin: 15px 0; color: #555;">Разработчик: Иван Саичкин</p>
                    <p style="font-size: 18px; margin: 15px 0; color: #555;">Email: ivan.saichkin@bk.ru</p>
                    <div style="display: flex; gap: 20px; justify-content: center; margin-top: 30px;">
                        <a href="https://t.me/ryzhunchikk" style="border-radius: 50%; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; transition: transform 0.2s;" target="_blank" rel="noopener" onmouseover="this.style.transform='scale(1.15)'" onmouseout="this.style.transform='scale(1)'">
                            <img src="images/telegram-icon.png" alt="Telegram" style="width: 60px; height: 60px; border-radius: 50%;">
                        </a>
                        <a href="https://github.com/ivanSaichkin" style="border-radius: 50%; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; transition: transform 0.2s;" target="_blank" rel="noopener" onmouseover="this.style.transform='scale(1.15)'" onmouseout="this.style.transform='scale(1)'">
                            <img src="images/github-icon.png" alt="GitHub" style="width: 60px; height: 60px; border-radius: 50%;">
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
    }
}