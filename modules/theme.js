class Theme{
    static themes = new Map();
    constructor(name, main, back, text){
        this.main = main;
        this.back = back;
        this.text = text;
        Theme.themes.set(name, this);
    }

}