import { Settings } from "./settings.js";
import { Infobox } from "./infobox.js";

class Theme{
    static themes = new Map();
    /**
     * Creates a new theme and adds it to the themes Map.
     * 
     * @param {boolean} isDefault If true, this theme cannot be edited, nor removed.
     * @param {string} name Theme name.
     * @param {string} main Main color. Any CSS color format is accepted.
     * @param {string} back Back color. Any CSS color format is accepted.
     * @param {string} details Details color. Any CSS color format is accepted.
     */
    constructor(isDefault, name, main, back, details){
        this.isDefault = isDefault;
        this.main = main;
        this.back = back;
        this.text = details;
        Theme.themes.set(name, this);
    }
    static getThemesFromLocalStorage = () => {
        try{
            let storage = localStorage;
            let storedThemes = localStorage.getItem("themes");
            for (let [key, value] of storedThemes){
                Theme.themes.set(key, value);
            }
        }
        catch (SecurityError){
            Infobox.callInfobox(Unitxt.error, Unitxt.ThemeSecurityError(false));
        }
    }
    static saveThemesToLocalStorage = ()=>{
        try{
            let storage = localStorage;
            
            storage.setItem(Settings.themeStorageName, Theme.themes);
        }
        catch (SecurityError){
            Infobox.callInfobox(Unitxt.error, Unitxt.ThemeSecurityError(true));
        }

    }
    static saveTheme = (name, main, back, text)=>{
        let newTheme = new Theme(false, name, main, back, text);
    }
    static deleteTheme = (name)=>{
        Theme.themes.delete(name);

    }
}