'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null)
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const [visible, setVisible] = useState<Set<string>>(new Set())

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) setVisible(prev => new Set([...prev, e.target.id]))
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const features = [
    { icon: '🔧', title: 'Suivi des interventions', desc: 'Gérez chaque véhicule en temps réel. Vos clients suivent l\'avancement depuis leur téléphone.' },
    { icon: '📋', title: 'Devis & Facturation', desc: 'Créez des devis professionnels, convertissez-les en factures Factur-X conformes 2026.' },
    { icon: '📅', title: 'Planning intelligent', desc: 'Organisez votre atelier par mécanicien, visualisez la charge de travail en un coup d\'œil.' },
    { icon: '📦', title: 'Gestion du stock', desc: 'Alertes automatiques quand vos pièces sont en rupture. Commandes simplifiées.' },
    { icon: '💬', title: 'Portail client', desc: 'Vos clients suivent leur véhicule, acceptent les devis et vous envoient des messages.' },
    { icon: '💶', title: 'Tableau de bord finance', desc: 'CA, marges, factures impayées. Tous vos chiffres clés en temps réel.' },
  ]

  const plans = [
    { name: 'Starter', price: '49', desc: 'Pour les garages solo', features: ['1 utilisateur', 'Clients & véhicules', 'Devis & factures', 'Portail client', 'Support email'], featured: false },
    { name: 'Pro', price: '129', desc: 'Pour les ateliers en croissance', features: ['5 utilisateurs', 'Tout Starter +', 'Planning avancé', 'Gestion du stock', 'SMS automatiques', 'Support prioritaire'], featured: true },
    { name: 'Business', price: '249', desc: 'Pour les grands ateliers', features: ['Utilisateurs illimités', 'Tout Pro +', 'Multi-sites', 'API & intégrations', 'Compte dédié'], featured: false },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Inter', sans-serif; background: #f5f5f0; color: #1a1a1a; overflow-x: hidden; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        .hero-title { animation: fadeUp 0.8s ease forwards; }
        .hero-sub { animation: fadeUp 0.8s 0.15s ease both; }
        .hero-ctas { animation: fadeUp 0.8s 0.3s ease both; }
        .hero-badge { animation: fadeIn 0.6s ease forwards; }

        .animate-in {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .animate-in.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .nav-link {
          font-size: 14px; color: #5c5c5c; text-decoration: none;
          transition: color 0.2s;
          position: relative;
        }
        .nav-link::after {
          content: ''; position: absolute; bottom: -2px; left: 0; right: 0;
          height: 1px; background: #1a1a1a;
          transform: scaleX(0); transition: transform 0.2s;
        }
        .nav-link:hover { color: #1a1a1a; }
        .nav-link:hover::after { transform: scaleX(1); }

        .btn-primary {
          display: inline-flex; align-items: center;
          height: 52px; padding: 0 32px;
          background: #1a1a1a; color: #fff;
          border-radius: 12px; font-size: 15px; font-weight: 500;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.18);
        }

        .btn-secondary {
          display: inline-flex; align-items: center;
          height: 52px; padding: 0 32px;
          background: #fff; color: #1a1a1a;
          border: 1px solid rgba(0,0,0,0.09);
          border-radius: 12px; font-size: 15px;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .btn-secondary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          background: #fff;
        }

        .feature-card {
          background: #fff; border-radius: 14px;
          border: 1px solid rgba(0,0,0,0.09); padding: 28px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: default;
        }
        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.08);
        }

        .plan-card {
          border-radius: 18px; padding: 36px;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
          cursor: default;
        }
        .plan-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 48px rgba(0,0,0,0.12);
        }
        .plan-card.featured:hover {
          transform: translateY(-8px) scale(1.05);
          box-shadow: 0 24px 56px rgba(0,0,0,0.2);
        }

        .stat-card {
          background: #fff; border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.07); padding: 24px;
          text-align: center;
          transition: transform 0.2s;
        }
        .stat-card:hover { transform: translateY(-3px); }
      `}</style>

      <main>
        {/* NAV */}
        <nav style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          background: scrolled ? 'rgba(245,245,240,0.92)' : 'rgba(245,245,240,0)',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.07)' : '1px solid transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 48px', height: '64px',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ fontSize: '16px', fontWeight: '700', letterSpacing: '-0.02em' }}>GarageOS</div>
          <div style={{ display: 'flex', gap: '36px' }}>
            <a href="#features" className="nav-link">Fonctionnalités</a>
            <a href="#pricing" className="nav-link">Tarifs</a>
            <a href="#stats" className="nav-link">Chiffres</a>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Link href="/login" className="nav-link">Se connecter</Link>
            <Link href="/login" style={{
              height: '38px', padding: '0 18px', background: '#1a1a1a', color: '#fff',
              borderRadius: '9px', fontSize: '13px', fontWeight: '500', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center',
              transition: 'opacity 0.2s, transform 0.2s'
            }}
            onMouseEnter={e => { (e.target as HTMLElement).style.opacity = '0.82'; (e.target as HTMLElement).style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { (e.target as HTMLElement).style.opacity = '1'; (e.target as HTMLElement).style.transform = 'translateY(0)' }}
            >Essai gratuit</Link>
          </div>
        </nav>

        {/* HERO */}
        <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 24px 80px' }}>
          <div className="hero-badge" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: '#fff', border: '1px solid rgba(0,0,0,0.09)',
            borderRadius: '100px', padding: '7px 18px',
            fontSize: '12px', color: '#2d6a4f', marginBottom: '36px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2d6a4f', display: 'inline-block', animation: 'float 2s ease-in-out infinite' }}></span>
            Facturation électronique 2026 incluse
          </div>

          <h1 className="hero-title" style={{
  fontSize: 'clamp(42px, 7vw, 88px)',
  fontWeight: '700', letterSpacing: '-0.05em',
  lineHeight: 1.0, marginBottom: '28px',
  maxWidth: '800px'
}}>
  Le logiciel de gestion<br />
  <span style={{ fontWeight: '700' }}>pour votre garage.</span>
</h1>

          <p className="hero-sub" style={{
            fontSize: '18px', color: '#5c5c5c', fontWeight: '300',
            lineHeight: 1.7, marginBottom: '48px', maxWidth: '480px'
          }}>
            Planning, clients, devis, facturation et stock.<br />Tout ce dont votre atelier a besoin.
          </p>

          <div className="hero-ctas" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/login" className="btn-primary">Démarrer gratuitement →</Link>
            <a href="#features" className="btn-secondary">Voir les fonctionnalités</a>
          </div>
        </section>

        {/* STATS */}
        <section id="stats" style={{ padding: '60px 48px', background: '#fff' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {[
              { val: '2 400+', lbl: 'Garages équipés' },
              { val: '98%', lbl: 'Satisfaction client' },
              { val: '< 2min', lbl: 'Pour créer un devis' },
              { val: '🇫🇷', lbl: 'Hébergé en France' },
            ].map((s, i) => (
              <div
                key={i}
                id={`stat-${i}`}
                data-animate="true"
                className={`stat-card animate-in ${visible.has(`stat-${i}`) ? 'visible' : ''}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div style={{ fontSize: '32px', fontWeight: '700', letterSpacing: '-0.03em', marginBottom: '6px' }}>{s.val}</div>
                <div style={{ fontSize: '13px', color: '#9a9a9a' }}>{s.lbl}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" style={{ padding: '100px 48px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div
              id="feat-title"
              data-animate="true"
              className={`animate-in ${visible.has('feat-title') ? 'visible' : ''}`}
              style={{ textAlign: 'center', marginBottom: '64px' }}
            >
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '700', letterSpacing: '-0.04em', marginBottom: '12px' }}>
                Tout ce dont vous avez besoin
              </h2>
              <p style={{ fontSize: '16px', color: '#5c5c5c', fontWeight: '300' }}>
                Conçu pour les garages français, conforme aux réglementations 2026.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              {features.map((f, i) => (
                <div
                  key={i}
                  id={`feat-${i}`}
                  data-animate="true"
                  className={`feature-card animate-in ${visible.has(`feat-${i}`) ? 'visible' : ''}`}
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <div style={{ fontSize: '32px', marginBottom: '16px', display: 'inline-block', transition: 'transform 0.3s' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.2) rotate(-5deg)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1) rotate(0deg)')}
                  >{f.icon}</div>
                  <div style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>{f.title}</div>
                  <div style={{ fontSize: '14px', color: '#5c5c5c', lineHeight: 1.65, fontWeight: '300' }}>{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" style={{ padding: '100px 48px', background: '#fff' }}>
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <div
              id="price-title"
              data-animate="true"
              className={`animate-in ${visible.has('price-title') ? 'visible' : ''}`}
              style={{ textAlign: 'center', marginBottom: '64px' }}
            >
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '700', letterSpacing: '-0.04em', marginBottom: '12px' }}>
                Tarifs simples et transparents
              </h2>
              <p style={{ fontSize: '16px', color: '#5c5c5c', fontWeight: '300' }}>
                30 jours gratuits — aucune carte bancaire requise.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', alignItems: 'center' }}>
              {plans.map((p, i) => (
                <div
                  key={i}
                  id={`plan-${i}`}
                  data-animate="true"
                  className={`plan-card ${p.featured ? 'featured' : ''} animate-in ${visible.has(`plan-${i}`) ? 'visible' : ''}`}
                  style={{
                    background: p.featured ? '#1a1a1a' : '#f5f5f0',
                    border: p.featured ? 'none' : '1px solid rgba(0,0,0,0.09)',
                    transitionDelay: `${i * 0.1}s`,
                    transform: p.featured ? 'scale(1.04)' : 'scale(1)'
                  }}
                >
                  {p.featured && (
                    <div style={{
                      display: 'inline-block', background: 'rgba(255,255,255,0.15)',
                      borderRadius: '100px', padding: '4px 12px',
                      fontSize: '11px', color: 'rgba(255,255,255,0.8)',
                      marginBottom: '16px', letterSpacing: '0.05em'
                    }}>POPULAIRE</div>
                  )}
                  <div style={{ fontSize: '13px', fontWeight: '500', color: p.featured ? 'rgba(255,255,255,0.5)' : '#9a9a9a', marginBottom: '6px' }}>{p.name}</div>
                  <div style={{ fontSize: '48px', fontWeight: '700', letterSpacing: '-0.05em', color: p.featured ? '#fff' : '#1a1a1a', lineHeight: 1, marginBottom: '4px' }}>
                    €{p.price}<span style={{ fontSize: '16px', fontWeight: '300', opacity: 0.6 }}>/mois</span>
                  </div>
                  <div style={{ fontSize: '13px', color: p.featured ? 'rgba(255,255,255,0.45)' : '#9a9a9a', marginBottom: '28px' }}>{p.desc}</div>
                  <div style={{ borderTop: `1px solid ${p.featured ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'}`, paddingTop: '24px', marginBottom: '28px' }}>
                    {p.features.map((f, j) => (
                      <div key={j} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '12px', fontSize: '13px', color: p.featured ? 'rgba(255,255,255,0.75)' : '#5c5c5c' }}>
                        <span style={{ color: p.featured ? '#fff' : '#2d6a4f', flexShrink: 0, fontWeight: '600' }}>✓</span>
                        {f}
                      </div>
                    ))}
                  </div>
                  <Link href="/login" style={{
                    display: 'block', textAlign: 'center',
                    height: '46px', lineHeight: '46px', borderRadius: '10px',
                    background: p.featured ? '#fff' : '#1a1a1a',
                    color: p.featured ? '#1a1a1a' : '#fff',
                    textDecoration: 'none', fontSize: '14px', fontWeight: '500',
                    transition: 'opacity 0.2s, transform 0.2s'
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
                  >
                    Démarrer →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section style={{ padding: '100px 48px', textAlign: 'center' }}>
          <div style={{ maxWidth: '560px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '700', letterSpacing: '-0.04em', marginBottom: '16px' }}>
              Prêt à moderniser votre garage ?
            </h2>
            <p style={{ fontSize: '16px', color: '#5c5c5c', fontWeight: '300', marginBottom: '36px', lineHeight: 1.65 }}>
              Rejoignez 2 400 garages qui font confiance à GarageOS. 30 jours gratuits, sans engagement.
            </p>
            <Link href="/login" className="btn-primary" style={{ fontSize: '16px', height: '56px', padding: '0 40px' }}>
              Démarrer gratuitement →
            </Link>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ padding: '40px 48px', borderTop: '1px solid rgba(0,0,0,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#9a9a9a', fontSize: '13px' }}>
          <div style={{ fontWeight: '600', color: '#1a1a1a', fontSize: '15px' }}>GarageOS</div>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Mentions légales', 'CGU', 'Confidentialité', 'RGPD'].map(l => (
              <a key={l} href="#" style={{ color: '#9a9a9a', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#1a1a1a')}
                onMouseLeave={e => (e.currentTarget.style.color = '#9a9a9a')}
              >{l}</a>
            ))}
          </div>
          <div>© 2026 GarageOS — Hébergé en France 🇫🇷</div>
        </footer>
      </main>
    </>
  )
}
