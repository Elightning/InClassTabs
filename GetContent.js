/* 
Eamon Lightning
eamon_lightning@student.uml.edu
Sound Recording Technology major; Computer Science minor.
Created on November 12, 2014

This website provides a brief introduction of myself, lists 
homework assignments for this course (91.461), and provides
a means of contact. 

This javascript file makes the page more efficient by eliminating
its previously existing redundancy through the use of partial
html files. */

/* This code is based on several code examples provided by
Curran Kelleher, which can be found here: 
https://github.com/curran/screencasts/tree/gh-pages/navigation
*/

/* Wrapping everything in this mmediately invoked function ensures
that no global variables are introduced. */
(function () {

/* var partials holds previously retrieved partial html files, so
the task won't have to be repeated again. It serves as a cache. */
  var partials = {};

/* Ascertains the current hash value of the location object and
calls getPartial() to retrieve the corresponding partial html file. */
  function find() {
    var fragmentID = location.hash.substr(1);

    getPartial(fragmentID);
  }

/* This function checks to see if the partial content it's 
retrieving has already been retrieved. If it has, then the 
content already exists in the partials variable, and so it is
retrieved from there. Otherwise, the get method uses an 
XMLHttpRequest to find the desired file and retrieve its content.
The content is then stored in the partials variable, and
assign() is called. */
  function getPartial(fragmentID) {
    if(partials[fragmentID]) { assign(partials[fragmentID]); }
    else {
      $.get(fragmentID + ".html", function(content) {
        partials[fragmentID] = content;
        assign(content);
      });
    }
  }

/* Finds the "partial_file" div element in index.html and 
inserts the retrieved content there. */
  function assign(content) {
    $("#partial_file").html(content);
  }

/* If the location object has no hash value, set it to 
#Home as a default. */
  if(!location.hash) { location.hash = "#Home"; }

/* Every time the page is loaded or refreshed, the corresponding
content of the hash value in the Location object is retrieved. */
  find();

/* Adds the callback function find to the hashchange event. This
event fires whenever the web page's fragmentID changes. */ 
  $(window).bind("hashchange", find);

} ());