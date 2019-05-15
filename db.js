
//Connection database
var mysql = require('mysql');

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

// insert statment
/*let sql = `INSERT INTO site(id, title,url ,descritption)
           VALUES(1, "blabla","blabla" ,"completed")`;
 
// execute the insert statment
con.query(sql);*/

function search(){
  // insert statment
/*   let sql = `SELECT * FROM site`;
 
// execute the insert statment
con.query(sql); */
document.getElementById("aaaa").innerHTML = "<p id = demo> Hello World </p>";
}

/* var xhr = null;
	
if(window.XMLHttpRequest || window.ActiveXObject){
	if(window.ActiveXObject){
		try{
			xhr = new ActiveXObject("Msxml2.XMLHTTP");
		}catch(e){
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}else{
		xhr = new XMLHttpRequest(); 
	}
}else{
	console.log("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");

} */
 



con.end();
