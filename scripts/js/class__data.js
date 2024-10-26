/**
 * @file class__data.js
*/

/*------------------------------------------------------*/
/**
 * @name Data
 * @type {Class}
 * @namespace Data
 * @description
 */
/*------------------------------------------------------*/
class Data {
    /*------------------------------------------------------*/
    /**
     * @name constructor
     * @memberof Data
     * @property
     */
    /*------------------------------------------------------*/
    constructor(){
        /**
         * @name exchange_name
         * @type {string}
         * @memberof Data
         * @description
         */
        this.exchange_name = 'exchange';
        /**
         * @name currency_name
         * @type {string}
         * @memberof Data
         * @description
         */
        this.currency_name = 'currency';
        /**
         * @name result
         * @type {object}
         * @memberof Data
         * @description
         */
        this.result = {};
        /**
         * @typedef {Object.<string>.<object>} currency
         * @memberof Data
         * @property {currency} GBP
         * @property {currency} USD
         * @property {currency} MXN
         * @property {currency} AUD
         * @property {currency} INR
         * @property {currency} BRL
         * @property {currency} EUR
         * @property {currency} AED
         * @property {currency} JPY
         * @property {string}   currency.country
         * @property {string}   currency.abbv
         * @property {string}   currency.units
         * @property {HTMLEntity}    currency.symbol
         * @property {string}   currency.introduced
         * @property {array}    currency.banknotes
         * @property {string}   currency.text
         * @property {object}   currency.flag_img
         * @property {object}   currency.note_img
         */
        this.currency = {};
        /**
         * @name currency_codes
         * @type {array}
         * @memberof Data
         * @description
         */
        this.currency_codes = ['GBP', 'USD', 'MXN', 'AUD', 'INR', 'BRL', 'EUR', 'AED', 'JPY'];
    }
    /*------------------------------------------------------*/
    /**
     * @name initData
     * @memberof Data
     * @type {async function}
     * @param {string} storage_name
     * @property
     */
    /*------------------------------------------------------*/
    async initData(){
        // get exchange data
        let data_exchange = await this.fetchLocalData('scripts/JSON/data_full.json');
        // get currency data
        let data_currency = await this.fetchLocalData('scripts/JSON/currency.json');
        // store data
        let flag_exchange = await this.storeData(data_exchange, this.exchange_name);
        let flag_currency = await this.storeData(data_currency, this.currency_name);
        // redirect
        if(flag_exchange == true && flag_currency == true){
            window.location.replace('currency.html');
        }
    }
    /*------------------------------------------------------*/
    /**
     * @name onLoad
     * @type {function}
     * @memberof Data
     * @namespace captureData
     * @property
     */
    /*------------------------------------------------------*/
    onLoad(){
        // load session storage
        this.result     = this.loadData(this.exchange_name);
        this.currency   = this.loadData(this.currency_name);
    }
    /*------------------------------------------------------*/
    /**
     * @name captureData
     * @type {async function}
     * @memberof Data
     * @namespace captureData
     * @property
     */
    /*------------------------------------------------------*/
    async captureData(){
        /**
         * @name api
         * @type {object}
         * @memberof captureData
         * @description
         */
        let api = {
            key: '9Vjdc93wW8iCFFRnJWcUbFJgsZbjOT1m',
            url_latest: function(){return `https://api.currencybeacon.com/v1/latest?api_key=${this.key}`;},
            url_historical: function(base, date){return `https://api.currencybeacon.com/v1/historical?api_key=${this.key}&base=${base}&date=${date}`;},
            url_series: function(base, start, end){return `https://api.currencybeacon.com/v1/timeseries?api_key=${this.key}&base=${base}&start_date=${start}&end_date=${end}`;},
            url_currencies: function(type){return `https://api.currencybeacon.com/v1/currencies?api_key=${this.key}&type=${type}`;},
            url_convert: function(from, to, amount){return `https://api.currencybeacon.com/v1/convert?api_key=${this.key}&from=${from}&to=${to}&amount=${amount}`;}
        };
        /**
         * @name units_in
         * @type {array}
         * @memberof captureData
         */
        let bases = ['GBP', 'USD', 'MXN', 'AUD', 'INR', 'BRL', 'EUR', 'AED', 'JPY'];
        /**
         * @name dates
         * @type {array}
         * @memberof captureData
         * @description
         */
        let dates = [
            {year: 2021, months: 12},
            {year: 2022, months: 12},
            {year: 2023, months: 12},
            {year: 2024, months: 10}
        ];
        /**
         * @name formatData
         * @type {function}
         * @memberof captureData
         * @returns {array} 
         * @example {####-##-##: {aed: $$$, eur: $$$,...}}
         */
        function formatData(api_data, units){
            // properties
            let temp_obj = {};
            // parse temp data
            Object.entries(api_data).forEach(item => {
                // parse out non-date entries
                if(item[0] !== 'meta' && item[0] !== 'response'){
                    // properties
                    let temp_date       = item[0];
                    let temp_rates      = item[1];
                    let temp_queries    = {};
                    // loop rates
                    units.forEach(unit => {
                        temp_queries[unit] = temp_rates[unit];
                    });
                    // append to object
                    temp_obj[temp_date] = temp_queries;
                }
            });
            // return
            return temp_obj;
        }
        /**
         * @name repeatFetchData
         * @type {async function}
         * @memberof captureData
         * @returns {object}
         */
        async function repeatFetchData(api, bases, dates){
            // properties
            let temp_data_obj = {};
            // loop bases
            for(let i = 0; i < bases.length; i++){
                // properties
                let base        = bases[i];
                let temp_obj    = {};
                // loop dates
                for(let j = 0; j < dates.length; j++){
                    // properties
                    let year        = dates[j].year;
                    let months      = dates[j].months;
                    let temp_year   = {};
                    // loop months
                    for(let m = 1; m <= months; m++){
                        // date properties
                        let month   = m;
                        let start   = getFirstOfMonth(year, month);
                        let end     = getLastOfMonth(year, month);
                        // object properties
                        // fetch api data
                        let temp_data   = await fetchApi(api.url_series(base, start, end));
                        // format data and push to year_array
                        temp_year  = (formatData(temp_data, bases));
                    }
                    temp_obj[year] = temp_year;
                }
                // assign key year and array value
                temp_data_obj[base] = temp_obj;
            }
            // return data
            return temp_data_obj;
        }
        /**
         * @name postData
         * @type {function}
         * @memberof captureData
         * @param {string} path
         * @param {object} params
         * @param {string} method default = POST
         * @description
         */
        function postData(path, params, method="POST"){
            // define form
            let form = document.createElement('form');
            form.method = method;
            form.action = path;

            // parse params
            for(let key in params){
                if(params.hasOwnProperty(key)){
                    // build hidden form elements
                    let hidden      = document.createElement('input');
                    hidden.type     = 'hidden';
                    hidden.name     = key;
                    hidden.value    = params[key];
                    // append
                    form.appendChild(hidden);
                }
            }
            // append form to body
            document.body.appendChild(form);
            // submit form
            form.submit();
        }
        // assign variable to fetched data
        let data = await repeatFetchData(api, bases, dates);
        console.log(data);
        // POST data
        postData('scripts/php/write_json.php', {exchange: JSON.stringify(data)});
    }
    /*------------------------------------------------------*/
    /**
     * @name fetchLocalData
     * @type {async function}
     * @memberof Data
     * @param {string} path path/to/json/file.json
     * @property
     */
    /*------------------------------------------------------*/
    async fetchLocalData(path){
        try {
            let response = await fetch(path);
            // failure
            if(!response.ok){
                throw ('ERROR!');
            }
            // success
            let json_obj = await response.json();
            // return json
            return json_obj;
        }
        catch(error) {
            console.error(`ERROR: ${error}`);
        }
    }
    /*------------------------------------------------------*/
    /**
     * @name storeData
     * @type {async function}
     * @memberof Data
     * @property
     */
    /*------------------------------------------------------*/
    async storeData(data, storage_name){
        // store data
        sessionStorage.setItem(storage_name, JSON.stringify(data));
        if (sessionStorage.length > 0){return true;}
        else {return false;}
    }
    /*------------------------------------------------------*/
    /**
     * @name loadData
     * @type {function}
     * @memberof Data
     * @property
     */
    /*------------------------------------------------------*/
    loadData(storage_name){
        return JSON.parse(sessionStorage.getItem(storage_name));
    }
    /*------------------------------------------------------*/
    /**
     * @name queryData
     * @type {function}
     * @memberof Data
     * @property
     */
    /*------------------------------------------------------*/
    queryData(currency_code){
        let data = {
            historical: {},
            rates: {},
            info: {}
        };
        // get historical data
        data.historical = this.result[currency_code];
        // get recent exchange rates
        let records = Object.entries(this.result[currency_code]);
        let record  = Object.entries(records.slice(-1)[0][1]);
        data.rates  = record.slice(-1)[0][1];
        // get currency data
        data.info   = this.currency[currency_code];
        // return data
        return data;
    }
    /*------------------------------------------------------*/
    /**
     * @name queryQuotes
     * @type {method}
     * @memberof Data
     * @param {string} base_code
     * @description
     * @returns {array} [AED, JPY,...]
     */
    /*------------------------------------------------------*/
    queryQuotes(){}
    /*------------------------------------------------------*/
    /**
     * @name queryExchangeRates
     * @type {method}
     * @memberof Data
     * @param {string} base_code
     * @description
     * @returns {array} quotes {quote: USD, rate: 0.766}
     */
    /*------------------------------------------------------*/
    queryExchangeRates(base_code=""){
        // query all
        if(base_code.length == 0){
            let records = [];
            // loop
            Object.entries(this.result).forEach(base_item => {
                // properties
                base_code       = base_item[0];
                let base_arr    = base_item;
                let temp_obj    = {base: base_code, quotes: null};
                // push onto object
                temp_obj.quotes = (this.getlatestRates(base_arr, base_code));
                // push into records array
                records.push(temp_obj);
            });
            // return all records
            return records;
        // query specific base code
        } else if (base_code.length > 0){
            let base_arr = Object.entries(this.result[base_code]);
            // return single record
            return this.getlatestRates(base_arr, base_code);
        }
    }
    /*------------------------------------------------------*/
    /**
     * @name queryDataset
     * @memberof Data
     * @description
     */
    /*------------------------------------------------------*/
    queryDataset(){
        // properties
        let records     = [];
        let test        = [
            {base: 'USD', quotes: {
                GBP: {
                    dates: ['2021-12-01', '2021-12-02', '...'],
                    rates: [123, 3443, 123]
                },
                JPY: {
                    dates: ['2021-12-01', '2021-12-02', '...'],
                    rates: [0.554, 0.2443, 1.23]
                }
            }}
        ];
        let temp_obj    = {
            base: null,
            quote: null,
            rate_latest: null,
            rate_avg: null,
            percentage: null
        };
        Object.entries(this.result).forEach((base, index) => {
            // properties
            let base_code   = base[0];
            let base_data   = base[1];
            let years       = Object.keys(base_data);
            // loop years
            years.forEach(year => {
                // properties
                let quotes      = Object.keys(this.result);
                let dates       = Object.keys(base_data[year]);
                let quote_data  = Object.values(base_data[year]);
                // loop quotes
                quotes.forEach(quote => {
                    quote_data.forEach(entry => {
                        // loop quotes
                        console.log(entry[quote]);
                    });
                });
            });
        });
    }
    /*------------------------------------------------------*/
    /**
     * @name getlatestRates
     * @type {function}
     * @memberof Data
     * @param {array} base_arr
     * @param {string} base_code
     * @property {array} records
     * @property {array} data
     * @property {array} last_month
     * @property {string} last_key
     * @property {array} quotes
     * @property {array} rates
     * @description
     * @returns {array} quotes {quote: USD, rate: 0.766}
     */
    /*------------------------------------------------------*/
    getlatestRates(base_arr, base_code){
        // properties
        let records     = [];
        let data        = Object.entries(base_arr[1]);
        let last_month  = Object.keys(data[data.length - 1][1]);
        let last_key    = last_month[last_month.length - 1];
        let quotes      = Object.keys(data[data.length - 1][1][last_key]);
        let rates       = Object.values(data[data.length - 1][1][last_key]);
        // loop data and compile
        for(let i = 0; i < quotes.length; i++){
            if(quotes[i] != base_code){
                let temp_obj = {quote: quotes[i], rate: rates[i]};
                records.push(temp_obj);
            }
        }
        // return array
        return records;
    }
    /*------------------------------------------------------*/
    /**
     * @name update
     * @memberof Data
     * @property
     */
    /*------------------------------------------------------*/
    update(){}
}