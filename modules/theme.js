import { Settings } from "./settings.js";
import { Infobox } from "./infobox.js";
import { Unitxt } from "./unitxt.js";

export class Theme{
    //All themes are stored here to be added as options.
    static themes = new Map();
    /**
     * Creates a new theme and adds it to the themes Map.
     * 
     * @param {string} name Theme name.
     * @param {string} main Main color. Any CSS color format is accepted.
     * @param {string} back Back color. Any CSS color format is accepted.
     * @param {string} details Details color. Any CSS color format is accepted.
     */
    constructor(name, main, back, details){
        this.main = main;
        this.back = back;
        this.details = details;
        Theme.themes.set(name, this);
    }
    /**
     * Changes the CSS color variables according to the theme's colors.
     */
    applyTheme = () =>{
        document.documentElement.style.setProperty("--main-color", this.main);
        document.documentElement.style.setProperty("--back-color", this.back);
        document.documentElement.style.setProperty("--details-color", this.details);
        console.log("Theme changed, normally");
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
        if (name===Unitxt.option || name===""){
            Infobox.callInfobox(Unitxt.ThemeInvalidName);
        } else {
            let newTheme = new Theme(name, main, back, text);
            this.saveThemesToLocalStorage();
        }
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
    /**
     * Adds all available themes to the theme selector.
     */
    static loadAllThemesToMenu = ()=>{
        const select = document.getElementById("theme-selector");
        select.innerHTML = "";
        for (let key of Theme.themes.keys()){
            let option = document.createElement("option");
            option.value=key;
            option.innerHTML=key;
            select.appendChild(option);
        }
    }
    /**
     * Adds a bunch of premade themes.
     */
    static addDefaultThemes = ()=>{
        this.saveTheme("IUT Light", "rgb(0,157,224)", "rgb(255, 255, 255)", "rgb(68,58,49)");
        this.saveTheme("IUT Dark", "rgb(0,157,224)", "rgb(25, 25, 25)", "rgb(255, 255, 255)");
        this.saveTheme("Nils's Choice", "rgb(236,76,86)", "rgb(36,41,51)", "rgb(246,240,233)");
    }
    /**
     * Adds the custom theme option
     */
    static addCustomOption = ()=>{
        const select = document.getElementById("theme-selector");
        let option = document.createElement("option");
            option.value=Unitxt.option;
            option.innerHTML=Unitxt.option;
            select.appendChild(option);
    }
    /**
     * Display custom theme settings
     */
    static displayCustomOption = (shouldBeDisplayed)=>{
        let consideredElements = document.querySelectorAll("#theme-name-input, #save-theme, #delete-theme, #theme-customization-line > *");
        if (shouldBeDisplayed){
            document.getElementById('main-color-selector').defaultValue = document.documentElement.style.getPropertyValue("--main-color");
            document.getElementById('back-color-selector').defaultValue = document.documentElement.style.getPropertyValue("--back-color");
            document.getElementById('details-color-selector').defaultValue = document.documentElement.style.getPropertyValue("--details-color");
            for (const elem of consideredElements){
                elem.classList.remove('display-none');
            }
        } else {
            for (const elem of consideredElements){
                elem.classList.add('display-none');
            }
        }
    }
}