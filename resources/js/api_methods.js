import {baseUrl} from './constants.js';

const fetchHackerNews_data = async (inputSearchValue) => {
    //console.log(inputSearchValue);
    try{
    let response = await fetch(`${baseUrl}?query=${inputSearchValue}`);
    if(response.ok){
        let jsonResponse = await response.json();
        return jsonResponse;
    }
    }catch(error){
        console.log(error);
    }
}

export {fetchHackerNews_data};