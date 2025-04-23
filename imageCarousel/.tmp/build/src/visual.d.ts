import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import "../style/visual.less";
export declare class Visual {
    private container;
    private currentIndex;
    private carouselInterval;
    private options;
    private formattingSettingsService;
    private visualSettings;
    constructor(options: VisualConstructorOptions);
    update(options: VisualUpdateOptions): void;
    getFormattingModel(): powerbi.visuals.FormattingModel;
    private renderCarousel;
    private setupCarouselBehavior;
    private updateCarouselView;
    private getBehaviorSettings;
}
