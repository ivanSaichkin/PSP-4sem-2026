import { ProductCardComponent } from "../../components/product-card/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    getData() {
        return [
            {
                id: 1,
                src: "images/ingredient1.jpg",
                title: "Гиалуроновая кислота",
                text: "Мощный увлажнитель, способный удерживать воду в 1000 раз больше своего веса. Обеспечивает глубокое увлажнение кожи.",
                benefits: ["Увлажнение", "Anti-age", "Безопасно"],
                category: "Увлажнители"
            },
            {
                id: 2,
                src: "images/ingredient2.jpg",
                title: "Ретинол",
                text: "Витамин А, стимулирует обновление клеток, разглаживает морщины и улучшает текстуру кожи.",
                benefits: ["Обновление", "Anti-age", "Коррекция"],
                category: "Активные компоненты"
            },
            {
                id: 3,
                src: "images/ingredient3.jpg",
                title: "Ниацинамид",
                text: "Форма витамина B3, укрепляет барьерную функцию кожи, уменьшает покраснения и пигментацию.",
                benefits: ["Осветление", "Укрепление", "Успокоение"],
                category: "Витамины"
            },
            {
                id: 4,
                src: "images/ingredient4.jpg",
                title: "Пептиды",
                text: "Стимулируют выработку коллагена, повышают упругость и эластичность кожи.",
                benefits: ["Лифтинг", "Коллаген", "Восстановление"],
                category: "Пептиды"
            },
            {
                id: 5,
                src: "images/ingredient5.jpg",
                title: "Сквалан",
                text: "Природный увлажнитель, близкий к кожному себуму. Отлично смягчает и защищает кожу.",
                benefits: ["Питание", "Защита", "Смягчение"],
                category: "Масла"
            },
            {
                id: 6,
                src: "images/ingredient6.jpg",
                title: "Витамин С",
                text: "Мощный антиоксидант, осветляет пигментацию, защищает от свободных радикалов.",
                benefits: ["Антиоксидант", "Осветление", "Защита"],
                category: "Витамины"
            }
        ];
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

    getHTML() {
        return `
            <div style="position: relative; width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 60px;">
                <button class="nav-btn prev" style="position: absolute; top: 50%; transform: translateY(-50%); left: 0; width: 45px; height: 45px; background-color: #ffb319; border: none; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 10; box-shadow: 0 2px 10px rgba(0,0,0,0.2); transition: all 0.3s ease;" onmouseover="this.style.backgroundColor='#e69d00';this.style.transform='translateY(-50%) scale(1.1)'" onmouseout="this.style.backgroundColor='#ffb319';this.style.transform='translateY(-50%) scale(1)'">
                    <svg viewBox="0 0 24 24" style="width: 24px; height: 24px; fill: #333;"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
                </button>
                <div id="ingredients-container" style="display: flex; flex-direction: row; overflow-x: auto; scroll-behavior: smooth; gap: 30px; padding: 20px 10px; scrollbar-width: none; -ms-overflow-style: none;">
                </div>
                <button class="nav-btn next" style="position: absolute; top: 50%; transform: translateY(-50%); right: 0; width: 45px; height: 45px; background-color: #ffb319; border: none; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 10; box-shadow: 0 2px 10px rgba(0,0,0,0.2); transition: all 0.3s ease;" onmouseover="this.style.backgroundColor='#e69d00';this.style.transform='translateY(-50%) scale(1.1)'" onmouseout="this.style.backgroundColor='#ffb319';this.style.transform='translateY(-50%) scale(1)'">
                    <svg viewBox="0 0 24 24" style="width: 24px; height: 24px; fill: #333;"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
                </button>
            </div>
        `;
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        
        const container = document.getElementById('ingredients-container');
        const data = this.getData();
        
        data.forEach((item) => {
            const productCard = new ProductCardComponent(container);
            productCard.render(item, this.clickCard.bind(this));
        });
        
        // Добавляем обработчики для кнопок
        const prevBtn = document.querySelector('.nav-btn.prev');
        const nextBtn = document.querySelector('.nav-btn.next');
        if (prevBtn) prevBtn.addEventListener('click', () => this.scrollLeft());
        if (nextBtn) nextBtn.addEventListener('click', () => this.scrollRight());
    }
}