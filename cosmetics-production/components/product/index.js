import { ThreeDViewerComponent } from "../3d-viewer/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
        this.viewer3d = null;
    }

    getHTML(data, id, pageContext) {
        const benefitsBadges = data.benefits ? data.benefits.map(benefit => 
            `<span style="font-size: 0.9rem; padding: 5px 10px; border-radius: 20px; background-color: #28a745; color: white; margin-right: 8px;">✓ ${benefit}</span>`
        ).join('') : '';
        
        return `
            <div id="product-view">
                <div style="background: rgba(255, 255, 255, 0.95); border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);">
                    <div style="display: flex; flex-wrap: wrap;">
                        <div id="product-3d-section" style="flex: 0 0 50%; min-height: 500px;"></div>
                        <div style="flex: 0 0 50%; padding: 30px;">
                            <div id="display-mode">
                                <h5 style="font-size: 2rem; color: #6fb600;" id="display-title">${data.name}</h5>
                                <p id="display-description" style="font-size: 1.1rem; color: #444;">${data.description}</p>
                                <p><strong>Категория:</strong> <span id="display-category">${data.category}</span></p>
                                <p><strong>Преимущества:</strong> <span id="display-benefits">${benefitsBadges}</span></p>
                                <p><strong>Концентрация:</strong> <span id="display-concentration">${data.concentration}</span></p>
                                <button id="edit-btn" style="background-color: #ffb319; border: none; padding: 10px 25px; border-radius: 25px; margin-top: 15px; cursor: pointer;">✏️ Редактировать</button>
                            </div>
                            <div id="edit-mode" style="display: none;">
                                <h3>Редактирование</h3>
                                <input type="text" id="edit-name" value="${data.name}" placeholder="Название" style="width: 100%; padding: 8px; margin-bottom: 10px;">
                                <input type="text" id="edit-category" value="${data.category}" placeholder="Категория" style="width: 100%; padding: 8px; margin-bottom: 10px;">
                                <textarea id="edit-description" placeholder="Описание" style="width: 100%; padding: 8px; margin-bottom: 10px;">${data.description}</textarea>
                                <input type="text" id="edit-concentration" value="${data.concentration}" placeholder="Концентрация" style="width: 100%; padding: 8px; margin-bottom: 10px;">
                                <button id="save-btn" style="background-color: #28a745; color: white; border: none; padding: 10px 25px; border-radius: 25px; margin-right: 10px; cursor: pointer;">💾 Сохранить</button>
                                <button id="cancel-btn" style="background-color: #dc3545; color: white; border: none; padding: 10px 25px; border-radius: 25px; cursor: pointer;">❌ Отмена</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    attachEditListeners(data, id, pageContext) {
        const editBtn = document.getElementById('edit-btn');
        const saveBtn = document.getElementById('save-btn');
        const cancelBtn = document.getElementById('cancel-btn');
        const displayMode = document.getElementById('display-mode');
        const editMode = document.getElementById('edit-mode');

        if (editBtn) {
            editBtn.addEventListener('click', () => {
                displayMode.style.display = 'none';
                editMode.style.display = 'block';
            });
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                displayMode.style.display = 'block';
                editMode.style.display = 'none';
            });
        }

        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                const updatedData = {
                    name: document.getElementById('edit-name').value,
                    category: document.getElementById('edit-category').value,
                    description: document.getElementById('edit-description').value,
                    concentration: document.getElementById('edit-concentration').value
                };

                ajax.patch(stockUrls.updateStockById(id), updatedData, (response, status) => {
                    if (response && response.success) {
                        alert('✅ Ингредиент успешно обновлён!');
                        // Обновляем страницу
                        pageContext.getData();
                    } else {
                        alert('❌ Ошибка при обновлении');
                    }
                });
            });
        }
    }

    render(data, id, pageContext) {
        const html = this.getHTML(data, id, pageContext);
        this.parent.insertAdjacentHTML('beforeend', html);
        
        this.attachEditListeners(data, id, pageContext);

        const container3d = document.getElementById('product-3d-section');
        if (container3d && data.model3d) {
            this.viewer3d = new ThreeDViewerComponent(container3d);
            this.viewer3d.render(data.model3d);
        }
    }
}