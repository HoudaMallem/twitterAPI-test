define( function (require ) {
    $(function () {
        var $ = require('jquery'),
            columnCreate = require('./columnCreate'),
            observer = require('./observer');
           sortable = require('sortable');
            draggable = require('draggable');
            datepicker = require('datepicker');
            

    /**
     * builder of my chanleng test interface 
     * columns : collection of column instance 
     */
    var builder = function(){
        this.columns = [];
    };
/**
 * here we build all columns by create instance of each column with his setting 
 * and after push them in colums collection
 */
 builder.prototype.buildColumns = function(){
    var colCreate1 = new columnCreate();
    var setting1 = {name : 'MakeSchool' , count :30 , element : 'column1' }
    colCreate1.create(setting1 ).initTweetes();
    this.columns.push(colCreate1.column);

    var colCreate2 = new columnCreate();
    var setting2 = {name : 'newsycombinator' , count :30 , element : 'column2' }
    colCreate2.create(setting2).initTweetes();
    this.columns.push(colCreate2.column);

    var colCreate3 = new columnCreate();
    var setting3 = {name : 'ycombinator' , count :30 , element : 'column3' }
    colCreate3.create(setting3).initTweetes();
    this.columns.push(colCreate3.column);
}
/**
 * here we update all column by sending new setting to each column instant
 */
builder.prototype.updateColumns = function(setting){
    var setting =setting;
    this.columns.forEach(function (column) {
        setting['name'] = column.name;
        column.creator.update( setting ).updateTweetes();
    });
}
  var myFirstBuilder = new builder();
   myFirstBuilder.buildColumns();





/**
 * searche tweets between tow dates 
 */
$( "#SearcheByDate" ).on( "click", function() {
   var setting = {}

   if($( "#endDate" ).val() !== "" || $( "#startDate" ).val() !== ""){
       if(($( "#endDate" ).val() < $( "#startDate" ).val()) && ($( "#endDate" ).val() !== '' && $( "#startDate" ).val() !== '') ){
        alert('the end date must be  greater then start date');
       }else{

        setting.startDate =  $( "#startDate" ).val() ; 
        setting.endDate =  $( "#endDate" ).val() ; 
        myFirstBuilder.updateColumns(setting);
       }

   }else{
       alert(' select at least one date  ')
   }

  });

/**
 * change skin of body 
 */
$( "#skinbody" ).on( "change", function() {
    $('body').css('background-color' , $(this).val());
});
/**
 * change skin of palette 
 */
$( "#skinpalette" ).on( "change", function() {
    $('.card').css('background-color' , $(this).val());
});

/**
 * change order of column on drogdrop
 */
$( function() {
    $( "#columns" ).sortable({
        revert: true
    });
});
  

 });

});