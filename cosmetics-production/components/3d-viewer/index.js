// components/3d-viewer/index.js
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class ThreeDViewerComponent {
    constructor(parent) {
        this.parent = parent;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.model = null;
        this.animationId = null;
    }

    getHTML() {
        return `
            <div id="3d-viewer-container" style="width: 100%; height: 500px; position: relative; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 15px; overflow: hidden;">
                <div id="loading-indicator" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; font-size: 1.2rem; background: rgba(0,0,0,0.7); padding: 10px 20px; border-radius: 25px; z-index: 10;">
                    Загрузка 3D модели...
                </div>
                <div id="controls-info" style="position: absolute; bottom: 10px; left: 10px; color: white; background: rgba(0,0,0,0.5); padding: 5px 10px; border-radius: 5px; font-size: 0.8rem; z-index: 10;">
                    🖱️ Мышь: вращение | ПКМ: панорамирование | Scroll: зум
                </div>
            </div>
        `;
    }

    initThree(modelPath) {
        const container = document.getElementById('3d-viewer-container');
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Создание сцены
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1a1a2e);
        this.scene.fog = new THREE.FogExp2(0x1a1a2e, 0.008);

        // Создание камеры
        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        this.camera.position.set(5, 5, 5);
        this.camera.lookAt(0, 0, 0);

        // Создание рендерера
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true; // Включение теней
        container.appendChild(this.renderer.domElement);

        // Орбит контролы для интерактивности
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true; // Плавность движения
        this.controls.dampingFactor = 0.05;
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = 1.5;
        this.controls.enableZoom = true;
        this.controls.enablePan = true;
        this.controls.zoomSpeed = 1.2;
        this.controls.panSpeed = 0.8;
        this.controls.rotateSpeed = 1.0;

        // Освещение
        this.setupLighting();

        // Вспомогательные элементы (опционально)
        this.setupHelpers();

        // Загрузка модели
        this.loadModel(modelPath);

        // Анимация
        this.animate();

        // Обработка изменения размера окна
        window.addEventListener('resize', () => this.onWindowResize());
    }

    setupLighting() {
        // Ambient light - общее освещение
        const ambientLight = new THREE.AmbientLight(0x404060);
        this.scene.add(ambientLight);

        // Основной направленный свет
        const mainLight = new THREE.DirectionalLight(0xffffff, 1);
        mainLight.position.set(5, 10, 7);
        mainLight.castShadow = true;
        mainLight.receiveShadow = true;
        mainLight.shadow.mapSize.width = 1024;
        mainLight.shadow.mapSize.height = 1024;
        this.scene.add(mainLight);

        // Заполняющий свет сзади
        const backLight = new THREE.DirectionalLight(0x88aaff, 0.5);
        backLight.position.set(-3, 2, -4);
        this.scene.add(backLight);

        // Теплый свет снизу для подсветки
        const fillLight = new THREE.PointLight(0xffaa66, 0.3);
        fillLight.position.set(0, -2, 0);
        this.scene.add(fillLight);

        // Динамический цветной свет для эффекта
        const colorLight = new THREE.PointLight(0xff66cc, 0.4);
        colorLight.position.set(2, 3, 2);
        this.scene.add(colorLight);

        // Сохраняем ссылку на цветной свет для анимации
        this.colorLight = colorLight;
    }

    setupHelpers() {
        // Создание декоративной сетки-пола
        const gridHelper = new THREE.GridHelper(20, 20, 0x88aaff, 0x335588);
        gridHelper.position.y = -1.5;
        gridHelper.material.transparent = true;
        gridHelper.material.opacity = 0.3;
        this.scene.add(gridHelper);

        // Добавление простого отражающего эффекта
        const circlePlane = new THREE.Mesh(
            new THREE.CircleGeometry(3, 32),
            new THREE.MeshStandardMaterial({ color: 0x223344, roughness: 0.4, metalness: 0.7, transparent: true, opacity: 0.3 })
        );
        circlePlane.rotation.x = -Math.PI / 2;
        circlePlane.position.y = -1.5;
        circlePlane.receiveShadow = true;
        this.scene.add(circlePlane);
    }

    loadModel(modelPath) {
        const loader = new GLTFLoader();
        const loadingIndicator = document.getElementById('loading-indicator');
        
        loader.load(modelPath, 
            (gltf) => {
                // Успешная загрузка
                this.model = gltf.scene;
                
                // Настройка теней для модели
                this.model.traverse((node) => {
                    if (node.isMesh) {
                        node.castShadow = true;
                        node.receiveShadow = true;
                    }
                });
                
                // Центрирование модели
                const box = new THREE.Box3().setFromObject(this.model);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z);
                const scale = 2.5 / maxDim;
                this.model.scale.set(scale, scale, scale);
                this.model.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
                
                this.scene.add(this.model);
                
                // Скрываем индикатор загрузки
                if (loadingIndicator) {
                    loadingIndicator.style.display = 'none';
                }
                
                console.log('3D модель успешно загружена');
            },
            (xhr) => {
                // Прогресс загрузки
                const progress = (xhr.loaded / xhr.total * 100).toFixed(0);
                if (loadingIndicator) {
                    loadingIndicator.textContent = `Загрузка 3D модели... ${progress}%`;
                }
            },
            (error) => {
                // Ошибка загрузки
                console.error('Ошибка загрузки 3D модели:', error);
                if (loadingIndicator) {
                    loadingIndicator.textContent = 'Ошибка загрузки модели';
                    loadingIndicator.style.backgroundColor = 'rgba(255,0,0,0.7)';
                    setTimeout(() => {
                        loadingIndicator.style.display = 'none';
                    }, 3000);
                }
            }
        );
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        
        // Плавное обновление контролов
        this.controls.update();
        
        // Анимация цветного света
        if (this.colorLight) {
            const time = Date.now() * 0.002;
            const hue = (Math.sin(time) * 0.5 + 0.5) * 360;
            this.colorLight.intensity = 0.3 + Math.sin(time) * 0.2;
        }
        
        // Рендеринг сцены
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        const container = document.getElementById('3d-viewer-container');
        if (container && this.camera && this.renderer) {
            const width = container.clientWidth;
            const height = container.clientHeight;
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
        }
    }

    dispose() {
        // Очистка ресурсов
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.renderer) {
            this.renderer.dispose();
        }
        if (this.controls) {
            this.controls.dispose();
        }
        if (this.scene) {
            this.scene.clear();
        }
    }

    render(modelPath) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.initThree(modelPath);
    }
}