// What do you have?
//   - jQuery to make AJAX requests to an API
//   - jQuery to work with the DOM
//   - Some existing HTML with placeholder information (.result-card)
//   - An API endpoint that has data for me "https://api.tvmaze.com/search/shows?q="
//   - A reference to how to use that API: "https://www.tvmaze.com/api#show-search"

// What do you need?
// When the user clicks the search button, the following needs to happen afterwards:
//     1. I need to take the text they typed in the input box
//     2. I need to get the TV show information based on what the user typed in: "https://api.tvmaze.com/search/shows?q=[SEARCH_STRING]"
//     2. I need to display that information using the .result-card html as a template

// How do you get there?
// I need to use this API endpoint: "https://api.tvmaze.com/search/shows?q="
// I can use the URL bar in my web browser to see what comes back when I visit an end point, e.g."https://api.tvmaze.com/search/shows?q=lost"
// I need to handle a click event on the search button
// I need to get the user information from the input box
// I need to use $.get to make an AJAX request to the endpoint with the user search info, e.g. "https://api.tvmaze.com/search/shows?q=lost"
// I need to use jQuery to recreate the .result-card html and all of it's nested elements
// I need to go through the data sent from the AJAX request and create a result card for each TV show
// I need to add each result card to the #results element.

let userInput = $('#search');
let searchBtn = $('#submit');

const $divResults = $('#results');

//This will allow the user to have randomly generated letter when the screen is first loaded
let alphabet = "abcdefghijklmnopqrstuvwxyz";
let startSearch = alphabet[Math.floor(Math.random()*alphabet.length)];
console.log(`Starting letter is ${startSearch}`);

userStart();

//This will allow the user to type text in the input bar of the search area
function userStart(){
  userInput.keyup((e) => {
    let searchValue = e.target.value;
    if(searchValue && searchValue.trim().length > 0){
      //let searchValues = searchValue.toLowerCase();
      // Update startSearch with the first character of user input
      startSearch = searchValue.charAt(0).toLowerCase(); 
    }
  });
}

searchBtn.click((e) => {
  e.preventDefault();
  let userSearch = userInput.val().trim();

  // Check if the user input is empty, use startSearch as the default
  let searchQuery = userSearch.trim().length > 0 ? userSearch : startSearch;

  //empty out search results for new ones
  $divResults.empty();

  // Make the GET request here, inside the click event handler
  $.get(`https://api.tvmaze.com/search/shows?q=${searchQuery}`, (data) => {
    console.log(data);
    // Handle the data or update the UI based on the response
    displayResults(data);
  });
  console.log(searchQuery);
});

function displayResults(data){

  data.forEach((item, index) => {

    let $span = $('<span></span>')
    $span.addClass ('result-card');
    $divResults.append($span);

    let showTitle = item.show.name;
    //console.log(`[${index}].show.name: ${showTitle}`);
    let $showTitle = $('<h3></h3>');
    $showTitle.addClass ('card-title');
    $showTitle.text(showTitle);
    $span.append($showTitle);

    let showImg = item.show.image ? item.show.image.medium : null;
    if(showImg !== null){
      let $showImg = $('<img>');
      $showImg.addClass('.card-image');
      $showImg.attr('src', showImg);
      $span.append($showImg);
    }

    let showGen = item.show.genres;
    let $showGen = $('<h2></h2>');
    $showGen.addClass('card-genres')
    $showGen.text(showGen);
    $span.append($showGen);

    let $sumDiv = $('<div></div>');
    $sumDiv.addClass('.card-summary');
    $span.append($sumDiv);

    let $showEm = $('<em></em>');
    $showEm.text('Summary:');
    $sumDiv.append($showEm);

    //Use .html(showDescrip) instead of .text(showDescrip) for the showDescrip element. It allows HTML content to be rendered, including the <p> tags from the original summary. Adjust the HTML structure as needed to fit your styling requirements.
    let showDescrip = item.show.summary;
    let $showDescrip = $('<p></p>');
    $showDescrip.html(showDescrip);
    $sumDiv.append($showDescrip);

    let showLink = item.show.url;
    let $showLink = $('<a></a>');
    $showLink.attr('href', showLink);
    $showLink.text('Vist Show');
    $span.append($showLink);

  });

}