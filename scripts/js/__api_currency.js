/*------------------------------------------------------*/
/**
 * @file api_currence.js
 */
/*------------------------------------------------------*/
/**
 * @name api
 * @type {Object}
 * @description object of various currency apis and their credentials
 * @example api.name.url(param)
 */
const api = {
    oxr: {
        key: '8320539d8a66420f94245bfe9c036f0a',
        url_latest: 'https://openexchangerates.org/api/latest.json',
        url_currency: 'https://openexchangerates.org/api/currencies.json',
        url_history: function(date){return `historical/${date}.json`;},
        url_fetch: function(url){return `${url}?app_id=${this.key}`;}
    },
    fawaz: {
        key: null,
        version: 'v1',
        url_latest: function(currency){return `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/${this.version}/currencies/${currency}.json`;},
        url_date: function(currency, date){return `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/${this.version}/currencies/${currency}.json`;}
    },
    beacon: {
        key: '9Vjdc93wW8iCFFRnJWcUbFJgsZbjOT1m',
        url_latest: function(){return `https://api.currencybeacon.com/v1/latest?api_key=${this.key}`;},
        url_historical: function(base, date){return `https://api.currencybeacon.com/v1/historical?api_key=${this.key}&base=${base}&date=${date}`;},
        url_series: function(base, start, end){return `https://api.currencybeacon.com/v1/timeseries?api_key=${this.key}&base=${base}&start_date=${start}&end_date=${end}`;},
        url_currencies: function(type){return `https://api.currencybeacon.com/v1/currencies?api_key=${this.key}&type=${type}`;},
        url_convert: function(from, to, amount){return `https://api.currencybeacon.com/v1/convert?api_key=${this.key}&from=${from}&to=${to}&amount=${amount}`;}
    }
};
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
const units_in = coin.JAP.code;
fetchApi(api.beacon.url_series(units_in, '2024-09-01', '2024-10-01'), units_in);
// result 

// loop session storage objects
let data_historical = [];
for(const [key, value] of Object.entries(coin)){
    // result
    let result = JSON.parse(sessionStorage.getItem(value.code));
    data_historical.push(JSON.stringify(result));
}
console.log(data_historical);
let input = document.getElementById('data');
input.setAttribute('value', JSON.stringify(data_historical));


/*------------------------------------------------------*/
/***
 * @name fetchApi
 * @type {async function}
 * @param {string} api_url full url including api_key to fetch from api
 * @param {string} storage_name string to name in session storage; e.g. city name
 */
/*------------------------------------------------------*/
async function fetchApi(api_url, storage_name){
    try {
        const response = await fetch(api_url);
        // failure
        if(!response.ok){
            throw ('ERROR!');
        }
        // success
        const json_obj = await response.json();
        // store
        sessionStorage.setItem(storage_name, JSON.stringify(json_obj));
    }
    catch(error) {
        console.error(`ERROR: ${error}`);
    }
}
/*------------------------------------------------------*/
/**
 * @name dateRange
 * @type {Function}
 * @description
 * @returns array of dates yyyy-mm-dd
 */
/*------------------------------------------------------*/
function dateRange(start, end){
    let start_date  = new Date(start);
    let end_date    = new Date(end);
    let flag        = new Date(start_date);
    let result      = [];
    // loop
    while(flag <= end_date){
        let result_date = flag.setDate(flag.getDate() + 1);
        flag = new Date(result_date);
        result.push(flag.toISOString().slice(0, 10));
    }
    // return array
    return result;
}