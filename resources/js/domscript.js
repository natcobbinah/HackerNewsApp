import { fetchHackerNews_data } from './api_methods.js';
import { getSearchTextTerm } from '../modules/searchTextTerm.js';

let searchField = document.querySelector('input[type=search]');
let submitBtn = document.querySelector('input[type=submit]');
let searchIcon = document.querySelector('header #search-box ul .search-icon');
let searchFieldContainer = document.querySelector('header #search-box ul .search-container');
//let singleLineView = document.querySelector('#show-deletebtn ul .grid-lines');
//let tripleGridView = document.querySelector('#show-deletebtn ul .grid-boxes');
let mainContainer = document.querySelector('main');
let newsListGridContainer = document.querySelector('main #newsList');
//To create dynamic ul elements in main div
let newsListContainer = document.getElementById('newsList');
let checkBoxContainer = document.querySelector('main .checkBoxContainer');
let newsDeleteBtnContainer = document.querySelector('main .newsDeleteBtnContainer');
let selectAllBtn = document.querySelector('#show-deletebtn #selectAll');
let DeselectAllBtn = document.querySelector('#show-deletebtn #de-selectAll');
let deleteAllBtn = document.querySelector('#show-deletebtn #deleteAll');
//ulElements to set GIF image on
let ulGifElement = document.getElementById('newsList').getElementsByTagName('ul')


//filtering elements
let sortByElement = document.getElementById('filter-options');

//pagination text and btns
let numberOfPages = document.querySelector('#show-pagination p .nofPages');
let currentPage = document.querySelector('#show-pagination p .currentPage');
let currentNewsFeedTotal = document.querySelector('#show-pagination p .newsFeedCount')
let prevPageLoadBtn = document.querySelector("#show-pagination .pageLoadBtns #prevPageLoadBtn");
let nextPageLoadBtn = document.querySelector("#show-pagination .pageLoadBtns #nextPageLoadBtn");
//starting value for pagination
let page = 0;

//store apiData to be fetched
let newsArray = [];

//Since on nextPage Press, new data is fetched into the array
//we use this index in the loop depending on the value of fetchedDataArrayIndex
//see the fxn below, to see how data is handled
let fetchedDataArrayIndex = 0;

//variable passed to api to sortNews fetched
let tags = "";

//on tripleGridView icon pressed //would be used later for different logic scenario
/* tripleGridView.addEventListener('click', () => {
    singleLineView.style.backgroundColor = "#fff";
    tripleGridView.style.backgroundColor = 'red';

    //change mainContainer layout to gridLayout
});

//on singleLineView icon pressed
singleLineView.addEventListener('click', () => {
    tripleGridView.style.backgroundColor = "#fff";
    singleLineView.style.backgroundColor = "red";

    //change mainContainer layout to singleViewLayout
   
}); */


//from apiendpoints
const getNewsToDisplay = async (page) => {
    let retrievedNewsData = await fetchHackerNews_data(getSearchTextTerm(searchField), page)
    return retrievedNewsData;
}

newsArray.push(await getNewsToDisplay(page));
console.log(newsArray);

//fxn to clearLoading gif for News
function clearloadingGIF(){
    for(let i = 0; i < ulGifElement.length - 1; i++){
        ulGifElement[i].style.backgroundImage = "url()";
    }
} 

//fxn to setLoading gif for News
function setloadingGIF(){
    for(let i = 0; i < ulGifElement.length - 1; i++){
        ulGifElement[i].style.backgroundImage = "url('../images/loading.gif')";
    }
} 

