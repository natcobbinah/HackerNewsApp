import {baseUrl} from './constants.js';

const fetchHackerNews_data = async (inputSearchValue, page = 0, tags = "") => {
    console.log(`${inputSearchValue} and page= ${page} and tags = ${tags}`);
    try{
    let response = null;
    if(tags === 'front_page'){
        response = await fetch(`${baseUrl}?tags=${tags}`);
    }else{
        response = await fetch(`${baseUrl}?query=${inputSearchValue}&page=${page}&tags=${tags}`);
    }
    if(response.ok){""
        let jsonResponse = await response.json();
        return jsonResponse;
    }
    }catch(error){
        console.log(error);
    }
}

export {fetchHackerNews_data};