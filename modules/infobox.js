export class Infobox{
    //These are all elements required to properly manipulate the infobox.
    static infobox = document.getElementById('infobox');
    static infoboxContent = document.querySelector('#infobox-content p');

    /**
     * Display the infobox with the specified message.
     * @param {string} message Any message provided.
     */
    static callInfobox = (message) => {
        this.infoboxContent.innerHTML = message;
        this.infobox.style.display='flex';
    }

    /**
     * Hides the infobox.
     */
    static closeInfobox = () => {
        this.infobox.style.display='none';
    }
}