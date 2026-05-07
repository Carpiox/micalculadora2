import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Cookies() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Política de Cookies | miCalculadora.es"
        description="Política de cookies de miCalculadora.es: tipos de cookies, finalidad, duración y opciones de configuración en tu navegador."
        path="/cookies/"
        keywords={["política de cookies", "cookies analíticas", "cookies publicidad", "google analytics"]}
      />
      <Navbar />
      <main className="container max-w-3xl py-12">
        <Link to="/" className="text-sm text-primary hover:underline mb-8 inline-block">
          ← Volver al inicio
        </Link>
        <h1 className="text-3xl font-display font-bold text-foreground mb-6">Política de Cookies</h1>
        <p className="text-sm text-muted-foreground mb-8">Última actualización: abril de 2026</p>

        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-bold font-display text-foreground mb-2">1. ¿Qué son las cookies?</h2>
            <p>Las cookies son pequeños archivos de texto que los sitios web almacenan en tu navegador cuando los visitas. Sirven para recordar tus preferencias, analizar el uso del sitio y mostrar publicidad relevante.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold font-display text-foreground mb-2">2. ¿Qué cookies utilizamos?</h2>
            <p>En <strong className="text-foreground">miCalculadora.es</strong> utilizamos los siguientes tipos de cookies:</p>

            <div className="mt-4 overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left p-3 font-semibold text-foreground">Cookie</th>
                    <th className="text-left p-3 font-semibold text-foreground">Tipo</th>
                    <th className="text-left p-3 font-semibold text-foreground">Duración</th>
                    <th className="text-left p-3 font-semibold text-foreground">Finalidad</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium text-foreground">_ga</td>
                    <td className="p-3">Analítica (Google Analytics)</td>
                    <td className="p-3">2 años</td>
                    <td className="p-3">Distinguir usuarios únicos para estadísticas de uso</td>
                  </tr>
                  <tr className="border-t border-border bg-muted/20">
                    <td className="p-3 font-medium text-foreground">_ga_*</td>
                    <td className="p-3">Analítica (Google Analytics)</td>
                    <td className="p-3">2 años</td>
                    <td className="p-3">Almacenar y contar páginas vistas</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium text-foreground">_gid</td>
                    <td className="p-3">Analítica (Google Analytics)</td>
                    <td className="p-3">24 horas</td>
                    <td className="p-3">Distinguir usuarios</td>
                  </tr>
                  <tr className="border-t border-border bg-muted/20">
                    <td className="p-3 font-medium text-foreground">__gads</td>
                    <td className="p-3">Publicitaria (Google AdSense)</td>
                    <td className="p-3">13 meses</td>
                    <td className="p-3">Mostrar anuncios personalizados</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium text-foreground">__gpi</td>
                    <td className="p-3">Publicitaria (Google AdSense)</td>
                    <td className="p-3">13 meses</td>
                    <td className="p-3">Almacenar preferencias de publicidad</td>
                  </tr>
                  <tr className="border-t border-border bg-muted/20">
                    <td className="p-3 font-medium text-foreground">NID</td>
                    <td className="p-3">Publicitaria (Google)</td>
                    <td className="p-3">6 meses</td>
                    <td className="p-3">Mostrar anuncios de Google personalizados</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium text-foreground">cookie_consent</td>
                    <td className="p-3">Técnica</td>
                    <td className="p-3">1 año</td>
                    <td className="p-3">Recordar tu elección sobre el uso de cookies</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold font-display text-foreground mb-2">3. Cookies técnicas (necesarias)</h2>
            <p>Son imprescindibles para que el sitio funcione correctamente. No requieren consentimiento y no se pueden desactivar. Incluyen la cookie que recuerda tu preferencia sobre el uso de cookies.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold font-display text-foreground mb-2">4. Cookies analíticas</h2>
            <p>Nos permiten medir el tráfico y analizar el comportamiento de los usuarios en el sitio. Utilizamos <strong className="text-foreground">Google Analytics</strong> con IP anonimizada. Estos datos nos ayudan a mejorar el contenido y la experiencia de uso.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold font-display text-foreground mb-2">5. Cookies publicitarias</h2>
            <p>Utilizamos <strong className="text-foreground">Google AdSense</strong> para mostrar anuncios en el sitio. Estas cookies permiten mostrar anuncios relevantes basados en tus intereses y en el contenido que visitas. Puedes gestionar tus preferencias de publicidad en <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">la configuración de anuncios de Google</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold font-display text-foreground mb-2">6. ¿Cómo gestionar o desactivar las cookies?</h2>
            <p>Puedes configurar tu navegador para bloquear o eliminar cookies en cualquier momento. Ten en cuenta que desactivar algunas cookies puede afectar al funcionamiento del sitio.</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Safari</a></li>
              <li><a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Microsoft Edge</a></li>
            </ul>
            <p className="mt-2">También puedes optar por no participar en la publicidad personalizada de Google visitando <a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Your Online Choices</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold font-display text-foreground mb-2">7. Actualizaciones</h2>
            <p>Esta política de cookies puede actualizarse periódicamente para reflejar cambios en las cookies que utilizamos o en la normativa aplicable. Te recomendamos revisarla de vez en cuando.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold font-display text-foreground mb-2">8. Más información</h2>
            <p>Para más información sobre cómo tratamos tus datos, consulta nuestra <Link to="/politica-privacidad/" className="text-primary hover:underline">Política de Privacidad</Link> y nuestro <Link to="/aviso-legal/" className="text-primary hover:underline">Aviso Legal</Link>.</p>
          </section>
        </div>

        <section className="mt-10 border-t border-border pt-6">
          <h2 className="text-lg font-bold text-foreground mb-3">Herramientas relacionadas</h2>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link to="/calculadora-paro/" className="text-primary hover:underline">Calculadora de paro</Link>
            <Link to="/calculadora-irpf/" className="text-primary hover:underline">Calculadora de IRPF</Link>
            <Link to="/calculadora-nomina/" className="text-primary hover:underline">Calculadora de nómina neta</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

