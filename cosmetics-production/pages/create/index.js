// pages/create/index.js
import { BackButtonComponent } from "../../components/back-button/index.js";
import { CreateFormComponent } from "../../components/create-form/index.js";
import { MainPage } from "../main/index.js";
import { ajax } from "../../modules/ajax.js";
import { ingredientUrls } from "../../modules/ingredientUrls.js";

export class CreatePage {
    constructor(parent) {
        this.parent = parent;
    }

    createIngredient(event) {
        event.preventDefault();
        
        // Получаем данные из формы
        const title = document.getElementById('create-title')?.value.trim();
        const category = document.getElementById('create-category')?.value;
        const text = document.getElementById('create-text')?.value.trim();
        const benefitsStr = document.getElementById('create-benefits')?.value;
        const src = document.getElementById('create-src')?.value.trim();
        
        // Валидация
        if (!title) {
            alert('Пожалуйста, введите название ингредиента');
            return;
        }
        
        if (!category) {
            alert('Пожалуйста, выберите категорию');
            return;
        }
        
        if (!text) {
            alert('Пожалуйста, введите описание ингредиента');
            return;
        }
        
        // Преобразуем преимущества в массив
        const benefits = benefitsStr 
            ? benefitsStr.split(',').map(b => b.trim()).filter(b => b)
            : [];
        
        // Формируем данные для отправки
        const ingredientData = {
            title: title,
            category: category,
            text: text,
            benefits: benefits,
            src: src || 'images/default.jpg'
        };
        
        // Отправляем POST запрос
        ajax.post(ingredientUrls.createIngredient(), ingredientData, (data, status) => {
            if (data && data.success) {
                alert(`✅ Ингредиент "${title}" успешно создан!`);
                // Возвращаемся на главную страницу
                const mainPage = new MainPage(this.parent);
                mainPage.render();
            } else {
                alert('❌ Ошибка при создании ингредиента');
                console.error('Create error:', data);
            }
        });
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    getHTML() {
        return `
            <div id="create-page">
                <div style="max-width: 800px; margin: 0 auto; padding: 20px;"></div>
            </div>
        `;
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        
        const container = document.querySelector('#create-page > div');
        
        const backButton = new BackButtonComponent(container);
        backButton.render(this.clickBack.bind(this));
        
        const createForm = new CreateFormComponent(container);
        createForm.render(
            (event) => this.createIngredient(event),
            () => this.clickBack()
        );
    }
}