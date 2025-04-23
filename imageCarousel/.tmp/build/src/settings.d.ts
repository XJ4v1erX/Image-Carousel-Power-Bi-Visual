import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";
import FormattingSettingsCard = formattingSettings.SimpleCard;
import FormattingSettingsModel = formattingSettings.Model;
import FormattingSettingsSlice = formattingSettings.Slice;
declare class BehaviorSettings extends FormattingSettingsCard {
    autoSlide: formattingSettings.ToggleSwitch;
    hoverToZoom: formattingSettings.ToggleSwitch;
    randomize: formattingSettings.ToggleSwitch;
    imageCount: formattingSettings.NumUpDown;
    interval: formattingSettings.NumUpDown;
    spaceBetween: formattingSettings.NumUpDown;
    name: string;
    displayName: string;
    slices: FormattingSettingsSlice[];
}
export declare class VisualSettings extends FormattingSettingsModel {
    behavior: BehaviorSettings;
    cards: FormattingSettingsCard[];
}
export {};
