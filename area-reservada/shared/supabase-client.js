// ============================================================
// Conexión con Supabase.
// SUPABASE_URL y SUPABASE_ANON_KEY se obtienen en:
// Supabase > tu proyecto > Project Settings > API
//
// Ambos valores son PÚBLICOS y seguros de dejar en este archivo:
// la protección real la hacen las reglas de acceso (RLS) que ya
// configuramos en la base de datos, no el secreto de esta clave.
//
// La única clave que NUNCA debe aparecer en un archivo como este
// es la "service_role key" — esa es privada y no la necesitamos
// para nada de lo que construimos hasta ahora.
// ============================================================

const SUPABASE_URL = "PEGAR_ACA_TU_PROJECT_URL";
const SUPABASE_ANON_KEY = "PEGAR_ACA_TU_ANON_PUBLIC_KEY";

const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Si no hay sesión activa, manda a la persona a la pantalla de login.
// Se usa en todas las páginas internas del área reservada.
async function exigirSesion() {
  const { data: { session } } = await db.auth.getSession();
  if (!session) {
    window.location.href = "/area-reservada/index.html";
    return null;
  }
  return session;
}
