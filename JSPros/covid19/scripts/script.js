var totalRecovered = document.getElementById('totalRecoveredNum');
var totalConfirmed = document.getElementById('totalConfirmedNum');
var totalDeaths = document.getElementById('totalDeathsNum');
var twentyFourTotalRecovered = document.getElementById('twentyFourTotalRecoveredNum');
var twentyFourTotalConfirmed = document.getElementById('twentyFourTotalConfirmedNum');
var twentyFourTotalDeaths = document.getElementById('twentyFourTotalDeathsNum');
var totalRecoveredCountry = document.getElementById('totalRecoveredNumCountry');
var totalConfirmedCountry = document.getElementById('totalConfirmedNumCountry');
var totalDeathsCountry = document.getElementById('totalDeathsNumCountry');
var twentyFourTotalRecoveredCountry = document.getElementById('twentyFourTotalRecoveredNumCountry');
var twentyFourTotalConfirmedCountry = document.getElementById('twentyFourTotalConfirmedNumCountry');
var twentyFourTotalDeathsCountry = document.getElementById('twentyFourTotalDeathsNumCountry');
var time = document.getElementById('time');
var timeCountry = document.getElementById('timeCountry');
var breakdowns = [];
var countryNameCode = {};
var countryName = [];
var inputField = document.getElementById('searchBox');
var searchResult = document.getElementById('searchResult');
var searchButton = document.getElementById('searchButton');
var countryStats = document.getElementById('countryStats');


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

    //updating 24 hours Total recovered
    twentyFourTotalRecovered.innerHTML = result.stats.newlyRecoveredCases;

    //updating 24 hours Total confirmed cases
    twentyFourTotalConfirmed.innerHTML = result.stats.newlyConfirmedCases;

    //updating 24 hours Total deaths
    twentyFourTotalDeaths.innerHTML = result.stats.newDeaths;

    //setting last update time
    var lastUpdate = result.updatedDateTime;
    var formattedTime = lastUpdate.substring(11,16) + ", " + lastUpdate.substring(0,10);
    time.innerHTML = formattedTime;



    //start of search things
    breakdowns = result.stats.breakdowns;

    breakdowns.forEach((item,i) => {

      countryNameCode[item.location.countryOrRegion] = item.location.isoCode;

    });

    breakdowns.forEach((item,i) => {

      countryName[i] = item.location.countryOrRegion;

    });


    inputField.addEventListener('keyup', function() {

      function deleteResults() {
        var previousResult = document.querySelectorAll('.result');

        previousResult.forEach( item => {
          item.remove();
        });
      }

      deleteResults();

      var inputValue = inputField.value;

      if (inputValue != "") {
        inputValue = inputValue[0].toUpperCase() + inputValue.substring(1,inputValue.length);
      }

      countryName.forEach( item => {

        const singleResult = document.createElement('span');
        singleResult.setAttribute('class', 'result my-3 font-weight-bold');

        if (item.substring(0,inputValue.length) == inputValue && inputValue != "") {

          singleResult.textContent = item;
          searchResult.appendChild(singleResult);

        }

      });

      var newResult = document.querySelectorAll('.result');

      newResult.forEach( item => {

        item.addEventListener('click', function() {

          setInput(item.textContent);

        });

      });

      function setInput(itemValue) {

        inputField.value = itemValue;
        deleteResults();
      }

    });

    searchButton.addEventListener('click', function() {

      getCountryData();

    });

    function getCountryData() {

      var insertedCountry = inputField.value;

      fetch("https://api.smartable.ai/coronavirus/stats/" + countryNameCode[insertedCountry], requestOptions)
        .then(response => response.json())
        .then(result => {

          console.log(result);

          //updating Total recovered
          totalRecoveredCountry.innerHTML = result.stats.totalRecoveredCases;

          //updating Total confirmed cases
          totalConfirmedCountry.innerHTML = result.stats.totalConfirmedCases;

          //updating Total deaths
          totalDeathsCountry.innerHTML = result.stats.totalDeaths;

          //updating 24 hours Total recovered
          twentyFourTotalRecoveredCountry.innerHTML = result.stats.newlyRecoveredCases;

          //updating 24 hours Total confirmed cases
          twentyFourTotalConfirmedCountry.innerHTML = result.stats.newlyConfirmedCases;

          //updating 24 hours Total deaths
          twentyFourTotalDeathsCountry.innerHTML = result.stats.newDeaths;

          //setting last update time
          var lastUpdate = result.updatedDateTime;
          var formattedTime = lastUpdate.substring(11,16) + ", " + lastUpdate.substring(0,10);
          timeCountry.innerHTML = formattedTime;

          countryStats.style.display = "block";

        })
        .catch(error => console.log('error', error));
    }

  })

  //showing error messege if there's any
  .catch(error => console.log("There's an error: " + error));

  //getting the data every one hour i.e. updating it
  setTimeout(getData, 3600000);
}

//function for getting and showing news
function insertNews() {

  fetch("https://api.smartable.ai/coronavirus/news/global", requestOptions)

    .then(response => response.json())

    .then(result => {

        const cardDeck = document.createElement('div');
        cardDeck.setAttribute('class', 'row row-cols-1 row-cols-sm-2 row-cols-md-3');

        var body = document.getElementById('news');
        body.appendChild(cardDeck);

        allnews = result.news;


        allnews.forEach(item => {

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
          cardFooter.setAttribute('class', 'card-footer');

          const link = document.createElement('a');
          link.setAttribute('class', 'card-link');

          if (item.images == null) {
            img.src = 'images/404.png';
          }
          else {
            img.src = item.images[0].url;
          }

          if (item.excerpt.length > 150) {
            cardText.textContent = item.excerpt.substring(0,150) + '...';
          }
          else {
            cardText.textContent = item.excerpt + '...';
          }

          link.href = item.webUrl;
          link.textContent = 'Read full story';
          cardTitle.textContent = item.title;

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

    //getting the data every one hour i.e. updating it
    setTimeout(insertNews, 3600000);
}

getData();
insertNews();
