/**
 * @file class__info.js
 */

/*------------------------------------------------------*/
/**
 * @name Info
 * @type {Class}
 * @namespace Info
 * @description
 */
/*------------------------------------------------------*/
class Info{
    /*------------------------------------------------------*/
    /**
     * @name constructor
     * @memberof Info
     * @property {boolean} active
     * @property {boolean} hidden
     */
    /*------------------------------------------------------*/
    constructor(){
        this.active     = false;
        this.hidden     = true;
        // DOM Elements
        this.parent     = document.getElementById('info');
        this.flag       = document.getElementById('info--flag');
        this.currency   = document.getElementById('info--currency');
        this.country    = document.getElementById('info--country');
        this.units      = document.getElementById('info--units');
        this.symbol     = document.getElementById('info--symbol');
        this.intro      = document.getElementById('info--intro');
        this.banknotes  = document.getElementById('info--banknotes');
        this.note       = document.getElementById('info--note');
        this.caption    = document.getElementById('info--caption');
        this.text       = document.getElementById('info--text');
        // initialize
        //this.activate();
        this.hide();
    }
    /*------------------------------------------------------*/
    /**
     * @name activate
     * @memberof Info
     * @property
     */
    /*------------------------------------------------------*/
    activate(){
        this.parent.style.display = 'grid';
        this.active = true;
        this.hidden = false;
    }
    /*------------------------------------------------------*/
    /**
     * @name hide
     * @memberof Info
     * @property
     */
    /*------------------------------------------------------*/
    hide(){
        this.parent.style.display = 'none';
        this.active = false;
        this.hidden = true;
    }
    /*------------------------------------------------------*/
    /**
     * @name update
     * @memberof Info
     * @param {object} data
     * @example data.base.info 
     * @property
     */
    /*------------------------------------------------------*/
    update(data){
        // set properties
        this.flag.src               = 'assets/flags/' + data.flag_img.src;
        this.currency.innerHTML     = data.abbv;
        this.country.innerHTML      = data.country;
        this.units.innerHTML        = data.units;
        this.symbol.innerHTML       = data.symbol;
        this.intro.innerHTML        = data.intro;
        this.banknotes.innerHTML    = data.banknotes.join(`, `);
        this.note.src               = 'assets/notes/' + data.note_img.src;
        this.caption.innerHTML      = data.note_img.alt;
        this.text.innerHTML         = data.text;
    }
}