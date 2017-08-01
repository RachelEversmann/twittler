/* eslint-disable no-undef,no-unused-vars,no-mixed-spaces-and-tabs */  
var allTweets = {}; 
var Users = []; 
var test = 0; 
$(document).ready(function(){
  function init() {
    var $body = $('#main'); $body.html('');
    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<div></div>');
      var $container = $('<div></div>'); 
      var $time = $('<div class=time></div>');
      var todayFull = new Date();
      var today = todayFull.getTime(); 
      var timeFull = tweet.created_at;
      var time = timeFull.getTime();
      var rawDiff = today-time;
      var timeText; 
      if(rawDiff < 1000) {
	timeText = "Tweeted less than a second ago";  
      }
      else if(rawDiff < 1000*60) {
	timeText = "Tweeted " + Math.floor(rawDiff/1000) + " seconds ago"; 
      }
      else if(rawDiff < 1000*60*60) {
	timeText = "Tweeted " + Math.floor((rawDiff/1000)/60) + " minutes ago"; 
      }
      else if(rawDiff < 1000*60*60*60) {
	timeText = "Tweeted " + Math.Floor(((rawDiff/100)/60)/60) + " hours ago"; 
      }
      else {
	timeText = "Tweeted " + Math.Floor((((rawDiff/100)/60)/60)/24) + " days ago";  
      }
      $tweet.text('@' + tweet.user + ': ' + tweet.message);
      $time.text(timeText);
      $tweet.appendTo($container);
      $time.appendTo($container); 
      $container.addClass(tweet.user); 
      $tweet.addClass("Tweet");
      $time.addClass("Time"); 
      $container.appendTo($body);
      $container.prepend('<img class="img" src='+tweet.user+'.png />'); 
      index -= 1;
      // Rachel Wrote this  
      if(!Users.includes("." + tweet.user)) {
	Users.push("." + tweet.user); 
      }
      if(allTweets[tweet.user] === undefined) {
	allTweets[tweet.user] = []; 
      }
      allTweets[tweet.user].push(tweet.message); 
    }
    // calls clearOthers for each user 
    Users.forEach(function(el) {
      clearOther(el);
    });
  }
  function clearOther(clicked) {
    $(clicked).on('click',function() {
      Users.forEach( function(el) {
	if(el != clicked) {
	  $(el).remove();
	}
	$('#button').on('click', function() {
	  init();
	  // console.log("clicked reset");
	});
      });
    });
  } init();
  $('#button').on('click', function() {
    init();
    //console.log("clicked reset");
  });
});

