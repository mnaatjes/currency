/**
 * @file class__button.js
 */

/*------------------------------------------------------*/
/**
 * @name Button
 * @type {Class}
 * @namespace Button
 * @description
 */
/*------------------------------------------------------*/
class Button{
    /*------------------------------------------------------*/
    /**
     * @name constructor
     * @memberof Button
     * @param {string} btn_id 
     * @param {string} default_state
     * @description
     */
    /*------------------------------------------------------*/
    constructor(btn_id, default_state="enabled"){
        this.id         = btn_id;
        this.node       = document.getElementById(btn_id);
        this.active     = false;
        this.hidden     = false;
        this.enabled    = false;
        this.state      = this.setState(default_state);
    }
    /*------------------------------------------------------*/
    /**
     * @name setState
     * @memberof Button
     * @param {string} btn_id 
     * @property
     */
    /*------------------------------------------------------*/
    setState(state=''){
        // if undefined
        if(state.length == 0){
            // define
            if(this.active == true){state = 'active';}
            else if(this.active != true){state = 'hidden';}
            else if(this.enabled == true){state = 'enabled';}
            else if(this.enabled != true){state = 'disabled';}
        } else {
            // switch
            switch(state){
                case 'active':
                    this.active     = true;
                    this.hidden     = false;
                    this.enabled    = false;
                    break;
                case 'hidden':
                    this.active     = false;
                    this.hidden     = true;
                    this.enabled    = false;
                    break;
                case 'enabled':
                    this.active     = false;
                    this.hidden     = false;
                    this.enabled    = true;
                    break;
            }
        }
        // set state
        this.node.setAttribute('data-state', state);
        // return state
        return state;
    }
    /*------------------------------------------------------*/
    /**
     * @name activate
     * @memberof Button
     * @property
     */
    /*------------------------------------------------------*/
    activate(){}
    /*------------------------------------------------------*/
    /**
     * @name hide
     * @memberof Button
     * @property
     */
    /*------------------------------------------------------*/
    hide(){}
    /*------------------------------------------------------*/
    /**
     * @name enable
     * @memberof Button
     * @property
     */
    /*------------------------------------------------------*/
    enable(){}
    /*------------------------------------------------------*/
    /**
     * @name disable
     * @memberof Button
     * @property
     */
    /*------------------------------------------------------*/
    disable(){}
    /*------------------------------------------------------*/
    /**
     * @name changeBehavior
     * @memberof Button
     * @property
     */
    /*------------------------------------------------------*/
    changeBehavior(){}
}
/*------------------------------------------------------*/
/**
 * @name SelectButton
 * @type {Class}
 * @namespace SelectButton
 * @description
 */
