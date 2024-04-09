export class Utils{
    static sleep = (ms) => new Promise(r => setTimeout(r, ms));
}