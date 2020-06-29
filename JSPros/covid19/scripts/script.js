var totalRecovered = document.getElementById('totalRecoveredNum'); //for total recovered cases gloabally
var totalConfirmed = document.getElementById('totalConfirmedNum'); //for total confirmed cases gloabally
var totalDeaths = document.getElementById('totalDeathsNum'); //for total death gloabally
var twentyFourTotalRecovered = document.getElementById('twentyFourTotalRecoveredNum'); //for new recovered cases globally, not necceserily 24 hour
var twentyFourTotalConfirmed = document.getElementById('twentyFourTotalConfirmedNum'); //for new confirmed cases globally, not necceserily 24 hours
var twentyFourTotalDeaths = document.getElementById('twentyFourTotalDeathsNum'); //for new deaths globally, not necceserily 24 hours
var totalRecoveredCountry = document.getElementById('totalRecoveredNumCountry'); //for total recovered cases for given country
var totalConfirmedCountry = document.getElementById('totalConfirmedNumCountry'); //for total confirmed cases for given country
var totalDeathsCountry = document.getElementById('totalDeathsNumCountry'); //for total deaths for given country
var twentyFourTotalRecoveredCountry = document.getElementById('twentyFourTotalRecoveredNumCountry'); //for newly recovered cases for given country
var twentyFourTotalConfirmedCountry = document.getElementById('twentyFourTotalConfirmedNumCountry'); //for newly confirmed cases for given country
var twentyFourTotalDeathsCountry = document.getElementById('twentyFourTotalDeathsNumCountry'); //for new deaths for given country
var time = document.getElementById('time'); //for last update time, aquired from the API
var timeCountry = document.getElementById('timeCountry'); //for last update time for a given country, aquired from API
var breakdowns = []; //basically for storing the array given by API which includes country wise data
var countryNameCode = {}; //for storing country names and their iso code from previously collected arary stored on breakdowns
var countryName = []; //for to store country names, for user to search basically
var inputField = document.getElementById('searchBox'); //getting the input field where user is gonna search for country
var searchResult = document.getElementById('searchResult'); //for showing search result
var searchButton = document.getElementById('searchButton'); //getting the button which user will press to search
var countryStats = document.getElementById('countryStats'); //div where country wise data will be showed, initially hidden
var country = document.getElementById('country'); //for inserting country name on dom
var isValid = false; //for checking inserted countries validity
var erroMessage = document.getElementById('erroMessage'); //for showing error message

//setting up header to provide my subsciption key for the api
var myHeaders = new Headers();
myHeaders.append("Subscription-Key", "3958c75e429f4725a5994c65a1484465");

//setting up the parameter for api request
var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

