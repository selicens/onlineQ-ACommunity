export const setStorage = (name, data) => {
    localStorage.setItem(name, JSON.stringify(data))
}
export const getStorage = (name) => {
    return localStorage.getItem(name) && JSON.parse(localStorage.getItem(name))
}
export const removeStorage = (name) => {
    localStorage.removeItem(name)
}
export const removeStorageAll = () => {
    localStorage.removeItem()
}