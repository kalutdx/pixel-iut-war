import { Settings } from "./settings.js";
import { Infobox } from "./infobox.js";

class Theme{
    //All themes are stored here to be added as options.
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
    /**
     * Changes the CSS color variables according to the theme's colors.
     */
    applyTheme = () =>{
        document.documentElement.setAttribute("style", "--main-color:"+this.main);
        document.documentElement.setAttribute("style", "--back-color:"+this.back);
        document.documentElement.setAttribute("style", "--details-color:"+this.details);
    }
    /**
     * Get all themes stored in local storage.
     */
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
    /**
     * Save the current themes map in local storage.
     * Separate from saveTheme.
     */
    static saveThemesToLocalStorage = ()=>{
        try{
            let storage = localStorage;
            
            storage.setItem(Settings.themeStorageName, Theme.themes);
        }
        catch (SecurityError){
            Infobox.callInfobox(Unitxt.error, Unitxt.ThemeSecurityError(true));
        }

    }
    /**
     * Saves a theme to the themes map, then saves it to local storage.
     * @param {string} name Theme name.
     * @param {string} main Main color. Any CSS color format is accepted.
     * @param {string} back Back color. Any CSS color format is accepted.
     * @param {string} text Details color. Any CSS color format is accepted.
     */
    static saveTheme = (name, main, back, text)=>{
        let newTheme = new Theme(false, name, main, back, text);
        this.saveThemesToLocalStorage();
    }
    /**
     * Removes a specified theme from the themes map, then saves
     * the new map to local storage.
     * @param {string} name Theme name.
     */
    static deleteTheme = (name)=>{
        Theme.themes.delete(name);
        this.saveThemesToLocalStorage();
    }
}