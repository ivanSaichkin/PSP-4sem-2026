// components/product/index.js
import { ThreeDViewerComponent } from "../3d-viewer/index.js";

export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
        this.viewer3d = null;
    }

    getHTML(data) {
        const benefitsBadges = data.benefits.map(benefit => 
            `<span style="font-size: 0.9rem; padding: 5px 10px; border-radius: 20px; display: inline-block; background-color: #28a745; color: white; margin-right: 8px; margin-bottom: 8px;">✓ ${benefit}</span>`
        ).join('');
        
        const compatibilityBadges = data.compatibility.map(comp => 
            `<span style="font-size: 0.85rem; padding: 5px 10px; border-radius: 20px; display: inline-block; background-color: #ffc107; color: #333; margin-right: 8px; margin-bottom: 8px;">${comp}</span>`
        ).join('');
        
        return `
            <div style="background: rgba(255, 255, 255, 0.95); border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);">
                <div style="margin: 0; display: flex; flex-wrap: wrap;">
                    <div id="product-3d-section" style="flex: 0 0 50%; max-width: 50%; min-height: 500px;">
                        <!-- 3D viewer будет вставлен сюда -->
                    </div>
                    <div style="flex: 0 0 50%; max-width: 50%;">
                        <div style="padding: 30px;">
                            <h5 style="font-size: 2rem; margin-bottom: 20px; color: #6fb600;">${data.title}</h5>
                            <p style="font-size: 1.1rem; line-height: 1.6; color: #444; margin-bottom: 20px;">${data.text}</p>
                            
                            <div style="margin-top: 15px;">
                                <h6 style="font-weight: bold;">Преимущества:</h6>
                                <div style="margin-bottom: 15px;">
                                    ${benefitsBadges}
                                </div>
                            </div>
                            
                            <div style="margin-top: 15px;">
                                <h6 style="font-weight: bold;">Рекомендуемая концентрация:</h6>
                                <p><span style="font-size: 1rem; padding: 5px 10px; border-radius: 20px; display: inline-block; background-color: #17a2b8; color: white;">${data.concentration}</span></p>
                            </div>
                            
                            <div style="margin-top: 15px;">
                                <h6 style="font-weight: bold;">Сочетается с:</h6>
                                <div>
                                    ${compatibilityBadges}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        
        // Инициализация 3D просмотрщика
        const container3d = document.getElementById('product-3d-section');
        if (container3d && data.model3d) {
            this.viewer3d = new ThreeDViewerComponent(container3d);
            this.viewer3d.render(data.model3d);
        }
    }
}