export class Infobox{
    static infoboxContainer = document.getElementById('infobox-container');
    static infoboxElement = document.getElementById('infobox');

    static headerText = 'Info';
    static content = 'Dummy';
    static buttonText = 'OK';

    static callInfobox = (header, message, button) => {
        headerText = header;
        content = message;
        buttonText = button;
        this.infoboxContainer.style.display='flex';
        this.infoboxElement.style.display='flex';
    }

    static closeInfobox = () => {
        this.infoboxContainer.style.display='none';
        this.infoboxElement.style.display='none';
    }
}