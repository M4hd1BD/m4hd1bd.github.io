var totalRecovered = document.getElementById('totalRecoveredNum');
var totalConfirmed = document.getElementById('totalConfirmedNum');
var totalDeaths = document.getElementById('totalDeathsNum');
var time = document.getElementById('time')
var currentTime = 0;

//setting up the parameter for api request
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

function getData() {
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
  setTimeout(getData, 60000);
}

//setting the last update time, i don't know if it is a efficent way to do so
var setTime = setInterval(function() {
  time.innerHTML = currentTime;
  currentTime += 1;
}, 1000);

getData();