/*------------------------------------------------------*/
class SelectButton extends Button {
    /*------------------------------------------------------*/
    /**
     * @name constructor
     * @memberof SelectButton
     * @param {string} btn_id 
     * @param {string} default_code
     * @param {string} currency_arr
     * @param {string} default_state visible
     * @description
     */
    /*------------------------------------------------------*/
    constructor(btn_id, default_code, currency_arr, default_state='visible'){
        super(btn_id, default_state);

        this.code               = default_code;
        this.flag_img           = 'assets/flags/' + currency_arr[this.code].flag_img.src;
        this.currency_arr       = this.reorderCodes(Object.keys(currency_arr), default_code);
        this.row_titles         = Array.from(this.currency_arr);
        this.title              = this.row_titles.shift();
        this.container_hidden   = false;
        this.container_state    = this.setContainerState(this.node);
        this.container          = this.initContainer(btn_id, this.node, this.container_state);
        this.rows               = this.createRows(this.row_titles);
        
        // initialize
        this.initSelectButton(this.node, this.container, this.title, this.rows);
    }
    /*------------------------------------------------------*/
    /**
     * @name initSelectButton
     * @memberof SelectButton
     * @param {array} currency_arr
     * @param {string} default_code
     * @returns {object} reordered array
     */
    /*------------------------------------------------------*/
    initSelectButton(btn_node, container, title, rows){
        btn_node.innerHTML = `<h5>${title}</h5>`;
        this.displayRows(container, rows);
    }
    /*------------------------------------------------------*/
    /**
     * @name initContainer
     * @memberof SelectButton
     * @param {string} btn_id
     * @param {HTMLElement} btn_node
     * @returns {HTMLElement} container_btn_id
     */
    /*------------------------------------------------------*/
    initContainer(btn_id, btn_node, state){
        // create element
        let div = document.createElement('div');
        div.id  = `container_${btn_id}`;
        // set attributes
        this.setContainerState(btn_node, state);
        div.style.border        = '2px solid red';
        div.style.borderRadius  = '8px';
        // insert element
        btn_node.insertAdjacentElement('afterend', div);
        // return node
        return document.getElementById(div.id);
    }
    /*------------------------------------------------------*/
    /**
     * @name setContainerState
     * @memberof SelectButton
     * @param {HTMLElement} btn_node
     * @param {string} state
     * @returns {string} 
     */
    /*------------------------------------------------------*/
    setContainerState(btn_node, state=""){
        // if supplied state
        if(state.length > 0){
            switch(state){
                // set object properties
                case 'visible':
                    this.container_hidden = false;
                    break;
                case 'hidden':
                    this.container_hidden = true;
                    break;
            }
        // if state empty
        } else if (state.length == 0){
            if(this.container_hidden == false){state = 'visible';}
            else if(this.container_hidden == true){state = 'hidden';}
        }
        // set DOM attribute
        btn_node.setAttribute('data-state', state);
        // return value
        return state;
    }
    /*------------------------------------------------------*/
    /**
     * @name reorderCodes
     * @memberof SelectButton
     * @param {array} currency_arr
     * @param {string} code_start
     * @returns {object} reordered array
     */
    /*------------------------------------------------------*/
    reorderCodes(currency_arr, code_start){
        // reorder array
        let index   = currency_arr.indexOf(code_start);
        return currency_arr.slice(index).concat(currency_arr.slice(0, index));
    }
    /*------------------------------------------------------*/
    /**
     * @name createRows
     * @memberof SelectButton
     * @param {array} row_titles
     * @description
     * @returns {array}
     */
    /*------------------------------------------------------*/
    createRows(row_titles){
        let result = [];
        // loop
        row_titles.forEach(code => {
            result.push(this.createRow(code));
        });
        // return nodes array
        return result;
    }
    /*------------------------------------------------------*/
    /**
     * @name createRow
     * @memberof SelectButton
     * @param {string} code
     * @description
     * @returns {HTMLElement}
     */
    /*------------------------------------------------------*/
    createRow(code){
        // properties
        let row = document.createElement('div');
        row.classList.add('btn');
        row.innerHTML = code;
        // return node
        return row;
    }
    /*------------------------------------------------------*/
    /**
     * @name displayRows
     * @memberof SelectButton
     * @param {HTMLElement} container
     * @param {array} row_nodelist
     * @description
     * @returns {HTMLElement} nodelist or node
     */
    /*------------------------------------------------------*/
    displayRows(container, row_nodelist){
        row_nodelist.forEach(node => {
            container.appendChild(node);
        });
    }
    /*------------------------------------------------------*/
    /**
     * @name selectRow
     * @memberof SelectButton
     * @param {string} currency_code
     * @param {array} currency_arr
     * @description
     * @returns {HTMLElement} nodelist or node
     */
    /*------------------------------------------------------*/
    selectRow(currency_code){
        // reorder master list
        this.currency_arr   = this.reorderCodes(this.currency_arr, currency_code);
        // update properties
        this.row_titles     = Array.from(this.currency_arr);
        this.title          = this.row_titles.shift();
        // update displays
        this.node.innerHTML = `<h5>${this.title}</h5>`;
        this.updateRows(this.container, this.row_titles);
        // close container
        // return currency code to update currency selection
        return currency_code;
    }
    /*------------------------------------------------------*/
    /**
     * @name updateRows
     * @memberof SelectButton
     * @property {string} container
     * @property {array} row_titles
     * @description
     * @returns {HTMLElement} nodelist or node
     */
    /*------------------------------------------------------*/
    updateRows(container, row_titles){
        // grab existing nodes
        let nodes = container.childNodes;
        // loop
        nodes.forEach((node, index) => {
            // replace inner html
            node.innerHTML = row_titles[index];
        });
    }
}