import { create } from "zustand"

interface Notebook {
  id: string
  title: string
  content: string
  createdAt: string
}

interface NotebookState {
  notebook: Notebook | null
  setNotebook: (notebook: Notebook) => void
  clearNotebook: () => void
  fetchNotebook: (id: string) => Promise<void>
}

const useNotebookStore = create<NotebookState>((set) => ({
  notebook: null,
  setNotebook: (notebook) => set({ notebook }),
  clearNotebook: () => set({ notebook: null }),

  fetchNotebook: async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/notebook/${id}`)
      const data = await response.json()
      set({ notebook: data })
    } catch (error) {
      console.error("Failed to fetch notebook", error)
    }
  },
}))

export default useNotebookStore
