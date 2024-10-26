/**
 * @file class__rates.js
 */

/*------------------------------------------------------*/
/**
 * @name ExchangeRates
 * @type {Class}
 * @namespace ExchangeRates
 * @description
 */
/*------------------------------------------------------*/
class ExchangeRates{
    /*------------------------------------------------------*/
    /**
     * @name constructor
     * @memberof ExchangeRates
     * @param {object} data
     * @property
     */
    /*------------------------------------------------------*/
    constructor(base){
        this.parent         = document.getElementById('exchange_rates');
        this.rows           = [];
        this.base_code      = base.currency_code;
        this.query_code     = base.quote_main.currency_code;
        this.base_values    = base.exchange_values;
        this.quote_values   = base.quote_main.exchange_values;
        // create rows
        this.createRows(this.base_values, this.quote_values, this.base_code, this.query_code);
    }
    /*------------------------------------------------------*/
    /**
     * @name createRows
     * @memberof ExchangeRates
     * @param {array} base_values
     * @param {array} quote_values
     * @param {string} base_code
     * @param {string} query_code
     * @property
     */
    /*------------------------------------------------------*/
    createRows(base_values, quote_values, base_code, quote){
        // loop values
        for(let i = 0; i < base_values.length; i++){
            // create rows
            this.createRow(base_values[i], quote_values[i], base_code, quote);
        }
    }
    /*------------------------------------------------------*/
    /**
     * @name createRow
     * @memberof ExchangeRates
     * @param {string} base_num
     * @param {string} quote_main
     * @param {string} base_code
     * @param {string} quote_main
     * @property
     */
    /*------------------------------------------------------*/
    createRow(base_num, quote_num, base_code, quote_code){
        // properties
        let sep = '&sol;';
        // create elements
        let title = document.createElement('b');
        let value = document.createElement('p');
        // assign
        title.innerHTML = `${base_code} ${sep} ${quote_code}`;
        value.innerHTML = `${base_num} ${sep} ${quote_num}`;
        // append
        this.parent.appendChild(title);
        this.parent.appendChild(value);
    }
    /*------------------------------------------------------*/
    /**
     * @name update
     * @memberof ExchangeRates
     * @param {object} data
     * @property
     */
    /*------------------------------------------------------*/
    update(){}
}