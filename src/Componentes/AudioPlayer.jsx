import {carta1} from "../Sonidos";

function AudioPlayer(volumen){
    const audioCarta1 = new Audio(carta1);
    audioCarta1.volume = volumen;
    function reproducirCarta1(){
        audioCarta1.play();
    }
    return {reproducirCarta1};
}

export default AudioPlayer;

