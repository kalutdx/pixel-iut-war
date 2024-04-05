let server="https://pixel-api.codenestedu.fr"
import { Settings } from "./settings.js"

// ------ MAIN FUNCTIONS ------

/**
 * Displays the screen in the form of a table.
 * Will also add events to the generated pixels.
 */
const displayGrid = () => {
    fetch(server+Settings.gridAccess)
      .then(response => response.json())
      .then(data =>{
        const grid = document.getElementById("grid-body");
        grid.innerHTML = '';
        for (let r of data){
            let row = document.createElement("tr");
            for (let c of r){
                let col = document.createElement("td");
                col.className = "pixel";
                col.style.backgroundColor = c;
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
 * Attempts to place a pixel on the grid. Will not check if params are invalid.
 * 
 * @param {string} uid User's UID
 * @param {string} color Color to place in HTML format
 * @param {number} x Column number
 * @param {number} y Row number
 */
const addPixel = (x, y) => {
    const toAdd = {
        "color": document.getElementById('pixel-color-input').value,
        "uid": document.getElementById('uid-input').value,
        "col": x,
        "row": y
      }
    console.log(JSON.stringify(toAdd));
    fetch(server+Settings.editPixel, {
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
        "nouvelleEquipe": 1
    }
    fetch(server+Settings.chooseTeam, {
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

document.getElementById("display-grid").addEventListener("click", displayGrid);

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