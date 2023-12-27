//import { fetchHackerNews_data } from './api_methods.js';
//import { getSearchTextTerm } from '../modules/searchTextTerm.js';
import css from '../css/styles.css';
import html from '../../index.html'

import { getItem, getUser, searchNews, searchNewsByDate } from './api_methods';
import { defaultQuery } from './constants.js';

let searchField = document.querySelector('input[type=search]');
let submitBtn = document.querySelector('input[type=submit]');

let mainContainer = document.querySelector('main');

//To create dynamic ul elements in main div
let newsListContainer = document.getElementById('newsList');

//ulElements to set GIF image on
let ulGifElement = document.getElementById('newsList').getElementsByTagName('ul');

//filtering elements
let sortByElement = document.getElementById('filter-options');

//pagination text and btns
let numberOfPages = document.querySelector('#show-pagination p .nofPages');
let currentPage = document.querySelector('#show-pagination p .currentPage');
let currentNewsFeedTotal = document.querySelector('#show-pagination p .newsFeedCount')
let prevPageLoadBtn = document.querySelector("#show-pagination .pageLoadBtns #prevPageLoadBtn");
let nextPageLoadBtn = document.querySelector("#show-pagination .pageLoadBtns #nextPageLoadBtn");

//on Tags select dialog
const tagsDialogButton = document.querySelector("#sortBy p .tag-options");
const cancelButton = document.querySelector("#tagsDialog #cancel");
const dialog = document.getElementById("tagsDialog");
const selectedTagEls = document.querySelector("#tagsDialog select");
const tagValuesConfirmBtn = document.querySelector("#tagsDialog div #confirmTagsSelected");

//on numericFilter select dialog
const numericFilterDialogButton = document.querySelector("#sortBy p .numericfilter-options");
const numericFiltercancelButton = document.querySelector("#numericFilterDialog #cancel");
const numericFilterdialog = document.getElementById("numericFilterDialog");
const numericFilterPointsGt = document.querySelector("#numericFilterDialog p #pointsGt");
const numericFilterPointsLt = document.querySelector("#numericFilterDialog p #pointsLt");
const numericFilterCreatedAtDate = document.querySelector("#numericFilterDialog  #createdAt");
const numericFilterConfirmBtn = document.querySelector("#numericFilterDialog div #confirmNumericFilter");

let page = 0;

// tagsDialogButton button opens a modal dialog-------------------
tagsDialogButton.addEventListener("click", () => {
    dialog.showModal();
});

// Form cancel button closes the dialog box
cancelButton.addEventListener("click", () => {
    dialog.close();
});

tagValuesConfirmBtn.addEventListener("click", () => {
    [...selectedTagEls.options].filter(option => option.selected)
        .map(option => console.log(option.value))

    //call newsFxn handler
    fetchNewsHandler(paginationData);

    //selectedTagEls
    //reset pagination pageValue, when a new search is made
    paginationData.resetPageValue();

    //reset currentPage innerHTML value
    paginationData.resetCurrentPageInnerHTMLValue();
})
//----------end of tags dialog functionality ---------------------

// numericFilterDialogButton button opens a modal dialog-------------------
numericFilterDialogButton.addEventListener("click", () => {
    numericFilterdialog.showModal();
});

// Form cancel button closes the dialog box
numericFiltercancelButton.addEventListener("click", () => {
    numericFilterdialog.close();
});

numericFilterConfirmBtn.addEventListener("click", () => {
    console.log(numericFilterPointsGt.value);
    console.log(numericFilterPointsLt.value);
    console.log(numericFilterCreatedAtDate.value);

    //call newsFxn handler
    fetchNewsHandler(paginationData);

    //selectedTagEls
    //reset pagination pageValue, when a new search is made
    paginationData.resetPageValue();

    //reset currentPage innerHTML value
    paginationData.resetCurrentPageInnerHTMLValue();
})

//----------end of tags dialog functionality ---------------------


//fxn to clearLoading gif for News
function clearloadingGIF() {
    for (let i = 0; i < ulGifElement.length - 1; i++) {
        ulGifElement[i].style.backgroundImage = "url()";
    }
}