//function for getting total data
function getData() {
  //intializing api request
  fetch("https://api.smartable.ai/coronavirus/stats/global", requestOptions)

  //getting response as JSON
  .then(response => response.json())

  //doing stuffs with newly retrieved data
  .then(result => {

    //updating Total recovered
    totalRecovered.innerHTML = result.stats.totalRecoveredCases;

    //updating Total confirmed cases
    totalConfirmed.innerHTML = result.stats.totalConfirmedCases;

    //updating Total deaths
    totalDeaths.innerHTML = result.stats.totalDeaths;

    //updating newly recovered cases
    twentyFourTotalRecovered.innerHTML = result.stats.newlyRecoveredCases;

    //updating newly confirmed cases
    twentyFourTotalConfirmed.innerHTML = result.stats.newlyConfirmedCases;

    //updating new deaths
    twentyFourTotalDeaths.innerHTML = result.stats.newDeaths;

    //setting last update time
    var lastUpdate = result.updatedDateTime;
    var formattedTime = lastUpdate.substring(11,16) + ", " + lastUpdate.substring(0,10);
    time.innerHTML = formattedTime;


    //start of search things

    //storing the array which contains country wise basic data, just to retrive the country list
    breakdowns = result.stats.breakdowns;

    //traversing through every array and storing country name and iso code in a object, countryName:isoCode in this format
    breakdowns.forEach((item,i) => {

      countryNameCode[item.location.countryOrRegion] = item.location.isoCode;

    });

    //again traversing through every array and just storing country names in a array
    breakdowns.forEach((item,i) => {

      countryName[i] = item.location.countryOrRegion;

    });


    //waiting for user to start typing and do stuffs, basically getting, inserting results, etc
    inputField.addEventListener('keyup', function() {

      //for deleting previous result when user clicks on a result or type something new to get new result
      function deleteResults() {

        //getting previous result by getting all divs with result class
        var previousResult = document.querySelectorAll('.result');

        //traversing through previously aquired list and deleting them
        previousResult.forEach( item => {
          item.remove();
        });
      }

      deleteResults();

      //getting whatever is in input field right now
      var inputValue = inputField.value;

      //first checking if input field is empty, I don't want it to throw an error and stops everything
      if (inputValue != "") {

        //doesn't matter how user is writing the name, its first letter always should be capital and everything else lower, to search through countrylist
        inputValue = inputValue[0].toUpperCase() + inputValue.substring(1,inputValue.length).toLowerCase();
      }

      //traversing through country names to find any matches
      countryName.forEach( item => {

        /*
        checking if the letters on input field matches any letters from country list, basically if input field has one letter looking
        for all the countries starting with this letter, if it has two letters looking for all the countries starting with those two
        letters, so on and so fourth
        */
        if (item.substring(0,inputValue.length) == inputValue && inputValue != "") {

          //creating element for the result, for each match found a new element will be created
          const singleResult = document.createElement('span');
          singleResult.setAttribute('class', 'result my-3 font-weight-bold');

          //inserting the country name which was matched to be placed in dom
          singleResult.textContent = item;

          //inserting the elemnt on dom, basically search result
          searchResult.appendChild(singleResult);

        }

      });

      //getting the results founded and inserted from previous search and match aciton
      var newResult = document.querySelectorAll('.result');

      //traversing through every result to add a event listener to do stuffs when user click on a result
      newResult.forEach( item => {

        item.addEventListener('click', function() {

          //basically just calling the function to insert the name on input field so that user doesn't have to spell and type it
          setInput(item.textContent);

        });

      });

      //function to insert country name upon users selection
      function setInput(itemValue) {

        //inseting country name on input field
        inputField.value = itemValue;

        //deleting the search results
        deleteResults();
      }

    });

    //add event listener to search button so that do stuffs when user clicks on it
    searchButton.addEventListener('click', function() {

      //calling the function to get country wise data upon users click
      getCountryData();

    });

    //function to do stuffs when user click on search button
    function getCountryData() {

      //getting what user searched for
      var insertedCountry = inputField.value;

      //first checking if the inserted country name actually have in our list
      isValid = countryName.some( item => {
        if (item == insertedCountry) {
          return true;
        };
      });

      //if the country name is valid doing stuffs, like getting data, inserting it, etc
      if (isValid) {

        console.log("started api call");

        //fetching the data for that country using API Fetch method
        fetch("https://api.smartable.ai/coronavirus/stats/" + countryNameCode[insertedCountry], requestOptions)
          .then(response => response.json())
          .then(result => {

            //hidning the error message if user previously searched for a unsupported country
            if (erroMessage.style.display == "block") {
              erroMessage.style.display = 'none';
            }

            //inserting country name on dom
            country.innerHTML = result.location.countryOrRegion;

            //updating total recovered cases for the specified country
            totalRecoveredCountry.innerHTML = result.stats.totalRecoveredCases;

            //updating total confirmed cases for the specified country
            totalConfirmedCountry.innerHTML = result.stats.totalConfirmedCases;

            //updating total deaths for the specified country
            totalDeathsCountry.innerHTML = result.stats.totalDeaths;

            //updating latest recovered cases for the specified country
            twentyFourTotalRecoveredCountry.innerHTML = result.stats.newlyRecoveredCases;

            //updating latest confirmed cases for the specified country
            twentyFourTotalConfirmedCountry.innerHTML = result.stats.newlyConfirmedCases;

            //updating latest deaths for the specified country
            twentyFourTotalDeathsCountry.innerHTML = result.stats.newDeaths;

            //setting last update time
            var lastUpdate = result.updatedDateTime;
            var formattedTime = lastUpdate.substring(11,16) + ", " + lastUpdate.substring(0,10);
            timeCountry.innerHTML = formattedTime;

            //showing the data, remember it was initially hideen?
            countryStats.style.display = "block";

          })

          //showing error if there's any
          .catch(error => console.log('error', error));

      }

      //if it isn't showing an error message
      else {

        //hiding if any previous result is visible
        if (countryStats.style.display == "block") {
          countryStats.style.display = "none";
        }

        //showing the data, remember it was initially hideen?
        erroMessage.style.display = "block";
      }

    }

  })

  //showing error messege if there's any
  .catch(error => console.log("There's an error: " + error));

  //getting the data every one hour i.e. updating it, nobody gonna stay on it for one hour anyway
  setTimeout(getData, 3600000);
}

