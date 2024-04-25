export class Infobox{
    static infoboxContainer = document.getElementById('infobox-container');
    static infoboxElement = document.getElementById('infobox');
    static infoboxHeader = document.querySelector('#infobox-header p');
    static infoboxContent = document.querySelector('#infobox-content p');
    static infoboxButton = document.getElementById('infobox-confirm');

    static callInfobox = (header, message, button) => {
        this.infoboxHeader.innerHTML = header;
        this.infoboxContent.innerHTML = message;
        this.infoboxButton.innerHTML = button;
        this.infoboxContainer.style.display='flex';
    }

    static closeInfobox = () => {
        this.infoboxContainer.style.display='none';
    }
}