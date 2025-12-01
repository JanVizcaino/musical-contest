import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const STORAGE_KEY = 'quizLogs'

function loadLogs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (e) {
    console.warn('Error parseando quizLogs desde localStorage, reseteando a []:', e)
    return []
  }
}

export const useRankingStore = defineStore('ranking', () => {
  const logs = ref(loadLogs())

  function addEntry(entry) {
    logs.value.push(entry)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs.value))
  }

  function clearAll() {
    logs.value = []
    localStorage.removeItem(STORAGE_KEY)
  }

  const topPlayers = computed(() =>
    [...(Array.isArray(logs.value) ? logs.value : [])]
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score
        
        const timeA = a.timeSeconds || 999999
        const timeB = b.timeSeconds || 999999
        if (timeA !== timeB) return timeA - timeB
        
        return new Date(b.date) - new Date(a.date)
      })
      .slice(0, 10)
  )

  return { logs, topPlayers, addEntry, clearAll }
})