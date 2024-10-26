/**
 * @file class__api_client.js
*/

/*------------------------------------------------------*/
/**
 * @name APIClient
 * @type {Class}
 * @namespace APIClient
 * @description
 */
/*------------------------------------------------------*/
class APIClient {
    /*------------------------------------------------------*/
    /**
     * @name constructor
     * @memberof APIClient
     * @type {constructor}
     * @property
     * @description
     */
    /*------------------------------------------------------*/
    constructor(){
        /**
         * @name api_key
         * @memberof APIClient
         * @type {String}
         * @description
         */
        this.api_key = '9Vjdc93wW8iCFFRnJWcUbFJgsZbjOT1m';
        /**
         * @name url
         * @type {String}
         * @memberof APIClient
         * @description
         */
        this.url = 'https://api.currencybeacon.com/v1/';
        /**
         * @name currency_codes
         * @memberof APIClient
         * @type {Array}
         * @description
         */
        this.currency_codes = ['GBP', 'USD', 'MXN', 'AUD', 'INR', 'BRL', 'EUR', 'AED', 'JPY'];
        /**
         * @name api_config
         * @memberof APIClient
         * @type {Object}
         * @description
         */
        this.api_config = {
            date_ranges: [],
            base_codes: this.currency_codes,

        };
        /**
         * @name loader
         * @type {Object}
         * @memberof APIClient
         * @description
         */
        this.loader = {
            node: document.getElementById('loader'),
            display: function(){this.node.style.display = 'flex';},
            hide: function(){this.node.style.display = 'none';},
            update: function(color){this.node.style.borderTopColor = color;},
            colors: {tomato: '#ff6347', blue: '#6495ed', dark: '#333333'}
        };

        // test
        //this.initAPIData();
    }
    /*------------------------------------------------------*/
    /**
     * @name initAPIData
     * @memberof APIClient
     * @type {async method}
     * @param {Object} date_range
     * @param {String} date_range.start yyyy-mm-dd
     * @param {String} date_range.end yyyy-mm-dd
     * @param {Array} base_codes
     * @param {String} file_name data.json
     * @param {String} batch_name jan-2020
     * @property {String} fp filepath
     * @description
     */
    /*------------------------------------------------------*/
    async initAPIData(){}
    /*------------------------------------------------------*/
    /**
     * @name downloadData
     * @memberof APIClient
     * @type {async method}
     * @param {Object} date_range
     * @param {String} date_range.start yyyy-mm-dd
     * @param {String} date_range.end yyyy-mm-dd
     * @param {Array} base_codes
     * @param {String} file_name data.json
     * @param {String} batch_name jan-2020
     * @property {String} fp filepath
     * @description
     */
    /*------------------------------------------------------*/
    async downloadData(date_range, base_codes, file_name, batch_name){
        // properties
        let fp = 'scripts/JSON/' + file_name;
        // display loader
        this.loader.display();
        // fetch api multiple times
        let results = await this.fetchMultiple(date_range, base_codes);
        // hide loader
        if(results.length > 0){this.loader.hide();}
        console.log(results);
    }
    /*------------------------------------------------------*/
    /**
     * @name formatResponse
     * @memberof APIClient
     * @type {async method}
     * @param {Object} response
     * @param {string} base_code
     * @description
     */
    /*------------------------------------------------------*/
    async formatResponse(response){
        // properties

        // return object
        return response;
    }
    /*------------------------------------------------------*/
    /**
     * @name fetchAPI
     * @memberof APIClient
     * @type {async method}
     * @param {string} uri
     * @description
     */
    /*------------------------------------------------------*/
    async fetchAPI(uri){
        try {
            let response = await fetch(uri);
            // failure
            if(!response.ok){throw ('ERROR!');}
            // success
            return await response.json();
        }
        catch(error) {console.error(`ERROR: ${error}`);}
    }
    /*------------------------------------------------------*/
    /**
     * @name fetchLatest
     * @memberof APIClient
     * @type {async method}
     * @property {string} key this.api_key
     * @property {string} type
     * @property {string} uri
     * @description
     */
    /*------------------------------------------------------*/
    async fetchLatest(){
        // property
        let key     = '?api_key=' + this.api_key;
        let type    = 'latest'
        let uri     = this.url + type + key;
        // fetch api
        let response = await this.fetchAPI(uri);
        // return response array
        return this.stripProps(response);
    }
    /*------------------------------------------------------*/
    /**
     * @name fetchSeries
     * @memberof APIClient
     * @type {async method}
     * @param {string} base_code
     * @param {string} date_start
     * @param {string} date_end
     * @property {string} key this.api_key
     * @property {string} type
     * @property {string} uri
     * @description
     */
    /*------------------------------------------------------*/
    async fetchSeries(base_code, date_start, date_end){
        // property
        let key     = '?api_key=' + this.api_key;
        let base    = '&base=' + base_code;
        let start   = '&start_date=' + date_start;
        let end     = '&end_date=' + date_end;
        let type    = 'timeseries'
        let uri     = this.url + type + key + base + start + end;
        // fetch api
        let response = await this.fetchAPI(uri);
        // return response array
        return this.stripProps(response, base_code);
    }
    /*------------------------------------------------------*/
    /**
     * @name fetchDate
     * @memberof APIClient
     * @type {async method}
     * @param {string} base_code currency code
     * @param {string} target_date yyyy-mm-dd
     * @property {string} key this.api_key
     * @property {string} base 
     * @property {string} date
     * @property {string} type
     * @property {string} uri
     * @description
     */
    /*------------------------------------------------------*/
    async fetchDate(base_code, target_date){
        // property
        let key     = '?api_key=' + this.api_key;
        let base    = '&base=' + base_code;
        let date    = '&date=' + target_date;
        let type    = 'historical'
        let uri     = this.url + type + key + base + date;
        // fetch api
        let response = await this.fetchAPI(uri);
        // return response array
        return this.stripProps(response);
    }
    /*------------------------------------------------------*/
    /**
     * @name stripProps
     * @memberof APIClient
     * @type {method}
     * @param {Object} api_object
     * @param {String} base_code
     * @description
     * @returns {Object}
     */
    /*------------------------------------------------------*/
    stripProps(api_object, base_code=""){
        // properties
        let exchanges   = [];
        // check type of entry
        if('rates' in api_object){
            // type: latest, historical
            // reduce to response property
            api_object      = api_object.response;
            // check object size
            let rates_arr   = Object.entries(api_object.rates);
            let date        = api_object.date;
            let base        = api_object.base;
            // loop all rates
            rates_arr.forEach(item => {
                // loop quotes
                this.currency_codes.forEach(code => {
                    // parse unwanted quotes
                    if((item[0] == code) && (item[0] != base)){
                        exchanges.push({date: date, quote: code, rate: item[1]});
                    }
                });
            });
        } else if (!('rates' in api_object) && base_code.length > 0){
            // type: series
            // strip meta and response objects
            api_object  = api_object.response;
            let dates   = Object.keys(api_object);
            // loop api object entries
            Object.values(api_object).forEach((rates_arr, index) => {
                let date = dates[index];
                // loop quote codes
                this.currency_codes.forEach((code, index) => {
                    // remove base == quote
                    if(base_code != code){
                        exchanges.push({date: date, quote: code, rate: rates_arr[code]});
                    }
                });
            });
        }
        // return array data
        return exchanges;
    }
    /*------------------------------------------------------*/
    /**
     * @name fetchMultiple
     * @memberof APIClient
     * @type {async method}
     * @param {Object} date_range
     * @param {Array} base_arr
     * @description
     */
    /*------------------------------------------------------*/
    async fetchMultiple(date_range, base_arr){
        // properties
        let results         = [];
        let dates_obj       = this.buildDatesArray(date_range);
        let dates_start     = dates_obj.start;
        let dates_end       = dates_obj.end;

        // loop base array
        for(let i = 0; i < base_arr.length; i++){
            // properties
            let base_code   = base_arr[i];
            let base_object = {base: base_code, exchanges: []};
            for(let j = 0; j < dates_start.length; j++){
                // properties
                let start   = dates_start[j];
                let end     = dates_end[j];
                // fetch api
                let response = await this.fetchSeries(base_code, start, end);
                // push to object exchange array
                base_object.exchanges = base_object.exchanges.concat(response);
            }
            results.push(base_object);
        }
        return results;
    }
    /*------------------------------------------------------*/
    /**
     * @name buildDatesArray
     * @memberof APIClient
     * @type {Method}
     * @param {Object} date_range
     * @param {Date} date_range.start
     * @param {Date} date_range.end
     * @description
     */
    /*------------------------------------------------------*/
    buildDatesArray(date_range){
        // properties
        let results         = [];
        let adjust_start    = formatDate(addDays(date_range.start, -1));
        let range_start     = getDateRange(date_range.start, date_range.end);
        let range_end       = getDateRange(adjust_start, date_range.end);
        let data_arr_start  = getNthFirst(range_start, 10);
        let data_arr_end    = getNthLast(range_end, 10);
        // return object of arrays
        return {start: data_arr_start, end: data_arr_end};
    }
    /*------------------------------------------------------*/
    /**
     * @name writeData
     * @memberof APIClient
     * @type {Method}
     * @param {String}
     * @property {String}
     * @description
     */
    /*------------------------------------------------------*/
    writeData(){
        
    }
}