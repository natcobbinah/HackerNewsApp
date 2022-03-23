import { fetchHackerNews_data } from './api_methods.js';
import { getSearchTextTerm } from '../modules/searchTextTerm.js';
import data from './staticData.js';

let searchField = document.querySelector('input[type=search]');
let submitBtn = document.querySelector('input[type=submit]');
let searchIcon = document.querySelector('header #search-box ul .search-icon');
let searchFieldContainer = document.querySelector('header #search-box ul .search-container');
let singleLineView = document.querySelector('header nav .toggle-layout-buttons .grid-lines');
let tripleGridView = document.querySelector('header nav .toggle-layout-buttons .grid-boxes');
let mainContainer = document.querySelector('main');
//To create dynamic ul elements in main div
let newsListContainer = document.querySelector('main #newsList');
let checkBoxContainer = document.querySelector('main .checkBoxContainer');
let newsDeleteBtnContainer = document.querySelector('main .newsDeleteBtnContainer');
let selectAllBtn = document.querySelector('#show-deletebtn #selectAll');
let DeselectAllBtn = document.querySelector('#show-deletebtn #de-selectAll');
let deleteAllBtn = document.querySelector('#show-deletebtn #deleteAll');

//searchIcon on click show searchField
searchIcon.addEventListener('click', () => {
   if(searchFieldContainer.style.display === "none"){
    searchFieldContainer.style.display = "block";
   }else{
    searchFieldContainer.style.display = "none";
   }
});

//on tripleGridView icon pressed
tripleGridView.addEventListener('click', () => {
    singleLineView.style.backgroundColor = "#353535";
    tripleGridView.style.backgroundColor = 'red';

    //change mainContainer layout to gridLayout
    mainContainer.style.gridTemplateAreas = "left center right";
    newsListContainer.style.gridArea = "left";
});

//on singleLineView icon pressed
singleLineView.addEventListener('click', () => {
    tripleGridView.style.backgroundColor = "#353535";
    singleLineView.style.backgroundColor = "red";

    //change mainContainer layout to singleViewLayout
    mainContainer.style.gridColumn = "1 / span 12";
});


//from apiendpoints
/* async function defaultNewsToDisplay() {
    let retrievedNewsData = await fetchHackerNews_data(getSearchTextTerm(searchField));
    return retrievedNewsData;
} 

let newsArray = await defaultNewsToDisplay();
console.log(newsArray);
*/

//static data here
let newsArray = data;

const dynamicUlElements = newsArray.hits.map((newsInfo, index) => {

    //create checkbox element for all newsObj
    let inputCheckBox = document.createElement('input');
    inputCheckBox.setAttribute('type','checkbox');
    inputCheckBox.setAttribute('name',`${"checkbox" + index}`)

    //initialize ul for each complete Object
    let ul = document.createElement('ul');
    ul.setAttribute('id', `${"newsObj" + index}`);

    const title = document.createElement('li');
    title.innerHTML = `${newsInfo.title}`;
    title.style.padding = "0.3rem";

    const url = document.createElement('li');
    url.innerHTML = `<a href=${newsInfo.url} target="_blank">${newsInfo.url}</a>`;
    url.style.padding = "0.3rem";

    const author = document.createElement('li');
    author.innerHTML = `Author : ${newsInfo.author}`;
    author.style.padding = "0.3rem";

    const date = document.createElement('li');
    date.innerHTML = `CreatedDate : ${newsInfo.created_at}`;
    date.style.padding = "0.3rem";

    const points = document.createElement('li');
    points.innerHTML = `Points : ${newsInfo.points}`;
    points.style.padding = "0.3rem";

    const num_of_comments = document.createElement('li');
    num_of_comments.innerHTML = `Comments : ${newsInfo.num_comments}`;
    num_of_comments.style.padding = "0.3rem";


    ul.append(inputCheckBox);
    const valuesToAppendToUl = [title, url, author, date, points, num_of_comments];
    valuesToAppendToUl.forEach(element => {
        ul.append(element);
    })

    //setting ul attributes
    ul.style.display = "grid";
    ul.style.border = "1px solid black";
    ul.style.listStyle = "none";
    ul.style.padding = "1rem";
    ul.style.margin = "2rem";

    newsListContainer.appendChild(ul);
    mainContainer.appendChild(newsListContainer);

    //return ul elements so as to target checkboxes and 
    //perform operations on the data
    return ul;
});

//on selectAllBtn Clicked
selectAllBtn.addEventListener('click', () => {
    dynamicUlElements.forEach(ulElement => {
        let checkBoxElement = ulElement.querySelector('ul input[type=checkbox]');
        checkBoxElement.checked = true;

        //set deleteAll btn to visible
        deleteAll.style.display = "block";
    })
});

//on De-selectAllBtn Clicked
DeselectAllBtn.addEventListener('click', () => {
    dynamicUlElements.forEach(ulElement => {
        let checkBoxElement = ulElement.querySelector('ul input[type=checkbox]');
        checkBoxElement.checked = false;

        //set deleteAll btn to visible
        deleteAll.style.display = "none";
    })
});


//on pageLoad function runs once with default value population
//defaultNewsToDisplay();

//on searchBtn click, run new functionCall
submitBtn.addEventListener('click', () => {
    //defaultNewsToDisplay();
});

