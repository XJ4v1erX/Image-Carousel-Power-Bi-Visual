import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";
import FormattingSettingsCard = formattingSettings.SimpleCard;
import FormattingSettingsSlice = formattingSettings.Slice;
import FormattingSettingsModel = formattingSettings.Model;
export declare class CarouselSettings extends FormattingSettingsCard {
    autoSlide: formattingSettings.ToggleSwitch;
    hoverZoom: formattingSettings.ToggleSwitch;
    imageCount: formattingSettings.NumUpDown;
    interval: formattingSettings.NumUpDown;
    spaceBetween: formattingSettings.NumUpDown;
    name: string;
    displayName: string;
    slices: FormattingSettingsSlice[];
}
export declare class GeneralSettings extends FormattingSettingsCard {
    width: formattingSettings.NumUpDown;
    height: formattingSettings.NumUpDown;
    name: string;
    displayName: string;
    slices: formattingSettings.NumUpDown[];
}
export declare class VisualSettings extends FormattingSettingsModel {
    carousel: CarouselSettings;
    general: GeneralSettings;
    cards: (CarouselSettings | GeneralSettings)[];
}
