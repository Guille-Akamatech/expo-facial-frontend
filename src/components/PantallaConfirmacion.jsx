export default function PantallaConfirmacion({ nombre }) {
  return (
    <div className="pantalla">
      <div className="tarjeta centrado">
        <div className="icono-check">✅</div>
        <h1>¡Listo, {nombre}!</h1>
        <p className="subtitulo">
          Tu registro se completó correctamente. Ya puedes pasar al punto de reconocimiento
          facial del expo para vivir la experiencia.
        </p>
      </div>
    </div>
  );
}
