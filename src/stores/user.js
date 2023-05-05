import { defineStore } from "pinia"
import { ref, computed } from 'vue'
import { getStorage, setStorage } from '@/utils/storage'
export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const isRejecter = () => {
    return getStorage('token') ?? false
  }
  const sigin = (data) => {
    user.value = data
    setStorage('token', data)
  }

  return { user, isRejecter, sigin }
})