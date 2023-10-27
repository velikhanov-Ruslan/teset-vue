import Api from "@/api";

export function getProducts() {
    return Api.get('https://jsonplaceholder.typicode.com/users').then(d => d.json())
}

export function getFilteredProducts(search='', sort='') {
    const sortBy = sort.split(' ')[0];
    const soryType = sort.split(' ')[1];
    return Api.get(`https://jsonplaceholder.typicode.com/users?q=${search}&_sort=${sortBy}&_order=${soryType}`).then(d => d.json())
}