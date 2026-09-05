import { Amplify } from "aws-amplify";

// Configuración mínima de Amplify: solo necesitamos el Identity Pool
// (para las credenciales de invitado que usa FaceLivenessDetector) y la región.
// Los valores reales vienen del archivo .env (ver .env.example).
Amplify.configure({
  Auth: {
    Cognito: {
      identityPoolId: import.meta.env.VITE_IDENTITY_POOL_ID,
      allowGuestAccess: true,
    },
  },
});

export const AWS_REGION = import.meta.env.VITE_AWS_REGION || "us-east-1";
