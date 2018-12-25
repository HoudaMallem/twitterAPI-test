define(['twitter-text'] , function (twitter){
    /**
     * function represent objet tweet with parameters 
     * 
     * iD : id of tweet
     * text : the text of tweet
     * user : the user who create the tweet 
     * link : the link to open the tweet in twitter 
     * createDate :  create date of tweet
     * parent : the column that belongs to the tweet 
     *       return object Tweet
     */
       
    var Tweet = function(){};

    Tweet.prototype.setId= function (id) {
      this.id = id;
    };
    Tweet.prototype.getId= function () {
      return this.id;
    };
    Tweet.prototype.setText= function (text) {
         this.text = text;
    };
    Tweet.prototype.getText= function () {
        return this.text;
      };
    Tweet.prototype.getUser= function () {
      return this.user;
    };
    Tweet.prototype.setUser = function (user) {
         this.user = user;
    };

    Tweet.prototype.getLink= function () {
        return this.link;
    };
    Tweet.prototype.setLink = function (link) {
        this.link = link;
    };

    Tweet.prototype.getCreateDate = function () {
        return this.createDate;
    };
    Tweet.prototype.setCreateDate = function (createDate) {
        this.createDate = createDate;
    };
    Tweet.prototype.getParent = function () {
        return this.parent ;
      };
    Tweet.prototype.setParent = function (parent) {
      this.parent = parent;
    };
    /**
     * build the code html of tweet 
     * @return code html of instance tweet
     */
    Tweet.prototype.showHtml = function () {
      var html = `<div class="card-body">
      <blockquote class="blockquote text-left">
      <p class="mb-0">${twitter.autoLink(twitter.htmlEscape(this.text)) } </p>
      <footer class="text-secondary">${this.createDate.format('LT')} - ${ this.createDate.format('ll')}  <a href="${this.link}" target="_blank" class="card-link">Link</a></footer>
      </blockquote>
        </div>
        <hr>
            `
        return html;
    };
    return Tweet ;
});
