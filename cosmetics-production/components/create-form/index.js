// components/create-form/index.js
export class CreateFormComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <div style="background: rgba(255, 255, 255, 0.95); border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); padding: 30px;">
                <h2 style="color: #6fb600; margin-bottom: 25px; text-align: center;">➕ Создание нового ингредиента</h2>
                
                <form id="create-ingredient-form">
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; font-weight: bold; margin-bottom: 8px; color: #333;">Название *</label>
                        <input type="text" id="create-title" placeholder="Например: Азелаиновая кислота" style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 10px; font-size: 16px;">
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; font-weight: bold; margin-bottom: 8px; color: #333;">Категория *</label>
                        <select id="create-category" style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 10px; font-size: 16px;">
                            <option value="">Выберите категорию</option>
                            <option value="Увлажнители">💧 Увлажнители</option>
                            <option value="Активные компоненты">⚡ Активные компоненты</option>
                            <option value="Витамины">🍊 Витамины</option>
                            <option value="Пептиды">🧬 Пептиды</option>
                            <option value="Масла">🫒 Масла</option>
                            <option value="Кислоты">🧪 Кислоты</option>
                            <option value="Успокаивающие">🌿 Успокаивающие</option>
                            <option value="Антиоксиданты">🛡️ Антиоксиданты</option>
                        </select>
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; font-weight: bold; margin-bottom: 8px; color: #333;">Описание *</label>
                        <textarea id="create-text" rows="5" placeholder="Подробное описание ингредиента, его свойства и применение..." style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 10px; font-size: 16px; resize: vertical;"></textarea>
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; font-weight: bold; margin-bottom: 8px; color: #333;">Преимущества</label>
                        <input type="text" id="create-benefits" placeholder="Например: Увлажнение, Anti-age, Защита (через запятую)" style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 10px; font-size: 16px;">
                        <small style="color: #666;">Введите преимущества через запятую</small>
                    </div>
                    
                    <div style="margin-bottom: 25px;">
                        <label style="display: block; font-weight: bold; margin-bottom: 8px; color: #333;">URL изображения</label>
                        <input type="text" id="create-src" placeholder="images/ingredient.jpg" value="images/default.jpg" style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 10px; font-size: 16px;">
                        <small style="color: #666;">Путь к изображению ингредиента</small>
                    </div>
                    
                    <div style="display: flex; gap: 15px; justify-content: center;">
                        <button type="button" id="cancel-create" style="background-color: #6c757d; border: none; color: white; font-weight: bold; padding: 12px 30px; border-radius: 25px; transition: all 0.3s ease; cursor: pointer;" onmouseover="this.style.backgroundColor='#5a6268'" onmouseout="this.style.backgroundColor='#6c757d'">Отмена</button>
                        <button type="submit" style="background-color: #28a745; border: none; color: white; font-weight: bold; padding: 12px 30px; border-radius: 25px; transition: all 0.3s ease; cursor: pointer;" onmouseover="this.style.backgroundColor='#218838'" onmouseout="this.style.backgroundColor='#28a745'">✅ Создать ингредиент</button>
                    </div>
                </form>
            </div>
        `;
    }

    render(submitListener, cancelListener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        
        const form = document.getElementById('create-ingredient-form');
        if (form) {
            form.addEventListener('submit', submitListener);
        }
        
        const cancelBtn = document.getElementById('cancel-create');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', cancelListener);
        }
    }
}