//UI rendering related logics
function renderUI(fetchedDataArrayIndex) {
    console.log("fetchedArrayIndex = " + fetchedDataArrayIndex);

    newsArray[fetchedDataArrayIndex].hits.map((newsInfo, index) => {

        //create checkbox element for all newsObj
        //let inputCheckBox = document.createElement('input'); would be used later for different logic scenarios
        //inputCheckBox.setAttribute('type', 'checkbox');
        //inputCheckBox.setAttribute('name', `${"checkbox" + index}`)

        //initialize ul for each complete Object
        /* let ul = document.createElement('ul');
        ul.setAttribute('id', `${"newsObj" + index}`);  not used anymore as
        ul elements are made in html, and have li contents rather inserted*/
        let ul = document.getElementById(`${"newsObj" + index}`);

        //clear background gifImage
        clearloadingGIF();

        const title = document.createElement('li');
        title.innerHTML = `${newsInfo.title}`;

        const url = document.createElement('li');
        url.innerHTML = `<a href=${newsInfo.url} target="_blank">Read news</a>`;

        const author = document.createElement('li');
        author.innerHTML = `Author : ${newsInfo.author}`;

        const date = document.createElement('li');
        date.innerHTML = `CreatedDate : ${newsInfo.created_at}`;

        const points = document.createElement('li');
        points.innerHTML = `Points : ${newsInfo.points}`;

        const num_of_comments = document.createElement('li');
        num_of_comments.innerHTML = `Comments : ${newsInfo.num_comments}`;

        //ul.append(inputCheckBox); would be used later, for different logic scenarios
        const valuesToAppendToUl = [title, url, author, date, points, num_of_comments];
        valuesToAppendToUl.forEach(element => {
            element.style.padding = "0.3rem";
            ul.append(element);
        })

        //setting ul attributes
        ul.style.border = "1px solid black";
        ul.style.listStyle = "none";
        ul.style.padding = "1rem";
        ul.style.margin = "2rem";

        newsListContainer.appendChild(ul);
        mainContainer.appendChild(newsListContainer);

        //return ul elements so as to target checkboxes and 
        //perform operations on the data
        //return ul;
    });
}

renderUI(fetchedDataArrayIndex);

/* //on selectAllBtn Clicked  //would be used later for different logic scenario
selectAllBtn.addEventListener('click', () => {
    dynamicUlElements.forEach(ulElement => {
        let checkBoxElement = ulElement.querySelector('ul input[type=checkbox]');
        checkBoxElement.checked = true;

        //set deleteAll btn to visible
        deleteAll.style.display = "block";
    })
});

//on De-selectAllBtn Clicked //would be used later for different logic scenario
DeselectAllBtn.addEventListener('click', () => {
    dynamicUlElements.forEach(ulElement => {
        let checkBoxElement = ulElement.querySelector('ul input[type=checkbox]');
        checkBoxElement.checked = false;

        //set deleteAll btn to visible
        deleteAll.style.display = "none";
    })
}); */

//on-deleteAll btn clicked //would be used later for different logic scenario
/* deleteAllBtn.addEventListener('click', () => {

}); */


//on searchBtn click, run new functionCall
submitBtn.addEventListener('click', async () => {
    //In searching for a new newsFeed,
    //first clear the contents of the array
    newsArray = [];

    //clear all [li elements in ul]
    clearUlListContent();

    //reset pagination pageValue, when a new search is made
    paginationData.resetPageValue();

    //reset fetchedArrayIndexValue, when a new search is made
    paginationData.resetFetchedArrayIndexValue();

    //reset currentPage innerHTML value
    paginationData.resetCurrentPageInnerHTMLValue();

    let retrievedNewsData = await fetchHackerNews_data(getSearchTextTerm(searchField), page)
    console.log(retrievedNewsData);
    newsArray.push(await retrievedNewsData);
    renderUI(fetchedDataArrayIndex);
});


