'use client'

import { useState, useEffect } from 'react'
import { createClient } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [activeView, setActiveView] = useState('dashboard')
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push('/login')
      else setUser(data.user)
    })
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const navItems = [
    { id: 'dashboard', icon: '⊞', label: 'Tableau de bord' },
    { id: 'clients', icon: '👥', label: 'Clients' },
  ]

  if (!user) return null

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Inter, sans-serif', background: '#f5f5f0' }}>
      <aside style={{ width: '220px', background: '#fff', borderRight: '1px solid rgba(0,0,0,0.07)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px', fontSize: '16px', fontWeight: '600', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>GarageOS</div>
        <nav style={{ flex: 1, padding: '12px 10px' }}>
          {navItems.map(item => (
            <div key={item.id} onClick={() => setActiveView(item.id)} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '9px 12px', borderRadius: '8px', cursor: 'pointer', marginBottom: '2px',
              background: activeView === item.id ? '#f5f5f0' : 'transparent',
              fontSize: '13px', color: activeView === item.id ? '#1a1a1a' : '#5c5c5c'
            }}>
              <span>{item.icon}</span><span>{item.label}</span>
            </div>
          ))}
        </nav>
        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(0,0,0,0.05)', fontSize: '12px', color: '#9a9a9a' }}>
          {user.email}
          <div onClick={handleLogout} style={{ marginTop: '6px', cursor: 'pointer', color: '#991b1b' }}>Déconnexion</div>
        </div>
      </aside>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <header style={{ height: '56px', background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', padding: '0 24px' }}>
          <div style={{ fontSize: '15px', fontWeight: '600' }}>{activeView === 'dashboard' ? 'Tableau de bord' : 'Clients'}</div>
        </header>
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {activeView === 'dashboard' && <DashboardView />}
          {activeView === 'clients' && <ClientsView supabase={supabase} />}
        </main>
      </div>
    </div>
  )
}
function DashboardView() {
  const kpis = [
    { label: 'Véhicules en cours', value: '12', delta: '+3 aujourd\'hui', color: '#1e3a5f' },
    { label: 'CA du mois', value: '18 240€', delta: '+12% vs mois dernier', color: '#2d6a4f' },
    { label: 'Devis en attente', value: '5', delta: '2 expirent bientôt', color: '#92400e' },
    { label: 'Paiements reçus', value: '3 420€', delta: 'Cette semaine', color: '#1a1a1a' },
  ]
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
      {kpis.map((k, i) => (
        <div key={i} style={{ background: '#fff', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.09)', padding: '20px' }}>
          <div style={{ fontSize: '11px', color: '#9a9a9a', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{k.label}</div>
          <div style={{ fontSize: '28px', fontWeight: '600', color: k.color, marginBottom: '4px' }}>{k.value}</div>
          <div style={{ fontSize: '12px', color: '#9a9a9a' }}>{k.delta}</div>
        </div>
      ))}
    </div>
  )
}
function ClientsView({ supabase }) {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', phone: '' })

  useEffect(() => { loadClients() }, [])

  async function loadClients() {
    const { data } = await supabase.from('clients').select('*').order('created_at', { ascending: false })
    setClients(data || [])
    setLoading(false)
  }

  async function handleCreate(e) {
    e.preventDefault()
    setSaving(true)
   const { data: { user } } = await supabase.auth.getUser()
const { data: userData } = await supabase.from('users').select('garage_id').eq('id', user.id).single()
await supabase.from('clients').insert({ ...form, garage_id: userData.garage_id })
    setForm({ first_name: '', last_name: '', email: '', phone: '' })
    setShowForm(false)
    await loadClients()
    setSaving(false)
  }

  const inp = { width: '100%', height: '44px', border: '1px solid rgba(0,0,0,0.09)', borderRadius: '10px', padding: '0 14px', fontSize: '14px', fontFamily: 'inherit', outline: 'none' }
  const lbl = { display: 'block', fontSize: '11px', fontWeight: '500', color: '#5c5c5c', marginBottom: '6px' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
        <button onClick={() => setShowForm(!showForm)} style={{ height: '38px', padding: '0 16px', background: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '13px', cursor: 'pointer' }}>
          {showForm ? '✕ Annuler' : '+ Nouveau client'}
        </button>
      </div>
      {showForm && (
        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.09)', padding: '24px', marginBottom: '16px' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '20px' }}>Nouveau client</div>
          <form onSubmit={handleCreate}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div><label style={lbl}>Prénom *</label><input style={inp} placeholder="Paul" value={form.first_name} onChange={e => setForm({ ...form, first_name: e.target.value })} required /></div>
              <div><label style={lbl}>Nom *</label><input style={inp} placeholder="Dupont" value={form.last_name} onChange={e => setForm({ ...form, last_name: e.target.value })} required /></div>
              <div><label style={lbl}>Email</label><input style={inp} type="email" placeholder="paul@email.fr" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
              <div><label style={lbl}>Téléphone</label><input style={inp} placeholder="06 12 34 56 78" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
            </div>
            <button type="submit" disabled={saving} style={{ height: '44px', padding: '0 24px', background: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '14px', cursor: 'pointer' }}>
              {saving ? 'Enregistrement...' : 'Enregistrer le client'}
            </button>
          </form>
        </div>
      )}
      <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.09)', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '14px', fontWeight: '600' }}>Clients</div>
          <span style={{ fontSize: '12px', color: '#9a9a9a' }}>{clients.length} client{clients.length > 1 ? 's' : ''}</span>
        </div>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#9a9a9a' }}>Chargement...</div>
        ) : clients.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#9a9a9a', fontSize: '14px' }}>
            Aucun client.<br /><span style={{ fontSize: '12px' }}>Cliquez sur "+ Nouveau client" pour commencer.</span>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#fafaf8' }}>
                {['Nom', 'Email', 'Téléphone', 'Ajouté le'].map(h => (
                  <th key={h} style={{ padding: '10px 24px', textAlign: 'left', fontSize: '11px', fontWeight: '500', color: '#9a9a9a', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clients.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                  <td style={{ padding: '14px 24px', fontSize: '13px', fontWeight: '500' }}>{c.first_name} {c.last_name}</td>
                  <td style={{ padding: '14px 24px', fontSize: '13px', color: '#5c5c5c' }}>{c.email || '—'}</td>
                  <td style={{ padding: '14px 24px', fontSize: '13px', color: '#5c5c5c' }}>{c.phone || '—'}</td>
                  <td style={{ padding: '14px 24px', fontSize: '13px', color: '#9a9a9a' }}>{new Date(c.created_at).toLocaleDateString('fr-FR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
