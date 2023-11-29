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

$.get("https://api.tvmaze.com/search/shows?q=breaking%20bad", (data) => {
  console.log(data);
});