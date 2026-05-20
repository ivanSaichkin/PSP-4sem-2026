// components/product/index.js
export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        const benefitsBadges = (data.benefits || []).map(benefit => 
            `<span style="font-size: 0.9rem; padding: 5px 10px; border-radius: 20px; display: inline-block; background-color: #28a745; color: white; margin-right: 8px; margin-bottom: 8px;">✓ ${benefit}</span>`
        ).join('');
        
        return `
            <div style="background: rgba(255, 255, 255, 0.95); border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);">
                <div style="margin: 0; display: flex; flex-wrap: wrap;">
                    <div style="flex: 0 0 100%; max-width: 100%;">
                        <div style="padding: 30px;">
                            <div style="text-align: center; margin-bottom: 20px;">
                                <img style="max-width: 300px; width: 100%; border-radius: 15px;" src="${data.src || 'images/default.jpg'}" alt="${data.title}">
                            </div>
                            <h5 style="font-size: 2rem; margin-bottom: 20px; color: #6fb600;">${data.title}</h5>
                            <div style="margin-bottom: 15px;">
                                <span style="font-size: 1rem; padding: 5px 15px; border-radius: 20px; display: inline-block; background-color: #17a2b8; color: white;">${data.category}</span>
                            </div>
                            <p style="font-size: 1.1rem; line-height: 1.6; color: #444; margin-bottom: 20px;">${data.text}</p>
                            
                            <div style="margin-top: 15px;">
                                <h6 style="font-weight: bold;">Преимущества:</h6>
                                <div style="margin-bottom: 15px; display: flex; flex-wrap: wrap;">
                                    ${benefitsBadges || 'Не указаны'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Кнопки управления -->
            <div style="display: flex; gap: 15px; margin-top: 20px; justify-content: center;">
                <button id="delete-ingredient" style="background-color: #dc3545; border: none; color: white; font-weight: bold; padding: 12px 25px; border-radius: 25px; transition: all 0.3s ease; cursor: pointer;" onmouseover="this.style.backgroundColor='#c82333'" onmouseout="this.style.backgroundColor='#dc3545'">🗑️ Удалить ингредиент</button>
            </div>
            
            <!-- Форма обновления -->
            <div style="margin-top: 30px; padding: 25px; background: #f8f9fa; border-radius: 20px;">
                <h6 style="font-weight: bold; margin-bottom: 20px;">✏️ Редактировать ингредиент</h6>
                <div style="display: flex; flex-direction: column; gap: 15px;">
                    <input type="text" id="edit-title" placeholder="Название" value="${data.title}" style="padding: 12px; border: 2px solid #ddd; border-radius: 10px;">
                    <input type="text" id="edit-category" placeholder="Категория" value="${data.category}" style="padding: 12px; border: 2px solid #ddd; border-radius: 10px;">
                    <textarea id="edit-text" placeholder="Описание" rows="4" style="padding: 12px; border: 2px solid #ddd; border-radius: 10px;">${data.text}</textarea>
                    <input type="text" id="edit-benefits" placeholder="Преимущества (через запятую)" value="${(data.benefits || []).join(', ')}" style="padding: 12px; border: 2px solid #ddd; border-radius: 10px;">
                    <input type="text" id="edit-src" placeholder="URL изображения" value="${data.src || ''}" style="padding: 12px; border: 2px solid #ddd; border-radius: 10px;">
                    <button id="update-ingredient" style="background-color: #28a745; border: none; color: white; font-weight: bold; padding: 12px; border-radius: 25px; transition: all 0.3s ease; cursor: pointer;" onmouseover="this.style.backgroundColor='#218838'" onmouseout="this.style.backgroundColor='#28a745'">💾 Сохранить изменения</button>
                </div>
            </div>
        `;
    }

    render(data, deleteListener, updateListener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        
        const deleteBtn = document.getElementById('delete-ingredient');
        if (deleteBtn) {
            const newDeleteBtn = deleteBtn.cloneNode(true);
            deleteBtn.parentNode.replaceChild(newDeleteBtn, deleteBtn);
            newDeleteBtn.addEventListener('click', deleteListener);
        }
        
        const updateBtn = document.getElementById('update-ingredient');
        if (updateBtn) {
            const newUpdateBtn = updateBtn.cloneNode(true);
            updateBtn.parentNode.replaceChild(newUpdateBtn, updateBtn);
            newUpdateBtn.addEventListener('click', updateListener);
        }
    }
}