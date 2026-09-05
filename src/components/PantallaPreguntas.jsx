import { useState } from "react";
import { PREGUNTAS } from "../config/preguntas.js";

export default function PantallaPreguntas({ onContinuar }) {
  const [indice, setIndice] = useState(0);
  const [respuestas, setRespuestas] = useState({});

  const pregunta = PREGUNTAS[indice];
  const esUltima = indice === PREGUNTAS.length - 1;

  const seleccionar = (opcion) => {
    const nuevasRespuestas = { ...respuestas, [pregunta.id]: opcion };
    setRespuestas(nuevasRespuestas);

    if (esUltima) {
      onContinuar(nuevasRespuestas);
    } else {
      setIndice(indice + 1);
    }
  };

  return (
    <div className="pantalla">
      <div className="tarjeta">
        <div className="progreso">
          {PREGUNTAS.map((p, i) => (
            <div key={p.id} className={`paso ${i <= indice ? "activo" : ""}`} />
          ))}
        </div>

        <h2>{pregunta.texto}</h2>

        <div className="opciones">
          {pregunta.opciones.map((opcion) => (
            <button
              key={opcion}
              type="button"
              className={`opcion ${respuestas[pregunta.id] === opcion ? "seleccionada" : ""}`}
              onClick={() => seleccionar(opcion)}
            >
              {opcion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
