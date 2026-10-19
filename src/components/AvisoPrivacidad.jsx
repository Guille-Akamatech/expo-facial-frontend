import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./AvisoPrivacidad.css";

// Ventana emergente (pop-up) con el aviso de privacidad. Se cierra con el botón "Cerrar",
// tocando fuera de la ventana o con la tecla Esc. Cerrarla NO marca la casilla de consentimiento.
export default function AvisoPrivacidad({ onCerrar }) {
  const botonRef = useRef(null);
  const cerrarRef = useRef(onCerrar);
  cerrarRef.current = onCerrar;

  useEffect(() => {
    const anterior = document.activeElement;
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden"; // que no se mueva la página de atrás
    botonRef.current?.focus();
    const alTeclear = (e) => {
      if (e.key === "Escape") cerrarRef.current();
    };
    window.addEventListener("keydown", alTeclear);
    return () => {
      window.removeEventListener("keydown", alTeclear);
      document.body.style.overflow = overflowAnterior;
      anterior?.focus?.();
    };
  }, []);

  return createPortal(
    <div className="aviso-fondo" onClick={() => cerrarRef.current()}>
      <div
        className="aviso-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="aviso-titulo"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="aviso-titulo">AVISO DE PRIVACIDAD</h2>

        <div className="aviso-cuerpo">
          <p>
            Akamatech, S.A. de C.V. (en lo sucesivo, &quot;Akamatech&quot;), con domicilio en Av. Coyoacán
            1622 Int. 109, Col. Del Valle Sur, Alcaldía Benito Juárez, C.P. 03104, Ciudad de México, es
            responsable del tratamiento y protección de sus datos personales.
          </p>
          <p>
            Los datos personales que recabemos durante su participación en la experiencia &quot;Room
            On&quot; serán utilizados exclusivamente para gestionar su acceso, participación y dinámica
            dentro de dicha actividad interactiva.
          </p>
          <p>
            Le informamos que sus datos personales no serán compartidos con ningún tercero y serán
            eliminados de forma segura de nuestros registros en un lapso de 24 horas posteriores a la
            conclusión de la actividad.
          </p>
          <p>
            Para consultar nuestro Aviso de Privacidad Integral, puede solicitarlo directamente con
            nuestro personal en el evento o consultar nuestro sitio web oficial:{" "}
            <a href="https://www.akamatech.com" target="_blank" rel="noopener noreferrer">
              www.akamatech.com
            </a>
          </p>
        </div>

        <button ref={botonRef} type="button" className="primario aviso-cerrar" onClick={() => cerrarRef.current()}>
          Cerrar
        </button>
      </div>
    </div>,
    document.body
  );
}
