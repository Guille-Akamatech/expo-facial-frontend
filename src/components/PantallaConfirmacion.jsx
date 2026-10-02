export default function PantallaConfirmacion({ nombre }) {
  return (
    <div className="pantalla">
      <div className="tarjeta centrado">
        <div className="icono-check">✅</div>
        <h1>¡Listo, {nombre}!</h1>
        <p className="subtitulo">
          Tu registro se completó correctamente.<br/>Ahora visita nuestro stand para completar tu experiencia. Room ON es un espacio AV conectado y en operación, donde cada sistema responde en tiempo real, optimizando recursos y la experiencia del visitante.
        </p>
      </div>
    </div>
  );
}
