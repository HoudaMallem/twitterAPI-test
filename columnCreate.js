define(['jquery' ,'./column' ,'./tweetCreate'], function ($ ,  column , tweetCreate) {
   /**
    * this function reprensent the creator of column instance , got in paramethers 
    * column the instance of tweet object
    * 
    */
    var ColumnCreate = function(){
        this.column = new column(); 
    };
    /**
     * 
     * @param {*} name the  name of account needed
     * @param {*} count numbre of tweet showen in column 
     * @param {*} element id of html element container of column 
     * @return column instance 
     */
    ColumnCreate.prototype.create = function (setting) {
        var params={};
        params.count =setting.count;
        params.screen_name =setting.name;
        this.column.setId(setting.element);
        this.column.setName(setting.name);
        this.column.setCount(setting.count);
        this.column.setUrl(`http://localhost:7890/1.1/statuses/user_timeline.json`);
        this.column.setParms(params);
        this.column.setDataType("text");
      
        this.column.setCreator(this);
        return this ; 
    };
    /**
     * here we retrieve all tweets from twitter api ,
     *  and after create instance of each tweet and push it in composite collection of column instance 
     * after we showen  all content  on html by calling show() 
     * after we add all EventListener needed addEvent()
     * @return column instance 
     */
    ColumnCreate.prototype.initTweetes = function(){
        var column =this.column ; 
        this.column.setData(function(respJson){
         
            var resp = JSON.parse(respJson);
            resp.forEach(function (tweet) {
                if (typeof tweet == 'object') {
                    var Tcreate =   new tweetCreate( );
                    Tcreate.create(tweet , column)
                          column.addComposite(Tcreate.tweet); 
                }else{
                  throw new Error('Type of tweet Incorrect ' );
                }
              
            });
            show(column);
            addEvent(column);
          });
          return this ;
         
    };
    /**
     * here we update column instance by changing name or count paramethers 
     * @param {*} name name of account needed 
     * @param {*} count number of tweet showen in colmn instance 
     * @return column instance 
     */
    ColumnCreate.prototype.update = function (setting ) {
        this.column.setName(setting.name);
        var url ='';
        var params={};
        if(setting.hasOwnProperty('startDate') || setting.hasOwnProperty('endDate')  ){
             url +=`http://localhost:7890/1.1/search/tweets.json`;
                params.q = 'from:'+setting.name;
                if(setting.startDate !== ''){ 
                    params.q +=" since:"+setting.startDate;
                }
                if(setting.endDate !== ''){
                    params.q +=" until:"+setting.endDate;
                }
                if(setting.count !== undefined){
                    params.count = setting.count;
                }
       
                this.column.setUrl(url);
                this.column.setParms(params);
                this.column.setDataType("json");
                
        }else{
            this.column.setCount(setting.count);
            params.count = setting.count;
            params.screen_name = this.column.name;
             this.column.setUrl(`http://localhost:7890/1.1/statuses/user_timeline.json`);
            this.column.setParms(params);
            this.column.setDataType("text");
        }
       
        
        return this ; 
    };
    /**
     * here we update composites collection of column instance after changing  parameter , 
     * by sending request with new parms and create instancs of tweets and push them in composites collection 
     * after we showen the all content  on html by calling updateShow() 
     * @return column instance 
     */
    ColumnCreate.prototype.updateTweetes = function(){
        var column = this.column ;
        this.column.composites = [];
        this.column.setData(function(respJson){
            var resp = (typeof respJson == 'object') ? respJson.statuses : JSON.parse(respJson);     
            column.data = resp;
            column.setCount(resp.length );
            resp.forEach(function (tweet) {
                if (typeof tweet == 'object') {
                    var Tcreate =   new tweetCreate( );
                    Tcreate.create(tweet , column);
                          column.addComposite(Tcreate.tweet); 
                }else{
                  throw new Error('Type of tweet Incorrect ' );
                }
              
            });
            updateShow(column);
            addEvent(column);
          });
          return this ;
         
    };
    /**
     * here we show contente of column 
     * @param {*} column instance of column   
     */
    var show =  function ( column) {
        $('#'+column.id).append( column.showHtml());
    };
    /**
     * here we update content of column 
     * @param {*} column instance of column 
     */
    var updateShow =  function ( column) {
        $('#'+column.id).html('').append( column.showHtml());
    };
    /**
     * here we add event listner to element charged to update column when we change number of tweets 
     * @param {*} column instance of column object 
     */
   var addEvent = function(column) {
        var element = 'UPD-'+ column.id;
       column.addEvent('blur',element,(event)=>{    
              
            $(document).trigger("updateColumn",[event , column]);  
        }); 

    
      };

      return ColumnCreate ;
});
