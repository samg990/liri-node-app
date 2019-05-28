require("dotenv").config();

var keys = require("./keys.js");

var axios = require("axios");
var moment = require("moment");
var command = process.argv[2];

function spotify(songName) {
  var Spotify = require("node-spotify-api");

  var spotify = new Spotify(keys.spotify);
  var songName = process.argv[3];
  if (!songName) {
    songName = "Havana";
  }

  spotify.search({ type: "track", query: songName }, function(err, data) {
    if (err) {
      console.log("Error occurred: " + err);
      return;
    } else var songInfo = data.tracks.items;
    console.log("Artist(s): " + songInfo[0].artists[0].name);
    console.log("Song Name: " + songInfo[0].name);
    console.log("Preview Link: " + songInfo[0].preview_url);
    console.log("Album: " + songInfo[0].album.name);
  });
}

function movie(movieName) {
  var movieName = process.argv[3];

  if (!movieName) movieName = "Mr. Nobody";

  var OMDBUrl =
    `http://www.omdbapi.com/?apikey=trilogy&t=` +
    movieName +
    `&r=json&y=&plot=short&tomatoes=true`;
  console.log(OMDBUrl);
  axios.get(OMDBUrl).then(function(response) {
    // If the request is successful (i.e. if the response status code is 200)
    if (response.status === 200) {
      console.log(`Title of the Movie: ${response.data.Title}`);

      console.log(`Year the Movie Came Out: ${response.data.Year}`);

      console.log(`Imdb rating of the Movie: ${response.data.Rated}`);

      console.log(`Language of the Movie: ${response.data.Language}`);

      console.log(`Country where movie was produced: ${response.data.Country}`);

      console.log(`Actors in the Movie: ${response.data.Actors}`);

      console.log(`Plot of the Movie: ${response.data.Plot}`);
    }
  });
}

function bands(artist) {
  var artist = process.argv[3];
  if (!artist) console.log("No band!!");
  else {
    axios
      .get(
        "https://rest.bandsintown.com/artists/" +
          artist +
          "/events?app_id=codingbootcamp",
      )
      .then(function(response) {
        if (response.status === 200) {
          console.log("Artist/Band Name: " + response.data[0].lineup[0]);

          console.log("Concert Venue Name: " + response.data[0].venue.name);

          console.log(
            "Concert Location: " +
              response.data[0].venue.country +
              " " +
              response.data[0].venue.city,
          );
        }
      });
  }
}

function runProgram() {
  if (command === "concert-this") {
    bands();
  } else if (command === "spotify-this-song") {
    spotify();
  } else if (command === "movie-this") {
    movie();
  } else {
    console.log(
      "Try again with concert-this, spotify-this-song, movie-this or do-what-it-says.",
    );
  }
}

runProgram();
