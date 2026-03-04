import { useState } from 'react'
import { Phone, Mail, MapPin, MessageSquare, Loader } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { clsx } from 'clsx'

type Status = 'idle' | 'loading' | 'success'

interface FormData {
  nom: string; tel: string; email: string
  structure: string; region: string; sujet: string; message: string
}

interface Errors { [k: string]: string }

function validate(data: FormData): Errors {
  const e: Errors = {}
  if (data.nom.trim().length < 2)       e.nom     = 'Nom obligatoire (2 caractères min.)'
  if (data.tel.replace(/\D/g,'').length < 8) e.tel = 'Numéro invalide'
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Email invalide'
  if (!data.region)                      e.region  = 'Choisissez une région'
  if (!data.sujet)                       e.sujet   = 'Choisissez un sujet'
  if (data.message.trim().length < 20)   e.message = 'Message trop court (20 caractères min.)'
  return e
}

const regions = [
  '', 'Centre (Ouagadougou)', 'Hauts-Bassins (Bobo-Dioulasso)',
  'Plateau Central', 'Nord', 'Est', 'Sahel', 'Boucle du Mouhoun',
  'Centre-Sud', 'Centre-Ouest', 'Centre-Est', 'Centre-Nord', 'Cascades', 'Sud-Ouest',
]

const sujets = [
  '', 'Inscrire ma coopérative', 'Inscrire mon entreprise / acheteur',
  'Mettre une offre en ligne', 'Partenariat', 'Signaler un problème', 'Autre demande',
]

