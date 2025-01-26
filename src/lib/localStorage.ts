export function setData(key: string, value: any){
    localStorage.setItem(key, JSON.stringify(value))
}

export function getData(key: string){
    const data = localStorage.getItem(key);
    if(data) return JSON.parse(data)
    return null
}

export function removeData(key: string){
    localStorage.removeItem(key);
}