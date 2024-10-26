/*------------------------------------------------------*/
/**
 * @file class__user.js
 */
/*------------------------------------------------------*/
/*------------------------------------------------------*/
/**
 * @name UserSelect
 * @type {Class}
 * @namespace UserSelect
 * @description
 */
/*------------------------------------------------------*/
class UserSelect extends Data{
    /*------------------------------------------------------*/
    /**
     * @name constructor
     * @memberof UserSelect
     * @param {}
     * @property
     */
    /*------------------------------------------------------*/
    constructor(){
        super();
        /**
         * @implements data.onLoad()
         */
        this.onLoad();
        /**
         * @name code_base
         * @type {string}
         * @memberof UserSelect
         * @description currency code of base object
         */
        this.code_base       = 'USD';
        /**
         * @name code_query
         * @type {string}
         * @memberof UserSelect
         * @description currency code of main quote object
         */
        this.code_quote      = 'GBP';
        /**
         * @name data
         */
        this.data = this.updateData(this.code_base, this.code_quote);
        /**
         * @name rate_base
         * @type {number}
         * @memberof UserSelect
         * @description exchange rate from base to main quote
         */
        this.rate_base = this.data.base.rates[this.code_quote];
        /**
         * @name rate_quote
         * @type {number}
         * @memberof UserSelect
         * @description exchange rate from main quote to base
         */
        this.rate_quote = this.data.quote.rates[this.code_base];
        /**
         * @name btn_menu_home
         * @type {object}
         * @memberof UserSelect
         * @description button object
         */
        this.btn_menu_home      = new Button('btn_menu_home');
        /**
         * @name btn_menu_calc
         * @type {object}
         * @memberof UserSelect
         * @description button object
         */
        this.btn_menu_calc      = new Button('btn_menu_calc');
        /**
         * @name btn_menu_chart
         * @type {object}
         * @memberof UserSelect
         * @description button object
         */
        this.btn_menu_chart     = new Button('btn_menu_chart');
        /**
         * @name btn_base
         * @type {object}
         * @memberof UserSelect
         * @description button object
         */
        this.btn_base           = new SelectButton('btn_base', this.code_base, this.currency);
        /**
         * @name btn_quote
         * @type {object}
         * @memberof UserSelect
         * @description button object
         */
        this.btn_quote          = new SelectButton('btn_quote', this.code_quote, this.currency);
        /**
         * @name btn_info_base
         * @type {object}
         * @memberof UserSelect
         * @description button object
         */
        this.btn_info_base      = new Button('btn_info_base');
        /**
         * @name btn_info_quote
         * @type {object}
         * @memberof UserSelect
         * @description button object
         */
        this.btn_info_quote     = new Button('btn_info_quote');
        /**
         * @name info
         * @type {InstanceType}
         * @memberof UserSelect
         * @implements {class} Info
         * @description
         */
        this.info = new Info();
        /**
         * @name calculator
         * @type {InstanceType}
         * @memberof UserSelect
         * @implements {class} calculator
         * @description
         */
        this.calculator = new Calculator({base: this.rate_base, quote: this.rate_quote});
        /**
         * @name ticker
         * @type {InstanceType}
         * @memberof UserSelect
         * @implements {class} Ticker
         * @description
         */
        this.ticker = new Ticker(this.queryDataset());
        /**
         * @implements {method} initUser
         * @memberof UserSelect
         */
        this.initUser(this.code_base, this.code_quote, this.data);

        // test add quote
        console.log(this.base);
    }
    /*------------------------------------------------------*/
    /**
     * @name initUser
     * @memberof UserSelect
     * @param {string} default_base
     * @param {string} default_quote
     * @param {{base: {object}, quote: {object}}} data
     * @returns {string} default_base
     * @property
     */
    /*------------------------------------------------------*/
    initUser(default_base, default_quote, data){
        // create base instance
        this.base = new Base(default_base, data.base);
        // select button and format
        this.selectBase(this.default_base);
        // select quote
        this.base.addQuote(new Quote(default_quote, data.quote));
        // test info
        this.info.update(data.base.info);
    }
    /*------------------------------------------------------*/
    /**
     * @name selectBase
     * @memberof UserSelect
     * @param {string} currency_code
     * @property
     */
    /*------------------------------------------------------*/
    selectBase(currency_code){
        // update rows order
        this.btn_base.selectRow(currency_code);
    }
    /*------------------------------------------------------*/
    /**
     * @name selectBase
     * @memberof UserSelect
     * @param {string} currency_code
     * @property
     */
    /*------------------------------------------------------*/
    selectQuote(currency_code){
        // update rows order
        this.btn_quote.selectRow(currency_code);
    }
    /*------------------------------------------------------*/
    /**
     * @name updateData
     * @memberof UserSelect
     * @param {string} base_code
     * @param {string} quote_code
     * @returns {{base: {object}, quote: {object}}} data 
     */
    /*------------------------------------------------------*/
    updateData(base_code, quote_code){
        let base_data   = this.queryData(base_code);
        let quote_data  = this.queryData(quote_code);
        return {base: base_data, quote: quote_data};
    }
    /*------------------------------------------------------*/
    /**
     * @name removeQuote
     * @memberof UserSelect
     * @param {string} country_code
     * @property
     */
    /*------------------------------------------------------*/
    removeQuote(country_code){}
    /*------------------------------------------------------*/
    /**
     * @name monitorBtnState
     * @memberof UserSelect
     * @type {EventListenerObject}
     * @param {array} buttons
     * @property
     */
    /*------------------------------------------------------*/
    monitorBtnState(buttons){}
    /*------------------------------------------------------*/
    /**
     * @name switchChart
     * @memberof UserSelect
     * @type {EventListenerObject}
     * @param {boolean} trigger
     * @property
     */
    /*------------------------------------------------------*/
    switchChart(trigger){}
    /*------------------------------------------------------*/
    /**
     * @name chartController
     * @memberof UserSelect
     * @type {EventListenerObject}
     * @param {array} quotes
     * @property
     */
    /*------------------------------------------------------*/
    chartController(quotes){}
    /*------------------------------------------------------*/
    /**
     * @name updateUser
     * @memberof UserSelect
     * @type {method}
     */
    /*------------------------------------------------------*/
    updateUser(){}
}