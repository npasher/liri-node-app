require("dotenv").config();
//Importing needed node modules//
const fs=require("fs");
const request=require("request");
const keys=require("./keys.js");
const twitter=require("twitter");
const spotify=require("spotify-web-api-node");
let userCommand=process.argv[2];
let userInput=process.argv[3];

switch(userCommand){
  case "my-tweets":myTweets();
  break;
  case "movie-this":movieThis();
  break;
  case "spotify-this-song":spotifyThisSong();
  break;
  default:console.log("Welcome to LIRI! Here are your command choices:"+"\n - my-tweets: Yields last 20 Tweets."+"\n - spotify-this-song: Base song info."+"\n - movie-this: Base movie info."+"\n - do-what-it-says"+"\n *Spotify and Movie choices will require quotation marks around your choice.")
};
//Liri Twitter//
function myTweets(){
  let twitterClient=new twitter(keys.twitter);
  let twitterHandle=userInput;
  let text="text";
  let params={screen_name:twitterHandle, count:20};
  if(!twitterHandle){
    twitterHandle="npasher_school";
  };
  twitterClient.get('statuses/user_timeline',params,function(error,tweets,response){
    if (!error) {
    console.log("Here are the last 20 Tweets for:" +twitterHandle.toLowerCase());
    for (let i=0;i<tweets.length;i++){
      let time=tweets[i].created_at;
      let number=i+1;
      let pulledTweets="Tweet#"+number+":"+tweets[i].text+"\n";
      console.log(pulledTweets);
    };
    };
    if(error){
      console.log("Error, Please try again.");
    };
  });
};
//Liri Ombd//
function movieThis(){
  let movie=userInput;
  if(!movie){
    movie="Mr. Nobody";
    console.log("\nIf you haven't watched "+movie+", then you should: http://www.imdb.com/title/tt0485947/"+"\nIt's on Netflix.")
  };
  movieTitle=movie
  request("http://www.omdbapi.com/?t="+movieTitle+"&y=&plot=short&apikey=trilogy",
  function (error,response,body){
    if(!error){
      let moviePull=JSON.parse(body);
      let movieStats="\nTitle:"+moviePull.Title
                    +"\nYear:"+moviePull.Year
                    +"\nIMDB Rating:"+moviePull.imdbRating
                    +"\nRotten Tomatoes Rating:"+moviePull.tomatoTating
                    +"\nCountry of Orgin:"+moviePull.Country
                    +"\nLanguage:"+moviePull.Language
                    +"\nPlot:"+moviePull.Plot
                    +"\nActors:"+moviePull.Actors
      console.log(movieStats);
    };
    if(error){
      console.log("Error, Please try again.");
    };
  });
};
//Liri Spotify//
function spotifyThisSong(){
  let spotify=new Spotify({

  });
};