export default function Contact() {
  const { showToast } = useAppStore()
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [form, setForm] = useState<FormData>({
    nom: '', tel: '', email: '', structure: '', region: '', sujet: '', message: '',
  })

  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    if (touched[k]) {
      const errs = validate({ ...form, [k]: e.target.value })
      setErrors((prev) => ({ ...prev, [k]: errs[k] ?? '' }))
    }
  }

  const blur = (k: keyof FormData) => () => {
    setTouched((t) => ({ ...t, [k]: true }))
    const errs = validate(form)
    setErrors((prev) => ({ ...prev, [k]: errs[k] ?? '' }))
  }

  const inputClass = (k: string) => clsx(
    'form-input',
    touched[k] && errors[k]  && 'border-red-400 focus:border-red-500',
    touched[k] && !errors[k] && form[k as keyof FormData] && 'border-green-500',
  )

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const allTouched = Object.fromEntries(Object.keys(form).map((k) => [k, true]))
    setTouched(allTouched)
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length) return

    setStatus('loading')
    await new Promise((r) => setTimeout(r, 1400))
    setStatus('success')
    showToast('Message envoyé avec succès !')
  }

  const Field = ({ name, label, required }: { name: keyof FormData; label: string; required?: boolean }) => (
    <div>
      <label className="form-label">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</label>
      <input
        type={name === 'email' ? 'email' : name === 'tel' ? 'tel' : 'text'}
        value={form[name]}
        onChange={set(name)}
        onBlur={blur(name)}
        className={inputClass(name)}
        placeholder={
          name === 'nom'       ? 'Votre nom complet' :
          name === 'tel'       ? '+226 70 00 00 00' :
          name === 'email'     ? 'vous@exemple.com' :
          name === 'structure' ? 'Coopérative ou entreprise' : ''
        }
      />
      {touched[name] && errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  )

  return (
    <>
      <div className="bg-gradient-to-br from-green-900 to-green-700 py-14">
        <div className="container">
          <span className="badge bg-white/20 text-white mb-3">Contact</span>
          <h1 className="text-4xl font-bold text-white mb-3">Nous contacter</h1>
          <p className="text-white/75 max-w-xl">
            Notre équipe vous répond dans les 24 heures. Ou appelez-nous directement sur WhatsApp.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Form */}
            <div className="lg:col-span-2">
              {status === 'success' ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 shadow-card">
                  <div className="text-6xl mb-4">🎉</div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Message envoyé !</h2>
                  <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                    Merci ! Notre équipe vous recontactera dans les 24 heures.
                  </p>
                  <button onClick={() => { setStatus('idle'); setForm({ nom:'',tel:'',email:'',structure:'',region:'',sujet:'',message:'' }); setTouched({}) }} className="btn-primary">
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate className="bg-white rounded-2xl border border-gray-200 shadow-card p-8 space-y-5">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Envoyer un message</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field name="nom" label="Nom complet" required />
                    <Field name="tel" label="Téléphone" required />
                  </div>
                  <Field name="email" label="Email" />
                  <Field name="structure" label="Structure / Entreprise" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Région <span className="text-red-500">*</span></label>
                      <select value={form.region} onChange={set('region')} onBlur={blur('region')} className={clsx('form-input', touched.region && errors.region && 'border-red-400', touched.region && !errors.region && form.region && 'border-green-500')}>
                        {regions.map((r) => <option key={r} value={r}>{r || '— Sélectionnez —'}</option>)}
                      </select>
                      {touched.region && errors.region && <p className="text-red-500 text-xs mt-1">{errors.region}</p>}
                    </div>
                    <div>
                      <label className="form-label">Sujet <span className="text-red-500">*</span></label>
                      <select value={form.sujet} onChange={set('sujet')} onBlur={blur('sujet')} className={clsx('form-input', touched.sujet && errors.sujet && 'border-red-400', touched.sujet && !errors.sujet && form.sujet && 'border-green-500')}>
                        {sujets.map((s) => <option key={s} value={s}>{s || '— Choisir un sujet —'}</option>)}
                      </select>
                      {touched.sujet && errors.sujet && <p className="text-red-500 text-xs mt-1">{errors.sujet}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Message <span className="text-red-500">*</span></label>
                    <textarea
                      value={form.message}
                      onChange={set('message')}
                      onBlur={blur('message')}
                      rows={5}
                      className={clsx('form-input resize-y min-h-[120px]', touched.message && errors.message && 'border-red-400', touched.message && !errors.message && form.message && 'border-green-500')}
                      placeholder="Décrivez votre demande : produit, volume, région, besoins…"
                    />
                    <div className="flex justify-between items-center mt-1">
                      {touched.message && errors.message ? <p className="text-red-500 text-xs">{errors.message}</p> : <span />}
                      <span className={clsx('text-xs', form.message.length > 450 ? 'text-red-500' : 'text-gray-400')}>
                        {form.message.length} / 500
                      </span>
                    </div>
                  </div>

                  <button type="submit" disabled={status === 'loading'} className="btn-primary w-full justify-center py-3">
                    {status === 'loading'
                      ? <><Loader size={16} className="animate-spin" /> Envoi en cours…</>
                      : <><MessageSquare size={16} /> Envoyer le message</>
                    }
                  </button>
                </form>
              )}
            </div>

            {/* Info sidebar */}
            <div className="space-y-5">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-6">
                <h3 className="font-bold text-gray-900 mb-5">Nos coordonnées</h3>
                <div className="space-y-4 text-sm">
                  {[
                    { Icon: MapPin,        text: 'Ouagadougou, Burkina Faso', sub: 'Siège social' },
                    { Icon: Phone,         text: '+226 70 00 00 00', sub: 'Lun–Sam 7h30–18h' },
                    { Icon: Mail,          text: 'contact@tondlink.bf', sub: 'Réponse sous 24h' },
                  ].map(({ Icon, text, sub }) => (
                    <div key={text} className="flex gap-3">
                      <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                        <Icon size={15} className="text-green-700" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">{text}</div>
                        <div className="text-gray-400 text-xs">{sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#E7F9ED] rounded-2xl p-6 border border-[#25D366]/20">
                <div className="flex gap-3 items-start">
                  <div className="text-3xl">💬</div>
                  <div>
                    <div className="font-bold text-gray-900 mb-1">WhatsApp disponible</div>
                    <p className="text-sm text-gray-600 mb-4">Réponse rapide entre 7h30 et 20h, 7 jours sur 7.</p>
                    <a
                      href="https://wa.me/22670000000?text=Bonjour%20Tondlink%2C%20je%20souhaite%20un%20renseignement."
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1fad57] transition-colors"
                    >
                      Ouvrir WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-6">
                <h4 className="font-bold text-gray-900 mb-3">Horaires</h4>
                <div className="space-y-2 text-sm">
                  {[['Lundi – Vendredi', '7h30 – 18h00', true],['Samedi', '8h00 – 14h00', true],['Dimanche', 'Fermé', false]].map(([day, time, open]) => (
                    <div key={String(day)} className="flex justify-between items-center">
                      <span className="text-gray-600">{String(day)}</span>
                      <span className={clsx('font-semibold text-xs', open ? 'text-green-700' : 'text-gray-400')}>{String(time)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
