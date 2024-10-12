/*------------------------------------------------------*/
/**
 * @file DEFUNCT data_currency.js
 */
/*------------------------------------------------------*/
/**
 * @name coin
 * @type {Object}
 * @description currency codes by country
 */
const coin = {
    UK: {country: 'United Kingdom', units: 'Pound Sterling', code: 'gbp'},
    USA: {country: 'United States', units: 'Dollars', code: 'usd'},
    MEX: {country: 'Mexico', units: 'Pesos', code: 'mxn'},
    AUS: {country: 'Australia', units: 'Dollars', code: 'aud'},
    IND: {country: 'India', units: 'Rupees', code: 'inr'},
    BRA: {country: 'Brazil', units: 'Real', code: 'brl'},
    EU: {country: 'European Union', units: 'Euro', code: 'eur'},
    ARE: {country: 'United Arab Emirates', units: 'Dirham', code: 'aed'},
    JAP: {country: 'Japan', units: 'Yen', code: 'jpy'}
};
/**
 * @name storage_name
 * @description session storage name
 */
const storage_name = 'historical';
/**
 * @name codes
 * @description array of country currency codes
 */
const codes = function(){
    let arr = Object.values(coin);
    let res = [];
    arr.forEach(item => {
        res.push(item.code);
    });
    return res;
};
// grab unfiltered json file
fetchJSON('scripts/JSON/data_full.json', function(xhttp){
    sessionStorage.setItem(storage_name, xhttp.responseText);
});
// dump into object
let result      = JSON.parse(sessionStorage.getItem(storage_name));
let data_arr    = [];
// parse into array
result.forEach((item) => {
    data_arr.push(JSON.parse(item));
});
// parse full data
let temp_obj = {};
// loop all historical data
data_arr.forEach((item, index) => {
    // define country
    let country = Object.entries(coin)[index][0];
    // set properties for country
    temp_obj[country] = [];
    // loop item
    for(let [key, value] of Object.entries(item)){
        // strip 'meta' and 'response' keys
        if(key != 'meta' && key != 'response'){
            let temp_item = {};
            // set date and exchange properties
            temp_item['date']       = key;
            temp_item['exchange']   = {};
            // grab codes from list
            codes().forEach(coin_code => {
                // format code to upper
                let code = coin_code.toUpperCase();
                // match value to code
                if(Object.keys(value).includes(code)){
                    // append currencies to exchange
                    temp_item['exchange'][code] = value[code];
                }
            });
            // push to country array
            temp_obj[country].push(temp_item);
        }
    }
});

console.log(temp_obj);
// write to input
let input = document.getElementById('data');
input.setAttribute('value', JSON.stringify(temp_obj));