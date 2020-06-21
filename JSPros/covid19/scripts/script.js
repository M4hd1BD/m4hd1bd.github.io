var totalRecovered = document.getElementById('totalRecoveredNum');
var totalConfirmed = document.getElementById('totalConfirmedNum');
var totalDeaths = document.getElementById('totalDeathsNum');
var twentyFourTotalRecovered = document.getElementById('twentyFourTotalRecoveredNum');
var twentyFourTotalConfirmed = document.getElementById('twentyFourTotalConfirmedNum');
var twentyFourTotalDeaths = document.getElementById('twentyFourTotalDeathsNum');
var time = document.getElementById('time');
var currentTime = 0;

//setting up the parameter for api request
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

//function for getting total data
function getTotalData() {
  //intializing api request
  fetch("https://api.coronatracker.com/v3/stats/worldometer/global", requestOptions)

  //getting response as JSON
  .then(response => response.json())

  //doing stuffs with newly retrieved data
  .then(result => {

    //updating Total recovered
    totalRecovered.innerHTML = result.totalRecovered;

    //updating Total confirmed cases
    totalConfirmed.innerHTML = result.totalConfirmed;

    //updating Total deaths
    totalDeaths.innerHTML = result.totalDeaths;
    
  })

  //showing error messege if there's any
  .catch(error => console.log("There's an error: " + error));

  //resetting the timer
  currentTime = 0;

  //getting the data every five seconds i.e. updating it
  setTimeout(getTotalData, 60000);
}

//function for getting 24 hours data
function getTwentyFourHoursData() {

  //intializing api request
  fetch("http://api.coronatracker.com/v3/stats/worldometer/global", requestOptions)

  //getting response as JSON
  .then(response => response.json())

  //doing stuffs with newly retrieved data
  .then(result => {

    //updating 24 hours Total recovered
    twentyFourTotalRecovered.innerHTML = result.totalActiveCases;

    //updating 24 hours Total confirmed cases
    twentyFourTotalConfirmed.innerHTML = result.totalNewCases;

    //updating 24 hours Total deaths
    twentyFourTotalDeaths.innerHTML = result.totalNewDeaths;
  })

  //showing error messege if there's any
  .catch(error => console.log("There's an error: " + error));

  //getting the data every five seconds i.e. updating it
  setTimeout(getTwentyFourHoursData, 600000);
}

//setting the last update time, i don't know if it is a efficent way to do so
var setTime = setInterval(function() {

    time.innerHTML = currentTime;

  currentTime += 1;

}, 1000);

getTotalData();
getTwentyFourHoursData();
