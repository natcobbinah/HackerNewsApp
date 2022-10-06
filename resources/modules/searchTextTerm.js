import { defaultQuery } from '../js/constants.js';

const  getSearchTextTerm = (domInputElement) => {
    let searchTextTerm = "";
    if(domInputElement.value === ""){
        searchTextTerm = defaultQuery;
    }else{
        searchTextTerm = domInputElement.value;
    }
    return searchTextTerm;
}

export {getSearchTextTerm};