import React, { useRef } from "react";
import {
	AjustesMusica as Ajustes,
	BlackjackMusica,
	SlotsMusica,
	TiendaMusica,
	menuPrincipal,
	GirandoSlots,
	jackpot1,
	sadTrumpet,
	carta1,
	applepay,
} from "../../Sonidos/";

const audiosMusica = {
	ajustes: Ajustes,
	blackjack: BlackjackMusica,
	slots: SlotsMusica,
	tienda: TiendaMusica,
	menu: menuPrincipal,
};
const audiosEfectos = {
	cartaBlackJack: carta1,
	pay: applepay,
	girandoSlots: GirandoSlots,
	jackpot: jackpot1,
	sadTrumpet: sadTrumpet,
};

function AudioManager({ volumenEfectos = 1, volumenMusica }) {
	const audiosEfectosRef = useRef({});
	const audiosMusicaRef = useRef({});

	const reproducirEfecto = (nombre) => {
		if (!audiosEfectos[nombre]) {
			console.error(`No se encontró el efecto de audio "${nombre}"`);
			return;
		}
		if (audiosEfectosRef.current[nombre]) {
			audiosEfectosRef.current[nombre].pause();
			audiosEfectosRef.current[nombre].currentTime = 0;
		} else {
			audiosEfectosRef.current[nombre] = new window.Audio(
				audiosEfectos[nombre]
			);
			if (nombre === "girandoSlots") {
				audiosEfectosRef.current[nombre].playbackRate = 0.75;
			}
			audiosEfectosRef.current[nombre].volume = volumenEfectos;
		}
		audiosEfectosRef.current[nombre].play().catch((error) => {
			console.error(`Error reproduciendo efecto de audio "${nombre}":`, error);
			delete audiosEfectosRef.current[nombre];
		});
	};
	const reproducirMusica = (nombre) => {
		if (!audiosMusica[nombre]) {
			console.error(`No se encontró la música "${nombre}"`);
			return;
		}
		if (audiosMusicaRef.current[nombre]) {
			audiosMusicaRef.current[nombre].pause();
			audiosMusicaRef.current[nombre].currentTime = 0;
		} else {
			audiosMusicaRef.current[nombre] = new window.Audio(audiosMusica[nombre]);
			audiosMusicaRef.current[nombre].volume = volumenMusica;
			audiosMusicaRef.current[nombre].loop = true;
		}
		audiosMusicaRef.current[nombre].play().catch((error) => {
			console.error(`Error reproduciendo música "${nombre}":`, error);
			delete audiosMusicaRef.current[nombre];
		});
	};

	React.useEffect(() => {
		Object.values(audiosEfectosRef.current).forEach((audio) => {
			if (audio) {
				audio.volume = volumenEfectos;
			}
		});
	}, [volumenEfectos]);
	React.useEffect(() => {
		Object.values(audiosMusicaRef.current).forEach((audio) => {
			if (audio) {
				audio.volume = volumenMusica;
			}
		});
	}, [volumenMusica]);

	const pararTodo = () => {
		Object.keys(audiosMusicaRef.current).forEach((nombre) => {
			if (audiosMusicaRef.current[nombre]) {
				audiosMusicaRef.current[nombre].pause();
				audiosMusicaRef.current[nombre].currentTime = 0;
			}
		});
		Object.keys(audiosEfectosRef.current).forEach((nombre) => {
			if (audiosEfectosRef.current[nombre]) {
				audiosEfectosRef.current[nombre].pause();
				audiosEfectosRef.current[nombre].currentTime = 0;
			}
		});
	};

	return { reproducirEfecto, reproducirMusica, pararTodo };
}

export default AudioManager;
