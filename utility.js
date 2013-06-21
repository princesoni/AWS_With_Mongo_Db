var maongoObj=require("./MongoInstance.js");
//var collection= maongoObj.getCollection();
module.exports = function utility()
{
    var https = require('https');
    var http = require('http');
    var appConfig = require('./appdata.json');
    var APP_KEY_APPENDER= "?key=";
    var appInfo = appConfig.appdata;
    var options = {
        hostname: appInfo.host_name,
        port: appInfo.port,
        headers: {
            'Content-Type': appInfo.content_type
        }
    };
    this.makeHttpRequest=function(reqName,data,userObj,reqStats, cookieState, resFunc) {
        var self=this;
        var cookieSession;
        var reqStartTime= new Date().getTime();
        var dataReceived=0;
        options.headers['Content-Length'] = data.length;
        options.path = (userObj.method_url + APP_KEY_APPENDER + appInfo.app_key);
        options.method = userObj.method_type;
        if(cookieState==false)
            {
               var session=maongoObj.getCookieeInst();
               options.headers['Cookie'] = session[0];
            }
       var req = https.request(options, function (res) {
            reqStats.inprocReq--;
            reqStats.clients++;
            res.setEncoding('utf8');
            res.on('data', function (responseData) {
                console.log("respnse",responseData.toString())
                if (cookieState) {
                    maongoObj.setCookieeInst(res.headers['set-cookie']);
                 }
                if(res.statusCode!=200){
                    var someData = JSON.parse(responseData.toString());
                    var resName = someData.meta.message;
                    reqStats.res_status_message= resName;
                }else{
                    reqStats.res_status_message= "ok";
                }

            });
            res.on('end', function () {
                if(dataReceived==0){
                    dataReceived++;
                    reqStats.clients--;
                    reqStats.ended_req++;
                    reqStats.total_res_time_for_machine=reqStats.total_res_time_for_machine+(new Date().getTime()-reqStartTime);
                    reqStats.res_time_per_req= self.convertMS(new Date().getTime()-reqStartTime) ;
                    reqStats.res_status=res.statusCode;
                    reqStats.req_name= reqName;
                   // insertToDb(reqStats,function(){
                        resFunc(reqStats);
                   // });
                }
            });
            res.on('error', function (e) {
                if(dataReceived==0){
                    dataReceived++;
                    console.log("Error Response :", e.message)
                    reqStats.total_error_res_time_for_machine=reqStats.total_error_res_time_for_machine+ (new Date().getTime()-reqStartTime);
                    reqStats.clients--;
                    reqStats.errors_resp++;
                    reqStats.res_status=res.statusCode;
                   // insertToDb(reqStats,function(){
                        resFunc(reqStats);
                    //});
                    resFunc(reqStats);
                }
            });
        });
        req.on('error', function (e) {
            if(dataReceived==0){
                console.log("Error Request : ", e.message)
                dataReceived++;
                reqStats.total_error_req_time_for_machine= reqStats.total_error_req_time_for_machine+(new Date().getTime()-reqStartTime);
                reqStats.inprocReq--;
                reqStats.errors_req++;
               // insertToDb(reqStats,function(){
                    resFunc(reqStats);
               // });
                resFunc(reqStats);
            }
        });
        req.write(data);
        req.end();
    }

    this.convertMS=function (millSecond){
        var d, h, m, s,ms;
        ms = (millSecond/1000).toString().split('.')[1];
        s = Math.floor(millSecond / 1000);
        m = Math.floor(s / 60);
        s = s % 60;
        h = Math.floor(m / 60);
        m = m % 60;
        d = Math.floor(h / 24);
        h = h % 24;
        return d+":"+h+":"+m+":"+s+":"+ms
    }

}
//insert data to db
function insertToDb (data,done){
    data._id=new Date().getTime().toString();
    collection.insert(data,function (err, inserted) {
      if(err){
            console.log("Error",err)
        }else{
            console.log("Data Inserted",inserted)
        }
        done();
    });
}