/*------------------------------------------------------*/
/**
 * @file data_currency.js
 */
/*------------------------------------------------------*/
/**
 * @name storage_name
 * @description session storage name
 */
const storage_name = 'historical';
/**
 * @implements fetchJSON
 * @type {Function}
 * @returns sessionStorage json string
 */
fetchJSON('scripts/JSON/data_historical.json', function(xhttp){
    sessionStorage.setItem(storage_name, xhttp.responseText);
});
/**
 * @name result
 * @type {Object}
 * @description historical data from json file
 */
const result = JSON.parse(sessionStorage.getItem(storage_name));
/**
 * @name country
 * @type {String}
 * @description
 */
const country = 'UK';
/**
 * @name target
 * @type {String}
 * @description currency code
 */
const target = {key: 'USA', code: 'USD'};
/**
 * @name coin
 * @type {Object}
 * @description currency codes by country
 */
const coin = {
    UK: {country: 'United Kingdom', units: 'Pound Sterling', code: 'GBP'},
    USA: {country: 'United States', units: 'Dollars', code: 'USD'},
    MEX: {country: 'Mexico', units: 'Pesos', code: 'MXN'},
    AUS: {country: 'Australia', units: 'Dollars', code: 'AUD'},
    IND: {country: 'India', units: 'Rupees', code: 'INR'},
    BRA: {country: 'Brazil', units: 'Real', code: 'BRL'},
    EU: {country: 'European Union', units: 'Euro', code: 'EUR'},
    ARE: {country: 'United Arab Emirates', units: 'Dirham', code: 'AED'},
    JAP: {country: 'Japan', units: 'Yen', code: 'JPY'}
};

// loop results and capture data
const dates = [];
const rates = [];
result[country].forEach(item => {
    console.log(item.date);
    //let date_formatted = new Date(item.date).toLocaleString('en-UK', {month: 'short', day: 'numeric'});
    let date_formatted = new Date(item.date).getMonth();
    dates.push(date_formatted);
    rates.push(item.exchange[target.code]);
});
console.log(dates);
console.log(rates);

/**
 * @name dataset_test
 * @type {Object}
 */
const dataset_test = [{
    label: `${coin[target.key].units} to ${coin[country].units}`,
    data: rates,
    fill: true,
    borderColor: 'red',
    tension: 0.0
}];
/**
 * @name data_test
 * @type {Object}
 */
const data_test = {
    labels: dates,
    datasets: dataset_test
}
/**
 * @name config_line
 * @type {Object}
 * @description
 */
const config_line = {
    type: 'line',
    data: data_test
};
/**
 * @implements Charts.js
 * @name chart_line
 * @type {HTMLElement}
 * @description
 */
const chart_line = new Chart(document.getElementById('line_style'), config_line);
