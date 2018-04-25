
require("dotenv").config();
// import { twitter } from "./keys";

let fs=require("fs");
let request=require("request");
let keys=require("./keys.js");
let twitter=require("twitter");
let spotify=require("spotify-web-api-node");
let userCommand=process.argv[2];
let userInput=process.argv[3];

function myTweets(){
  let twitterClient=new twitter(keys.twitterKeys);
  let twitterUser=userInput;
  let words="text";
  let params={screen_name:twitterUser, count: 20};
  twitterClient.get("statuses/user_timeline",params,function(error,tweets,response){
    console.log("Here are the last 20 Tweets for:" +twitterUser);
    if(error) throw error;
  });
};

myTweets();