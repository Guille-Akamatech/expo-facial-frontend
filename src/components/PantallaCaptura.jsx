import { useState, useCallback } from "react";
import { FaceLivenessDetector } from "@aws-amplify/ui-react-liveness";
import { ThemeProvider } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { crearSesionLiveness, resolverLiveness } from "../api.js";
import { AWS_REGION } from "../amplifyConfig.js";

const MAX_INTENTOS = 3;

export default function PantallaCaptura({ participantId, onExito }) {
  const [sessionId, setSessionId] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [intentos, setIntentos] = useState(0);

  const iniciarSesion = useCallback(async () => {
    setError("");
    setCargando(true);
    try {
      const { sessionId: nuevoSessionId } = await crearSesionLiveness({ participantId });
      setSessionId(nuevoSessionId);
    } catch (err) {
      setError("No se pudo iniciar la cámara. Revisa tu conexión e inténtalo de nuevo.");
      console.error(err);
    } finally {
      setCargando(false);
    }
  }, [participantId]);

  const handleAnalysisComplete = useCallback(async () => {
    setCargando(true);
    try {
      const resultado = await resolverLiveness({ participantId, sessionId });

      if (resultado.exito) {
        onExito();
        return;
      }

      // No pasó el umbral de confianza o no se detectó bien el rostro: reintentar
      if (intentos + 1 >= MAX_INTENTOS) {
        setError(
          "No pudimos verificar tu rostro después de varios intentos. Busca a un miembro del staff para ayudarte."
        );
        setSessionId(null);
      } else {
        setIntentos((i) => i + 1);
        setError("No se pudo verificar bien tu rostro. Intentemos de nuevo, acércate a buena luz.");
        setSessionId(null); // las sesiones son de un solo uso: hay que crear una nueva para reintentar
      }
    } catch (err) {
      setError("Ocurrió un error verificando tu rostro. Inténtalo de nuevo.");
      setSessionId(null);
      console.error(err);
    } finally {
      setCargando(false);
    }
  }, [participantId, sessionId, intentos, onExito]);

  const handleError = useCallback((err) => {
    console.error("Error de FaceLivenessDetector:", err);
    setError("Hubo un problema con la cámara. Verifica los permisos e inténtalo de nuevo.");
    setSessionId(null); // hay que crear una nueva sesión antes de reintentar
  }, []);

  return (
    <div className="pantalla">
      <div className="tarjeta">
        <h2>Verificación facial</h2>
        <p className="subtitulo">
          Coloca tu rostro dentro del óvalo y sigue las instrucciones en pantalla (gira la
          cabeza cuando se te indique).
        </p>

        {!sessionId && (
          <>
            {error && <p className="error">{error}</p>}
            <button className="primario" onClick={iniciarSesion} disabled={cargando}>
              {cargando ? "Preparando cámara..." : "Iniciar captura"}
            </button>
          </>
        )}

        {sessionId && (
          <ThemeProvider>
            <FaceLivenessDetector
              sessionId={sessionId}
              region={AWS_REGION}
              onAnalysisComplete={handleAnalysisComplete}
              onError={handleError}
            />
          </ThemeProvider>
        )}
      </div>
    </div>
  );
}
