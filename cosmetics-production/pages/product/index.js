// pages/product/index.js
import { BackButtonComponent } from "../../components/back-button/index.js";
import { ProductComponent } from "../../components/product/index.js";
import { MainPage } from "../main/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getData() {
        const products = {
            1: {
                id: 1,
                src: "images/ingredient1.jpg",
                model3d: "models/model1.glb", // путь к 3D модели
                title: "Гиалуроновая кислота",
                text: "Гиалуроновая кислота — это натуральное вещество, которое содержится в коже человека. Она способна удерживать влагу в 1000 раз больше своего веса. В косметологии используется для глубокого увлажнения, разглаживания морщин и улучшения тонуса кожи. Идеально подходит для всех типов кожи, особенно для сухой и обезвоженной.",
                benefits: ["Увлажнение на 24 часа", "Заполнение морщин", "Повышение эластичности"],
                concentration: "0.5% - 2%",
                compatibility: ["Ретинол", "Витамин С", "Пептиды"]
            },
            2: {
                id: 2,
                src: "images/ingredient2.jpg",
                model3d: "models/model2.glb",
                title: "Ретинол",
                text: "Ретинол — одна из самых изученных форм витамина А. Он ускоряет обновление клеток кожи, стимулирует выработку коллагена, уменьшает глубину морщин и борется с акне. Начинать использовать ретинол нужно с низких концентраций, постепенно увеличивая дозу. Лучше всего применять в вечернее время.",
                benefits: ["Обновление клеток", "Стимуляция коллагена", "Борьба с акне"],
                concentration: "0.25% - 1%",
                compatibility: ["Ниацинамид", "Пептиды", "Гиалуроновая кислота"]
            },
            3: {
                id: 3,
                src: "images/ingredient3.jpg",
                model3d: "models/model3.glb",
                title: "Ниацинамид",
                text: "Ниацинамид (витамин B3) — многофункциональный компонент, который регулирует выработку себума, уменьшает покраснения, укрепляет защитный барьер кожи и осветляет пигментацию. Отлично сочетается с большинством активных ингредиентов и подходит для чувствительной кожи.",
                benefits: ["Контроль себума", "Осветление пигментации", "Укрепление барьера"],
                concentration: "2% - 10%",
                compatibility: ["Ретинол", "Пептиды", "Гиалуроновая кислота"]
            },
            4: {
                id: 4,
                src: "images/ingredient4.jpg",
                model3d: "models/model4.glb",
                title: "Пептиды",
                text: "Пептиды — это короткие цепочки аминокислот, которые служат строительными блоками для белков кожи, таких как коллаген и эластин. Они помогают разглаживать морщины, повышают упругость кожи и ускоряют процессы восстановления. Пептиды отлично работают в паре с антиоксидантами.",
                benefits: ["Стимуляция коллагена", "Лифтинг-эффект", "Восстановление"],
                concentration: "1% - 10%",
                compatibility: ["Ниацинамид", "Гиалуроновая кислота", "Ретинол"]
            },
            5: {
                id: 5,
                src: "images/ingredient5.jpg",
                model3d: "models/model5.glb",
                title: "Сквалан",
                text: "Сквалан — натуральный углеводород, который по структуре близок к кожному себуму. Он отлично смягчает, питает и восстанавливает липидный барьер кожи. Сквалан не оставляет жирной пленки, быстро впитывается и подходит даже для жирной и проблемной кожи.",
                benefits: ["Восстановление барьера", "Глубокое питание", "Не комедогенно"],
                concentration: "5% - 100%",
                compatibility: ["Все ингредиенты", "Эфирные масла", "Витамины"]
            },
            6: {
                id: 6,
                src: "images/ingredient6.jpg",
                model3d: "models/model1.glb",
                title: "Витамин С",
                text: "Витамин С (аскорбиновая кислота) — мощнейший антиоксидант, который защищает кожу от воздействия свободных радикалов, осветляет пигментные пятна, стимулирует выработку коллагена и повышает эффективность солнцезащитных средств. Для стабильности лучше выбирать производные формы витамина С.",
                benefits: ["Антиоксидантная защита", "Осветление", "Синтез коллагена"],
                concentration: "5% - 20%",
                compatibility: ["Витамин Е", "Феруловая кислота", "Гиалуроновая кислота"]
            }
        };
        return products[this.id] || products[1];
    }

    getHTML() {
        return `
            <div id="product-page">
                <div style="max-width: 1200px; margin: 0 auto; padding: 20px;"></div>
            </div>
        `;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        
        const container = document.querySelector('#product-page > div');
        
        const backButton = new BackButtonComponent(container);
        backButton.render(this.clickBack.bind(this));
        
        const data = this.getData();
        const product = new ProductComponent(container);
        product.render(data);
    }
}