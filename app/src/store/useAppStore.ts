/**
 * Zustand store — 100% reusable in React Native (no DOM deps)
 */
import { create } from 'zustand'
import type { FilterState } from '../types'

interface AppStore {
  // Navbar
  mobileNavOpen: boolean
  setMobileNavOpen: (v: boolean) => void

  // Cooperative filter
  coopFilter: FilterState
  setCoopFilter: (f: Partial<FilterState>) => void
  resetCoopFilter: () => void

  // Market filter
  marketFilter: FilterState
  setMarketFilter: (f: Partial<FilterState>) => void
  resetMarketFilter: () => void

  // Buyer filter
  buyerFilter: FilterState
  setBuyerFilter: (f: Partial<FilterState>) => void
  resetBuyerFilter: () => void

  // Toast
  toast: { message: string; visible: boolean }
  showToast: (msg: string) => void
}

const defaultFilter: FilterState = {
  search: '',
  category: '',
  region: '',
  sortBy: 'default',
}

export const useAppStore = create<AppStore>((set) => ({
  mobileNavOpen: false,
  setMobileNavOpen: (v) => set({ mobileNavOpen: v }),

  coopFilter: { ...defaultFilter },
  setCoopFilter: (f) => set((s) => ({ coopFilter: { ...s.coopFilter, ...f } })),
  resetCoopFilter: () => set({ coopFilter: { ...defaultFilter } }),

  marketFilter: { ...defaultFilter },
  setMarketFilter: (f) => set((s) => ({ marketFilter: { ...s.marketFilter, ...f } })),
  resetMarketFilter: () => set({ marketFilter: { ...defaultFilter } }),

  buyerFilter: { ...defaultFilter },
  setBuyerFilter: (f) => set((s) => ({ buyerFilter: { ...s.buyerFilter, ...f } })),
  resetBuyerFilter: () => set({ buyerFilter: { ...defaultFilter } }),

  toast: { message: '', visible: false },
  showToast: (msg) => {
    set({ toast: { message: msg, visible: true } })
    setTimeout(() => set({ toast: { message: '', visible: false } }), 3000)
  },
}))
