'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

/* ─── helpers ─── */
function useVisible(ref: React.RefObject<HTMLElement | null>) {
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.12 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref])
  return vis
}

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const vis = useVisible(ref)
  return (
    <div ref={ref} className={`animate-in ${vis ? 'visible' : ''} ${className}`}>
      {children}
    </div>
  )
}

/* ─── data ─── */
const features = [
  {
    icon: '📋',
    title: 'Devis & Factures',
    desc: 'Générez des devis professionnels en 30 secondes. Transformez-les en factures d\'un clic. PDF automatique envoyé au client.',
  },
  {
    icon: '📦',
    title: 'Gestion du Stock',
    desc: 'Suivi en temps réel de vos pièces. Alertes de réapprovisionnement, historique et catalogue fournisseurs intégré.',
  },
  {
    icon: '📅',
    title: 'Planning Atelier',
    desc: 'Visualisez les créneaux de vos techniciens. Affectez les ordres de réparation en drag & drop.',
  },
  {
    icon: '💳',
    title: 'Caisse & Encaissement',
    desc: 'Terminal de paiement intégré, CB, espèces, chèques. Z de caisse automatique chaque soir.',
  },
  {
    icon: '🚗',
    title: 'Fiches Véhicules',
    desc: 'Historique complet de chaque véhicule. Rappels de révision, carnet d\'entretien numérique.',
  },
  {
    icon: '📊',
    title: 'Tableau de Bord',
    desc: 'KPIs en temps réel : chiffre d\'affaires, marge, taux d\'occupation, satisfaction client.',
  },
]

const steps = [
  { num: '01', title: 'Inscription', desc: 'Créez votre compte en 2 minutes. Aucune carte bancaire requise pour l\'essai.' },
  { num: '02', title: 'Import', desc: 'Importez vos clients, véhicules et stock existants depuis n\'importe quel fichier Excel.' },
  { num: '03', title: 'Formation', desc: 'Votre coach dédié vous forme en visio en moins d\'une heure. Votre équipe est opérationnelle.' },
  { num: '04', title: 'Démarrage', desc: 'Lancez-vous. Support 7j/7 inclus. Nous restons à vos côtés à chaque étape.' },
]

const testimonials = [
  {
    name: 'Marc Dupont',
    role: 'Garage Dupont, Lyon',
    quote: 'En 3 mois, j\'ai réduit mon temps administratif de moitié. Les devis se font maintenant en atelier, sur la tablette.',
    avatar: 'MD',
  },
  {
    name: 'Sophie Renard',
    role: 'Auto Renard, Bordeaux',
    quote: 'Le planning m\'a changé la vie. Je vois d\'un coup d\'œil ce que fait chaque technicien. Zéro double-réservation.',
    avatar: 'SR',
  },
  {
    name: 'Karim Bensaid',
    role: 'KS Mécanique, Marseille',
    quote: 'La gestion du stock était mon point faible. Maintenant je reçois une alerte avant même d\'être en rupture.',
    avatar: 'KB',
  },
]

const pricing = [
  {
    name: 'Essentiel',
    price: '49',
    desc: 'Parfait pour démarrer',
    features: ['1 utilisateur', 'Devis & Facturation', 'Fiches clients & véhicules', 'Support email'],
    cta: 'Essayer gratuitement',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '99',
    desc: 'Le plus populaire',
    features: ['5 utilisateurs', 'Tout Essentiel +', 'Stock & Fournisseurs', 'Planning atelier', 'Caisse intégrée', 'Support prioritaire 7j/7'],
    cta: 'Commencer l\'essai',
    highlighted: true,
  },
  {
    name: 'Entreprise',
    price: '199',
    desc: 'Multi-sites & équipes',
    features: ['Utilisateurs illimités', 'Tout Pro +', 'Multi-garages', 'API & intégrations', 'Coach dédié', 'SLA 99.9 %'],
    cta: 'Contacter les ventes',
    highlighted: false,
  },
]

