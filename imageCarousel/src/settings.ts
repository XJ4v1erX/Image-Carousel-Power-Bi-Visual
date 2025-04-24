//src/settings.ts
import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";
import FormattingSettingsCard = formattingSettings.SimpleCard;
import FormattingSettingsModel = formattingSettings.Model;
import FormattingSettingsSlice = formattingSettings.Slice;

class BehaviorSettings extends FormattingSettingsCard {
    autoSlide = new formattingSettings.ToggleSwitch({
        name: "autoSlide",
        displayName: "Deslizamiento automático",
        value: true
    });

    hoverToZoom = new formattingSettings.ToggleSwitch({
        name: "hoverToZoom",
        displayName: "Zoom al pasar el mouse",
        value: true
    });

    randomize = new formattingSettings.ToggleSwitch({
        name: "randomize",
        displayName: "Orden aleatorio al cargar",
        value: false
    });

    imageCount = new formattingSettings.NumUpDown({
        name: "imageCount",
        displayName: "Cantidad de imágenes visibles",
        value: 1
    });

    interval = new formattingSettings.NumUpDown({
        name: "interval",
        displayName: "Intervalo auto-slide (s)",
        value: 3,
        visible: true
    });

    spaceBetween = new formattingSettings.NumUpDown({
        name: "spaceBetween",
        displayName: "Espacio entre imágenes (px)",
        value: 8,
        visible: false
    });

    name: string = "behavior";
    displayName: string = "Comportamiento del Carrusel";
    slices: FormattingSettingsSlice[] = [
        this.autoSlide,
        this.hoverToZoom,
        this.randomize,
        this.interval,
        this.imageCount,
        this.spaceBetween
    ];
}

export class VisualSettings extends FormattingSettingsModel {
    behavior: BehaviorSettings = new BehaviorSettings();
    cards: FormattingSettingsCard[] = [this.behavior];
}
