cat > app/login/page.js << 'EOF'
'use client'

import { useState } from 'react'
import { createClient } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPro() {
  const [view, setView] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError('Email ou mot de passe incorrect'); setLoading(false) }
    else router.push('/dashboard')
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f0', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ background: '#fff', borderRadius: '16px', padding: '48px', width: '100%', maxWidth: '400px', border: '1px solid rgba(0,0,0,0.09)' }}>
        <Link href="/" style={{ fontSize: '17px', fontWeight: '700', color: '#1a1a1a', textDecoration: 'none', display: 'block', marginBottom: '32px' }}>GarageOS</Link>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a', marginBottom: '4px' }}>Connexion</h1>
        <p style={{ fontSize: '14px', color: '#9a9a9a', marginBottom: '28px' }}>Acces espace professionnel</p>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#5c5c5c', marginBottom: '6px' }}>EMAIL</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="contact@mongarage.fr"
              style={{ width: '100%', height: '48px', border: '1px solid rgba(0,0,0,0.09)', borderRadius: '10px', padding: '0 16px', fontSize: '14px', fontFamily: 'inherit', outline: 'none' }} />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#5c5c5c', marginBottom: '6px' }}>MOT DE PASSE</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••"
              style={{ width: '100%', height: '48px', border: '1px solid rgba(0,0,0,0.09)', borderRadius: '10px', padding: '0 16px', fontSize: '14px', fontFamily: 'inherit', outline: 'none' }} />
          </div>
          {error && <div style={{ background: 'rgba(153,27,27,0.07)', border: '1px solid rgba(153,27,27,0.15)', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: '#991b1b', marginBottom: '16px' }}>{error}</div>}
          <button type="submit" disabled={loading}
            style={{ width: '100%', height: '50px', background: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '500', cursor: 'pointer', fontFamily: 'inherit' }}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
        <p style={{ fontSize: '12px', color: '#9a9a9a', textAlign: 'center', marginTop: '20px' }}>
          Espace client ? <Link href="/client" style={{ color: '#1a1a1a', fontWeight: '500', textDecoration: 'none' }}>Acceder ici</Link>
        </p>
      </div>
    </div>
  )
}
EOF
