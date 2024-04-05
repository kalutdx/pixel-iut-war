let server="https://pixel-api.codenestedu.fr"
import { Settings } from "./settings.js"

/**
 * Displays the screen in the form of a table.
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
                row.appendChild(col);
            }
            grid.appendChild(row);
        }
      })
      .catch(error => console.error('Error :', error));
}

document.getElementById("display-grid").addEventListener("click", displayGrid);