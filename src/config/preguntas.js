// Configuración de las 5 preguntas de opción múltiple.
// Para agregar/editar preguntas solo modifica este arreglo — el resto de la
// app (PantallaPreguntas.jsx) las renderiza automáticamente.
//
// NOTA: el usuario original mencionó "5 preguntas" pero solo proporcionó 4.
// La quinta ("bebida") es un PLACEHOLDER — reemplázala por la pregunta real
// antes de desplegar a producción.

export const PREGUNTAS = [
  {
    id: "comida_favorita",
    texto: "¿Cuál es tu tipo de comida favorita?",
    opciones: ["China", "Japonesa", "Mexicana", "Italiana", "Francesa"],
  },
  {
    id: "musica_favorita",
    texto: "¿Qué género de música te gusta más?",
    opciones: ["Rock", "Jazz", "Pop", "K-Pop", "Metal"],
  },
  {
    id: "hobby_favorito",
    texto: "¿Cuál es tu hobby favorito?",
    opciones: ["Cine", "Leer", "Ejercicio"],
  },
  {
    id: "deporte_favorito",
    texto: "¿Qué deporte te gusta más?",
    opciones: ["Fútbol", "Tenis", "Béisbol", "Americano", "Golf"],
  },
  {
    id: "bebida_favorita", // PLACEHOLDER: reemplaza id/texto/opciones por la pregunta real
    texto: "¿Cuál es tu bebida favorita? (pregunta de ejemplo, reemplázala)",
    opciones: ["Café", "Té", "Refresco", "Agua", "Jugo"],
  },
];
