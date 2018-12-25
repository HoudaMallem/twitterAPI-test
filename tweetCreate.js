define(['./tweet' , 'moment' ], function (tweet , moment ) {
    /**
     * this function represent the creator of tweets instance ,got on paramether 
     * tweet : the  instance of  tweet  object
     * return tweetCreate object
     * 
     */
        var tweetCreate = function(){
            this.tweet = new tweet(); 
        }
        /**
         * function to set paramether of instance tweet 
         * @param {*} Json data retrieved of one tweet in format json 
         * @param {*} parent  the column whiche the tweet will be setted 
         * @return tweet instance  
         */
        tweetCreate.prototype.create = function (Json , parent) {
            
            this.tweet.setId(Json.id_str);
            this.tweet.setText(Json.text);
            this.tweet.setUser(Json.id);
            this.tweet.setCreateDate(moment(Json.created_at,'dd MMM DD HH:mm:ss ZZ YYYY', 'en'));

            this.tweet.setLink(`https://twitter.com/i/web/status/${Json.id_str}`);     
            this.tweet.setParent(parent);
            return this ; 
        };
        return tweetCreate ;
    });
    