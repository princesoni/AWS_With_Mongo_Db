var loadDataConfig = require('./testData/acsLoadData.json');
var loadDataObj = loadDataConfig.data;
var utilitiesObj = require('./utility.js');

module.exports = function MyTest()
{
     var utility=new utilitiesObj();

    this.createUser=function(uniqueName,requestStats,resFun){
        console.log("user create-----")
        var self=this;
        var userObj = loadDataObj.createUser;
        var data = JSON.stringify({
            'username': uniqueName,
            'role': userObj.fields.role,
            'first_name': userObj.fields.first_name,
            'last_name': userObj.fields.last_name,
            'password': userObj.fields.password,
            'password_confirmation': userObj.fields.password_confirmation
        })
        utility.makeHttpRequest("createUser",data,userObj,requestStats, true, function (cookieSession,res) {
            resFun(cookieSession,res) ;
        })
    }

    this.createPost= function (reqStats,resFun) {
        var self=this;
        var postObj = loadDataObj.createPost;
        data = JSON.stringify({
            'content': postObj.fields.content,
            'title': postObj.fields.title
        });

        console.log("create post--- ")
        utility.makeHttpRequest("createPost",data,postObj,reqStats, false, function (res) {
            resFun(res) ;
        })
    }

    this.createCustomObject= function (reqStats,resFun) {
        var self=this;
        var customObj = loadDataObj.createCustomObject;
        data = JSON.stringify({
            fields: JSON.stringify(customObj.fields.custom_value)
        });
        //if(cookieSession!=undefined)
          //  options.headers['Cookie'] = cookieSession[0];
       // var currentTime=new  Date().getTime();

        console.log("create custom obj--- ")
        utility.makeHttpRequest("createCustumObject",data,customObj,reqStats, false, function (res) {
            resFun(res) ;
        })
    }

    this.createPlacesObject= function (reqStats,resFun) {
        var self=this;
        var placesObj = loadDataObj.createPlacesObject;
        data = JSON.stringify({
            'name': placesObj.fields.name,
            'state': placesObj.fields.state,
            'address': placesObj.fields.address,
            'website': placesObj.fields.website
        });
        console.log("create place obj--- ")
        utility.makeHttpRequest("createPlaces",data,placesObj,reqStats, false, function (res) {
            resFun(res) ;
        })
    }

    this.queryPost= function (reqStats,resFun) {
        var self=this;
        var postObj = loadDataObj.queryPost;
        data = JSON.stringify({
            'page': postObj.fields.page,
            'per_page': postObj.fields.per_page,
            'where': JSON.stringify(postObj.fields.clause.where)
        });
        console.log("query post obj--- ")
        utility.makeHttpRequest("querypost",data,postObj,reqStats, false, function (res) {
            resFun(res) ;
        })
    }

    this.queryCustomObject= function (reqStats,resFun) {
        var self=this;
        var customObj = loadDataObj.queryCustomData;
        data = JSON.stringify({
            'page': customObj.fields.page,
            'per_page': customObj.fields.per_page,
            'where': JSON.stringify(customObj.fields.clause.where),
            'order': customObj.fields.order
        });
        console.log("query custom  obj--- ")
        utility.makeHttpRequest("queryCustomObject",data,customObj,reqStats, false, function (res) {
            resFun(res) ;
        })
    }

    this.logout= function (reqStats,resFun) {
        var self=this;
        var userObj = loadDataObj.logoutUser;
        var currentTime=new  Date().getTime();
        console.log("query custom  obj--- ")
        utility.makeHttpRequest("logout","",userObj,reqStats, false, function (res) {
            resFun(res) ;
        })
    }

    this.executeFunction= function (){
        var array_of_functions = [
            'createUser','createPost','createCustomObject','createPlacesObject','logout'
        ]
         return array_of_functions;
}
};