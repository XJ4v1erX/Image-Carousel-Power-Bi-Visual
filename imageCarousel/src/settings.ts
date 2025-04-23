import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";
import FormattingSettingsCard = formattingSettings.SimpleCard;
import FormattingSettingsModel = formattingSettings.Model;

class BehaviorSettings extends FormattingSettingsCard {
    autoSlide = new formattingSettings.ToggleSwitch({
        name: "autoSlide",
        displayName: "Deslizamiento automático",
        value: true
    });

    interval = new formattingSettings.NumUpDown({
        name: "interval",
        displayName: "Intervalo auto-slide (ms)",
        value: 3000
    });

    name: string = "behavior";
    displayName: string = "Comportamiento";
    slices = [this.autoSlide, this.interval];
}

export class VisualSettings extends FormattingSettingsModel {
    behavior = new BehaviorSettings();
    cards = [this.behavior];
}