const fetchNewsHandler = (paginationData) => {
    console.log("page = " + paginationData.page)

    if (Number(searchField.value)) {
        console.log("call getItem fxn")
        getItem(searchField.value)
            .then((data) => renderUI_fetchByID(data))
            .catch((error) => console.log(error));

    } else if ((numericFilterPointsGt.value > 0 ||
        numericFilterPointsLt.value > 0) && numericFilterCreatedAtDate.value != "" && (selectedTagEls.options)) {
        console.log("call searchNewsByDate fxn")

        let tagsAppliedToSearchByDate = [].push(selectedTagEls.options);
        searchNewsByDate()(tagsAppliedToSearchByDate)(numericFilterCreatedAtDate.value)(paginationData.page)
            .then((data) => renderUI(data))
            .catch((error) => console.log(error));

    } else if (typeof searchField.value === 'string' && (numericFilterPointsGt.value > 0 ||
        numericFilterPointsLt.value > 0) && (selectedTagEls.options)) {
        console.log("call searchNews fxn")

        let tagsApplied = [].push(selectedTagEls.options);
        let numericFilters = numericFilterPointsGt ? `points > ${numericFilterPointsGt}` : `points < ${numericFilterPointsLt}`;
        searchNews(searchField.value)(tagsApplied)(numericFilters)(paginationData.page)
            .then(data => renderUI(data))
            .catch((error) => console.log(error));

    } else if (typeof searchField.value === 'string') {
        console.log("call searchNews fxn only String")
        searchNews(searchField.value)()()(paginationData.page)
            .then(data => renderUI(data))
            .catch((error) => console.log(error));

    } else {
        console.log("call searchNews fxn last else")
        searchNews(searchField.value)()()(paginationData.page)
            .then(data => renderUI(data))
            .catch((error) => console.log(error));
    }
}

//empty display boxes
const hideDisplayDivs = () => {
    for (let i = 1; i <= 19; i++) {
        let ul = document.getElementById(`${"newsObj" + i}`);
        ul.style.display = "none";
    }
}

const showDisplayDivs = () => {
    for (let i = 0; i <= 19; i++) {
        let ul = document.getElementById(`${"newsObj" + i}`);
        ul.style.display = "block";
    }
}

//UI rendering related logics
const renderUI_fetchByID = (data) => {
    console.log(data)

    hideDisplayDivs();

    let ul = document.getElementById("newsObj0");
    //clear existing ul data
    ul.innerHTML = '';

    //clear background gifImage
    clearloadingGIF();

    const newsId = document.createElement('li');
    newsId.innerHTML = `ID:  ${data.newsId}`;

    const title = document.createElement('li');
    title.innerHTML = `Title: ${data.title ? data.title : "Comment"}`;

    const author = document.createElement('li');
    author.innerHTML = `Author: ${data.author}`;

    const searchUrl = document.createElement('li');
    searchUrl.innerHTML = `Link: <a href=${data.url} target="_blank">Read news</a>`;

    const newsText = document.createElement('li');
    data.type == "comment" ?
        newsText.innerHTML = `${data.text}`
        :
        "";

    const createdAt = document.createElement('li');
    createdAt.innerHTML = `Created At: ${data.created_at}`;

    //setting ul attributes
    ul.style.border = "1px solid black";
    ul.style.listStyle = "none";
    ul.style.padding = "1rem";
    ul.style.margin = "7rem";

    const valuesToAppendToUl = [title, newsId, author, searchUrl, newsText, createdAt];
    valuesToAppendToUl.forEach(element => {
        element.style.padding = "0.3rem";
        ul.append(element);
    })

    newsListContainer.appendChild(ul);
    mainContainer.appendChild(newsListContainer);
}

const renderUI = (data) => {
    console.log(data)

    //access pagination Information in fetched data
    paginationData.getNumberOfPagesInRetrievedData(data);
    paginationData.setCurrentNewsFeedTotal(data)

    showDisplayDivs();

    data.hits.map((newsInfo, index) => {

        let ul = document.getElementById(`${"newsObj" + index}`);
        //clear existing ul data
        ul.innerHTML = '';

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
    });
}


