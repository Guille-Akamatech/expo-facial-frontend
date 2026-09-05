import { useState } from "react";
import PantallaDatos from "./components/PantallaDatos.jsx";
import PantallaPreguntas from "./components/PantallaPreguntas.jsx";
import PantallaCaptura from "./components/PantallaCaptura.jsx";
import PantallaConfirmacion from "./components/PantallaConfirmacion.jsx";
import { crearParticipante } from "./api.js";

// Máquina de estados simple de la app: datos -> preguntas -> captura -> confirmacion
const PASOS = {
  DATOS: "datos",
  PREGUNTAS: "preguntas",
  CAPTURA: "captura",
  CONFIRMACION: "confirmacion",
};

export default function App() {
  const [paso, setPaso] = useState(PASOS.DATOS);
  const [datosPersonales, setDatosPersonales] = useState(null);
  const [participantId, setParticipantId] = useState(null);
  const [error, setError] = useState("");

  const handleDatosListos = (datos) => {
    setDatosPersonales(datos);
    setPaso(PASOS.PREGUNTAS);
  };

  const handlePreguntasListas = async (respuestas) => {
    setError("");
    try {
      const { participantId: id } = await crearParticipante({
        ...datosPersonales,
        respuestas,
        consentimiento: true, // ya se validó en PantallaDatos antes de avanzar
      });
      setParticipantId(id);
      setPaso(PASOS.CAPTURA);
    } catch (err) {
      setError("No se pudo guardar tu registro. Intenta de nuevo.");
      console.error(err);
      setPaso(PASOS.DATOS);
    }
  };

  if (paso === PASOS.DATOS) {
    return (
      <>
        {error && <p className="error" style={{ textAlign: "center" }}>{error}</p>}
        <PantallaDatos onContinuar={handleDatosListos} />
      </>
    );
  }

  if (paso === PASOS.PREGUNTAS) {
    return <PantallaPreguntas onContinuar={handlePreguntasListas} />;
  }

  if (paso === PASOS.CAPTURA) {
    return <PantallaCaptura participantId={participantId} onExito={() => setPaso(PASOS.CONFIRMACION)} />;
  }

  return <PantallaConfirmacion nombre={datosPersonales?.nombre} />;
}
