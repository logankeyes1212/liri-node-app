// require("dotenv").config();


// var keys = require("./keys.js");
// var Spotify = require('node-spotify-api');
// var spotify = new Spotify(keys.spotify)
// // console.log(keys.spotify.id)
var fs = require("fs");

// console.log(secret)
var inquirer = require("inquirer");
var axios = require("axios");
var moment = require('moment');
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
    
    
        // if(process.argv[2] === "spotify-this-song"){
        //       var song = process.argv.slice(3).join("+");



        //  var express = require('express');
        //  var router = express.Router();

        // // Import the Spotify API


        // // Import our Keys File


        // // Create a Spotify Client


        // // Store the results of a request to spotify
        //  var results = [];

        // /* GET home page. */
        //  router.get('/', function (req, res) {
        //      res.render('index', { title: 'Spotify', results: results });
        //  });

        //  router.post('/', function (req, res) {
        //     //  Get the type of Query from the User
        //      var type = req.body.param_type;

        //     //  Get the query from the user
        //      var query = req.body.param_query;

        //     //  Clear out old results
        //       results = [];

        //     //  Make a request to Spotify
        //      spotify.search({ type: type, query: query })
        //          .then(function (spotRes) {

        //             //  Store the artist, song, preview link, and album in the results array
        //              spotRes.tracks.items.forEach(function (ea) {
        //                  results.push({
        //                      artist: ea.artists[0].name,
        //                      song: ea.name,
        //                      preview: ea.external_urls.spotify,
        //                      album: ea.album.name

        //                  });
        //              });
        //             //  Render the homepage and return results to the view
        //              res.render('index', { title: 'Spotify', results: results });

        //          })
        //          .catch(function (err) {
        //              console.log(err);
        //              throw err;
        //          });
        //  });

        //  module.exports = router;








        
        
        
        
        
        
        // if statement for omdb and argument
        if (inquirerResponse.choice === "movie-this") {
            



            inquirer
                .prompt([
                    {
                        type: "input",
                        message: "What is the movie name?",
                        name: "name"
                    },
                ])
                .then(function (inquirerResponse) {
                    
                    var movie = inquirerResponse.name
                    // movie = process.argv.slice().join("+");
                    console.log(movie)
                    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";


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
                            fs.appendFile("log.txt", response.data.Title + " " + response.data.Year + " " + response.data.imdbRating + " " + response.data.Ratings[1].Value + " " + response.data.Country + " " + response.data.Language + " " + response.data.Plot + " " + response.data.Actors, function (err) {
                                if (err) {
                                    return console.log(err);


                                }
                            });
                        });
                });
        }
        // if statement for bandsintown and 3rd argument
        else if (inquirerResponse.choice === "concert-this") {

            
            // taking out spaces and adding "+"" so api can read request
            
            inquirer
                .prompt([
                    {
                        type: "input",
                        message: "What concert do you want to see?",
                        name: "name"
                    },
                ])
                .then(function (inquirerResponse) {
                    
                    var artist = inquirerResponse.name

                    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
                    // call for bands in town
                    axios.get(queryUrl).then(
                        function (response) {
                            // changing date to more readable formate
                            let time = response.data[1].datetime;
                            time = moment(time, "YYYY/MM/DD hh:mm:ss").format("MM/DD/YYYY hh:mm A");

                            console.log("The name of the next concert venue is: " + response.data[1].venue.name)
                            console.log("The location of the next venue is: " + response.data[1].venue.city)
                            console.log("The date and time of the next concert is: " + time)
                            fs.appendFile("log.txt", response.data[1].venue.name + " " + response.data[1].venue.city + " " + time, function (err) {
                                if (err) {
                                    return console.log(err);


                                }
                            });
                        });
                });
        }



        else if(inquirerResponse.choice === "do-what-it-says"){
            fs.readFile("random.txt", "utf8", function(error, data) {

                if (error) {
                  return console.log(error);
                }
              
                console.log(data);
              
                
              
              });



        }
    });

