// Wrapper simple para llamar a los 3 endpoints del API Gateway.
// VITE_API_BASE_URL se define en el .env (ej: https://abc123.execute-api.us-east-1.amazonaws.com)

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function post(path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || `Error en ${path} (status ${res.status})`);
  }

  return data;
}

export function crearParticipante({ nombre, apellido, correo, respuestas, consentimiento }) {
  return post("/participantes", { nombre, apellido, correo, respuestas, consentimiento });
}

export function crearSesionLiveness({ participantId }) {
  return post("/liveness-sesion", { participantId });
}

export function resolverLiveness({ participantId, sessionId }) {
  return post("/liveness-resultado", { participantId, sessionId });
}
