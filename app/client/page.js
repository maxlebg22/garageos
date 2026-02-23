'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function LoginClient() {
  const [tab, setTab] = useState('link')
  const [code, setCode] = useState('')

  function formatCode(val) {
    const clean = val.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()
    return clean.length > 3 ? clean.slice(0, 3) + '-' + clean.slice(3, 8) : clean
  }

  const inp = {
    width: '100%', height: '48px',
    border: '1px solid rgba(0,0,0,0.09)', borderRadius: '10px',
    padding: '0 16px', fontSize: '14px', fontFamily: 'inherit',
    color: '#1a1a1a', background: '#fff', outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s'
  }

  const lbl = {
    display: 'block', fontSize: '11px', fontWeight: '500',
    color: '#5c5c5c', marginBottom: '6px', letterSpacing: '0.03em'
  }

  const steps = [
    { num: '01', title: 'Suivi en temps reel', desc: 'Voir ou en est votre vehicule a tout moment' },
    { num: '02', title: 'Devis transparents', desc: 'Consultez et acceptez vos devis en un clic' },
    { num: '03', title: 'Contact direct', desc: 'Echangez avec votre garage via la messagerie' },
    { num: '04', title: 'Historique complet', desc: 'Toutes vos interventions archivees' },
  ]

  const tabs = [
    { id: 'link', label: 'Lien SMS' },
    { id: 'code', label: "Code d'acces" },
    { id: 'account', label: 'Mon compte' },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.5s ease forwards; }
        .inp:focus { border-color: rgba(0,0,0,0.3) !important; box-shadow: 0 0 0 3px rgba(0,0,0,0.07) !important; }
        .btn-main { transition: opacity 0.2s, transform 0.2s; }
        .btn-main:hover { opacity: 0.85; transform: translateY(-1px); }
        .step-item { transition: transform 0.2s; }
        .step-item:hover { transform: translateX(4px); }
        @media (max-width: 768px) {
          .two-col { grid-template-columns: 1fr !important; }
          .left-panel { display: none !important; }
        }
      `}</style>

      <div className="two-col" style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', fontFamily: 'Inter, sans-serif' }}>

        {/* PANNEAU GAUCHE */}
        <div className="left-panel" style={{
          background: '#f5f5f0', display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between', padding: '48px',
          borderRight: '1px solid rgba(0,0,0,0.07)'
        }}>
          <Link href="/" style={{ fontSize: '17px', fontWeight: '700', color: '#1a1a1a', textDecoration: 'none', letterSpacing: '-0.02em' }}>GarageOS</Link>

          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: '#fff', border: '1px solid rgba(0,0,0,0.09)',
              borderRadius: '100px', padding: '6px 14px',
              fontSize: '12px', color: '#1e3a5f', marginBottom: '24px'
            }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#1e3a5f', display: 'inline-block' }} />
              Espace client
            </div>
            <h2 style={{
              fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: '700',
              letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '16px'
            }}>
              Le suivi de votre<br />vehicule, de A a Z.
            </h2>
            <p style={{ fontSize: '15px', color: '#5c5c5c', fontWeight: '300', lineHeight: 1.7, maxWidth: '340px', marginBottom: '36px' }}>
              Suivez chaque etape de la reparation en temps reel, consultez vos devis et communiquez directement avec votre garage.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {steps.map((s, i) => (
                <div key={i} className="step-item" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '36px', height: '36px', background: '#1a1a1a', color: '#fff',
                    borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '11px', fontWeight: '700', flexShrink: 0, letterSpacing: '0.05em'
                  }}>{s.num}</div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '2px' }}>{s.title}</div>
                    <div style={{ fontSize: '12px', color: '#9a9a9a', fontWeight: '300' }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ fontSize: '12px', color: '#9a9a9a' }}>
            Vous etes un professionnel ?{' '}
            <Link href="/login" style={{ color: '#1a1a1a', fontWeight: '500', textDecoration: 'none' }}>
              Espace garage
            </Link>
          </div>
        </div>

        {/* PANNEAU DROIT */}
        <div style={{ background: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '48px 40px' }}>
          <div style={{ width: '100%', maxWidth: '380px' }} className="fade-up">

            <h1 style={{ fontSize: '26px', fontWeight: '700', letterSpacing: '-0.03em', marginBottom: '4px' }}>Acceder a mon espace.</h1>
            <p style={{ fontSize: '14px', color: '#9a9a9a', fontWeight: '300', marginBottom: '28px' }}>Votre garage vous a partage un acces a votre vehicule.</p>

            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid rgba(0,0,0,0.07)', marginBottom: '28px' }}>
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} style={{
                  flex: 1, padding: '10px 8px', border: 'none', background: 'transparent',
                  fontSize: '13px', fontWeight: tab === t.id ? '600' : '400',
                  color: tab === t.id ? '#1a1a1a' : '#9a9a9a',
                  cursor: 'pointer', fontFamily: 'inherit',
                  borderBottom: tab === t.id ? '2px solid #1a1a1a' : '2px solid transparent',
                  marginBottom: '-1px', transition: 'all 0.2s'
                }}>{t.label}</button>
              ))}
            </div>

            {tab === 'link' && (
              <div>
                <div style={{ background: '#f5f5f0', borderRadius: '12px', padding: '20px', marginBottom: '24px', border: '1px solid rgba(0,0,0,0.05)' }}>
                  <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}>Vous avez recu un SMS ?</div>
                  <p style={{ fontSize: '13px', color: '#5c5c5c', lineHeight: 1.6, fontWeight: '300' }}>
                    Cliquez directement sur le lien recu par SMS ou email de votre garage. Acces instantane, sans code ni mot de passe.
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                  {['Votre garage envoie un lien', 'Vous cliquez sur le lien', 'Acces direct a votre espace'].map((s, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#1a1a1a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700', flexShrink: 0 }}>{i + 1}</div>
                      <span style={{ fontSize: '13px', color: '#5c5c5c' }}>{s}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setTab('code')} className="btn-main" style={{ width: '100%', height: '50px', background: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', fontFamily: 'inherit' }}>
                  Utiliser un code d'acces
                </button>
              </div>
            )}

            {tab === 'code' && (
              <div>
                <div style={{ background: '#f5f5f0', borderRadius: '12px', padding: '16px 18px', marginBottom: '24px', fontSize: '13px', color: '#5c5c5c', lineHeight: 1.6, border: '1px solid rgba(0,0,0,0.05)' }}>
                  Votre code figure sur votre <strong>bon de depot</strong> ou dans le SMS recu de votre garage.
                </div>
                <div style={{ marginBottom: '14px' }}>
                  <label style={lbl}>VOTRE EMAIL</label>
                  <input className="inp" style={inp} type="email" placeholder="votre@email.fr" />
                </div>
                <div style={{ marginBottom: '28px' }}>
                  <label style={lbl}>CODE D'ACCES</label>
                  <input className="inp" style={{ ...inp, letterSpacing: '0.15em', textAlign: 'center', fontSize: '18px', fontWeight: '600' }}
                    placeholder="ABC-12345" value={code}
                    onChange={e => setCode(formatCode(e.target.value))}
                    maxLength={9}
                  />
                </div>
                <button className="btn-main" style={{ width: '100%', height: '50px', background: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '500', cursor: 'pointer', fontFamily: 'inherit' }}>
                  Acceder a mon espace
                </button>
                <p style={{ fontSize: '12px', color: '#9a9a9a', textAlign: 'center', marginTop: '14px' }}>
                  Code perdu ?{' '}
                  <button style={{ background: 'none', border: 'none', color: '#5c5c5c', fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'underline' }}>
                    Demander un nouveau code
                  </button>
                </p>
              </div>
            )}

            {tab === 'account' && (
              <div>
                <div style={{ marginBottom: '14px' }}>
                  <label style={lbl}>EMAIL</label>
                  <input className="inp" style={inp} type="email" placeholder="votre@email.fr" />
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <label style={lbl}>MOT DE PASSE</label>
                  <input className="inp" style={inp} type="password" placeholder="••••••••" />
                </div>
                <button className="btn-main" style={{ width: '100%', height: '50px', background: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '500', cursor: 'pointer', fontFamily: 'inherit', marginBottom: '12px' }}>
                  Se connecter
                </button>
                <button style={{ width: '100%', height: '46px', background: 'transparent', color: '#9a9a9a', border: '1px solid rgba(0,0,0,0.09)', borderRadius: '12px', fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit' }}>
                  Mot de passe oublie
                </button>
                <p style={{ fontSize: '12px', color: '#9a9a9a', textAlign: 'center', marginTop: '14px' }}>
                  Premiere connexion ?{' '}
                  <button onClick={() => setTab('code')} style={{ background: 'none', border: 'none', color: '#1a1a1a', fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: '500' }}>
                    Utiliser un code d'acces
                  </button>
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  )
}