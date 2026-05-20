// pages/product/index.js (обновленная версия)
import { BackButtonComponent } from "../../components/back-button/index.js";
import { ProductComponent } from "../../components/product/index.js";
import { MainPage } from "../main/index.js";
import { ajax } from "../../modules/ajax.js";
import { ingredientUrls } from "../../modules/ingredientUrls.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = parseInt(id);
        this.ingredientData = null;
    }

    getData() {
        ajax.get(ingredientUrls.getIngredientById(this.id), (data) => {
            if (data && data.success) {
                this.ingredientData = data.data;
                this.renderData(this.ingredientData);
            } else {
                console.error('Ошибка получения ингредиента');
                this.renderData(null);
            }
        });
    }

    renderData(item) {
        const container = document.querySelector('#product-page > div');
        if (!container) return;
        
        // Очищаем контейнер от старого содержимого
        const oldContent = container.querySelector('.product-content');
        if (oldContent) oldContent.remove();
        
        const productContainer = document.createElement('div');
        productContainer.className = 'product-content';
        container.appendChild(productContainer);
        
        const product = new ProductComponent(productContainer);
        product.render(
            item, 
            () => this.deleteIngredient(), 
            () => this.updateIngredient()
        );
    }

    deleteIngredient() {
        if (confirm('Вы уверены, что хотите удалить этот ингредиент?')) {
            ajax.delete(ingredientUrls.deleteIngredientById(this.id), (data, status) => {
                if (status === 204 || (data && data.success)) {
                    alert('✅ Ингредиент успешно удален!');
                    const mainPage = new MainPage(this.parent);
                    mainPage.render();
                } else {
                    alert('❌ Ошибка при удалении ингредиента');
                }
            });
        }
    }

    updateIngredient() {
        const title = document.getElementById('edit-title')?.value;
        const category = document.getElementById('edit-category')?.value;
        const text = document.getElementById('edit-text')?.value;
        const benefitsStr = document.getElementById('edit-benefits')?.value;
        const src = document.getElementById('edit-src')?.value;
        
        if (!title || !category || !text) {
            alert('Заполните обязательные поля: название, категория и описание');
            return;
        }
        
        const benefits = benefitsStr ? benefitsStr.split(',').map(b => b.trim()) : [];
        
        const updateData = {
            title,
            category,
            text,
            benefits,
            src: src || 'images/default.jpg'
        };
        
        ajax.patch(ingredientUrls.updateIngredientById(this.id), updateData, (data, status) => {
            if (data && data.success) {
                alert('✅ Ингредиент успешно обновлен!');
                // Обновляем данные
                this.ingredientData = data.data;
                this.renderData(this.ingredientData);
            } else {
                alert('❌ Ошибка при обновлении ингредиента');
                console.error('Update error:', data);
            }
        });
    }

    goToCreate() {
        import("../create/index.js").then(module => {
            const CreatePage = module.CreatePage;
            const createPage = new CreatePage(this.parent);
            createPage.render();
        });
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    getHTML() {
        return `
            <div id="product-page">
                <div style="max-width: 800px; margin: 0 auto; padding: 20px;"></div>
            </div>
        `;
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        
        const container = document.querySelector('#product-page > div');
        
        const backButton = new BackButtonComponent(container);
        backButton.render(this.clickBack.bind(this), this.goToCreate.bind(this));
        
        this.getData();
    }
}