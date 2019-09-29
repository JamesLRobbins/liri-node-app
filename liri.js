require("dotenv").config();

//Variables
var keys = require("./keys.js");
var request = require("request");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var BandsInTownEvents = require("bandsintown-events");
var axios = require("axios");
var moment = require('moment');

//User Input Variables
var command = process.argv[2];
var input = process.argv[3];

//Run Function
inputs(command, input)

//Switch Function
function inputs(command, input){
switch(command) {
    case "concert-this":
    bandsInTown(input);
      break;
    case "spotify-this-song":
      songInfo(input);
      console.log(input)
      break;
    case "movie-this":
        movie(input);
        break;
    case "do-what-it-says":
        //code block
        break;
    default:
      // code block
  }
}  

//Bands in town
function bandsInTown(input) {
    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp").then(
        function(response) {
            var events = response.data;
            
            for(var i = 0; i < events.length; i++) {
                console.log("===========Event====================")
                console.log("Venue: " + events[i].venue.name);
                console.log("City: " + events[i].venue.city);
                console.log("Date: " + moment(events[i].datetime).format('MMMM Do YYYY'));
            }
        }
    )

    
}
//Spotify
function songInfo(input) {
    if (input === undefined) {
        input = "The Sign";
    }

    spotify.search(
        {
            type: "track",
            query: input
        },
        function (err, data) {
            if (err) {
                console.log("Error: " + err);
                return;
            }

            var songs = data.tracks.items;
            
            for (var i = 0; i < songs.length; i++) {
                console.log("==================Song==================")
                console.log("Artist name: " + songs[i].artists[0].name);
                console.log("Song name: " + songs[i].name);
                console.log("Link: " + songs[i].preview_url);
                console.log("Album: " + songs[i].album.name)
            }
        }
    )
};

//Movie
function movie(input) {
    axios.get("http://www.omdbapi.com/?t=" + input+ "&y=&plot=short&apikey=trilogy").then(
        function(response) {
            console.log("=================Movie======================")
            console.log("Movie title: " + response.data.Title);
            console.log("Year of release: " + response.data.Year);
            console.log("IMDB rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes rating: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            }   
    )
} 



