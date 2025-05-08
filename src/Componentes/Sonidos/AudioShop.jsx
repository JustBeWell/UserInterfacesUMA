import {applepay} from "../../Sonidos";

function AudioShop(volumen){
    const audioCompra = new Audio(applepay);
    audioCompra.volume = volumen;
    function reproducirCompra(){
        audioCompra.play();
    }
    return {reproducirCompra};
}

export default AudioShop;

