/*This class is used to store various important settings used across the whole app.
These can be changed in case of some API changes.*/
export class Settings{
    // API related settings
    // Server address
    static server = "https://pixel-api.codenestedu.fr";
    // GET
    static uidAsk = "?uid="
    static gridAccess = "/tableau";
    static waitTime = "/temps-attente";
    static teamUser = "/equipe-utilisateur";
    static userList = "/liste-joueurs";
    // POST
    static chooseTeam = "/choisir-equipe";
    static editPixel = "/modifier-case";
    // Grid settings
    static gridWidth = 100;
    static gridHeight = 100;
    static pixelSize = 4;
    // UID Length
    static uidLength = 8;
    // Local Storage related settings
    static themeStorageName = "themes";
}