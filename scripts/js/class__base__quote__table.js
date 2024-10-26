/**
 * @file class__base__quote__table.js
 */

/*------------------------------------------------------*/
/**
 * @name Base
 * @type {Object}
 * @namespace Base
 * @description
 */
/*------------------------------------------------------*/
class Base {
    /*------------------------------------------------------*/
    /**
     * @name constructor
     * @memberof Base
     * @param {string} default_code
     * @param {object} data base_data
     * @property
     */
    /*------------------------------------------------------*/
    constructor(default_code, data){
        /**
         * @name currency_code
         * @type {string}
         * @memberof Base
         * @description
         */
        this.currency_code  = default_code;
        /**
         * @name historical
         * @type {object}
         * @memberof Base
         * @description
         */
        this.historical = data.historical;
        /**
         * @name historical
         * @type {object}
         * @memberof Base
         * @description
         */
        this.exchange_rates = data.rates;
        /**
         * @name historical
         * @type {object}
         * @memberof Base
         * @description
         */
        this.info = data.info;
        /**
         * @name quotes
         * @type {array}
         * @memberof Base
         * @description
         */
        this.quotes = [];
        /**
         * @name quote_main
         * @type {object}
         * @memberof Base
         * @description
         */
        this.quote_main = {};
        /**
         * @name default_values
         * @type {array}
         * @memberof Base
         * @description
         */
        this.default_values = [1, 10, 100, 1000];
        /**
         * @name exchange_values
         * @type {array}
         * @memberof Base
         * @description
         */
        this.exchange_values = this.setBaseValues(this.info.symbol);
    }
    /*------------------------------------------------------*/
    /**
     * @name initBase
     * @memberof Base
     * @param {object} quote
     * @property
     */
    /*------------------------------------------------------*/
    initBase(){

    }
    /*------------------------------------------------------*/
    /**
     * @name isMainQuote
     * @memberof Base
     * @param {object} quote
     * @property
     */
    /*------------------------------------------------------*/
    isMainQuote(quote){
        // determine is_main quote
        if(this.quotes.length == 1){
            // set to main
            quote.is_main   = true;
            this.quote_main = quote;
        }
    }
    /*------------------------------------------------------*/
    /**
     * @name addQuote
     * @memberof Base
     * @param {object} quote
     */
    /*------------------------------------------------------*/
    addQuote(quote){
        this.quotes.push(quote);
        // check if main
        this.isMainQuote(quote);
        // set base
        quote.base_code = this.currency_code;
        // calculate exchange_values
        quote.exchange_values = this.setQuoteValues(quote.exchange_rates, quote.info.symbol);
    }
    /*------------------------------------------------------*/
    /**
     * @name setBaseValues
     * @memberof Base
     * @param {object} base
     * @property
     */
    /*------------------------------------------------------*/
    setBaseValues(symbol){
        let values = [];
        // loop default values
        this.default_values.forEach(num => {
            values.push(`${symbol}${num.toFixed(2)}`);
        });
        // return values
        return values;
    }
    /*------------------------------------------------------*/
    /**
     * @name setQuoteValues
     * @memberof Base
     * @param {object} rates
     * @param {object} symbol
     * @returns {array}
     */
    /*------------------------------------------------------*/
    setQuoteValues(rates, symbol){
        let rate    = rates[this.currency_code];
        let values  = [];
        // loop
        this.default_values.forEach(value => {
            let num = (value / rate).toFixed(2);
            values.push(`${symbol}${num}`);
        });
        // return result
        return values;
    }
}

/*------------------------------------------------------*/
/**
 * @name Quote
 * @type {Object}
 * @namespace Quote
 * @description
 */
/*------------------------------------------------------*/
class Quote {
    /*------------------------------------------------------*/
    /**
     * @name constructor
     * @memberof Quote
     * @param {string} currency_code
     * @param {object} data quote_data
     * @property
     */
    /*------------------------------------------------------*/
    constructor(currency_code, data){
        /**
         * @name currency_code
         * @type {string}
         * @memberof Base
         * @description
         */
        this.currency_code  = currency_code;
        /**
         * @name historical
         * @type {object}
         * @memberof Base
         * @description
         */
        this.historical = data.historical;
        /**
         * @name exchange_rates
         * @type {object}
         * @memberof Base
         * @description
         */
        this.exchange_rates = data.rates;
        /**
         * @name info
         * @type {object}
         * @memberof Base
         * @description
         */
        this.info = data.info;
        /**
         * @name is_main
         * @type {object}
         * @memberof Base
         * @description
         */
        this.is_main = false;
        /**
         * @name base_code
         * @type {object}
         * @memberof Base
         * @description
         */
        this.base_code = '';
        /**
         * @name exchange_values
         * @type {array}
         * @memberof Base
         * @description
         */
        this.exchange_values = [];
    }
}

/*------------------------------------------------------*/
/**
 * @name RatesTable
 * @type {Object}
 * @namespace RatesTable
 * @description
 */
/*------------------------------------------------------*/
class RatesTable{
    /*------------------------------------------------------*/
    /**
     * @name constructor
     * @memberof RatesTable
     * @param {object} result
     * @property
     */
    /*------------------------------------------------------*/
    constructor(result){
        this.exchanges_table;
    }
    /*------------------------------------------------------*/
    /**
     * @name buildTable
     * @memberof RatesTable
     * @param {object} result
     * @property
     */
    /*------------------------------------------------------*/
    buildTable(result){}
}