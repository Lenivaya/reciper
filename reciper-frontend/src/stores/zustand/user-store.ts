import { createSelectorFunctions } from 'auto-zustand-selectors-hook'
import { create } from 'zustand'
import { mutative } from 'zustand-mutative'

export type UserStore = {
  isAuthenticated: boolean
  applyFnOnState: (fn: (draft: UserStore) => void) => void
  logout: () => void
  login: (token: string) => void
}

export const appUserStore = create<UserStore>()(
  mutative<UserStore>((set) => ({
    isAuthenticated: false,

    applyFnOnState: (fn) => set((state) => fn(state)),
    logout: () => set({ isAuthenticated: false }),
    login: () => set({ isAuthenticated: true })
  }))
)

export const useAppUserStore = createSelectorFunctions(appUserStore)
