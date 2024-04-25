import { Settings } from "./settings.js";
import { Texts } from "./texts.js";
import { Utils } from "./utils.js";
import { Infobox } from "./infobox.js";
import { Unitxt } from "./unitxt.js";

// ------ VARIABLES ------

/**
 * Zoom level. Deprecated.
 */
const zoom = 4;

// ------ GETTERS ------

/**
 * Gets the entered UID
 * @returns uid-input's value
 */
const getUid = () => {
    return document.getElementById('uid-input').value;
}

/**
 * Gets the color from the color dialog
 * @returns pixel-color-input's value
 */
const getColor = () => {
    return document.getElementById('color-input').value;
}

/**
 * Gets the grid's body.
 * @returns grid-body table
 */
const getGrid = () => {
    return document.getElementById("grid-body");
}

/**
 * Gets the recent table.
 * @returns play-history-tab table
 */
const getRecentTable = () => {
    return document.getElementById("play-history-content");
}

/**
 * Gets the time left paragraph
 * @returns remaining-time's paragraph
 */
const getTimeLeftTag = () => {
    return document.querySelector("#remaining-time p");
}

// ------ LOCAL STORAGE ------

let myStorage = localStorage;

/**
 * Attempts to load the User's UID from localStorage.
 */
const loadUid = () => {
    try{
        document.getElementById('uid-input').value = myStorage.getItem("uid");
        console.log("Successfully loaded UID");
    }
    catch (SecurityError){
        console.log("Not allowed by browser");
    }
}

// ------ LOCAL METHODS ------

/**
 * Locally updates the table after placing a pixel.
 * 
 * @param {string} color Color of the pixel
 * @param {number} x Column number
 * @param {number} y Row number
 */
const updateLocalGrid = (color, x, y) => {
    const grid = getGrid();
    for (let r of grid.rows){
        if (r.rowIndex === y){
            for (let c of r.cells){
                if (c.cellIndex === x){
                    c.style.backgroundColor = color;
                }
            }
        }
    }
}

// ------ FETCH REQUESTS ------

/**
 * Displays the recents actions in a table.
 */
const displayRecentActions = () => {
    fetch(Settings.server+Settings.userList+Settings.uidAsk+getUid())
    .then(response => response.json())
    .then(data =>{
        const tab = getRecentTable();
        tab.innerHTML = '';
        for (const r of data){
            const {nom, equipe, lastModificationPixel, banned} = r;
            let row = document.createElement("tr");
            let c1 = document.createElement("td");
            c1.innerHTML = nom;
            row.appendChild(c1);
            let c2 = document.createElement("td");
            c2.innerHTML = equipe;
            row.appendChild(c2);
            let c3 = document.createElement("td");
            c3.innerHTML = `${Utils.formatDate(lastModificationPixel)}
                            \n${Utils.formatTime(lastModificationPixel)}`;
            row.appendChild(c3);
            let c4 = document.createElement("td");
            c4.innerHTML = Utils.displayBoolean(banned);
            row.appendChild(c4);
            tab.appendChild(row);
        }
    })
    .catch(error => console.error('Error :', error));
}

/**
 * Displays the grid in the form of a table.
 * Will also add events to the generated pixels.
 */
const displayGrid = () => {
    fetch(Settings.server+Settings.gridAccess)
      .then(response => response.json())
      .then(data =>{
        const grid = getGrid();
        grid.innerHTML = '';
        for (let r of data){
            let row = document.createElement("tr");
            for (let c of r){
                let col = document.createElement("td");
                col.className = "pixel";
                col.style.backgroundColor = c;
                col.style.width = zoom;
                col.style.height = zoom;
                col.addEventListener("click", (event)=>{
                    let x = col.cellIndex;
                    let y = row.rowIndex;
                    addPixel(x, y);
                })
                row.appendChild(col);
            }
            grid.appendChild(row);
        }
      })
      .catch(error => console.error('Error :', error));
}

/**
 * Attempts to display the time left before the user can place another pixel on the grid.
 */
const displayTimeLeft = () => {
    fetch(Settings.server+Settings.waitTime+Settings.uidAsk+getUid())
    .then(response=>response.json())
    .then(data=>{
        let t = getTimeLeftTag();
        t.innerHTML = `${Texts.timeLeft}${Utils.getSecondsFromMilliseconds(data.tempsAttente)}`;
    })
    .catch(error => console.error('Error :', error));
}

/**
 * Attempts to place a pixel on the grid. Will not check if params are invalid.
 * 
 * @param {string} uid User's UID
 * @param {string} color Color to place in HTML format
 * @param {number} x Column number
 * @param {number} y Row number
 */
const addPixel = (x, y) => {
    const toAdd = {
        "color": getColor(),
        "uid": getUid(),
        "col": x,
        "row": y
      }
    console.log(JSON.stringify(toAdd));
    fetch(Settings.server+Settings.editPixel, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(toAdd)
    })
        .then(response =>{
            if (!response.ok){
                return response.json().then(data=>{
                    throw new Error(data.error);
                });
            }
            return response.json();
        })
        .then(data => {
            console.log('Pixel placed : ', data);
            updateLocalGrid(toAdd.color, x, y);
        })
        .catch(error =>{
            console.error('Error while adding pixel to grid : ', error);
        });
}

/**
 * Attempts to join a team. Will not check if params are invalid.
 * 
 * @param {string} uid 
 * @param {number} team 
 */
const teamSelect = (uid, team) => {
    const toAdd = {
        "uid": uid,
        "nouvelleEquipe": team
    }
    fetch(Settings.server+Settings.chooseTeam, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(toAdd)
    })
        .then(response =>{
            if (!response.ok){
                return response.json().then(data=>{
                    throw new Error(data.error);
                });
            }
            return response.json();
        })
        .then(data => {
            console.log('Successfully added to a team : ', data);
        })
        .catch(error =>{
            console.error('Error while joining team : ', error);
        });
}

// ------ ADDING EVENTS TO ELEMENTS ------

/*- Infobox button event -*/
document.getElementById("infobox-confirm").addEventListener("click", (event)=>{
    Infobox.closeInfobox();
})

/*- Saving UID -*/
document.getElementById("save-uid").addEventListener("click", (event)=>{
    try{
        myStorage.setItem("uid", getUid());
        console.log("Successfully saved UID");
    }
    catch (SecurityError){
        console.log("Not allowed by browser");
    }
})

/*- Team selection methods -*/
document.getElementById("team-1-selection").addEventListener("click", (event)=>{
    let user = document.getElementById('uid-input').value;
    teamSelect(user, 1);
})
document.getElementById("team-2-selection").addEventListener("click", (event)=>{
    let user = document.getElementById('uid-input').value;
    teamSelect(user, 2);
})
document.getElementById("team-3-selection").addEventListener("click", (event)=>{
    let user = document.getElementById('uid-input').value;
    teamSelect(user, 3);
})
document.getElementById("team-4-selection").addEventListener("click", (event)=>{
    let user = document.getElementById('uid-input').value;
    teamSelect(user, 4);
})

// ------ MAIN ------

const main = async () => {
    // Loading Local Storage
    loadUid();
    // Main loop
    while(true){
        displayGrid();
        if (getUid().length === Settings.uidLength){
            displayTimeLeft();
            displayRecentActions();
        }
        await Utils.sleep(500);
    }
}

main();