export function generarMazo() {
	const palos = ["Corazon", "Diamante", "Trebol", "Pica"];
	const valores = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "As"];
	const mazo = [];

	for (const palo of palos) {
		for (const valor of valores) {
			mazo.push({ valor, palo });
		}
	}

	return mazo;
}

export function barajar(mazo) {
	for (let i = mazo.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[mazo[i], mazo[j]] = [mazo[j], mazo[i]];
	}
	return mazo;
}

