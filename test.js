  
//   require("dotenv").config();


// var keys = require("./keys.js");
// var Spotify = require('node-spotify-api');
// var spotify = new Spotify(keys.spotify)
// // console.log(keys.spotify.id)


// console.log(keys.spotify)

// var moment = require('moment');
// moment().format();
  


//          var express = require('express');
//          var router = express.Router();




//         // Store the results of a request to spotify
//          var results = [];

//         /* GET home page. */
//          router.get('/', function (req, res) {
//              res.render('index', { title: 'Spotify', results: results });
//          });

//          router.post('/', function (req, res) {
//             //  Get the type of Query from the User
//              var type = req.body.param_type;

//             //  Get the query from the user
//              var query = req.body.param_query;

//             //  Clear out old results
//               results = [];

//             //  Make a request to Spotify
//              spotify.search({ type: type, query: query })
//                  .then(function (spotRes) {

//                     //  Store the artist, song, preview link, and album in the results array
//                      spotRes.tracks.items.forEach(function (ea) {
//                          results.push({
//                              artist: ea.artists[0].name,
//                              song: ea.name,
//                              preview: ea.external_urls.spotify,
//                              album: ea.album.name

//                          });
//                      });
//                     //  Render the homepage and return results to the view
//                      res.render('index', { title: 'Spotify', results: results });

//                  })
//                  .catch(function (err) {
//                      console.log(err);
//                      throw err;
//                  });
//          });

//          module.exports = router;
// var spotify = new Spotify({
//     id:     ,
//     secret: "
//   });
 
// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//     if (err) {
//       return console.log('Error occurred: ' + err);
//     }
   
//   console.log(data.album); 
//   });
// var querySearch = process.argv[2].slice(" ").join("+")
//   spotify
//     .search({ type: 'track', query: querySearch  }, function(err, data){
     
//       console.log(data.tracks.items[0]);
//     })
    // .catch(function(err) {
    //   console.log(err);
    // })
// });



