export class Utils{
    static zoomSpeed = 0.1;

    static sleep = (ms) => new Promise(r => setTimeout(r, ms));

    static displayBoolean = (bool) => {return bool ? 'Yes' : 'No'}
}