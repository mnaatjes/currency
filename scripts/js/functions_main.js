//-------------------------------------------------------------------------------------------------------
// CIS 174: Functions
//-------------------------------------------------------------------------------------------------------

/*------------------------------------------------------*/
/***
 * @name range
 * @param {number} start beginning of range
 * @param {number} end end of range
 */
/*------------------------------------------------------*/
function range(start, end) {
    var result = [];
    
    for (let i = start; i <= end; i++) {
        result.push(i);
    }

    return result;
}
/*------------------------------------------------------*/
/***
 * @name random
 * @param {number} minimum_value beginning of range
 * @param {number} maximum_value end of range
 * @return {number} result
 */
/*------------------------------------------------------*/
function random(minimum_value, maximum_value){
    let result = Math.random() * (maximum_value - minimum_value) + minimum_value;
    return result;
}
/*------------------------------------------------------*/
/***
 * @name strToUpper produces uppercase letter at string index
 * @param {string} string string to manipulate
 * @param {number} index index of string to alter
 * @return {string} result: altered string
 */
/*------------------------------------------------------*/
function strToUpper(string, index) {
    
    let result = string.charAt(index).toUpperCase() + string.slice(index+1);
    
    return result;
}
/*------------------------------------------------------*/
/***
 * @name includeHTML 
 * @param {string} filetype 
 * @example filetype = html --> 'data-include-html' includes 
 */
/*------------------------------------------------------*/
function includeHTML(filetype) {
    var all_elements;
    let attibute = 'data-include-' + filetype;
    all_elements = document.getElementsByTagName('*');
    // loop all elements
    for (let i=0; i < all_elements.length; i++) {
        let element     = all_elements[i];
        let file   = element.getAttribute(attibute);
        if (file) {
            // make ajax request
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    //if (this.status == 200) {console.log(this.responseText)}
                    if (this.status == 400) {console.log('Page Not Found!')}
                    element.removeAttribute(attibute);
                    includeHTML();    
                }
            }
            xhttp.onload = function(){
                element.innerHTML = this.responseText;
            }
            // open file
            xhttp.open('GET', file, true);
            xhttp.send();
        }
    }
}
/*------------------------------------------------------*/
/***
 * @name fetchJSON
 * @example fetchJSON('json/fleet.json', function(xhttp){
 *      sessionStorage.setItem('fleet', xhttp.responseText);
 *  });
 */
/*------------------------------------------------------*/
function fetchJSON(filepath, callback) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                xhttp.onload = callback(this);
            }
            if (this.status == 400) {console.log('Page Not Found!')}
        }
    }
    xhttp.open('GET', filepath);
    xhttp.send();
}
/*------------------------------------------------------*/
/***
 * @name loadScript
 * @param {string} url
 */
/*------------------------------------------------------*/
function loadScript(url){
    // properties
    let head    = document.getElementsByTagName('head')[0];
    let script  = document.createElement('script');
    // set values
    script.type = 'text/Javascript';
    script.src  = url;
    head.appendChild(script);
}
/*------------------------------------------------------*/
/***
 * @name getFirstOfMonth
 * @param {number} year 2024
 * @param {number} month 10
 * @return {string} yyyy-mm-dd
 */
/*------------------------------------------------------*/
function getFirstOfMonth(year, month){
    // parse month
    if(typeof month == 'string'){month = new Date(`${month} 1, 2000`).getMonth() + 1;}
    // set date
    let date = new Date(year, month - 1, 1);
    return date.toISOString().slice(0, 10);
}
/*------------------------------------------------------*/
/***
 * @name getLastOfMonth
 * @param {number} year 2024
 * @param {number} month 10
 * @return {string} yyyy-mm-dd
 */
/*------------------------------------------------------*/
function getLastOfMonth(year, month){
    let date = new Date(year, month, 0);
    return date.toISOString().slice(0, 10);
}
/*------------------------------------------------------*/
/***
 * @name fetchApi
 * @type {async function}
 * @param {string} api_url full url including api_key to fetch from api
 * @param {string} storage_name string to name in session storage; e.g. city name
 */
/*------------------------------------------------------*/
async function fetchApi(api_url, storage_name=""){
    try {
        let response = await fetch(api_url);
        // failure
        if(!response.ok){
            throw ('ERROR!');
        }
        // success
        let json_obj = await response.json();
        // return json
        return json_obj;
        // store
        //sessionStorage.setItem(storage_name, JSON.stringify(json_obj));
    }
    catch(error) {
        console.error(`ERROR: ${error}`);
    }
}
/*------------------------------------------------------*/
/**
 * @name formatDate
 * @type {Function}
 * @param {string} date_string
 * @returns {string} yyyy-mm-dd ISOString
 */
/*------------------------------------------------------*/
function formatDate(date_string){
    let date = new Date(date_string)
    .toISOString()
    .split('T')[0]
    .replace(/-/g, '-');
    return date;
}
/*------------------------------------------------------*/
/**
 * @name addDays
 * @type {Function}
 * @param {String} date
 * @param {Number} days
 */
/*------------------------------------------------------*/
function addDays(date, days){
    // initialize new date object
    let result = new Date(date);
    // calculate
    result.setDate(new Date(date).getDate() + days);
    // return resultant date
    return result.toISOString();
}
/*------------------------------------------------------*/
/**
 * @name getDateRange
 * @type {Function}
 * @param {String} date_start
 * @param {String} date_end
 * @property {Array} results
 * @returns {Array} items in yyyy-mm-dd
 */
/*------------------------------------------------------*/
function getDateRange(date_start, date_end){
    // properties
    let results = [];
    let date    = new Date(date_start).toISOString();
    let end     = new Date(date_end).toISOString();
    // push start date onto results
    results.push(formatDate(date_start));
    // loop dates
    while(date < end){
        // add day to date
        date = addDays(date, 1);
        // push into array
        results.push(formatDate(date));
    }
    // return dates array
    return results;
}
/*------------------------------------------------------*/
/**
 * @name getNthFirst
 * @type {Function}
 * @param {Array} arr
 * @param {Number} n
 */
/*------------------------------------------------------*/
function getNthFirst(arr, n){
    let temp_arr = arr.filter((__, index) => (index + 1) % n === 0);
    temp_arr.push(arr[0]);
    temp_arr.sort();
    // return array of sorted dates
    return temp_arr;
}
/*------------------------------------------------------*/
/**
 * @name getNthLast
 * @type {Function}
 * @param {Array} arr
 * @param {Number} n
 */
/*------------------------------------------------------*/
function getNthLast(arr, n){
    let temp_arr = arr.filter((__, index) => (index + 1) % n === 0);
    temp_arr.push(arr[arr.length - 1]);
    temp_arr.sort();
    // return array of sorted dates
    return temp_arr;
}
/*------------------------------------------------------*/
/**
 * @name getNthFirstAndLast
 * @type {Function}
 * @param {Array} arr
 * @param {Number} n
 */
/*------------------------------------------------------*/
function getNthFirstLast(arr, n){
    let temp_arr = arr.filter((__, index) => (index + 1) % n === 0);
    temp_arr.push(arr[0]);
    temp_arr.push(arr[arr.length - 1]);
    temp_arr.sort();
    // return array of sorted dates
    return temp_arr;
}