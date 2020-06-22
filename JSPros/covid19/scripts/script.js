var totalRecovered = document.getElementById('totalRecoveredNum');
var totalConfirmed = document.getElementById('totalConfirmedNum');
var totalDeaths = document.getElementById('totalDeathsNum');
var twentyFourTotalRecovered = document.getElementById('twentyFourTotalRecoveredNum');
var twentyFourTotalConfirmed = document.getElementById('twentyFourTotalConfirmedNum');
var twentyFourTotalDeaths = document.getElementById('twentyFourTotalDeathsNum');
var time = document.getElementById('time');
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

  })

  //showing error messege if there's any
  .catch(error => console.log("There's an error: " + error));

  //getting the data every one minutes i.e. updating it
  setTimeout(getData, 3600000);
}

getData();
