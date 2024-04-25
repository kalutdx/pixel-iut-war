export class Utils{
    static zoomSpeed = 0.1;

    static sleep = (ms) => new Promise(r => setTimeout(r, ms));

    static displayBoolean = (bool) => {return bool ? 'Yes' : 'No'}

    static getSecondsFromMilliseconds = (ms) => {
        return Math.floor(ms/1000);
    }

    static formatDate = (date) => {
        let newdate = date.substring(0,10);
        newdate = newdate.split('-').reverse();
        const [d, m, y] = newdate;
        return `${d}/${m}/${y}`;
    }
    
    static formatTime = (date) => {
        let newtime = date.substring(11,19);
        newtime = newtime.split(':');
        const [h, m, s] = newtime;
        return `${h}:${m}:${s}`;
    }
}