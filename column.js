define(['jquery'],function ($){
    /**
     * this function represent column when we set the tweets , got  parameters
     * data : array of tweets  retrieve from twitter API
     * composites :  array of instance of Tweet object that will be showen on the column 
     * count : nombre of tweet shown in column 
     * id : it the id of div element container of column
     * name : name of account twitter 
     * url : twitter API url of request ajax
     * parms : parms of url 
     * dataType :  type of data retrieved 
     * data : data retveived in response 
     * creator :  instance of columnCreate object charged to create instance of column object
     */
    var Column = function(){
        this.data = [];
        this.composites = [];
        this.count = 0;  
    };

    Column.prototype.setId= function (id) {
      this.id = id;
    };
    Column.prototype.getId= function () {
      return this.id;
    };
    Column.prototype.setName= function (name) {
         this.name = name;
    };
    
    Column.prototype.getName= function () {
        return this.name;
      };
    Column.prototype.getCount= function () {
      return this.count;
    };
    Column.prototype.setCount = function (count) {
         this.count = count;
    };
    Column.prototype.setUrl= function (url) {
        this.url = url ;
    };
    Column.prototype.setParms= function (parms) {
        this.parms = parms ;
    };
    Column.prototype.setDataType= function (dataType) {
        this.dataType = dataType ;
    };
 
    Column.prototype.setData= function (callback  ) {
        $.ajax({
            url : this.url,
            method : 'GET',
            success : callback,
            data : this.parms ,
            dataType: this.dataType ,
            error : function (reason, xhr){
             console.log("error in processing your request", reason);
            }
        });
    };
    Column.prototype.getData = function () {
        return this.data;
    };

    Column.prototype.getChildren = function () {
        return this.composites;
    };
    Column.prototype.setCreator= function (creator) {
        this.creator = creator;
    };
    /**
     * push one tweet to composites collection 
     * @param {*} tweet instance of tweet object 
     */
    Column.prototype.addComposite = function (tweet) {
        this.composites.push(tweet);
    };

 /*   Column.prototype.getChildrenByCreateDateAndEndDate = function (createData , endDate) {
        return  this.composites.filter(composite => (composite.createDate >= createData && composite.createDate <= endDate ) );
    };
    */
    /**
     * add event listener to the html element on column after be created 
     * @param {*} eventtype  (click , blur , change  ........)
     * @param {*} element  the id of html element 
     * @param {*} callback function calback
     */
    Column.prototype.addEvent =   function( eventtype ,element ,callback ){
        document.getElementById(element).addEventListener(eventtype, callback , false);
    };
    /**
     * build the code html of colunm 
     * @return code html of instance column
     */
    Column.prototype.showHtml = function () {
        var html=`<div class="card">
        <div class="card-header">
          <div class="row">
             <div class="col-8">@ ${this.name}</div>
             <div class="col-4">
                <input type="number" class="form-control" id="UPD-${this.id}" value="${this.count}"  min="1" data-toggle="tooltip" data-placement="top" title="change The number of tweets shown in this column , it will be updated on blur" >
             </div> 
               
            </div>
        </div><div class="tweets">`;
        this.composites.forEach(function (tweet) {
            html +=tweet.showHtml();
          });  
          html +=`</div></div>`
          return html; 
    };
    return Column ;
});
