// Importación de imágenes de cartas de diamantes
import DiamAce from "./Diamante/As.png";
import Diam2 from "./Diamante/2.png";
import Diam3 from "./Diamante/3.png";
import Diam4 from "./Diamante/4.png";
import Diam5 from "./Diamante/5.png";
import Diam6 from "./Diamante/6.png";
import Diam7 from "./Diamante/7.png";
import Diam8 from "./Diamante/8.png";
import Diam9 from "./Diamante/9.png";
import Diam10 from "./Diamante/10.png";
import DiamJ from "./Diamante/J.png";
import DiamQ from "./Diamante/Q.png";
import DiamK from "./Diamante/K.png";

// Cuando añadas los otros naipes, descomenta estas líneas e importa las imágenes
/*
// Importación de imágenes de cartas de corazones
import CorazonAce from './Corazon/As.png';
import Corazon2 from './Corazon/2.png';
import Corazon3 from './Corazon/3.png';
import Corazon4 from './Corazon/4.png';
import Corazon5 from './Corazon/5.png';
import Corazon6 from './Corazon/6.png';
import Corazon7 from './Corazon/7.png';
import Corazon8 from './Corazon/8.png';
import Corazon9 from './Corazon/9.png';
import Corazon10 from './Corazon/10.png';
import CorazonJ from './Corazon/J.png';
import CorazonQ from './Corazon/Q.png';
import CorazonK from './Corazon/K.png';

// Importación de imágenes de cartas de tréboles
import TrebolAce from './Trebol/As.png';
import Trebol2 from './Trebol/2.png';
import Trebol3 from './Trebol/3.png';
import Trebol4 from './Trebol/4.png';
import Trebol5 from './Trebol/5.png';
import Trebol6 from './Trebol/6.png';
import Trebol7 from './Trebol/7.png';
import Trebol8 from './Trebol/8.png';
import Trebol9 from './Trebol/9.png';
import Trebol10 from './Trebol/10.png';
import TrebolJ from './Trebol/J.png';
import TrebolQ from './Trebol/Q.png';
import TrebolK from './Trebol/K.png';

// Importación de imágenes de cartas de picas
import PicaAce from './Pica/As.png';
import Pica2 from './Pica/2.png';
import Pica3 from './Pica/3.png';
import Pica4 from './Pica/4.png';
import Pica5 from './Pica/5.png';
import Pica6 from './Pica/6.png';
import Pica7 from './Pica/7.png';
import Pica8 from './Pica/8.png';
import Pica9 from './Pica/9.png';
import Pica10 from './Pica/10.png';
import PicaJ from './Pica/J.png';
import PicaQ from './Pica/Q.png';
import PicaK from './Pica/K.png';
*/

import CartaPorDetras from "./CartaPorDetras.png";

// Objeto que mapea los valores a las imágenes de diamantes
const imagenesDiamante = {
	A: DiamAce,
	2: Diam2,
	3: Diam3,
	4: Diam4,
	5: Diam5,
	6: Diam6,
	7: Diam7,
	8: Diam8,
	9: Diam9,
	10: Diam10,
	J: DiamJ,
	Q: DiamQ,
	K: DiamK,
};

// Cuando añadas los otros naipes, descomenta estos objetos
/*
// Objeto que mapea los valores a las imágenes de corazones
const imagenesCorazon = {
  'A': CorazonAce,
  '2': Corazon2,
  '3': Corazon3,
  '4': Corazon4,
  '5': Corazon5,
  '6': Corazon6,
  '7': Corazon7,
  '8': Corazon8,
  '9': Corazon9,
  '10': Corazon10,
  'J': CorazonJ,
  'Q': CorazonQ,
  'K': CorazonK,
};

// Objeto que mapea los valores a las imágenes de tréboles
const imagenesTrebol = {
  'A': TrebolAce,
  '2': Trebol2,
  '3': Trebol3,
  '4': Trebol4,
  '5': Trebol5,
  '6': Trebol6,
  '7': Trebol7,
  '8': Trebol8,
  '9': Trebol9,
  '10': Trebol10,
  'J': TrebolJ,
  'Q': TrebolQ,
  'K': TrebolK,
};

// Objeto que mapea los valores a las imágenes de picas
const imagenesPica = {
  'A': PicaAce,
  '2': Pica2,
  '3': Pica3,
  '4': Pica4,
  '5': Pica5,
  '6': Pica6,
  '7': Pica7,
  '8': Pica8,
  '9': Pica9,
  '10': Pica10,
  'J': PicaJ,
  'Q': PicaQ,
  'K': PicaK,
};
*/

// Objeto principal que mapea los naipes a sus respectivos objetos de imágenes
const imagenesNaipes = {
	diamante: imagenesDiamante,
	// Descomenta estas líneas cuando añadas los naipes
	// 'corazon': imagenesCorazon,
	// 'trebol': imagenesTrebol,
	// 'pica': imagenesPica,
};

/**
 * Función que devuelve la imagen de una carta según su naipe y valor
 * @param {string} naipe - El naipe de la carta ('diamante', 'corazon', 'trebol', 'pica')
 * @param {string} valor - El valor de la carta ('A', '2', '3', ..., '10', 'J', 'Q', 'K')
 * @returns {string} - La ruta de la imagen correspondiente
 */
export const obtenerImagenCarta = (naipe, valor) => {
	const naipeLower = naipe.toLowerCase();

	// Verifica si el naipe está disponible
	if (imagenesNaipes[naipeLower] && imagenesNaipes[naipeLower][valor]) {
		return imagenesNaipes[naipeLower][valor];
	}

	// Si no se encuentra la carta o el naipe, devolver el reverso
	return CartaPorDetras;
};

// Exportamos la imagen del reverso para uso general
export { CartaPorDetras };

// Exportamos los objetos de imágenes para posibles usos específicos
export {
	imagenesDiamante,
	// Descomenta estas exportaciones cuando añadas los naipes
	// imagenesCorazon,
	// imagenesTrebol,
	// imagenesPica
};
