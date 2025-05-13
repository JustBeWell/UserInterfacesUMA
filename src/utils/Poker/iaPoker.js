export const IA = {
    PROB_RAISE: 0.3,
    SUBIDA_MIN: 50,
    SUBIDA_MAX: 150,
  };
  
  export function decideAccion(estado) {
    const r = Math.random();
    const necesitaIgualar = estado.apuestaActual - estado.apuestaRival;
  
    if (necesitaIgualar > 0 && r < 0.1) {
      return "fold";
    }
  
    if (r < IA.PROB_RAISE) {
      const subida = IA.SUBIDA_MIN + Math.floor(Math.random() * (IA.SUBIDA_MAX - IA.SUBIDA_MIN));
      return { tipo: "raise", cantidad: necesitaIgualar + subida };
    }
  
    return { tipo: necesitaIgualar > 0 ? "call" : "check", cantidad: necesitaIgualar };
  }
  