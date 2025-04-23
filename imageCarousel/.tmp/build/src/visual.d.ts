import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
export declare class Visual {
    private container;
    private currentIndex;
    private carouselInterval;
    private options;
    constructor(options: VisualConstructorOptions);
    update(options: VisualUpdateOptions): void;
    private renderCarousel;
    private setupCarouselBehavior;
    private updateCarouselView;
    private getBehaviorSettings;
}
