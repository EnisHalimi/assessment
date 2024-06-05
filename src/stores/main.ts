import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IClient, ISite } from '@/utils/types'
import { api } from '@/main'

export const useMainStore = defineStore('main', () => {
  const sites = ref<ISite[]>([])
  const clients = ref<IClient[]>([])
  async function fetchSites() {
    try {
      const response: { data: ISite[] } = await api.get('/sites')
      if (response.data) {
        sites.value = response.data
      }
    } catch (error) {
      console.error('Error', error)
    }
  }
  async function fetchClients() {
    try {
      const response: { data: IClient[] } = await api.get('/clients')
      if (response.data) {
        clients.value = response.data
      }
    } catch (error) {
      console.error('Error', error)
    }
  }
  async function fetchFilteredSites(term: string) {
    try {
      const response: { data: ISite[] } = await api.get(`/sites?q=${term}`)
      if (response.data) {
        sites.value = response.data
      }
    } catch (error) {
      console.error('Error', error)
    }
  }
  async function fetchSingleSite(id: string) {
    try {
      const response: { data: ISite[] } = await api.get(`/sites?id=${id}`)
      if (response.data) {
        return response.data.pop()
      }
    } catch (error) {
      console.error('Error', error)
    }
  }
  return { sites, clients, fetchSites, fetchClients, fetchFilteredSites, fetchSingleSite }
})
