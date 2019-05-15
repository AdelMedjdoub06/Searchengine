// Mon crawler
var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

var START_URL = [
  "https://amadeus.com/fr",
  "https://fr-fr.facebook.com",
  "http://www.netinstructions.com",
  "https://www.codingame.com",
  "https://ants.gouv.fr"
]

var SEARCH_WORD = "stemming";
var MAX_PAGES_TO_VISIT = 10;

var pagesVisited = {};
var numPagesVisited = 0;
var pagesToVisit = [];
  let mysql  = require('mysql');

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "searchengine"
  });

  con.connect(function(err) {
    if (err){
      throw err;
    } 
    else{
      console.log("Connected!");
    }
  });

for(i = 0; i < START_URL.length; i++){  

  var url = new URL(START_URL[i]);
  var baseUrl = url.protocol + "//" + url.hostname;

  // connection to database



  pagesToVisit.push(START_URL[i]);
  crawl();

  function crawl() {
    if(numPagesVisited >= MAX_PAGES_TO_VISIT) {
      console.log("Reached max limit of number of pages to visit.");
      return;
    }
    var nextPage = pagesToVisit.pop();
    if (nextPage in pagesVisited) {
      // We've already visited this page, so repeat the crawl
      crawl();
    } else {
      // New page we haven't visited
      visitPage(nextPage, crawl);
    }
  }

  function visitPage(url, callback) {
    // Add page to our set
    pagesVisited[url] = true;
    numPagesVisited++;

    // Make the request
    console.log("Visiting page " + url);
    request(url, function(error, response, body) {
      // Check status code (200 is HTTP OK)
      console.log("Status code: " + response.statusCode);
      if(response.statusCode !== 200) {
        callback();
        return;
      }
      // Parse the document body
      var $ = cheerio.load(body);
      var isWordFound = searchForWord($, SEARCH_WORD);
      if(isWordFound) {
        console.log('Word ' + SEARCH_WORD + ' found at page ' + url);
      } else {
        collectInternalLinks($);
        // In this short program, our callback is just calling crawl()
        callback();
      }
        
        titre = $('title').text();
        console.log("Page title:  " + titre);


        description = ``;
        SE_index = ``;
        // insert statment
        /*let sql = `INSERT INTO site(id,title,url,description,SE_index)
                  VALUES(`+i+`,`+titre+`,`+url+`,`+description+`,`+SE_index+`)`;
        
        // execute the insert statment
       con.query(sql);*/
    });
  }

  function searchForWord($, word) {
    var bodyText = $('html > body').text().toLowerCase();
    return(bodyText.indexOf(word.toLowerCase()) !== -1);
  }

  function collectInternalLinks($) {
      var relativeLinks = $("a[href^='/']");
      console.log("Found " + relativeLinks.length + " relative links on page");
      relativeLinks.each(function() {
          pagesToVisit.push(baseUrl + $(this).attr('href'));
      });
  }
}
     
con.end();


//Convertir mes données en Json
/*'user strict'

 const fs = require('fs');
let site = {
  title : 'Google',
  url : 'https://www.google.com'
}; */




//let data = JSON.stringify(site);
//fs.writeFileSync('url.json',data);