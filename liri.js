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

for (var i = 4; i < process.argv.length; i++) {
    input += '+' + process.argv[i];
}

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
      break;
    case "movie-this":
        movie(input);
        break;
    case "do-what-it-says":
        doWhat();
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
                console.log("\n===========Event====================\n")
                console.log("Venue: " + events[i].venue.name);
                fs.appendFile("random.txt", "Venue: " + events[i].venue.name + "\n", function(err) {
                    if (err) {
                        return console.log(err);
                    }
                });
                console.log("City: " + events[i].venue.city);
                fs.appendFile("random.txt", events[i].venue.city + "\n", function(err) {
                    if (err) {
                        return console.log(err);
                    }
                });
                console.log("Date: " + moment(events[i].datetime).subtract(10, 'day').calendar());
                fs.appendFile("random.txt", moment(events[i].datetime).subtract(10, 'day').calendar() + "\n", function(err) {
                    if (err) {
                        return console.log(err);
                    }
                fs.appendFile("random.txt", "\n=======================================\n", function(err) {
                    if (err) {
                        return console.log(err);
                    }
                })
                });
            }
        }
    )

    
}
//Spotify
function songInfo(input) {
    if (input === undefined) {
        input = "Ace of Base The Sign";
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
                console.log("\n==================Song==================\n")
                console.log("Artist: " + songs[i].artists[0].name);
                fs.appendFile("random.txt", "Artist: " + songs[i].artists[0].name + "\n", function(err) {
                    if (err) {
                        return console.log(err);
                    }
                });
                console.log("Song Title: " + songs[i].name);
                fs.appendFile("random.txt", "Song Title: " + songs[i].name + "\n", function(err) {
                    if (err) {
                        return console.log(err);
                    }
                });
                console.log("Link: " + songs[i].preview_url);
                fs.appendFile("random.txt", "Link: " + songs[i].preview_url + "\n", function(err) {
                    if (err) {
                        return console.log(err)
                    }
                });
                console.log("Album: " + songs[i].album.name)
                fs.appendFile("random.txt", "Album: " + songs[i].album.name + "\n", function(err) {
                    if (err) {
                        return console.log(err);
                    }

                fs.appendFile("random.txt", "=======================================\n", function(err) {
                    if (err) {
                        return console.log(err);
                        }
                    })
                });
            }
        }
    )
};

//Movie
function movie(input) {
    if (input === undefined) {
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!")
    } else {
    axios.get("http://www.omdbapi.com/?t=" + input+ "&y=&plot=short&apikey=trilogy").then(
        function(response) {
            console.log("\n=================Movie======================\n")
            console.log("Movie title: " + response.data.Title);
            fs.appendFile("random.txt", "Movie title: " + response.data.Title + "\n", function(err) {
                if (err) {
                    console.log(err)
                }
            });
            console.log("Year of release: " + response.data.Year);
            fs.appendFile("random.txt", "Year of release: " + response.data.Year + "\n", function(err) {
                if (err) {
                    console.log(err)
                }
            });
            console.log("IMDB rating: " + response.data.imdbRating);
            fs.appendFile("random.txt", "IMDB rating: " + response.data.imdbRating + "\n", function(err) {
                if (err) {
                    console.log(err)
                }
            });
            console.log("Rotten Tomatoes rating: " + response.data.Ratings[1].Value);
            fs.appendFile("random.txt", "Rotten Tomatoes rating: " + response.data.Ratings[1].Value + "\n", function(err) {
                if (err) {
                    console.log(err)
                }
            });
            console.log("Country: " + response.data.Country);
            fs.appendFile("random.txt", "Country: " + response.data.Country + "\n", function(err) {
                if (err) {
                    console.log(err)
                }
            });
            console.log("Language: " + response.data.Language);
            fs.appendFile("random.txt", "Language: " + response.data.Language + "\n", function(err) {
                if (err) {
                    console.log(err)
                }
            });
            console.log("Plot: " + response.data.Plot);
            fs.appendFile("random.txt", "Plot: " + response.data.Plot + "\n", function(err) {
                if (err) {
                    console.log(err)
                }
            });
            console.log("Actors: " + response.data.Actors);
            fs.appendFile("random.txt", "Actors: " + response.data.Actors + "\n", function(err) {
                if (err) {
                    console.log(err)
                }

            fs.appendFile("random.txt", "=======================================\n", function(err) {
                if (err) {
                    return console.log(err);
                    }
                })
            });
            }   
    )
} 
};



function doWhat() {
    //Read random.txt file
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (!error);
        console.log(data.toString());
        //split text with comma delimiter
        var textFile = data.toString().split(',');
        
    });
}



