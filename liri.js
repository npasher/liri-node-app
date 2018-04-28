require("dotenv").config();
//Importing needed node modules//
const fs=require("fs");
const request=require("request");
const keys=require("./keys.js");
const twitter=require("twitter");
let spotify=require("node-spotify-api");
let userCommand=process.argv[2];
let userInput=process.argv[3];

switch(userCommand){
  case "my-tweets":myTweets();
  break;
  case "movie-this":movieThis();
  break;
  case "spotify-this-song":spotifyThisSong();
  break;
  case "do-what-it-says":doWhatItSays();
  break;
  default:console.log("Welcome to LIRI! Here are your command choices:"+"\n - my-tweets: Yields last 20 Tweets."+"\n - spotify-this-song: Base song info."+"\n - movie-this: Base movie info."+"\n - do-what-it-says"+"\n *Spotify and Movie choices will require quotation marks around your choice.");
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
                    +"\nRotten Tomatoes Rating:"+moviePull.tomatoRating
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
  let musicSpotify=new spotify(keys.spotify);
  let songTitle=userInput;
  if(!songTitle){
    songTitle="The Sign";
  };
  params=songTitle;
  musicSpotify.search({type:"track",query:params}, function(err,data){
    if (err){
      console.log("Error, Please try again.")
      return;
    }
    else{
      songStats="Artist: "+data.tracks.items[0].album.artists[0].name+
                "\nSong Title: "+songTitle+
                "\nLink: "+data.tracks.items[0].album.external_urls.spotify+
                "\nAlbum Title: "+data.tracks.items[0].album.name;
      console.log(songStats);
    };
  });
};
//Liri Do What it Says//
function doWhatItSays()
