import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PoliticaPrivacidad() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Política de Privacidad | miCalculadora.es"
        description="Consulta la política de privacidad de miCalculadora.es: tratamiento de datos, cookies, base legal y derechos de los usuarios según RGPD."
        path="/politica-privacidad/"
        keywords={["política de privacidad", "RGPD", "protección de datos", "miCalculadora.es"]}
      />
      <Navbar />
      <main className="container max-w-3xl py-12">
        <Link to="/" className="text-sm text-primary hover:underline mb-8 inline-block">
          ← Volver al inicio
        </Link>
        <h1 className="text-3xl font-display font-bold text-foreground mb-6">Política de Privacidad</h1>
        <p className="text-sm text-muted-foreground mb-8">Última actualización: abril de 2026</p>

        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-bold font-display text-foreground mb-2">1. Responsable del tratamiento</h2>
            <p>El responsable del tratamiento de los datos personales recogidos en este sitio web es el titular de <strong className="text-foreground">miCalculadora.es</strong> (en adelante, "el Responsable").</p>
            <p className="mt-2">Puedes contactarnos a través de: <strong className="text-foreground">calculadoradefiniquito2026@gmail.com</strong></p>
          </section>

          <section>
            <h2 className="text-xl font-bold font-display text-foreground mb-2">2. Datos que recopilamos</h2>
            <p>En miCalculadora.es <strong className="text-foreground">no recopilamos datos personales identificativos</strong> de forma directa. Los datos que introduces en las calculadoras (salario, fechas, tipo de contrato) se procesan exclusivamente en tu navegador y no se envían ni almacenan en ningún servidor.</p>
            <p className="mt-2">Sin embargo, podemos recopilar datos de navegación de forma automática a través de:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong className="text-foreground">Cookies analíticas</strong>: para medir el tráfico y uso del sitio (Google Analytics).</li>
              <li><strong className="text-foreground">Cookies publicitarias</strong>: para mostrar anuncios relevantes (Google AdSense).</li>
              <li><strong className="text-foreground">Dirección IP</strong>: de forma anonimizada para estadísticas de uso.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold font-display text-foreground mb-2">3. Finalidad del tratamiento</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Mejorar la experiencia del usuario y el funcionamiento del sitio web.</li>
              <li>Elaborar estadísticas anónimas de uso.</li>
              <li>Mostrar publicidad personalizada o contextual.</li>
              <li>Cumplir con obligaciones legales aplicables.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold font-display text-foreground mb-2">4. Base legal</h2>
            <p>El tratamiento de datos se realiza en base a:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong className="text-foreground">Consentimiento del usuario</strong>: al aceptar las cookies mediante el banner correspondiente.</li>
              <li><strong className="text-foreground">Interés legítimo</strong>: para el correcto funcionamiento del sitio web y la prevención de fraude.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold font-display text-foreground mb-2">5. Destinatarios de los datos</h2>
            <p>Los datos pueden ser compartidos con:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong className="text-foreground">Google LLC</strong>: como proveedor de servicios de análisis (Google Analytics) y publicidad (Google AdSense). Google puede transferir datos fuera del EEE, al amparo de las Cláusulas Contractuales Tipo aprobadas por la Comisión Europea.</li>
            </ul>
            <p className="mt-2">No vendemos ni cedemos datos personales a terceros con fines comerciales.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold font-display text-foreground mb-2">6. Conservación de los datos</h2>
            <p>Los datos de navegación recopilados a través de cookies se conservan durante el período indicado en nuestra <Link to="/cookies/" className="text-primary hover:underline">Política de Cookies</Link>. Los datos anonimizados pueden conservarse de forma indefinida para fines estadísticos.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold font-display text-foreground mb-2">7. Derechos del usuario</h2>
            <p>De conformidad con el RGPD y la LOPDGDD, puedes ejercer los siguientes derechos:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Derecho de <strong className="text-foreground">acceso</strong> a tus datos personales.</li>
              <li>Derecho de <strong className="text-foreground">rectificación</strong> de datos inexactos.</li>
              <li>Derecho de <strong className="text-foreground">supresión</strong> ("derecho al olvido").</li>
              <li>Derecho de <strong className="text-foreground">limitación</strong> del tratamiento.</li>
              <li>Derecho a la <strong className="text-foreground">portabilidad</strong> de los datos.</li>
              <li>Derecho de <strong className="text-foreground">oposición</strong> al tratamiento.</li>
            </ul>
            <p className="mt-2">Para ejercer estos derechos, contacta con nosotros en <strong className="text-foreground">calculadoradefiniquito2026@gmail.com</strong>. También tienes derecho a presentar una reclamación ante la <strong className="text-foreground">Agencia Española de Protección de Datos (AEPD)</strong> — <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.aepd.es</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold font-display text-foreground mb-2">8. Seguridad</h2>
            <p>Aplicamos medidas técnicas y organizativas para proteger los datos personales contra el acceso no autorizado, la pérdida o la destrucción. El sitio web utiliza protocolo HTTPS para cifrar la comunicación.</p>
          </section>
        </div>

        <section className="mt-10 border-t border-border pt-6">
          <h2 className="text-lg font-bold text-foreground mb-3">Herramientas relacionadas</h2>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link to="/calculadora-finiquito/" className="text-primary hover:underline">Calculadora de finiquito</Link>
            <Link to="/calculadora-paro/" className="text-primary hover:underline">Calculadora de paro</Link>
            <Link to="/calculadora-irpf/" className="text-primary hover:underline">Calculadora de IRPF</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

