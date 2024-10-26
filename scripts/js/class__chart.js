/**
 * @file class__charts.js
 */

/*------------------------------------------------------*/
/**
 * @name ChartPlot
 * @type {Class}
 * @namespace ChartPlot
 * @description
 */
/*------------------------------------------------------*/
class ChartPlot{
    /*------------------------------------------------------*/
    /**
     * @name constructor
     * @memberof ChartPlot
     * @param {object} data
     * @property
     */
    /*------------------------------------------------------*/
    constructor(data){
        this.parent;
        this.bar_chart;
        this.line_chart;
        this.config;
        this.plugins;
        this.data_sets;
    }
    /*------------------------------------------------------*/
    /**
     * @name switchChart
     * @memberof ChartPlot
     * @property
     */
    /*------------------------------------------------------*/
    switchChart(){}
    /*------------------------------------------------------*/
    /**
     * @name buildDataSet
     * @memberof ChartPlot
     * @property
     */
    /*------------------------------------------------------*/
    buildDataSet(){}
    /*------------------------------------------------------*/
    /**
     * @name update
     * @memberof ChartPlot
     * @property
     */
    /*------------------------------------------------------*/
    update(){}
}