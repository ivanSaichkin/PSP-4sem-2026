export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        const badgesHtml = data.benefits.map(benefit => 
            `<span style="font-size: 0.8rem; padding: 5px 10px; border-radius: 20px; display: inline-block; background-color: #28a745; color: white;">${benefit}</span>`
        ).join('');
        
        return `
            <div style="width: 320px; min-width: 320px; background: rgba(255, 255, 255, 0.95); border-radius: 15px; overflow: hidden; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2); transition: transform 0.3s ease, box-shadow 0.3s ease; display: flex; flex-direction: column;" onmouseover="this.style.transform='translateY(-5px)';this.style.boxShadow='0 12px 30px rgba(0,0,0,0.3)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 8px 20px rgba(0,0,0,0.2)'">
                <img style="width: 100%; height: 220px; object-fit: cover; border-bottom: 3px solid #ffb319; flex-shrink: 0;" src="${data.src}" alt="${data.title}">
                <div style="padding: 20px; display: flex; flex-direction: column; flex: 1;">
                    <div style="font-size: 1.4rem; font-weight: bold; color: #333; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                        ${data.title}
                        <span style="font-size: 0.8rem; padding: 5px 10px; border-radius: 20px; display: inline-block; background-color: #17a2b8; color: white;">${data.category}</span>
                    </div>
                    <p style="color: #666; font-size: 0.95rem; line-height: 1.4; margin-bottom: 15px; flex-shrink: 0;">${data.text}</p>
                    <div style="margin-bottom: 20px; display: flex; flex-wrap: wrap; gap: 8px; flex: 1; align-content: flex-start;">
                        ${badgesHtml}
                    </div>
                    <button class="btn-detail" data-id="${data.id}" style="background-color: #ffb319; border: none; color: #333; font-weight: bold; padding: 10px 20px; border-radius: 25px; transition: all 0.3s ease; width: 100%; cursor: pointer; margin-top: auto; flex-shrink: 0;" onmouseover="this.style.backgroundColor='#e69d00';this.style.transform='scale(1.02)'" onmouseout="this.style.backgroundColor='#ffb319';this.style.transform='scale(1)'">Подробнее</button>
                </div>
            </div>
        `;
    }

    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        
        const button = this.parent.querySelector(`.btn-detail[data-id="${data.id}"]`);
        if (button) {
            button.addEventListener('click', listener);
        }
    }
}