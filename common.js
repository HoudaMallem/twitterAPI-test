//The build will inline common dependencies into this file.

//For any third party dependencies, like jQuery, place them in the lib folder.

//Configure loading modules from the lib directory,
//except for 'app' ones, which are in a sibling
//directory.
requirejs.config({
    baseUrl: 'node_modules/jquery-ui/ui/widgets',
    paths: {
        'jquery': '../../../jquery/dist/jquery',
        'moment' : '../../../moment/moment', 
        'sortable':'sortable',
        'jqueryui':'jquery-1-7',
        'draggable':'draggable',
        'datepicker':'datepicker',
        'twitter-text' : '../../../twitter-text/dist/twitter-text'
      
        
    }
});

