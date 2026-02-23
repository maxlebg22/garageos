'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
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
      { threshold: 0.15 }
    )
    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const features = [
    { title: 'Suivi des interventions', desc: 'Gerez chaque vehicule en temps reel. Vos clients suivent avancement depuis leur telephone.' },
    { title: 'Devis & Facturation', desc: 'Creez des devis professionnels, convertissez-les en factures Factur-X conformes 2026.' },
    { title: 'Planning intelligent', desc: 'Organisez votre atelier par mecanicien, visualisez la charge de travail en un coup doeil.' },
    { title: 'Gestion du stock', desc: 'Alertes automatiques quand vos pieces sont en rupture. Commandes simplifiees.' },
    { title: 'Portail client', desc: 'Vos clients suivent leur vehicule, acceptent les devis et vous envoient des messages.' },
    { title: 'Tableau de bord finance', desc: 'CA, marges, factures impayees. Tous vos chiffres cles en temps reel.' },
  ]

  const plans = [
    { name: 'Starter', price: '49', desc: 'Pour les garages solo', features: ['1 utilisateur', 'Clients & vehicules', 'Devis & factures', 'Portail client', 'Support email'], featured: false },
    { name: 'Pro', price: '129', desc: 'Pour les ateliers en croissance', features: ['5 utilisateurs', 'Tout Starter +', 'Planning avance', 'Gestion du stock', 'SMS automatiques', 'Support prioritaire'], featured: true },
    { name: 'Business', price: '249', desc: 'Pour les grands ateliers', features: ['Utilisateurs illimites', 'Tout Pro +', 'Multi-sites', 'API & integrations', 'Compte dedie'], featured: false },
  ]
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Inter', sans-serif; background: #f5f5f0; color: #1a1a1a; overflow-x: hidden; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        .hero-badge { animation: fadeUp 0.6s ease forwards; }
        .hero-title { animation: fadeUp 0.7s 0.1s ease both; }
        .hero-sub { animation: fadeUp 0.7s 0.2s ease both; }
        .hero-ctas { animation: fadeUp 0.7s 0.3s ease both; }
        .animate-in { opacity:0; transform:translateY(24px); transition:opacity 0.6s ease,transform 0.6s ease; }
        .animate-in.visible { opacity:1 !important; transform:translateY(0) !important; }
        .nav-link { font-size:14px; color:#5c5c5c; text-decoration:none; transition:color 0.2s; }
        .nav-link:hover { color:#1a1a1a; }
        .btn-primary { display:inline-flex; align-items:center; justify-content:center; height:52px; padding:0 32px; background:#1a1a1a; color:#fff; border-radius:12px; font-size:15px; font-weight:500; text-decoration:none; transition:transform 0.2s,box-shadow 0.2s; }
        .btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,0,0,0.18); }
        .btn-secondary { display:inline-flex; align-items:center; justify-content:center; height:52px; padding:0 32px; background:#fff; color:#1a1a1a; border:1px solid rgba(0,0,0,0.09); border-radius:12px; font-size:15px; text-decoration:none; transition:transform 0.2s,box-shadow 0.2s; }
        .btn-secondary:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,0,0,0.08); }
        .feature-card { background:#fff; border-radius:14px; border:1px solid rgba(0,0,0,0.09); padding:28px; transition:transform 0.3s,box-shadow 0.3s; }
        .feature-card:hover { transform:translateY(-4px); box-shadow:0 12px 32px rgba(0,0,0,0.08); }
        .plan-card { border-radius:18px; padding:36px; transition:transform 0.3s cubic-bezier(0.34,1.56,0.64,1),box-shadow 0.3s; }
        .plan-card:hover { transform:translateY(-8px) scale(1.02); box-shadow:0 20px 48px rgba(0,0,0,0.12); }
        .plan-card.featured:hover { transform:translateY(-8px) scale(1.05); box-shadow:0 24px 56px rgba(0,0,0,0.2); }
        .footer-link { color:#9a9a9a; text-decoration:none; transition:color 0.2s; }
        .footer-link:hover { color:#1a1a1a; }
        @media (max-width:768px) {
          .nav-links { display:none !important; }
          .hero-title { font-size:36px !important; }
          .hero-ctas { flex-direction:column !important; align-items:stretch !important; }
          .stats-grid { grid-template-columns:repeat(2,1fr) !important; }
          .features-grid { grid-template-columns:1fr !important; }
          .plans-grid { grid-template-columns:1fr !important; }
          .footer-inner { flex-direction:column !important; gap:20px !important; text-align:center !important; }
          .footer-links { flex-wrap:wrap !important; justify-content:center !important; }
          .nav-inner { padding:0 20px !important; }
        }
      `}</style>