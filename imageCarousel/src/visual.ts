import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;

export class Visual {
    private container: HTMLElement;
    private currentIndex = 0;
    private carouselInterval: any;
    private options: VisualUpdateOptions;

    constructor(options: VisualConstructorOptions) {
        this.container = document.createElement('div');
        this.container.id = 'carousel-container';
        options.element.appendChild(this.container);
    }

    public update(options: VisualUpdateOptions) {
        this.options = options;
        const dataView = options.dataViews[0];
        if (!dataView?.categorical) return;

        const categorical = dataView.categorical;
        const imageUrls = categorical.categories[0].values as string[];
        const sequences = categorical.values?.[0]?.values as number[] || [];

        const carouselImages = imageUrls.map((url, index) => ({
            url,
            sequence: sequences[index] || index
        })).sort((a, b) => a.sequence - b.sequence);

        this.renderCarousel(carouselImages);
    }

    private renderCarousel(images) {
        this.container.innerHTML = '';

        images.forEach((image, index) => {
            const imgElem = document.createElement('img');
            imgElem.src = image.url;
            imgElem.className = 'carousel-image';
            imgElem.style.display = index === 0 ? 'block' : 'none';
            this.container.appendChild(imgElem);
        });

        this.setupCarouselBehavior(images.length);
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
        const images = document.querySelectorAll('.carousel-image') as NodeListOf<HTMLImageElement>;
        images.forEach((img, idx) => {
            img.style.display = idx === index ? 'block' : 'none';
        });
    }

    private getBehaviorSettings() {
        const objects = this.options.dataViews[0].metadata.objects;
        return {
            autoSlide: objects?.behavior?.autoSlide ?? true,
            interval: objects?.behavior?.interval ?? 3000
        };
    }
}
