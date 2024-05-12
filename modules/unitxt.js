/*This class's name is a reference to the file that handles all texts in Phantasy Star Online Blue Burst.*/

export class Unitxt{

    /*------ INFOBOX ------*/  
    static unknownError = 'Une erreur inconnue est survenue.';
    
    static unknownUID = 'Utilisateur inconnu. Veuillez rentrer un ID valide et ressayez.';

    static missingTeam = 'Vous ne faîtes pas parti d\'une équipe. Rejoignez-en une !';
    static teamJoinError = 'Une erreur est survenue en rejoignant une équipe.';
    static teamJoinSuccessful = (teamNumber) => `Vous avez rejoint l'équipe ${teamNumber} !`;
    
    static pixelPlacementError = 'Une erreur est survenue en plaçant un pixel sur la grille.';

    static UIDSaveSuccessful = 'Sauvegarde de votre ID effectuée.';
    static UIDBrowserSecurityError = (isSave) => `Impossible de ${isSave ? 'sauvegarder':'charger'} votre ID. Vérifiez vos paramètres de navigateur.`;

    /*------ Toolbox ------*/
    static timeLeft = (hasUID) => hasUID?'Temps restant : ':'En attente d\'ID...';
}