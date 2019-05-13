var _ = require( "lodash");
//rest services call logger
module.exports = function() 
{
    function log(logContext)
    {       
      knex('ws_call_log').insert({
            request_uri: logContext.request_uri ,
            request_url: logContext.request_url , 
            request_time: logContext.request_time , 
            request_msg: logContext.request_msg ,
            remote_host: logContext.remote_host , 
            remote_port: logContext.remote_port , 
            remote_adr: logContext.remote_adr , 
            response_time: logContext.response_time , 
            response_msg: logContext.response_msg , 
            response_code: logContext.response_code , 
            create_date: logContext.create_date , 
            response_time_ms: 1,
            status:1
            }).then( function (result) {
                console.log(result);
                console.log('Web Service Call :')
                console.log(logContext)
              })
       
    }

    return { log }
}