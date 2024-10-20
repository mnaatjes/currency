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
console.log(result);
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
const target = {key: 'MEX', code: 'MXN'};
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
    // format date
    let format_date = function(date_string){
        // parse
        let date_arr = date_string.split('-');
        let year     = date_arr[0];
        let month    = date_arr[1] - 1;
        let day      = date_arr[2];
        return new Date(year, month, day).toLocaleString('en-US', {month: 'short', day: 'numeric'});
    };
    dates.push(format_date(item.date));
    rates.push(item.exchange[target.code]);
});
console.log(dates);
console.log(rates);

/**
 * @name options
 * @type {Object}
 */
const options = {
    //layout: {padding:24}
    plugins: {
        title: {
            position: 'top',
            display: true,
            text: 'Currency Exchange Rates',
            color: 'rgb(255, 0, 0)',
            font: {size: 24}
        },
        subtitle: {display: true, text: 'Subtitulo'},
        legend: {display: true, position: 'bottom', align: 'center', text: 'Legend'},
        tooltip: {}
    }
};
/**
 * @name dataset_test
 * @type {Object}
 */
const dataset_test = [{
    label: `${coin[target.key].units} to ${coin[country].units}`,
    data: rates,
    fill: true,
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    borderColor: 'red',
    tension: 0.0,
    radius: 4,
    hoverRadius: 12,
}];
/**
 * @name data_test
 * @type {Object}
 */
const data_test = {
    labels: dates,
    datasets: dataset_test,
}
/**
 * @name config_line
 * @type {Object}
 * @description
 */
const config_line = {
    type: 'line',
    data: data_test,
    options: options
};
/**
 * @name ctx
 */
const ctx = document.getElementById('line_style');
/**
 * @implements Charts.js
 * @name chart_line
 * @type {HTMLElement}
 * @description
 */
const chart_line = new Chart(ctx, config_line);
