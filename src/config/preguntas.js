// Configuración de las 5 preguntas de opción múltiple.
// Para agregar/editar preguntas solo modifica este arreglo — el resto de la
// app (PantallaPreguntas.jsx) las renderiza automáticamente. Las respuestas
// se guardan tal cual en la base de datos local del backend (columna
// "respuestas" de la tabla "participantes", como JSON) — no requieren tocar
// nada del backend al cambiarlas.
//
// NOTA: el usuario original mencionó "5 preguntas" pero solo proporcionó 4.
// La quinta ("bebida") es un PLACEHOLDER — reemplázala por la pregunta real
// antes de desplegar a producción.

export const PREGUNTAS = [
  {
    id: "comida_favorita",
    texto: "¿Qué tipo de comida te gusta más?",
    opciones: ["China", "Japonesa", "Mexicana", "Italiana", "Francesa"],
  },
  {
    id: "hobby_favorito",
    texto: "¿Qué tipo de actividades disfrutas más?",
    opciones: ["Culturales", "Exteriores", "Deportivas", "Entretenimiento", "Viajes"],
  },
  {
    id: "bebida_favorita", 
    texto: "¿Cuál es tu tipo de bebida favorita?",
    opciones: ["Café", "Refresco", "Vino", "Jugo", "Coctelería"],
  },
];
