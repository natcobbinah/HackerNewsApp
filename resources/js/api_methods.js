import {baseUrl} from './constants.js';

const fetchHackerNews_data = async (inputSearchValue, page = 0) => {
    console.log(`${inputSearchValue} and page= ${page}`);
    try{
    let response = await fetch(`${baseUrl}?query=${inputSearchValue}&page=${page}`);
    if(response.ok){
        let jsonResponse = await response.json();
        return jsonResponse;
    }
    }catch(error){
        console.log(error);
    }
}

export {fetchHackerNews_data};