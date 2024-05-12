import { Settings } from "./settings.js";
import { Utils } from "./utils.js";
import { Infobox } from "./infobox.js";
import { Unitxt } from "./unitxt.js";

// ------ VARIABLES ------
let dream = 0;

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
        Infobox.callInfobox(Unitxt.UIDBrowserSecurityError(false));
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
            const {nom, equipe, lastModificationPixel, nbPixelsModifies, banned} = r;
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
            c4.innerHTML = nbPixelsModifies;
            row.appendChild(c4);
            let c5 = document.createElement("td");
            c5.innerHTML = Utils.displayBoolean(banned);
            row.appendChild(c5);
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
                col.style.width = Settings.pixelSize;
                col.style.height = Settings.pixelSize;
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
const displayTimeLeft = (hasUID) => {
    let t = getTimeLeftTag();
    if(hasUID){
        fetch(Settings.server+Settings.waitTime+Settings.uidAsk+getUid())
        .then(response=>response.json())
        .then(data=>{
            t.innerHTML = `${Unitxt.timeLeft(hasUID)}${Utils.getSecondsFromMilliseconds(data.tempsAttente)}`;
        })
        .catch(error => console.error('Error :', error));
    }
    else{
        t.innerHTML = Unitxt.timeLeft(hasUID);
    }
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
    let ok;
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
            ok = response.ok;
            if (!ok){
                return response.json().then(data=>{
                    const msg = data['msg'];
                    Infobox.callInfobox(msg);
                });
            }
            return response.json();
        })
        .then(data => {
            if(ok){
                updateLocalGrid(toAdd.color, x, y);
            }
        })
        .catch(error =>{
            Infobox.callInfobox(Unitxt.pixelPlacementError);
        });
}

/**
 * Attempts to join a team. Will not check if params are invalid.
 * 
 * @param {string} uid 
 * @param {number} team 
 */
const teamSelect = (uid, team) => {
    let ok;
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
            ok = response.ok;
            if (!ok){
                return response.json().then(data=>{
                    const msg = data['msg'];
                    Infobox.callInfobox(msg);
                });
            }
            return response.json();
        })
        .then(data => {
            if(ok){
                Infobox.callInfobox(Unitxt.teamJoinSuccessful(team));
            }
        })
        .catch(error =>{
            Infobox.callInfobox(Unitxt.teamJoinError);
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
        Infobox.callInfobox(Unitxt.UIDSaveSuccessful);
    }
    catch (SecurityError){
        Infobox.callInfobox(Unitxt.UIDBrowserSecurityError(true));
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

/*- Take a snapshot -*/
document.getElementById("snapshot-button").addEventListener("click", (event)=>{
    let pic = new ImageData(Settings.gridWidth, Settings.gridHeight);
    const grid = getGrid();
    let x = 0;
    let y = 0;
    // Building image data
    for (let r of grid.rows){
        for (let c of r.cells){
            let color = c.style.backgroundColor;
            pic.data[y*(pic.width*4)+x*4] = Utils.getColorFromRgb(color, 0)
            pic.data[y*(pic.width*4)+x*4+1] = Utils.getColorFromRgb(color, 1)
            pic.data[y*(pic.width*4)+x*4+2] = Utils.getColorFromRgb(color, 2)
            pic.data[y*(pic.width*4)+x*4+3] = Utils.getColorFromRgb(color, 3)
            x++;
        }
        x=0;
        y++;
    }
    let cv = document.createElement('canvas');
    let ctx = cv.getContext("2d");
    ctx.canvas.width = Settings.gridWidth;
    ctx.canvas.height = Settings.gridHeight;
    ctx.putImageData(pic, 0, 0);
    let anchor = document.createElement('a');
    let date = new Date();
    let linkText = `${date.getFullYear()}${date.getMonth()}${date.getDate()}-${date.getHours()}${date.getMinutes()}${date.getSeconds()}.png`;
    anchor.setAttribute('download', linkText);
    anchor.setAttribute('href', cv.toDataURL('image/png').replace("image/png", "image/octet-stream"));
    anchor.click();
})

/*- Record key inputs -*/
document.addEventListener('keydown', (event)=>{
    console.log(event.key);
    if (event.key === 's' && dream===0){
        dream++;
    } else if (event.key === 'e' && dream===1){
        dream++;
    } else if (event.key === 'g' && dream===2){
        dream++;
    } else if (event.key === 'a' && dream===3){
        dream++;
    } else if (event.key === 'Enter' && dream===4){
        window.location.href="../dream.html";
    }
    else{
        dream=0;
    }
    console.log(dream);
})

// ------ MAIN ------

const main = async () => {
    // Loading UID
    loadUid();
    // Main loop
    while(true){
        displayGrid();
        if (getUid().length === Settings.uidLength){
            displayTimeLeft(true);
            displayRecentActions();
        } else {
            displayTimeLeft(false);
        }
        await Utils.sleep(500);
    }
}

main();