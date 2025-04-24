// src/visual.ts
import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import { VisualSettings } from "./settings";
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import "../style/visual.less";
import IVisualHost = powerbi.extensibility.visual.IVisualHost;


export class Visual {
    private container: HTMLElement;
    private currentIndex = 0;
    private carouselInterval: any;
    private options: VisualUpdateOptions;
    private formattingSettingsService = new FormattingSettingsService();
    private visualSettings: VisualSettings;
    private host: IVisualHost;

 
    constructor(options: VisualConstructorOptions) {
        this.container = document.createElement('div');
        this.container.id = 'carousel-container';
        this.host = options.host;
        options.element.appendChild(this.container);
    }

    public update(options: VisualUpdateOptions) {
        this.options = options;
        this.visualSettings = this.formattingSettingsService.populateFormattingSettingsModel(
            VisualSettings,
            options.dataViews?.[0]
        );
        this.visualSettings.behavior.interval.visible = this.visualSettings.behavior.autoSlide.value;
        this.visualSettings.behavior.spaceBetween.visible = this.visualSettings.behavior.imageCount.value > 1;

        const dataView = options.dataViews[0];
        if (!dataView?.categorical) return;

        const categorical = dataView.categorical;
        const imageUrls = categorical.categories[0].values as string[];
        const categoryColumns = categorical.categories;
        const links = categoryColumns.length > 1 ? categoryColumns[1].values as string[] : [];
        

        const carouselImages = imageUrls.map((url, index) => ({
            url,
            link: links[index]
        }));

        this.renderCarousel(carouselImages);
    }
    public getFormattingModel(): powerbi.visuals.FormattingModel {
        return this.formattingSettingsService.buildFormattingModel(this.visualSettings);
    }
    

    private renderCarousel(images) {
        this.container.replaceChildren();
        const settings = this.getBehaviorSettings();
    
        // Contenedor del grupo de imágenes
        const group = document.createElement('div');
        group.className = 'carousel-group';
    
        // Variables CSS dinámicas
        group.style.setProperty('--image-count', String(settings.imageCount));
        group.style.setProperty('--space-between', `${settings.spaceBetween}px`);

        function secureRandom() {
            const array = new Uint32Array(1);
            window.crypto.getRandomValues(array);
            return array[0] / (0xFFFFFFFF + 1);
        }
    
        const imagesToRender = settings.randomize
            ? images.sort(() => 0.5 - secureRandom())
            : images;
    
        imagesToRender.forEach((image, index) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'carousel-image-wrapper';
    
            const imgElem = document.createElement('img');
            imgElem.src = image.url;
            imgElem.className = 'carousel-image';
    
            // Zoom interactivo
            if (settings.hoverToZoom) {
                imgElem.addEventListener('mouseenter', () => imgElem.classList.add('zoomed'));
                imgElem.addEventListener('mouseleave', () => {
                    imgElem.classList.remove('zoomed');
                    imgElem.style.transformOrigin = 'center center';
                });
                imgElem.addEventListener('mousemove', (e) => {
                    const rect = imgElem.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    imgElem.style.transformOrigin = `${x}% ${y}%`;
                    e.stopPropagation();
                });
            }

            imgElem.addEventListener("click", (e) => {
                e.stopPropagation();
                if (image.link && typeof image.link === "string" && image.link.trim().startsWith("http")) {
                    this.host.launchUrl(image.link);
                }
            });
    
            wrapper.appendChild(imgElem);
            group.appendChild(wrapper);
        });
    
        this.container.appendChild(group);
        this.updateCarouselView(this.currentIndex);
        this.setupCarouselBehavior(imagesToRender.length);
    
        if (!settings.autoSlide) {
            const leftBtn = document.createElement('div');
            const rightBtn = document.createElement('div');
        
            leftBtn.className = 'carousel-arrow left-arrow';
            rightBtn.className = 'carousel-arrow right-arrow';
        
            const createArrowSVG = (direction: 'left' | 'right') => {
                const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.setAttribute("width", "14");
                svg.setAttribute("height", "14");
                svg.setAttribute("viewBox", "0 0 24 24");
                svg.setAttribute("fill", "none");
        
                const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                const d = direction === "left"
                    ? "M15 6L9 12L15 18"
                    : "M9 6L15 12L9 18";
        
                path.setAttribute("d", d);
                path.setAttribute("stroke", "white");
                path.setAttribute("stroke-width", "2");
                path.setAttribute("stroke-linecap", "round");
                path.setAttribute("stroke-linejoin", "round");
        
                svg.appendChild(path);
                return svg;
            };
        
            leftBtn.appendChild(createArrowSVG("left"));
            rightBtn.appendChild(createArrowSVG("right"));
        
            leftBtn.onclick = () => {
                const total = images.length;
                this.currentIndex = (this.currentIndex - 1 + total) % total;
                this.updateCarouselView(this.currentIndex);
            };
        
            rightBtn.onclick = () => {
                const total = images.length;
                this.currentIndex = (this.currentIndex + 1) % total;
                this.updateCarouselView(this.currentIndex);
            };
        
            this.container.appendChild(leftBtn);
            this.container.appendChild(rightBtn);
        }
    }
    

    private setupCarouselBehavior(totalImages: number) {
        const settings = this.getBehaviorSettings();
        if (this.carouselInterval) clearInterval(this.carouselInterval);
    
        if (settings.autoSlide) {
            this.carouselInterval = setInterval(() => {
                this.currentIndex = (this.currentIndex + 1) % totalImages;
                this.updateCarouselView(this.currentIndex);
            }, Number(settings.interval));
        }
    }

    private updateCarouselView(index: number) {
        const settings = this.getBehaviorSettings();
        const images = this.container.querySelectorAll('.carousel-image-wrapper');

        const total = images.length;

        images.forEach((wrapper, idx) => {
            const visibleIndexes = [];
            for (let i = 0; i < Number(settings.imageCount); i++) {
                visibleIndexes.push((index + i) % total);
            }

            if (visibleIndexes.includes(idx)) {
                (wrapper as HTMLElement).style.display = 'block';
            } else {
                (wrapper as HTMLElement).style.display = 'none';
            }
        });
    }

    private getBehaviorSettings() {
        const objects = this.options.dataViews[0].metadata.objects;
    
        return {
            autoSlide: objects?.behavior?.autoSlide ?? true,
            hoverToZoom: objects?.behavior?.hoverToZoom ?? false,
            randomize: objects?.behavior?.randomize ?? false,
            interval: (Number(objects?.behavior?.interval) || 3) * 1000,
            imageCount: objects?.behavior?.imageCount ?? 1,
            spaceBetween: objects?.behavior?.spaceBetween ?? 8,
        };
    }
}
