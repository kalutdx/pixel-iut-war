export class Infobox{
    static infobox = document.getElementById('infobox');
    static infoboxContent = document.querySelector('#infobox-content p');
    static infoboxButton = document.getElementById('infobox-confirm');

    static callInfobox = (header, message, button) => {
        this.infoboxContent.innerHTML = message;
        this.infoboxButton.innerHTML = button;
        this.infobox.style.display='flex';
    }

    static closeInfobox = () => {
        this.infobox.style.display='none';
    }
}