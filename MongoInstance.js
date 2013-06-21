var MongoInstance = function MongoInstance(){
    this.Db = require('mongodb').Db;
    this.Server = require('mongodb').Server;
    this.dataBaseObj=require("./mongoConfig.json")
    this.mongoObj=this.dataBaseObj.mongo;
    this.client = new this.Db(this.mongoObj.database_name, new this.Server(this.mongoObj.host, this.mongoObj.port, {}), {safe: true,auto_reconnect: true});
    this.collectionInst;
    this.cookieeInst;

    /*this.startConnection = function(resfunction){
        var self=this;
        this.client.open(function(){


                collection =self.client.collection(self.mongoObj.collection_name);
                self.collectionInst=collection;
                resfunction();

            //return;
        });
    };*/

    this.startConnection = function(resfunction){
        var self=this;
        this.client.open(function(){
            self.client.authenticate("prince","soni", function(err, res) {
                // callback

                 console.log("hoo gyaaaaaaaa")

            collection =self.client.collection(self.mongoObj.collection_name);
            self.collectionInst=collection;
            resfunction();
            });
            //return;
        });
      };

    this.getCollectionObj = function(resfunction){
      var self=this;
        this.client.open(function(){
            collection =self.client.collection(self.mongoObj.collection_name);
            self.collectionInst=collection;
            resfunction(self.collectionInst);
            //return;
        });
     };

    this.getCollection= function (){
        return this.collectionInst;
    }
    this.getCookieeInst= function (){
        return this.cookieeInst;
    }
    this.setCookieeInst= function (cookiee){
         this.cookieeInst=cookiee;
    }
}

/* ************************************************************************
 SINGLETON CLASS DEFINITION
 ************************************************************************ */
MongoInstance.instance = null;

/**
 * Singleton getInstance definition
 * @return singleton class
 */
MongoInstance.getInstance = function(){
    if(this.instance === null){
        this.instance = new MongoInstance();
    }
    return this.instance;
}

module.exports = MongoInstance.getInstance();