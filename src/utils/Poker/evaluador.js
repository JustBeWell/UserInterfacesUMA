// --- Evaluador de mano de póker (Texas Hold'em 5‑7 cartas) ---
// Autor: refactorización a partir de tu función original
// Uso: const resultado = evaluarMano(cartas);
//  - "cartas" es un array de objetos { valor: "As", palo: "♠" }
//  - Devuelve { tipo: string, rank: number[] }  (rank sirve para comparar manos)

export const VAL = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    J: 11,
    Q: 12,
    K: 13,
    As: 14, // admite "As"; si prefieres "A" añade otra clave "A":14
  };
  
  // Para mostrar los valores en las cadenas descriptivas de manera legible
  export const NUM2STR = {
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "10",
    11: "J",
    12: "Q",
    13: "K",
    14: "As",
  };
  const fmt = (v) => NUM2STR[v] || String(v);
  
  export const BASE = {
    HIGH: 0,
    PAIR: 1,
    TWOPAIRS: 2,
    SET: 3,
    STRAIGHT: 4,
    FLUSH: 5,
    FULL: 6,
    QUADS: 7,
    STRAIGHTFLUSH: 8,
  };
  
  // Convierte [8,14,13,12,11] => 0814131211 y luego a Number → útil para ordenar manos
  export function rankToNumber(rankArr) {
    return Number(rankArr.map((n) => String(n).padStart(2, "0")).join(""));
  }
  
  /*
   * Detecta la carta alta de la mejor escalera en un array numérico
   * Devuelve null si no hay escalera
   */
  function findStraight(vals) {
    if (vals.length < 5) return null;
    const uniq = [...new Set(vals)];
    if (uniq.includes(14)) uniq.push(1); // rueda (A-5)
    uniq.sort((a, b) => b - a);
    for (let i = 0; i <= uniq.length - 5; i++) {
      const high = uniq[i];
      if ([1, 2, 3, 4].every((o) => uniq.includes(high - o))) {
        return high;
      }
    }
    return null;
  }
  
  /*
   * Función principal. Admite entre 5 y 7 cartas (Hold'em).
   */
  export function evaluarMano(cartas) {
    // 1. Recuento de valores y palos
    const counts = {}; // {14:2, 13:1, ...}
    const suits = {}; // {"♠":[14,11,7], "♥":[...], ...}
    cartas.forEach((c) => {
      const v = VAL[c.valor];
      counts[v] = (counts[v] || 0) + 1;
      (suits[c.palo] = suits[c.palo] || []).push(v);
    });
  
    const vals = Object.keys(counts)
      .map(Number)
      .sort((a, b) => b - a); // valores únicos ordenados
  
    Object.values(suits).forEach((arr) => arr.sort((a, b) => b - a));
  
    // 2. Clasificaciones básicas
    const quad = vals.find((v) => counts[v] === 4);
    const triples = vals.filter((v) => counts[v] === 3);
    const pairs = vals.filter((v) => counts[v] === 2);
    const highestStraight = findStraight(vals);
    const flushSuitEntry = Object.entries(suits).find(([, arr]) => arr.length >= 5);
    const flushSuit = flushSuitEntry ? flushSuitEntry[1] : null;
    const straightFlushHigh = flushSuit ? findStraight(flushSuit) : null;
  
    // 3. Decidir mano ganadora
// 3. Decidir mano ganadora
  let tipo, rank;

  if (straightFlushHigh) {
    tipo = "Straight Flush";
    rank = [BASE.STRAIGHTFLUSH, straightFlushHigh];
  } else if (quad) {
    const kicker = vals.find((v) => v !== quad);
    tipo = "Four of a Kind";
    rank = [BASE.QUADS, quad, kicker];
  } else if (triples.length >= 2) {
    const [t1, t2] = triples;
    tipo = "Full House";
    rank = [BASE.FULL, t1, t2];
  } else if (triples.length === 1 && pairs.length) {
    tipo = "Full House";
    rank = [BASE.FULL, triples[0], pairs[0]];
  } else if (flushSuit) {
    const top5 = flushSuit.slice(0, 5);
    tipo = "Flush";
    rank = [BASE.FLUSH, ...top5];
  } else if (highestStraight) {
    tipo = "Straight";
    rank = [BASE.STRAIGHT, highestStraight];
  } else if (triples.length) {
    const triple = triples[0];
    const kickers = vals.filter((v) => v !== triple).slice(0, 2);
    tipo = "Three of a Kind";
    rank = [BASE.SET, triple, ...kickers];
  } else if (pairs.length >= 2) {
    const [p1, p2] = pairs;
    const kicker = vals.find((v) => v !== p1 && v !== p2);
    tipo = "Two Pair";
    rank = [BASE.TWOPAIRS, p1, p2, kicker];
  } else if (pairs.length === 1) {
    const pair = pairs[0];
    const kickers = vals.filter((v) => v !== pair).slice(0, 3);
    tipo = "One Pair";
    rank = [BASE.PAIR, pair, ...kickers];
  } else {
    const top5 = vals.slice(0, 5);
    tipo = "High Card";
    rank = [BASE.HIGH, ...top5];
  }

  
    return { tipo, rank };
  }
  