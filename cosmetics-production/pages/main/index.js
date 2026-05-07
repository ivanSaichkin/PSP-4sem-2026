import { ProductCardComponent } from "../../components/product-card/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.searchQuery = '';
    }

    getData() {
        const url = stockUrls.getStocks() + (this.searchQuery ? `?name=${encodeURIComponent(this.searchQuery)}` : '');
        ajax.get(url, (response) => {
            if (response && response.success) {
                this.renderData(response.data);
            } else {
                console.error('Ошибка загрузки данных');
            }
        });
    }

    renderData(items) {
        const container = document.getElementById('ingredients-container');
        if (container) {
            container.innerHTML = '';
            items.forEach((item) => {
                const productCard = new ProductCardComponent(container);
                productCard.render(item, this.clickCard.bind(this));
            });
        }
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

    scrollLeft() {
        const container = document.getElementById('ingredients-container');
        container.scrollBy({ left: -350, behavior: 'smooth' });
    }

    scrollRight() {
        const container = document.getElementById('ingredients-container');
        container.scrollBy({ left: 350, behavior: 'smooth' });
    }

    // Добавляем поиск
    getHTML() {
        return `
            <div style="width: 100%; max-width: 1200px; margin: 0 auto;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <input type="text" id="search-input" placeholder="🔍 Поиск по названию..." 
                        style="padding: 12px 20px; width: 300px; border-radius: 25px; border: 2px solid #ffb319; font-size: 16px; outline: none;">
                    <button id="search-btn" style="padding: 12px 25px; margin-left: 10px; background-color: #ffb319; border: none; border-radius: 25px; font-weight: bold; cursor: pointer;">Найти</button>
                </div>
                <div style="position: relative; width: 100%; padding: 0 60px;">
                    <button class="nav-btn prev" style="position: absolute; top: 50%; transform: translateY(-50%); left: 0; width: 45px; height: 45px; background-color: #ffb319; border: none; border-radius: 50%; cursor: pointer; z-index: 10;">
                        ◀
                    </button>
                    <div id="ingredients-container" style="display: flex; overflow-x: auto; gap: 30px; padding: 20px 10px; scrollbar-width: none;">
                    </div>
                    <button class="nav-btn next" style="position: absolute; top: 50%; transform: translateY(-50%); right: 0; width: 45px; height: 45px; background-color: #ffb319; border: none; border-radius: 50%; cursor: pointer; z-index: 10;">
                        ▶
                    </button>
                </div>
            </div>
        `;
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        // Поиск
        const searchBtn = document.getElementById('search-btn');
        const searchInput = document.getElementById('search-input');
        
        searchBtn.addEventListener('click', () => {
            this.searchQuery = searchInput.value;
            this.getData();
        });

        // Навигация
        const prevBtn = document.querySelector('.nav-btn.prev');
        const nextBtn = document.querySelector('.nav-btn.next');
        prevBtn.addEventListener('click', () => this.scrollLeft());
        nextBtn.addEventListener('click', () => this.scrollRight());

        this.getData();
    }
}