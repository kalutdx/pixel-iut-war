export class Infobox{
    static infobox = document.getElementById('infobox');
    static infoboxContent = document.querySelector('#infobox-content p');

    static callInfobox = (header, message, button) => {
        this.infoboxContent.innerHTML = message;
        this.infobox.style.display='flex';
    }

    static closeInfobox = () => {
        this.infobox.style.display='none';
    }
}