//pagination related logics 
let paginationData = {
    currentPage: currentPage,
    numberOfPages: numberOfPages,
    page: page,
    fetchedDataArrayIndex: fetchedDataArrayIndex,
    currentNewsFeedTotal: currentNewsFeedTotal,
    incrementPageValue() {
        //current pageSize is 50 from apiEndpoints, and hence
        //restricted to that range
        if (this.page <= 49) {
            this.page++;
        }
    },
    decrementPageValue() {
        //page number to be fetched cannot be negative
        if (this.page !== 0) {
            this.page--;
        }
    },
    incrementFetchedDataArrayIndexValue() {
        //currentPage size retrieved is 50 and hence would not increase after that range
        if (this.fetchedDataArrayIndex <= 49) {
            this.fetchedDataArrayIndex++;
        }
    },
    decrementFetchedDataArrayIndexValue() {
        //fetched pageValue cannot be less than 0
        if (this.fetchedDataArrayIndex !== 0) {
            this.fetchedDataArrayIndex--;
        }
    },
    getNumberOfPagesInRetrievedData() {
        this.numberOfPages.innerHTML = newsArray[fetchedDataArrayIndex].nbPages;
        this.numberOfPages.style.marginLeft = "10px";
    },
    setCurrentPage() {
        this.currentPage.innerHTML = this.page;
        this.currentPage.style.marginLeft = "10px";
    },
    setCurrentNewsFeedTotal() {
        this.currentNewsFeedTotal.innerHTML = newsArray[fetchedDataArrayIndex].hitsPerPage;
    },
    resetPageValue() {
        this.page = 0;
    },
    resetFetchedArrayIndexValue() {
        this.fetchedDataArrayIndex = 0;
    },
    resetCurrentPageInnerHTMLValue() {
        this.currentPage.innerHTML = this.page;
    }
}

//set the total number of newsFeed currently displayed on screen
paginationData.setCurrentNewsFeedTotal();

//set number of pages in retrieved Data
paginationData.getNumberOfPagesInRetrievedData();

//set currentPage Number
paginationData.setCurrentPage();

//nextPageLoad btn pressed
nextPageLoadBtn.addEventListener('click', async () => {
    //call obj Fxn to Increase pageValue
    paginationData.incrementPageValue();
    console.log("new page = " + paginationData.page);

    //set the currentpage Number
    paginationData.setCurrentPage();

    //on nextBtn pressed we fetch a new data into the array
    //of which we would need to display in the browser, and hence
    //this sets the arrayIndex to loop through to populate our data
    paginationData.incrementFetchedDataArrayIndexValue();

    //clear all [li elements in ul]
    clearUlListContent();

    //pass the new PageNumber to the async method to fetch data with the newPageValue
    newsArray.push(await getNewsToDisplay(paginationData.page));
    console.log(newsArray);

    renderUI(paginationData.fetchedDataArrayIndex);
});

//called to clear existing ul li (content)
// so as to get new data to be fetched and inserted
const clearUlListContent = () => {
    for (let index = 0; index <= 19; index++) {
        let ul = document.getElementById(`${"newsObj" + index}`);
        ul.innerHTML = "";
    }
}

//prevPageLoad btn pressed
prevPageLoadBtn.addEventListener('click', async () => {
    //call obj Fxn to decrease pageValue
    paginationData.decrementPageValue();
    console.log("new page = " + paginationData.page);

    //set the currentpage Number
    paginationData.setCurrentPage();

    //on nextBtn pressed we fetch a new data into the array
    //of which we would need to display in the browser, and hence
    //this sets the arrayIndex to loop through to populate our data
    paginationData.decrementFetchedDataArrayIndexValue();

    //clear all [li elements in ul]
    clearUlListContent();

    //pass the new PageNumber to the async method to fetch data with the newPageValue
    newsArray.push(await getNewsToDisplay(paginationData.page));
    console.log(newsArray);

    renderUI(paginationData.fetchedDataArrayIndex);
});

//selectElement selected to filter fetchedNews
sortByElement.addEventListener('change', async (event) => {
    console.log("&tag=" + event.target.value);
    //In searching for a new newsFeed,
    //first clear the contents of the array
    newsArray = [];

    //clear all [li elements in ul]
    clearUlListContent();

    //reset pagination pageValue, when a new search is made
    paginationData.resetPageValue();

    //reset fetchedArrayIndexValue, when a new search is made
    paginationData.resetFetchedArrayIndexValue();

    //reset currentPage innerHTML value
    paginationData.resetCurrentPageInnerHTMLValue();

    let retrievedNewsData = await fetchHackerNews_data(getSearchTextTerm(searchField), page, event.target.value)
    console.log(retrievedNewsData);
    newsArray.push(await retrievedNewsData);
    renderUI(fetchedDataArrayIndex);
});



