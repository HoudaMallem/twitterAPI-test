define(['jquery' ,'./columnCreate' ], function ($ , columnCreate ) {
/**
 * 
 * @param {*} duc 
 * @param {*} event event element 
 * @param {*} column instance of column to be updated 
 */
    var updateColumn = function(duc , event , column){
        var setting = {name : column.name , count :event.target.value  }
        if($( "#endDate" ).val() !== "" || $( "#startDate" ).val() !== ""){
            setting.startDate =  $( "#startDate" ).val() ; 
            setting.endDate =  $( "#endDate" ).val() ; 
        }
        column.creator.update( setting ).updateTweetes();
        console.log('Column update ');
    }
    $(document).bind("updateColumn", updateColumn);



});