require('dotenv').config()
let keys = require("./keys.js");
let Spotify = require('node-spotify-api');
let fs = require("fs");
let inquirer = require("inquirer");
let axios = require("axios");
let moment = require('moment');
moment().format();

inquirer
    .prompt([

        {
            type: "list",
            message: "What would you like to know?",
            choices: ["movie-this", "concert-this", "spotify-this-song", "do-what-it-says"],
            name: "choice"
        }
    ])
    .then(function (inquirerResponse) {

        console.log(inquirerResponse.choice)

        if (inquirerResponse.choice === "spotify-this-song") {
            inquirer
                .prompt([
                    {
                        type: "input",
                        message: "What is your song choice?",
                        name: "name"
                    },
                ])
                .then(function (inquirerResponse) {

                    let spotify = new Spotify({
                        id: keys.spotify.id,
                        secret: keys.spotify.secret
                    })
                    spotify
                        .search({ type: 'track', query: inquirerResponse.name }, function (err, data) {

                            console.log("Song name is " + data.tracks.items[0].name);
                            console.log("Artist name is " + data.tracks.items[0].artists[0].name);
                            console.log("Album name is " + data.tracks.items[0].album.name);
                            console.log("Here is a spotify link for the song you picked " + data.tracks.items[0].external_urls.spotify);
                            let song = data.tracks.items[0].name + "\n" + data.tracks.items[0].artists[0].name + "\n" + data.tracks.items[0].album.name + "\n" + data.tracks.items[0].external_urls.spotify + "\n";
                            fs.appendFile("log.txt", song, function (err) {
                                if (err)
                                    console.log(err)

                            })
                        });
                });
        }

        // if statement for omdb and argument
        else if (inquirerResponse.choice === "movie-this") {
            inquirer
                .prompt([
                    {
                        type: "input",
                        message: "What is the movie name?",
                        name: "name"
                    },
                ])
                .then(function (inquirerResponse) {

                    let movie = inquirerResponse.name
                    let queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

                    axios.get(queryUrl).then(
                        function (response) {

                            console.log("The name of your movie choice is: " + response.data.Title);
                            console.log("the year the movie was made is: " + response.data.Year);
                            console.log("The rating of the movie: " + response.data.imdbRating);
                            console.log("The Rotten Tomatoes score is: " + response.data.Ratings[1].Value);
                            console.log("The movie was made in this country: " + response.data.Country);
                            console.log("The language's in this movie are: " + response.data.Language);
                            console.log("The plot of this movie is: " + response.data.Plot);
                            console.log("The actors is this movie are: " + response.data.Actors);
                            let movieResults = response.data.Title + "\n " + response.data.Year + "\n " + response.data.imdbRating + "\n " + response.data.Ratings[1].Value + "\n " + response.data.Country + "\n " + response.data.Language + "\n " + response.data.Plot + "\n " + response.data.Actors + "\n";
                            fs.appendFile("log.txt", movieResults, function (err) {
                                if (err) {
                                    return console.log(err);


                                }
                            });
                        });
                });
        }
        // if statement for bandsintown and 3rd argument
        else if (inquirerResponse.choice === "concert-this") {

            inquirer
                .prompt([
                    {
                        type: "input",
                        message: "What concert do you want to see?",
                        name: "name"
                    },
                ])
                .then(function (inquirerResponse) {

                    let artist = inquirerResponse.name
                    let queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
                    // call for bands in town
                    axios.get(queryUrl).then(
                        function (response) {
                            // changing date to more readable formate
                            let time = response.data[1].datetime;
                            time = moment(time, "YYYY/MM/DD hh:mm:ss").format("MM/DD/YYYY hh:mm A");

                            console.log("The name of the next concert venue is: " + response.data[1].venue.name)
                            console.log("The location of the next venue is: " + response.data[1].venue.city)
                            console.log("The date and time of the next concert is: " + time)
                            let concert = response.data[1].venue.name + "\n" + response.data[1].venue.city + "\n" + time + "\n";
                            fs.appendFile("log.txt", concert, function (err) {
                                if (err) {
                                    return console.log(err);
                                }
                            });
                        });
                });
        }



        else if (inquirerResponse.choice === "do-what-it-says") {

            let spotify = new Spotify({
                id: keys.spotify.id,
                secret: keys.spotify.secret
            })

            fs.readFile("random.txt", "utf8", function (error, data) {

                if (error) {
                    return console.log(error);
                }
                let dataArr = data.split(",")[1];
                spotify
                    .search({ type: 'track', query: dataArr }, function (err, data) {


                        console.log("Song name is " + data.tracks.items[0].name);
                        console.log("Artist name is " + data.tracks.items[0].artists[0].name);
                        console.log("Album name is " + data.tracks.items[0].album.name);
                        console.log("Here is a spotify link for the song you picked " + data.tracks.items[0].external_urls.spotify);
                        let song = data.tracks.items[0].name + "\n" + data.tracks.items[0].artists[0].name + "\n" + data.tracks.items[0].album.name + "\n" + data.tracks.items[0].external_urls.spotify + "\n";
                        fs.appendFile("log.txt", song, function (err) {
                            if (err) {
                                console.log(err)
                            };
                        });
                    });
            });
        }
    });
