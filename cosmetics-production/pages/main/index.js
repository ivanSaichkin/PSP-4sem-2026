// pages/main/index.js
import { ProductCardComponent } from "../../components/product-card/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { ajax } from "../../modules/ajax.js";
import { ingredientUrls } from "../../modules/ingredientUrls.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.allIngredients = [];
        this.displayLimit = 999;
    }

    getData() {
        ajax.get(ingredientUrls.getIngredients(), (data) => {
            if (data && data.success) {
                this.allIngredients = data.data;
                this.renderData(this.allIngredients);
            } else {
                console.error('Ошибка получения данных:', data);
                this.renderData([]);
            }
        });
    }

    renderData(items) {
        const container = document.getElementById('ingredients-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        const displayItems = items.slice(0, this.displayLimit);
        
        if (displayItems.length === 0) {
            container.innerHTML = '<div style="text-align: center; padding: 50px; width: 100%;">📦 Нет ингредиентов. Создайте первый!</div>';
            return;
        }
        
        displayItems.forEach((item) => {
            const productCard = new ProductCardComponent(container);
            productCard.render(item, this.clickCard.bind(this));
        });
    }

    filterByTitle(title) {
        if (!title.trim()) {
            this.renderData(this.allIngredients);
            return;
        }
        const filtered = this.allIngredients.filter(item => 
            item.title.toLowerCase().includes(title.toLowerCase())
        );
        this.renderData(filtered);
    }

    updateDisplayLimit(limit) {
        this.displayLimit = parseInt(limit) || 999;
        this.renderData(this.allIngredients);
    }

    clickCard(e) {
        const cardId = e.target.closest('.btn-detail')?.getAttribute('data-id');
        if (cardId) {
            import("../product/index.js").then(module => {
                const ProductPage = module.ProductPage;
                const productPage = new ProductPage(this.parent, cardId);
                productPage.render();
            });
        }
    }

    goToCreate() {
        import("../create/index.js").then(module => {
            const CreatePage = module.CreatePage;
            const createPage = new CreatePage(this.parent);
            createPage.render();
        });
    }

    scrollLeft() {
        const container = document.getElementById('ingredients-container');
        if (container) container.scrollBy({ left: -350, behavior: 'smooth' });
    }

    scrollRight() {
        const container = document.getElementById('ingredients-container');
        if (container) container.scrollBy({ left: 350, behavior: 'smooth' });
    }

    getHTML() {
        return `
            <div id="main-page">
                <div style="width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 60px;">
                    <!-- Кнопка назад (для единообразия, но без функционала назад -->
                    <div id="top-buttons" style="margin-bottom: 20px;"></div>
                    
                    <!-- Строка фильтрации и пагинации -->
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; gap: 20px; flex-wrap: wrap;">
                        <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                            <label style="font-weight: bold; color: #333;">🔍 Поиск:</label>
                            <input type="text" id="search-input" placeholder="Название ингредиента..." style="padding: 10px 15px; border: 2px solid #ffb319; border-radius: 25px; font-size: 14px; width: 250px; outline: none;">
                            <button id="search-btn" style="background-color: #ffb319; border: none; padding: 10px 20px; border-radius: 25px; cursor: pointer; font-weight: bold;">Найти</button>
                            <button id="clear-search" style="background-color: #6c757d; border: none; color: white; padding: 10px 20px; border-radius: 25px; cursor: pointer;">Сбросить</button>
                        </div>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <label style="font-weight: bold; color: #333;">📦 Показать:</label>
                            <input type="number" id="limit-input" value="${this.displayLimit}" min="1" max="50" style="padding: 10px 15px; border: 2px solid #ffb319; border-radius: 25px; font-size: 14px; width: 80px; outline: none;">
                            <button id="apply-limit" style="background-color: #17a2b8; border: none; color: white; padding: 10px 20px; border-radius: 25px; cursor: pointer;">Применить</button>
                        </div>
                    </div>
                    
                    <!-- Контейнер с карточками -->
                    <div style="position: relative;">
                        <button class="nav-btn prev" style="position: absolute; top: 50%; transform: translateY(-50%); left: -50px; width: 45px; height: 45px; background-color: #ffb319; border: none; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 10; box-shadow: 0 2px 10px rgba(0,0,0,0.2); transition: all 0.3s ease;" onmouseover="this.style.backgroundColor='#e69d00';this.style.transform='translateY(-50%) scale(1.1)'" onmouseout="this.style.backgroundColor='#ffb319';this.style.transform='translateY(-50%) scale(1)'">
                            <svg viewBox="0 0 24 24" style="width: 24px; height: 24px; fill: #333;"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
                        </button>
                        <div id="ingredients-container" style="display: flex; flex-direction: row; overflow-x: auto; scroll-behavior: smooth; gap: 30px; padding: 20px 10px; scrollbar-width: none; -ms-overflow-style: none;">
                        </div>
                        <button class="nav-btn next" style="position: absolute; top: 50%; transform: translateY(-50%); right: -50px; width: 45px; height: 45px; background-color: #ffb319; border: none; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 10; box-shadow: 0 2px 10px rgba(0,0,0,0.2); transition: all 0.3s ease;" onmouseover="this.style.backgroundColor='#e69d00';this.style.transform='translateY(-50%) scale(1.1)'" onmouseout="this.style.backgroundColor='#ffb319';this.style.transform='translateY(-50%) scale(1)'">
                            <svg viewBox="0 0 24 24" style="width: 24px; height: 24px; fill: #333;"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        
        // Добавляем кнопку создания в специальный контейнер
        const topButtonsContainer = document.getElementById('top-buttons');
        if (topButtonsContainer) {
            const backButton = new BackButtonComponent(topButtonsContainer);
            // Передаем пустую функцию для back, так как на главной back не нужен
            backButton.render(() => {}, () => this.goToCreate());
        }
        
        this.getData();
        
        // Навигационные кнопки
        const prevBtn = document.querySelector('.nav-btn.prev');
        const nextBtn = document.querySelector('.nav-btn.next');
        if (prevBtn) prevBtn.addEventListener('click', () => this.scrollLeft());
        if (nextBtn) nextBtn.addEventListener('click', () => this.scrollRight());
        
        // Поиск
        const searchBtn = document.getElementById('search-btn');
        const searchInput = document.getElementById('search-input');
        const clearBtn = document.getElementById('clear-search');
        
        if (searchBtn && searchInput) {
            const newSearchBtn = searchBtn.cloneNode(true);
            searchBtn.parentNode.replaceChild(newSearchBtn, searchBtn);
            newSearchBtn.addEventListener('click', () => {
                this.filterByTitle(searchInput.value);
            });
            
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.filterByTitle(searchInput.value);
            });
        }
        
        if (clearBtn) {
            const newClearBtn = clearBtn.cloneNode(true);
            clearBtn.parentNode.replaceChild(newClearBtn, clearBtn);
            newClearBtn.addEventListener('click', () => {
                if (searchInput) searchInput.value = '';
                this.getData();
            });
        }
        
        // Лимит карточек
        const applyLimitBtn = document.getElementById('apply-limit');
        const limitInput = document.getElementById('limit-input');
        if (applyLimitBtn && limitInput) {
            const newApplyBtn = applyLimitBtn.cloneNode(true);
            applyLimitBtn.parentNode.replaceChild(newApplyBtn, applyLimitBtn);
            newApplyBtn.addEventListener('click', () => {
                this.updateDisplayLimit(limitInput.value);
            });
        }
    }
}