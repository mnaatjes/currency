//-------------------------------------------------------------------------------------------------------
// CIS 174: Charts.js Test
//-------------------------------------------------------------------------------------------------------
/**
 * @name dataset_a
 */
const dataset_a = [
    {x: 100, y: 40},
    {x: 72, y: 7},
    {x: 82, y: 32},
    {x: 72, y: 60}
];
/**
 * @name dataset_b
 */
const dataset_b = [
    {x: 31, y: 90},
    {x: 82, y: 17},
    {x: 22, y: 32},
    {x: 52, y: 80}
];
/**
 * @name dataset_c
 */
const dataset_c = [34, 0, 12, 47, 12, 15, 42];
/**
 * @name dataset_d
 */
const dataset_d = [93, 87, 12, 45, 49, 12, 45];
/**
 * @name data_scatter
 */
const data_scatter = {
    datasets: [
        {
            label: 'DataSet 01',
            pointRadius: 4,
            pointBackgroundColor: 'rgba(0, 255, 0, 1.0)',
            backgroundColor: 'rgba(0, 255, 0, 1.0)',
            data: dataset_a
        },
        {
            label: 'DataSet 02',
            pointRadius: 4,
            pointBackgroundColor: 'rgba(0, 255, 255, 1.0)',
            backgroundColor: 'rgba(0, 255, 255, 1.0)',
            data: dataset_b
        }
    ]
};
/**
 * @name data_line
 */
const data_line = {
    labels: ['A', 'B', 'C', 'D', 'E', 'F'],
    datasets: [{
        label: 'Data Set C',
        data: dataset_c,
        fill: false,
        //borderDash: [4, 4],
        borderColor: 'rgba(0, 100, 255, 1.0)',
        borderWidth: 2,
        tension: 0.0
    }]
};
/**
 * @name config_line
 */
const config_line = {
    type: 'line',
    data: data_line,
};
/*------------------------------------------------------*/
/**
 * @implements data_scatter
 */
/*------------------------------------------------------*/
const scatter = new Chart(document.getElementById('scatter'), {
    type: 'scatter',
    data: data_scatter
});
/*------------------------------------------------------*/
/**
 * @implements data_line
 */
/*------------------------------------------------------*/
const line_style = new Chart(document.getElementById('line_style'), config_line);