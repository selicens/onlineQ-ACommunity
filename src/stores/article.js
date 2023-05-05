import { defineStore } from "pinia"
import { reactive, computed } from 'vue'
import { getStorage, setStorage } from '@/utils/storage'

export const useArticleStore = defineStore('article', () => {
    const articles = reactive([])
    const setArticle = (id, data) => {
        const atc = getArticle(id)
        if (atc) {
            atc = data
        } else {
            articles.push(data)
            console.log(articles);
            setStorage('article', articles)
        }
    }
    const getArticle = (id) => {
        const atc = getAllArticle() ?? false
        if (atc) {
            return atc.filter(item => item.id === id)
        }
    }
    const getAllArticle = () => {
        return getStorage('article')
    }
    return {
        articles,
        setArticle,
        getArticle,
        getAllArticle,
    }
})