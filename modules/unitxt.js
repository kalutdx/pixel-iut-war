/*This class's name is a reference to the file that handles all texts in Phantasy Star Online Blue Burst.*/

export class Unitxt{
    /*------ BUTTONS ------*/
    static saveButton = 'Save';
    static deleteButton = 'Delete';

    /*------ INFOBOX ------*/  
    static unknownError = 'An unknown error has occured.';
    
    static unknownUID = 'Unknown user. Please enter a correct UID and try again.';

    static missingTeam = 'You don\'t belong to any team. Go pick one !';
    static teamJoinError = 'An error has occured when attempting to join a team.';
    static teamJoinSuccessful = (teamNumber) => `Successfully joined team ${teamNumber} !`;
    
    static pixelPlacementError = 'An error has occured when attempting to place a pixel on the grid.';

    static UIDSaveSuccessful = 'Successfully saved your UID.';
    static UIDBrowserSecurityError = (isSave) => `Can\'t ${isSave ? 'save':'load'} your UID. Check your browser settings.`;

    /*------ Toolbox ------*/
    static timeLeft = (hasUID) => hasUID?'Time remaining : ':'Awaiting UID...';
}