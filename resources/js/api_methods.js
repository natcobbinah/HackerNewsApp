import { baseUrl, itemsUrl, usersUrl, searchUrl, searchByDateUrl } from './constants.js';

/* const fetchHackerNews_data = async (inputSearchValue, page = 0, tags = "") => {
    console.log(`${inputSearchValue} and page= ${page} and tags = ${tags}`);
    try {
        let response = await fetch(`${baseUrl}?query=${inputSearchValue}&page=${page}&tags=${tags}`);
        if (response.ok) {
            let jsonResponse = await response.json();
            return jsonResponse;
        }
    } catch (error) {
        console.log(error);
    }
}

export { fetchHackerNews_data };  */
const fetchClient = (url) => (resource) => (method) => {
    return fetch(`${url}/${resource}`, {
        method: method,
    })
}

const apiUrl = fetchClient(baseUrl);
const httpGet = 'get';

const getItem = (id) => {
    const getItemsByIdResource = apiUrl(`${itemsUrl}/${id}`);
    return getItemsByIdResource(httpGet).then((res) => res.json());
}

const getUser = (username) => {
    const getUserStatsResource = apiUrl(`${usersUrl}/${username}`);
    return getUserStatsResource(httpGet).then((res) => res.json());
}


const searchNews = (query) => (tags = []) => (numericFilters) => (page) => {
    let getNews = "";
    if (query && tags && numericFilters && page) {
        getNews = apiUrl(`${searchUrl}?query=${query}&tags=${(tagsFilter(tags))}&numericFilters=${numericFilters}&page=${page}`);
        return getNews(httpGet).then((res) => res.json());
    } 
    
    if (query && tags && page) {
        getNews = apiUrl(`${searchUrl}?query=${query}&tags=${(tagsFilter(tags))}&page=${page}`);
        return getNews(httpGet).then((res) => res.json());
    } 
    
    if (query && page && numericFilters) {
        getNews = apiUrl(`${searchUrl}?query=${query}&numericFilters=${numericFilters}&page=${page}`);
        return getNews(httpGet).then((res) => res.json());
    } 
    
    if (query && page) {
        getNews = apiUrl(`${searchUrl}?query=${query}&page=${page}`);
        return getNews(httpGet).then((res) => res.json());
    } 
      
    return   apiUrl(`${searchUrl}?query=${query}`)(httpGet).then((res) => res.json());
}

const searchNewsByDate = (query) => (tags) => (numericFilters) => (page) => {
    let getNewsByDate = apiUrl(searchByDateUrl);
    if (query && tags && numericFilters && page) {
        getNewsByDate = apiUrl(`${searchByDateUrl}?query=${query}&tags=${(tagsFilter(tags))}&numericFilters=${numericFilters}&page=${page}`);
    } else if (query && tags && page) {
        getNewsByDate = apiUrl(`${searchByDateUrl}?query=${query}&tags=${(tagsFilter(tags))}&page=${page}`);
    } else if (query && page && numericFilters) {
        getNewsByDate = apiUrl(`${searchByDateUrl}?query=${query}&numericFilters=${numericFilters}&page=${page}`);
    } else if (query && page) {
        getNewsByDate = apiUrl(`${searchByDateUrl}?query=${query}&page=${page}`);
    } else {
        getNewsByDate = apiUrl(`${searchByDateUrl}?query=${query}`);
    }
    return getNewsByDate(httpGet).then((res) => res.json());
}

//multiple-Selected-Tags
const tagsFilter = (tags) => {
    return tags.join(","); //flats out selected tags to string from Array container and AND-ded by default
}

export { getItem, getUser, searchNews, searchNewsByDate }; 