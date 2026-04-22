import { MainPage } from "./pages/main/index.js";
import { ContactsPage } from "./pages/contacts/index.js";

// Добавляем стили для body через строку
document.body.setAttribute('style', 'display: flex; flex-direction: column; min-height: 100vh; margin: 0; background-image: url("images/background.png"); background-size: cover; background-position: center; background-repeat: no-repeat; background-attachment: fixed; font-family: "Arial", sans-serif;');

const root = document.getElementById('root');
root.setAttribute('style', 'flex: 1; padding-top: 100px; padding-bottom: 30px; display: flex; align-items: center; justify-content: center;');

// Добавляем хедер через HTML строку
const headerHtml = `
    <header style="width: 100%; background-color: transparent; backdrop-filter: blur(6px); box-sizing: border-box; position: fixed; top: 0; left: 0; z-index: 100; padding: 10px 30px;">
        <nav style="display: flex; align-items: center; gap: 20px;">
            <button class="icon-btn" id="home-btn" style="background: none; border: none; padding: 0; cursor: pointer; display: flex; align-items: center;">
                <img src="images/home_background.png" alt="Главная" style="width: 80px; height: 80px; object-fit: contain; transition: transform 0.2s, filter 0.2s; filter: brightness(1);" onmouseover="this.style.transform='scale(1.15)';this.style.filter='brightness(1.4)'" onmouseout="this.style.transform='scale(1)';this.style.filter='brightness(1)'">
            </button>
            <a href="#" id="contacts-link" style="color: #ffffff; text-decoration: none; font-family: Arial, Helvetica, sans-serif; font-size: 1rem; letter-spacing: 0.05em; transition: color 0.2s; line-height: 28px; display: inline-flex; align-items: center; cursor: pointer;" onmouseover="this.style.color='#ffb319'" onmouseout="this.style.color='#ffffff'">Контакты</a>
        </nav>
    </header>
`;

// Добавляем футер через HTML строку
const footerHtml = `
    <footer style="width: 100%; padding: 15px 30px; background-color: #6fb600; box-sizing: border-box; text-align: center; margin-top: auto;">
        <p style="margin: 0; color: #ffffff; font-family: Arial, Helvetica, sans-serif; font-size: 0.85rem; letter-spacing: 0.03em;">© 2026 IQ Cosmetics. Все права защищены.</p>
    </footer>
`;

document.body.insertAdjacentHTML('afterbegin', headerHtml);
document.body.insertAdjacentHTML('beforeend', footerHtml);

// Обработчики навигации
document.getElementById('home-btn').addEventListener('click', () => {
    const mainPage = new MainPage(root);
    mainPage.render();
});

document.getElementById('contacts-link').addEventListener('click', (e) => {
    e.preventDefault();
    const contactsPage = new ContactsPage(root);
    contactsPage.render();
});

// Загрузка главной страницы по умолчанию
const mainPage = new MainPage(root);
mainPage.render();