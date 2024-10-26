/**
 * @file class__ticker.js
 */

/*------------------------------------------------------*/
/**
 * @name Ticker
 * @type {Class}
 * @namespace ChartPlot
 * @description
 */
/*------------------------------------------------------*/
class Ticker{
    /*------------------------------------------------------*/
    /**
     * @name constructor
     * @memberof Ticker
     * @param {object} data
     * @property
     */
    /*------------------------------------------------------*/
    constructor(data){
        this.parent     = document.getElementById('ticker');
        this.data       = data;
        this.data_set;

        //console.log(data);
    }
    /*------------------------------------------------------*/
    /**
     * @name buildDataSet
     * @memberof Ticker
     * @property
     */
    /*------------------------------------------------------*/
    buildDataSet(){}
    /*------------------------------------------------------*/
    /**
     * @name update
     * @memberof Ticker
     * @property
     */
    /*------------------------------------------------------*/
    update(){}
}