//pagination related logics 
let paginationData = {
    currentPage,
    numberOfPages,
    page: page,
    currentNewsFeedTotal,
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
    getNumberOfPagesInRetrievedData(data) {
        this.numberOfPages.innerHTML = data.nbPages;
        this.numberOfPages.style.marginLeft = "10px";
    },
    setCurrentPage() {
        this.currentPage.innerHTML = this.page;
        this.currentPage.style.marginLeft = "10px";
    },
    setCurrentNewsFeedTotal(data) {
        this.currentNewsFeedTotal.innerHTML = data.hitsPerPage;
    },
    resetPageValue() {
        this.page = 0;
    },
    resetCurrentPageInnerHTMLValue() {
        this.currentPage.innerHTML = this.page;
    }
}

//default query on page load first time
searchNews(defaultQuery)()()(paginationData.page)
    .then(data => renderUI(data))
    .catch((error) => console.log(error));

//on enterKey pressed in searchField
searchField.addEventListener('keydown', (e) => {
    if (e.key == "Enter") {
        //call newsFxn handler
        fetchNewsHandler(paginationData);

        //selectedTagEls
        //reset pagination pageValue, when a new search is made
        paginationData.resetPageValue();

        //reset currentPage innerHTML value
        paginationData.resetCurrentPageInnerHTMLValue();
    }
})

//on searchBtn click, run new functionCall
submitBtn.addEventListener('click', () => {
    //call newsFxn handler
    fetchNewsHandler(paginationData);

    //selectedTagEls
    //reset pagination pageValue, when a new search is made
    paginationData.resetPageValue();

    //reset currentPage innerHTML value
    paginationData.resetCurrentPageInnerHTMLValue();
});


//nextPageLoad btn pressed
nextPageLoadBtn.addEventListener('click', () => {
    //call obj Fxn to Increase pageValue
    paginationData.incrementPageValue();
    console.log("new page = " + paginationData.page);

    //set the currentpage Number
    paginationData.setCurrentPage();

    //call newsFxn handler
    fetchNewsHandler(paginationData);

    //clear all [li elements in ul]
    //clearUlListContent();
});

//prevPageLoad btn pressed
prevPageLoadBtn.addEventListener('click', () => {
    //call obj Fxn to decrease pageValue
    paginationData.decrementPageValue();
    console.log("new page = " + paginationData.page);

    //set the currentpage Number
    paginationData.setCurrentPage();

    //call newsFxn handler
    fetchNewsHandler(paginationData);

    //clear all [li elements in ul]
    //clearUlListContent();
});







/*
//fxn to setLoading gif for News
function setloadingGIF() {
    for (let i = 0; i < ulGifElement.length - 1; i++) {
        ulGifElement[i].style.backgroundImage = "url('../images/loading.gif')";
    }
}

//called to clear existing ul li (content)
// so as to get new data to be fetched and inserted
const clearUlListContent = () => {
    for (let index = 0; index <= 19; index++) {
        let ul = document.getElementById(`${"newsObj" + index}`);
        ul.innerHTML = "";
    }
}

let newsToFetch = "redux";
let tagsApplied = ["comment"];
let numericFilters = "points < 50";
searchNews(newsToFetch)(tagsApplied)(numericFilters)()
    .then(data => renderUI(data))
    .catch((error) => console.log(error)); */

//get Results from API-ENDPOINTS
/* 
let itemNo = 34;

getItem(itemNo)
    .then((data) => console.log(data))
    .catch((error) => console.log(error));


let name = "patricktomas";
getUser(name)
.then((data) => console.log(data))
.catch((error) => console.log(error));


let newsToFetch = "redux";
let tagsApplied = ["comment"];
let numericFilters = "points > 50";
searchNews(newsToFetch)(tagsApplied)(numericFilters)()
    .then((data) => newsArray.push(data))
    .then(newsfeed => renderUI(newsfeed))
    .catch((error) => console.log(error));
 */

/* 
let tagsAppliedToSearchByDate = ["comment"];
let numeriFilterAppliedToDate = "04/09/2022 > 20:00";
searchNewsByDate()(tagsAppliedToSearchByDate)(numeriFilterAppliedToDate)()
.then((data) => console.log(data))
.catch((error) => console.log(error)); */

