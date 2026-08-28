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

const SUPABASE_URL = "https://sngeitnbsitedehvsmev.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_3XL9pVvEo56RcS9iCSCKog_zrH_QX0z";

if (SUPABASE_URL.includes("PEGAR_ACA") || SUPABASE_ANON_KEY.includes("PEGAR_ACA")) {
  document.body.innerHTML =
    "<div style='padding:40px;color:#eee8d8;background:#03110c;font-family:sans-serif;min-height:100svh;'>" +
    "Falta completar la conexión con Supabase.<br><br>" +
    "Abrí <code>shared/supabase-client.js</code> y reemplazá SUPABASE_URL y " +
    "SUPABASE_ANON_KEY por los valores reales de tu proyecto " +
    "(Supabase → Project Settings → API)." +
    "</div>";
  throw new Error("Supabase no configurado: faltan SUPABASE_URL / SUPABASE_ANON_KEY");
}

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
