/**
 * @file class__calculator.js
 */

/*------------------------------------------------------*/
/**
 * @name Calculator
 * @type {Class}
 * @namespace Calculator
 * @description
 */
/*------------------------------------------------------*/
class Calculator{
    /*------------------------------------------------------*/
    /**
     * @name constructor
     * @memberof Calculator
     * @param {object} rates
     * @property
     */
    /*------------------------------------------------------*/
    constructor(rates){
        this.parent         = document.getElementById('calculator');
        this.input_base     = this.parent.querySelector('input[name="base"]');
        this.input_quote    = this.parent.querySelector('input[name="quote"]');
        this.error          = document.getElementById('calc__error');
        this.rates          = rates;
        this.hidden         = false;

        // monitor
        this.hide();
        //this.onEntry();
    }
    /*------------------------------------------------------*/
    /**
     * @name onEntry
     * @memberof Calculator
     * @property
     */
    /*------------------------------------------------------*/
    onEntry(){
        // loop inputs
        [this.input_base, this.input_quote].forEach(item => {
            /**
             * @listens #item.keydown
             */
            item.addEventListener('keydown', (e) => {this.validateEntry(e);});
            /**
             * @listens #item.keyup
             */
            item.addEventListener('keyup', (e) => {
                // override value if error
                e.target.value = this.cleanEntry(e.target.value);
                // determine output
                if(e.target.name == 'base'){this.input_quote.value = this.calculate(e.target.value, this.rates.base);}
                else {this.input_base.value = this.calculate(e.target.value, this.rates.quote);}
            });
        });
    }
    /*------------------------------------------------------*/
    /**
     * @name validateEntry
     * @type {method}
     * @memberof Calculator
     * @param {InputEvent} e
     * @returns {undefined}
     */
    /*------------------------------------------------------*/
    validateEntry(e){
        // extract input string
        let char_value = String.fromCharCode(e.keyCode);
        // check string against conditions and keys
        if((isNaN(char_value)) && (e.keyCode != 8) && (e.keyCode != 190)){
            // prohibit entry of invalid keys
            e.preventDefault();
        }
    }
    /*------------------------------------------------------*/
    /**
     * @name cleanEntry
     * @type {method}
     * @memberof Calculator
     * @param {number} value
     * @returns {number}
     */
    /*------------------------------------------------------*/
    cleanEntry(value){
        // properties
        let dec_pos = value.match(/\./);
        let dec_arr = value.match(/\./g);
        let count   = 0;
        // check if populated by decimals
        if(dec_arr != null){count = dec_arr.length;}
        // leading decimal
        if(count == 1){
            // prepend zero
            if(dec_pos.index == 0){value = 0 + value;}
        }
        // error conditions
        if(count > 1){value = value.slice(0, -1);}
        // return 
        return value;
    }
    /*------------------------------------------------------*/
    /**
     * @name calculate
     * @memberof Calculator
     * @param {number} value
     * @property {number} rate
     * @returns {number}
     */
    /*------------------------------------------------------*/
    calculate(value, rate){
        return (value * rate).toFixed(2);
    }
    /*------------------------------------------------------*/
    /**
     * @name show
     * @memberof Calculator
     * @property
     */
    /*------------------------------------------------------*/
    show(){this.parent.style.display = 'flex';}
    /*------------------------------------------------------*/
    /**
     * @name hide
     * @memberof Calculator
     * @property
     */
    /*------------------------------------------------------*/
    hide(){this.parent.style.display = 'none';}
    /*------------------------------------------------------*/
    /**
     * @name update
     * @memberof Calculator
     * @param {object} rates
     */
    /*------------------------------------------------------*/
    update(rates){this.rates = rates;}
}