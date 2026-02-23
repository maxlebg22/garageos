‘use client’

import { useState } from ‘react’
import { createClient } from ‘../../lib/supabase’
import { useRouter } from ‘next/navigation’
import Link from ‘next/link’

export default function LoginPro() {
const [view, setView] = useState(‘login’)
const [email, setEmail] = useState(’’)
const [password, setPassword] = useState(’’)
const [error, setError] = useState(’’)
const [loading, setLoading] = useState(false)
const router = useRouter()
const supabase = createClient()

async function handleLogin(e) {
e.preventDefault()
setLoading(true)
setError(’’)
const { error } = await supabase.auth.signInWithPassword({ email, password })
if (error) { setError(‘Email ou mot de passe incorrect’); setLoading(false) }
else router.push(’/dashboard’)
}

const inp = {
width: ‘100%’, height: ‘48px’,
border: ‘1px solid rgba(0,0,0,0.09)’, borderRadius: ‘10px’,
padding: ‘0 16px’, fontSize: ‘14px’, fontFamily: ‘inherit’,
color: ‘#1a1a1a’, background: ‘#fff’, outline: ‘none’,
transition: ‘border-color 0.2s, box-shadow 0.2s’
}

const lbl = {
display: ‘block’, fontSize: ‘11px’, fontWeight: ‘500’,
color: ‘#5c5c5c’, marginBottom: ‘6px’, letterSpacing: ‘0.03em’
}

return (
<>
<style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; } body { font-family: 'Inter', sans-serif; } @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } } .fade-up { animation: fadeUp 0.5s ease forwards; } .inp:focus { border-color: rgba(0,0,0,0.3) !important; box-shadow: 0 0 0 3px rgba(0,0,0,0.07) !important; } .btn-main { transition: opacity 0.2s, transform 0.2s; } .btn-main:hover { opacity: 0.85; transform: translateY(-1px); } @media (max-width: 768px) { .two-col { grid-template-columns: 1fr !important; } .left-panel { display: none !important; } }`}</style>

```
  <div className="two-col" style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', fontFamily: 'Inter, sans-serif' }}>

    {/* PANNEAU GAUCHE */}
    <div className="left-panel" style={{
      background: '#1a1a1a', display: 'flex', flexDirection: 'column',
      justifyContent: 'space-between', padding: '48px', position: 'relative', overflow: 'hidden'
    }}>
      <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', top: '-150px', right: '-150px', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.02)', bottom: '80px', left: '-80px', pointerEvents: 'none' }} />

      <Link href="/" style={{ fontSize: '17px', fontWeight: '700', color: '#fff', textDecoration: 'none', letterSpacing: '-0.02em' }}>GarageOS</Link>

      <div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '100px', padding: '6px 14px',
          fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '28px'
        }}>
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#2d6a4f', display: 'inline-block' }} />
          Espace professionnel
        </div>
        <h2 style={{
          fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: '700',
          letterSpacing: '-0.04em', color: '#fff', lineHeight: 1.1, marginBottom: '16px'
        }}>
          Pilotez votre atelier<br />comme jamais.
        </h2>
        <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.45)', fontWeight: '300', lineHeight: 1.7, maxWidth: '340px' }}>
          Interventions, devis, stock et planning réunis dans un seul outil. Conçu pour les professionnels exigeants.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '40px' }}>
        {[
          { val: '2 400+', lbl: 'Garages équipés' },
          { val: '98%', lbl: 'Satisfaction' },
          { val: 'France', lbl: 'Hébergé en France' }
        ].map((s, i) => (
          <div key={i}>
            <div style={{ fontSize: '22px', fontWeight: '700', color: '#fff', letterSpacing: '-0.03em' }}>{s.val}</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>{s.lbl}</div>
          </div>
        ))}
      </div>
    </div>

    {/* PANNEAU DROIT */}
    <div style={{ background: '#f5f5f0', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '48px 40px' }}>
      <div style={{ width: '100%', maxWidth: '380px' }} className="fade-up">

        {/* Switcher */}
        <div style={{
          display: 'flex', background: '#fff',
          border: '1px solid rgba(0,0,0,0.09)',
          borderRadius: '12px', padding: '4px', marginBottom: '32px'
        }}>
          {[
            { id: 'login', label: 'Se connecter' },
            { id: 'register', label: 'Créer un compte' }
          ].map(v => (
            <button key={v.id} onClick={() => { setView(v.id); setError('') }} style={{
              flex: 1, padding: '10px', border: 'none', borderRadius: '9px', cursor: 'pointer',
              background: view === v.id ? '#1a1a1a' : 'transparent',
              color: view === v.id ? '#fff' : '#9a9a9a',
              fontSize: '13px', fontWeight: '500', fontFamily: 'inherit',
              transition: 'all 0.2s'
            }}>
              {v.label}
            </button>
          ))}
        </div>

        {view === 'login' && (
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: '700', letterSpacing: '-0.03em', marginBottom: '4px' }}>Bonjour.</h1>
            <p style={{ fontSize: '14px', color: '#9a9a9a', fontWeight: '300', marginBottom: '28px' }}>Connectez-vous à votre espace garage.</p>
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '14px' }}>
                <label style={lbl}>EMAIL</label>
                <input className="inp" style={inp} type="email" placeholder="contact@mongarage.fr" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div style={{ marginBottom: '8px' }}>
                <label style={lbl}>MOT DE PASSE</label>
                <input className="inp" style={inp} type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
              <div style={{ textAlign: 'right', marginBottom: '24px' }}>
                <button type="button" onClick={() => setView('forgot')} style={{ background: 'none', border: 'none', fontSize: '12px', color: '#9a9a9a', cursor: 'pointer', fontFamily: 'inherit' }}>
                  Mot de passe oublié ?
                </button>
              </div>
              {error && (
                <div style={{ background: 'rgba(153,27,27,0.07)', border: '1px solid rgba(153,27,27,0.15)', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: '#991b1b', marginBottom: '16px' }}>
                  {error}
                </div>
              )}
              <button type="submit" className="btn-main" disabled={loading} style={{ width: '100%', height: '50px', background: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '500', cursor: 'pointer', fontFamily: 'inherit' }}>
                {loading ? 'Connexion...' : 'Se connecter'}
              </button>
            </form>
          </div>
        )}

        {view === 'register' && (
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: '700', letterSpacing: '-0.03em', marginBottom: '4px' }}>Créer un compte.</h1>
            <p style={{ fontSize: '14px', color: '#9a9a9a', fontWeight: '300', marginBottom: '28px' }}>30 jours gratuits, aucune carte bancaire.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
              <div>
                <label style={lbl}>PRENOM</label>
                <input className="inp" style={inp} placeholder="Paul" />
              </div>
              <div>
                <label style={lbl}>NOM</label>
                <input className="inp" style={inp} placeholder="Dupont" />
              </div>
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={lbl}>NOM DU GARAGE</label>
              <input className="inp" style={inp} placeholder="Garage Dupont" />
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={lbl}>EMAIL PROFESSIONNEL</label>
              <input className="inp" style={inp} type="email" placeholder="contact@mongarage.fr" />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={lbl}>MOT DE PASSE</label>
              <input className="inp" style={inp} type="password" placeholder="Minimum 8 caracteres" />
            </div>
            <button className="btn-main" style={{ width: '100%', height: '50px', background: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '500', cursor: 'pointer', fontFamily: 'inherit' }}>
              Creer mon compte
            </button>
            <p style={{ fontSize: '12px', color: '#9a9a9a', textAlign: 'center', marginTop: '16px', lineHeight: 1.6 }}>
              En creant un compte vous acceptez nos <a href="#" style={{ color: '#5c5c5c' }}>CGU</a> et notre <a href="#" style={{ color: '#5c5c5c' }}>politique de confidentialite</a>.
            </p>
          </div>
        )}

        {view === 'forgot' && (
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: '700', letterSpacing: '-0.03em', marginBottom: '4px' }}>Mot de passe oublie.</h1>
            <p style={{ fontSize: '14px', color: '#9a9a9a', fontWeight: '300', marginBottom: '28px' }}>Entrez votre email pour recevoir un lien de reinitialisation.</p>
            <div style={{ marginBottom: '24px' }}>
              <label style={lbl}>EMAIL</label>
              <input className="inp" style={inp} type="email" placeholder="contact@mongarage.fr" />
            </div>
            <button className="btn-main" style={{ width: '100%', height: '50px', background: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '500', cursor: 'pointer', fontFamily: 'inherit', marginBottom: '12px' }}>
              Envoyer le lien
            </button>
            <button onClick={() => setView('login')} style={{ width: '100%', height: '46px', background: 'transparent', color: '#9a9a9a', border: '1px solid rgba(0,0,0,0.09)', borderRadius: '12px', fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit' }}>
              Retour a la connexion
            </button>
          </div>
        )}

      </div>
    </div>
  </div>
</>
```

)
}