import { useState } from "react";

export default function PantallaDatos({ onContinuar }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [consentimiento, setConsentimiento] = useState(false);
  const [error, setError] = useState("");

  const listo = nombre.trim() && apellido.trim() && correo.trim() && consentimiento;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!listo) {
      setError("Completa todos los campos y acepta el aviso de privacidad para continuar.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(correo)) {
      setError("Revisa tu correo electrónico, no parece válido.");
      return;
    }
    setError("");
    onContinuar({ nombre: nombre.trim(), apellido: apellido.trim(), correo: correo.trim() });
  };

  return (
    <div className="pantalla">
      <form className="tarjeta" onSubmit={handleSubmit}>
        <h1>Bienvenido al Expo 👋</h1>
        <p className="subtitulo">Regístrate para participar en el reconocimiento facial de la expo.</p>

        <label htmlFor="nombre">Nombre</label>
        <input id="nombre" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} autoComplete="given-name" />

        <label htmlFor="apellido">Apellido</label>
        <input id="apellido" type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} autoComplete="family-name" />

        <label htmlFor="correo">Correo electrónico</label>
        <input id="correo" type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} autoComplete="email" />

        <div className="consentimiento">
          <input
            id="consentimiento"
            type="checkbox"
            checked={consentimiento}
            onChange={(e) => setConsentimiento(e.target.checked)}
          />
          <label htmlFor="consentimiento" style={{ margin: 0 }}>
            Acepto el aviso de privacidad y doy mi consentimiento expreso para la captura y
            procesamiento de mi imagen facial (dato biométrico) con fines de reconocimiento
            durante este evento. Mis datos se eliminarán al finalizar el expo.
          </label>
        </div>

        {error && <p className="error">{error}</p>}

        <button className="primario" type="submit" disabled={!listo}>
          Continuar
        </button>
      </form>
    </div>
  );
}
