import { Utils } from "./utils.js";

const playAudio = ()=>{
    let audio = new Audio('../assets/audio/BOOT.wav');
    audio.play();
}

const insertImg = () =>{
    const image = document.createElement('img');
    image.src="assets/img/dream.gif";
    document.getElementById('container').appendChild(image);
}
const removeImg = () =>{
    document.getElementById('container').innerHTML = ' ';
}

playAudio();
await Utils.sleep(1250);
insertImg();
await Utils.sleep(5650);
removeImg();
await Utils.sleep(1050);
window.location.href="../index.html";