//function for getting and showing news
function insertNews() {

  //calling the api to get global lates news
  fetch("https://api.smartable.ai/coronavirus/news/global", requestOptions)

    .then(response => response.json())

    .then(result => {

        //setting up card deck (bootstraps) for every news retrieved
        const cardDeck = document.createElement('div');
        cardDeck.setAttribute('class', 'row row-cols-1 row-cols-sm-2 row-cols-md-3');

        //inseting card deck in dom
        var body = document.getElementById('news');
        body.appendChild(cardDeck);

        //storing all the news in a variable as an object
        allnews = result.news;

        //traversing through every news so that can set up cards and insert them in dom
        allnews.forEach(item => {

          //just usual bootstrap elements from now on
          const card = document.createElement('div');
          card.setAttribute('class', 'card h-100');

          const col = document.createElement('div');
          col.setAttribute('class', 'col my-4');

          const img = document.createElement('img');
          img.setAttribute('class', 'card-img-top img-thumbnail cardImage');

          const cardBody = document.createElement('div');
          cardBody.setAttribute('class', 'card-body');

          const cardTitle = document.createElement('h5');
          cardTitle.setAttribute('class', 'card-title');

          const cardText = document.createElement('p');
          cardText.setAttribute('class', 'card-text');

          const cardFooter = document.createElement('div');
          cardFooter.setAttribute('class', 'card-footer text-center');

          const link = document.createElement('a');
          link.setAttribute('class', 'card-link');

          //checking if this news has an image, if it doesn't inserting a defult image
          if (item.images == null) {
            img.src = 'images/404.png';
          }

          //if it does, just inserting it
          else {
            img.src = item.images[0].url;
          }

          //checking if news description is more than 150 character, if it does just making it less than 150, to make every description fairly equal
          if (item.excerpt.length > 150) {
            cardText.textContent = item.excerpt.substring(0,150) + '...';
          }

          //if it isn't just inseritng it with some defalut styling
          else {
            cardText.textContent = item.excerpt + '...';
          }

          //inserting the main article link
          link.href = item.webUrl;
          link.textContent = 'Read full story';

          //inserting the title
          cardTitle.textContent = item.title;

          //inserting all the data collected on cardDeck which was previously inserted in dom
          cardFooter.appendChild(link);
          cardBody.appendChild(cardTitle);
          cardBody.appendChild(cardText);
          card.appendChild(img);
          card.appendChild(cardBody);
          card.appendChild(cardFooter);
          col.appendChild(card);
          cardDeck.appendChild(col);

        });

  	})
    .catch(error => console.log('error', error));

    //getting the data every one hour i.e. updating it, nobody gonna stay on it for one hour anyway
    setTimeout(insertNews, 3600000);
}

getData();
insertNews();
