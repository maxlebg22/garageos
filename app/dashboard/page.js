import Link from 'next/link'

export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      fontFamily: 'Inter, -apple-system, sans-serif',
      background: '#f5f5f0',
      color: '#1a1a1a'
    }}>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(245,245,240,0.85)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px', height: '60px'
      }}>
        <div style={{ fontSize: '16px', fontWeight: '600' }}>GarageOS</div>
        <div style={{ display: 'flex', gap: '32px', fontSize: '14px', color: '#5c5c5c' }}>
          <a href="#features" style={{ textDecoration: 'none', color: 'inherit' }}>Fonctionnalités</a>
          <a href="#pricing" style={{ textDecoration: 'none', color: 'inherit' }}>Tarifs</a>
          <a href="#security" style={{ textDecoration: 'none', color: 'inherit' }}>Sécurité</a>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Link href="/login" style={{ fontSize: '14px', color: '#5c5c5c', textDecoration: 'none' }}>Se connecter</Link>
          <Link href="/login" style={{
            height: '36px', padding: '0 16px', background: '#1a1a1a', color: '#fff',
            borderRadius: '8px', fontSize: '14px', textDecoration: 'none',
            display: 'flex', alignItems: 'center'
          }}>Essai gratuit</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ paddingTop: '140px', paddingBottom: '100px', textAlign: 'center', maxWidth: '800px', margin: '0 auto', padding: '140px 24px 100px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: '#fff', border: '1px solid rgba(0,0,0,0.09)',
          borderRadius: '100px', padding: '6px 16px',
          fontSize: '12px', color: '#2d6a4f', marginBottom: '32px'
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2d6a4f', display: 'inline-block' }}></span>
          Facturation électronique 2026 incluse
        </div>
        <h1 style={{ fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: '600', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '24px' }}>
          Le logiciel de gestion<br />pour votre garage.
        </h1>
        <p style={{ fontSize: '18px', color: '#5c5c5c', fontWeight: '300', lineHeight: 1.65, marginBottom: '40px', maxWidth: '520px', margin: '0 auto 40px' }}>
          Planning, clients, devis, facturation et stock. Tout ce dont votre atelier a besoin, simplement.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/login" style={{
            height: '52px', padding: '0 32px', background: '#1a1a1a', color: '#fff',
            borderRadius: '12px', fontSize: '15px', fontWeight: '500', textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center'
          }}>Démarrer gratuitement →</Link>
          <a href="#features" style={{
            height: '52px', padding: '0 32px', background: '#fff', color: '#1a1a1a',
            border: '1px solid rgba(0,0,0,0.09)', borderRadius: '12px', fontSize: '15px',
            textDecoration: 'none', display: 'inline-flex', alignItems: 'center'
          }}>Voir les fonctionnalités</a>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: '80px 40px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '600', letterSpacing: '-0.03em', marginBottom: '12px' }}>Tout ce dont vous avez besoin</h2>
          <p style={{ fontSize: '16px', color: '#5c5c5c', fontWeight: '300' }}>Conçu pour les garages français, conforme aux réglementations 2026.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {[
            { icon: '🔧', title: 'Suivi des interventions', desc: 'Gérez chaque véhicule en temps réel. Vos clients suivent l\'avancement depuis leur téléphone.' },
            { icon: '📋', title: 'Devis & Facturation', desc: 'Créez des devis professionnels, convertissez-les en factures Factur-X conformes 2026.' },
            { icon: '📅', title: 'Planning intelligent', desc: 'Organisez votre atelier par mécanicien, visualisez la charge de travail en un coup d\'œil.' },
            { icon: '📦', title: 'Gestion du stock', desc: 'Alertes automatiques quand vos pièces sont en rupture. Commandes simplifiées.' },
            { icon: '💬', title: 'Portail client', desc: 'Vos clients suivent leur véhicule, acceptent les devis et vous envoient des messages.' },
            { icon: '💶', title: 'Tableau de bord finance', desc: 'CA, marges, factures impayées. Tous vos chiffres clés en temps réel.' },
          ].map((f, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.09)', padding: '28px' }}>
              <div style={{ fontSize: '28px', marginBottom: '16px' }}>{f.icon}</div>
              <div style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>{f.title}</div>
              <div style={{ fontSize: '14px', color: '#5c5c5c', lineHeight: 1.6, fontWeight: '300' }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: '80px 40px', background: '#fff' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '600', letterSpacing: '-0.03em', marginBottom: '12px' }}>Tarifs simples et transparents</h2>
            <p style={{ fontSize: '16px', color: '#5c5c5c', fontWeight: '300' }}>30 jours gratuits — aucune carte bancaire requise.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {[
              { name: 'Starter', price: '49', desc: 'Pour les garages solo', features: ['1 utilisateur', 'Clients & véhicules', 'Devis & factures', 'Portail client', 'Support email'], featured: false },
              { name: 'Pro', price: '129', desc: 'Pour les ateliers en croissance', features: ['5 utilisateurs', 'Tout Starter +', 'Planning avancé', 'Gestion du stock', 'SMS automatiques', 'Support prioritaire'], featured: true },
              { name: 'Business', price: '249', desc: 'Pour les grands ateliers', features: ['Utilisateurs illimités', 'Tout Pro +', 'Multi-sites', 'API & intégrations', 'Compte dédié'], featured: false },
            ].map((p, i) => (
              <div key={i} style={{
                background: p.featured ? '#1a1a1a' : '#f5f5f0',
                borderRadius: '16px', padding: '32px',
                border: p.featured ? 'none' : '1px solid rgba(0,0,0,0.09)',
                transform: p.featured ? 'scale(1.03)' : 'none'
              }}>
                <div style={{ fontSize: '14px', fontWeight: '500', color: p.featured ? 'rgba(255,255,255,0.6)' : '#9a9a9a', marginBottom: '8px' }}>{p.name}</div>
                <div style={{ fontSize: '42px', fontWeight: '600', letterSpacing: '-0.04em', color: p.featured ? '#fff' : '#1a1a1a', marginBottom: '4px' }}>€{p.price}<span style={{ fontSize: '16px', fontWeight: '300' }}>/mois</span></div>
                <div style={{ fontSize: '13px', color: p.featured ? 'rgba(255,255,255,0.5)' : '#9a9a9a', marginBottom: '24px' }}>{p.desc}</div>
                {p.features.map((f, j) => (
                  <div key={j} style={{ fontSize: '13px', color: p.featured ? 'rgba(255,255,255,0.8)' : '#5c5c5c', marginBottom: '10px', display: 'flex', gap: '8px' }}>
                    <span style={{ color: p.featured ? '#fff' : '#2d6a4f' }}>✓</span> {f}
                  </div>
                ))}
                <Link href="/login" style={{
                  display: 'block', textAlign: 'center', marginTop: '24px',
                  height: '44px', lineHeight: '44px', borderRadius: '10px',
                  background: p.featured ? '#fff' : '#1a1a1a',
                  color: p.featured ? '#1a1a1a' : '#fff',
                  textDecoration: 'none', fontSize: '14px', fontWeight: '500'
                }}>Démarrer →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '40px', textAlign: 'center', borderTop: '1px solid rgba(0,0,0,0.07)', color: '#9a9a9a', fontSize: '13px' }}>
        <div style={{ marginBottom: '16px', fontWeight: '600', color: '#1a1a1a' }}>GarageOS</div>
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginBottom: '16px' }}>
          {['Mentions légales', 'CGU', 'Confidentialité', 'RGPD'].map(l => (
            <a key={l} href="#" style={{ color: '#9a9a9a', textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
        © 2026 GarageOS — Hébergé en France 🇫🇷
      </footer>

    </main>
  )
}
