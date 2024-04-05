let server="https://pixel-api.codenestedu.fr"
import { Settings } from "./settings.js"

// ------ MAIN FUNCTIONS ------

/**
 * Displays the screen in the form of a table.
 * Will also add events to the generated pixels.
 */
const displayGrid = () => {
    let x=0;
    let y=0;
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
                    addPixel(x, y);
                })
                row.appendChild(col);
                x++;
            }
            grid.appendChild(row);
            y++;
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
        "uid": document.getElementById('uid-input').textContent,
        "col": x,
        "row": y
      }
    fetch(server+Settings.editPixel, {
        method: 'POST',
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
        method: 'POST',
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