/* ─── component ─── */
export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <div className="min-h-screen" style={{ background: '#f5f5f7' }}>

      {/* ── NAV ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass shadow-sm' : 'bg-transparent'
        }`}
        style={{ borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : 'none' }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <span className="font-semibold text-lg tracking-tight" style={{ color: '#1d1d1f' }}>
            Garage<span className="gradient-text">OS</span>
          </span>
          <div className="hidden md:flex items-center gap-8">
            {['Fonctionnalités', 'Comment ça marche', 'Témoignages', 'Tarifs'].map(item => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                className="text-sm transition-colors duration-200"
                style={{ color: '#424245' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#0071e3')}
                onMouseLeave={e => (e.currentTarget.style.color = '#424245')}
              >
                {item}
              </a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="text-sm px-4 py-1.5 rounded-full transition-all duration-200"
              style={{ color: '#0071e3' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,113,227,0.08)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              Connexion
            </Link>
            <Link href="/login" className="text-sm px-5 py-2 rounded-full font-medium transition-all duration-200"
              style={{ background: '#0071e3', color: '#fff' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#0077ed')}
              onMouseLeave={e => (e.currentTarget.style.background = '#0071e3')}
            >
              Essai gratuit
            </Link>
          </div>
          {/* Mobile burger */}
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="w-5 h-0.5 bg-gray-800 mb-1 transition-all" style={{ transform: menuOpen ? 'rotate(45deg) translate(3px,3px)' : 'none' }} />
            <div className="w-5 h-0.5 bg-gray-800 mb-1 transition-all" style={{ opacity: menuOpen ? 0 : 1 }} />
            <div className="w-5 h-0.5 bg-gray-800 transition-all" style={{ transform: menuOpen ? 'rotate(-45deg) translate(3px,-3px)' : 'none' }} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden glass border-t border-white/40 px-6 py-4 flex flex-col gap-4">
            {['Fonctionnalités', 'Comment ça marche', 'Témoignages', 'Tarifs'].map(item => (
              <a key={item} href="#" className="text-sm" style={{ color: '#1d1d1f' }} onClick={() => setMenuOpen(false)}>{item}</a>
            ))}
            <Link href="/login" className="text-sm font-medium text-center py-2 rounded-full" style={{ background: '#0071e3', color: '#fff' }}>
              Essai gratuit
            </Link>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden pt-16">
        {/* Background orbs */}
        <div className="orb w-96 h-96 opacity-30" style={{ background: 'radial-gradient(circle, #5ac8fa, transparent)', top: '10%', left: '5%' }} />
        <div className="orb w-80 h-80 opacity-20" style={{ background: 'radial-gradient(circle, #0071e3, transparent)', top: '20%', right: '8%' }} />
        <div className="orb w-64 h-64 opacity-25" style={{ background: 'radial-gradient(circle, #34aadc, transparent)', bottom: '15%', left: '20%' }} />
        <div className="orb w-72 h-72 opacity-15" style={{ background: 'radial-gradient(circle, #af52de, transparent)', bottom: '20%', right: '15%' }} />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-8"
            style={{
              background: 'rgba(0,113,227,0.08)',
              color: '#0071e3',
              border: '1px solid rgba(0,113,227,0.15)',
              animationDelay: '0s',
            }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#0071e3' }} />
            Nouveau — Version 2.0 disponible
          </div>

          <h1
            className="font-semibold leading-tight mb-6 animate-fade-up"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', color: '#1d1d1f', letterSpacing: '-0.03em', animationDelay: '0.1s' }}
          >
            Le logiciel{' '}
            <span className="gradient-text">tout-en-un</span>
            <br />pour les garagistes.
          </h1>

          <p
            className="text-xl leading-relaxed mb-10 animate-fade-up"
            style={{ color: '#6e6e73', maxWidth: '580px', margin: '0 auto 2.5rem', animationDelay: '0.2s' }}
          >
            Devis, facturation, stock, planning, caisse et bien plus — GarageOS centralise toute votre gestion en une seule application fluide et moderne.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-lg transition-all duration-300"
              style={{ background: '#0071e3', color: '#fff', boxShadow: '0 4px 24px rgba(0,113,227,0.3)' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,113,227,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,113,227,0.3)' }}
            >
              Commencer gratuitement
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
            <a
              href="#fonctionnalits"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 glass-card"
              style={{ color: '#1d1d1f' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
            >
              Voir les fonctionnalités
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-20 max-w-xl mx-auto animate-fade-up" style={{ animationDelay: '0.5s' }}>
            {[
              { val: '+2 000', label: 'garages clients' },
              { val: '30 s', label: 'pour créer un devis' },
              { val: '98 %', label: 'de satisfaction' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-semibold" style={{ color: '#1d1d1f', letterSpacing: '-0.02em' }}>{s.val}</div>
                <div className="text-xs mt-1" style={{ color: '#86868b' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float" style={{ color: '#86868b' }}>
          <span className="text-xs tracking-widest uppercase">Découvrir</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="fonctionnalits" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <Section className="text-center mb-20">
            <p className="text-sm font-medium mb-3" style={{ color: '#0071e3', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Fonctionnalités</p>
            <h2 className="font-semibold mb-5" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#1d1d1f', letterSpacing: '-0.025em' }}>
              Tout ce dont votre garage a besoin.
            </h2>
            <p className="text-lg" style={{ color: '#6e6e73', maxWidth: '500px', margin: '0 auto' }}>
              Chaque fonctionnalité a été conçue avec des garagistes. Rien de superflu, tout l'essentiel.
            </p>
          </Section>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <Section key={f.title} className={`delay-${(i % 3) * 100 + 100}`}>
                <div
                  className="glass-card rounded-3xl p-8 h-full transition-all duration-300 cursor-default group"
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 48px rgba(0,0,0,0.1)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '' }}
                >
                  <div className="text-4xl mb-5">{f.icon}</div>
                  <h3 className="font-semibold text-xl mb-3" style={{ color: '#1d1d1f' }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#6e6e73' }}>{f.desc}</p>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* ── BIG FEATURE CALLOUT ── */}
      <section className="py-20 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0071e3 0%, #34aadc 50%, #5ac8fa 100%)', minHeight: '400px' }}>
            <div className="orb w-96 h-96 opacity-20" style={{ background: 'white', top: '-100px', right: '-80px', filter: 'blur(60px)' }} />
            <div className="relative z-10 p-12 md:p-20 flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 text-white">
                <Section>
                  <h2 className="font-semibold mb-5" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', letterSpacing: '-0.025em' }}>
                    Votre garage,<br />dans votre poche.
                  </h2>
                  <p className="text-lg opacity-85 mb-8 leading-relaxed" style={{ maxWidth: '440px' }}>
                    Application mobile native iOS & Android. Accédez à vos ordres de réparation, votre planning et vos chiffres où que vous soyez.
                  </p>
                  <a
                    href="#tarifs"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300"
                    style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(10px)' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.3)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
                  >
                    Voir les offres
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </a>
                </Section>
              </div>
              {/* Mock phone */}
              <div className="flex-shrink-0 animate-float">
                <div className="relative w-52 h-96 rounded-[3rem] shadow-2xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.4)', backdropFilter: 'blur(20px)' }}>
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.4)' }} />
                  <div className="w-full px-4 text-white text-xs space-y-2">
                    {['Ord. 1042 — BMW X5', 'Ord. 1041 — Peugeot 308', 'Ord. 1039 — Renault Clio'].map((l, i) => (
                      <div key={i} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.15)' }}>
                        <div className="font-medium">{l}</div>
                        <div className="opacity-60 text-[10px] mt-0.5">{i === 0 ? 'En cours' : i === 1 ? 'Terminé' : 'En attente'}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="comment-a-marche" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <Section className="text-center mb-20">
            <p className="text-sm font-medium mb-3" style={{ color: '#0071e3', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Comment ça marche</p>
            <h2 className="font-semibold mb-5" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#1d1d1f', letterSpacing: '-0.025em' }}>
              Opérationnel en moins d'une heure.
            </h2>
          </Section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <Section key={s.num} className={`delay-${i * 100 + 100}`}>
                <div className="text-center">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-5"
                    style={{ background: 'rgba(0,113,227,0.08)', color: '#0071e3' }}
                  >
                    {s.num}
                  </div>
                  <h3 className="font-semibold text-lg mb-2" style={{ color: '#1d1d1f' }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#6e6e73' }}>{s.desc}</p>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="tmoignages" className="py-24 px-6" style={{ background: '#fff' }}>
        <div className="max-w-6xl mx-auto">
          <Section className="text-center mb-16">
            <p className="text-sm font-medium mb-3" style={{ color: '#0071e3', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Témoignages</p>
            <h2 className="font-semibold" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#1d1d1f', letterSpacing: '-0.025em' }}>
              Ils ont transformé leur garage.
            </h2>
          </Section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Section key={t.name} className={`delay-${i * 150 + 100}`}>
                <div className="glass-card rounded-3xl p-8 h-full transition-all duration-300"
                  onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-4 h-4" viewBox="0 0 16 16" fill="#0071e3"><path d="M8 1l1.8 3.6L14 5.6l-3 2.9.7 4.1L8 10.5l-3.7 2.1.7-4.1-3-2.9 4.2-.9z" /></svg>
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed mb-6 italic" style={{ color: '#424245' }}>"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold" style={{ background: 'rgba(0,113,227,0.1)', color: '#0071e3' }}>
                      {t.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-semibold" style={{ color: '#1d1d1f' }}>{t.name}</div>
                      <div className="text-xs" style={{ color: '#86868b' }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="tarifs" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <Section className="text-center mb-16">
            <p className="text-sm font-medium mb-3" style={{ color: '#0071e3', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Tarifs</p>
            <h2 className="font-semibold mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#1d1d1f', letterSpacing: '-0.025em' }}>
              Simple. Transparent. Sans surprise.
            </h2>
            <p style={{ color: '#6e6e73' }}>14 jours d'essai gratuit. Sans engagement. Résiliable à tout moment.</p>
          </Section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {pricing.map((p, i) => (
              <Section key={p.name} className={`delay-${i * 150 + 100}`}>
                <div
                  className="rounded-3xl p-8 h-full flex flex-col transition-all duration-300 relative overflow-hidden"
                  style={
                    p.highlighted
                      ? { background: '#0071e3', color: '#fff', boxShadow: '0 8px 48px rgba(0,113,227,0.35)' }
                      : { background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(0,0,0,0.06)', backdropFilter: 'blur(20px)' }
                  }
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  {p.highlighted && (
                    <div className="absolute top-5 right-5 text-xs font-medium px-3 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }}>
                      Populaire
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-medium mb-1" style={{ color: p.highlighted ? 'rgba(255,255,255,0.7)' : '#6e6e73' }}>{p.name}</div>
                    <div className="mb-2">
                      <span className="font-semibold" style={{ fontSize: '3rem', letterSpacing: '-0.03em', color: p.highlighted ? '#fff' : '#1d1d1f' }}>{p.price}€</span>
                      <span style={{ color: p.highlighted ? 'rgba(255,255,255,0.6)' : '#86868b', fontSize: '0.9rem' }}> /mois</span>
                    </div>
                    <p className="text-sm mb-8" style={{ color: p.highlighted ? 'rgba(255,255,255,0.7)' : '#6e6e73' }}>{p.desc}</p>
                    <ul className="space-y-3 mb-8">
                      {p.features.map(f => (
                        <li key={f} className="flex items-center gap-3 text-sm" style={{ color: p.highlighted ? 'rgba(255,255,255,0.9)' : '#424245' }}>
                          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="7" fill={p.highlighted ? 'rgba(255,255,255,0.2)' : 'rgba(0,113,227,0.1)'} />
                            <path d="M5 8l2 2 4-4" stroke={p.highlighted ? '#fff' : '#0071e3'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-auto">
                    <Link
                      href="/login"
                      className="block text-center py-3 px-6 rounded-2xl font-medium text-sm transition-all duration-200"
                      style={
                        p.highlighted
                          ? { background: '#fff', color: '#0071e3' }
                          : { background: '#0071e3', color: '#fff' }
                      }
                      onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
                      onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                    >
                      {p.cta}
                    </Link>
                  </div>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Section>
            <div
              className="rounded-3xl py-20 px-8 relative overflow-hidden"
              style={{ background: '#1d1d1f' }}
            >
              <div className="orb w-80 h-80 opacity-20" style={{ background: 'radial-gradient(circle, #5ac8fa, transparent)', top: '-60px', left: '-40px' }} />
              <div className="orb w-64 h-64 opacity-15" style={{ background: 'radial-gradient(circle, #af52de, transparent)', bottom: '-40px', right: '-20px' }} />
              <div className="relative z-10">
                <h2 className="font-semibold text-white mb-5" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.025em' }}>
                  Prêt à moderniser votre garage ?
                </h2>
                <p className="text-lg mb-10" style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '460px', margin: '0 auto 2.5rem' }}>
                  Rejoignez plus de 2 000 garagistes qui ont déjà fait le choix de GarageOS.
                </p>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-lg transition-all duration-300"
                  style={{ background: '#0071e3', color: '#fff', boxShadow: '0 4px 24px rgba(0,113,227,0.4)' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,113,227,0.5)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,113,227,0.4)' }}
                >
                  Démarrer l'essai gratuit — 14 jours
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </Link>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-16 px-6 border-t" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-2 md:col-span-1">
              <span className="font-semibold text-xl" style={{ color: '#1d1d1f' }}>Garage<span className="gradient-text">OS</span></span>
              <p className="text-sm mt-3 leading-relaxed" style={{ color: '#86868b' }}>
                Le logiciel de gestion pensé par des garagistes, pour des garagistes.
              </p>
            </div>
            {[
              { title: 'Produit', links: ['Fonctionnalités', 'Tarifs', 'Nouveautés', 'Roadmap'] },
              { title: 'Support', links: ['Centre d\'aide', 'Contact', 'Statut système', 'Formation'] },
              { title: 'Légal', links: ['CGU', 'Confidentialité', 'Mentions légales', 'RGPD'] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold mb-4" style={{ color: '#1d1d1f' }}>{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map(l => (
                    <li key={l}>
                      <a href="#" className="text-sm transition-colors duration-200" style={{ color: '#86868b' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#0071e3')}
                        onMouseLeave={e => (e.currentTarget.style.color = '#86868b')}
                      >{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
            <p className="text-xs" style={{ color: '#86868b' }}>© 2026 GarageOS. Tous droits réservés.</p>
            <p className="text-xs" style={{ color: '#86868b' }}>Fait avec ❤️ en France</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
