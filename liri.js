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
  default:console.log("Welcome to LIRI! Here are your command choices:"+"\n 1. my-tweets:Yields last 20 Tweets."+"\n 2. spotify-this-song:Base song info."+"\n 3. movie-this:Base movie info."+"\n 4. do-what-it-says"+"\n *Spotify and Movie choices will require quotation marks around your choice.")
}
function myTweets(){
  let twitterClient=new twitter(keys.twitterKeys);
  let twitterUser=userInput;
  let words="text";
  let params={screen_name:twitterUser, count: 20};
  twitterClient.get("statuses/user_timeline",params,function(error,tweets,response){
    if (!error) {
    console.log("Here are the last 20 Tweets for:" +twitterUser);
    for (let i=1;i<tweets.length;i++){
      let time=tweets[i].created_at;
      let timeArr=time.split(" ");
      let display="Tweet#"+i+":"+tweets[i].text+"\n"
      console.log(display);
    };
    // if(error) throw error;
  };
  });
};

myTweets();

function movieThis(){
  let movie=userInput;
  if(!movie){
    movie="mr. nobody";
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

    }
  });
};