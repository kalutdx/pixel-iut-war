export class Utils{
    /**
     * Waits a certain amount of milliseconds, in the form of a promise.
     * @param {*} ms Time in milliseconds to wait for.
     * @returns The timeout promise.
     */
    static sleep = (ms) => new Promise(r => setTimeout(r, ms));

    /**
     * Returns a text depending on a state.
     * @param {*} bool Any boolean
     * @returns Yes if true, No otherwise
     */
    static displayBoolean = (bool) => bool ? 'Yes' : 'No';

    /**
     * Returns seconds from time in milliseconds.
     * @param {*} ms Time in milliseconds
     * @returns Seconds
     */
    static getSecondsFromMilliseconds = (ms) => {
        return Math.floor(ms/1000);
    }

    /**
     * Formats the date.
     * @param {*} date Date in yyyy/mm/dd format. 
     * @returns Same date in dd/mm/yyyy format.
     */
    static formatDate = (date) => {
        let newdate = date.substring(0,10);
        newdate = newdate.split('-').reverse();
        const [d, m, y] = newdate;
        return `${d}/${m}/${y}`;
    }
    
    /**
     * Formats the time.
     * @param {*} date Time in hh/mm/ss
     * @returns Time in hh:mm:ss
     */
    static formatTime = (date) => {
        let newtime = date.substring(11,19);
        newtime = newtime.split(':');
        const [h, m, s] = newtime;
        return `${h}:${m}:${s}`;
    }

    /**
     * Get a color channel from an RGBa color string.
     * If no opacity value is specified in the provided color,
     * it will automatically be 1.
     * 
     * @param {*} color The color
     * @param {*} channel The channel, from 0 to 3
     * @returns r if channel is 0, g if it's 1, b if it's 2, a if it's 3.
     */
    static getColorFromRgb = (color, channel) => {
        let r = color.substring(4,color.length-1).split(', ')
        if (r.lenght = 3){
            r[3] = "255";
        }
        return r[channel];
    }
}