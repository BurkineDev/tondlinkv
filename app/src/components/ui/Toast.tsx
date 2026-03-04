import { CheckCircle } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { clsx } from 'clsx'

export default function Toast() {
  const { toast } = useAppStore()
  return (
    <div
      className={clsx(
        'fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3',
        'bg-gray-900 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium',
        'transition-all duration-300',
        toast.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      )}
    >
      <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
      {toast.message}
    </div>
  )
}
