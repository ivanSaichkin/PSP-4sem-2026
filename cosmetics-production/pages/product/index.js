import { BackButtonComponent } from "../../components/back-button/index.js";
import { ProductComponent } from "../../components/product/index.js";
import { MainPage } from "../main/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
        this.isEditing = false;
    }

    getData() {
        ajax.get(stockUrls.getStockById(this.id), (response) => {
            if (response && response.success) {
                this.renderData(response.data);
            }
        });
    }

    renderData(item) {
        const container = document.querySelector('#product-page > div');
        if (container) {
            container.innerHTML = '';
            const product = new ProductComponent(container);
            product.render(item, this.id, this);
        }
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    getHTML() {
        return `
            <div id="product-page">
                <div style="max-width: 1200px; margin: 0 auto; padding: 20px;"></div>
            </div>
        `;
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        
        const container = document.querySelector('#product-page > div');
        
        const backButton = new BackButtonComponent(container);
        backButton.render(this.clickBack.bind(this));
        
        this.getData();
    }
}