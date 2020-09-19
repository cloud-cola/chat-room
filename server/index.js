//WebSocket要首字母大写
const WebSocket = require('ws');
const wss = new WebSocket.Server({port:3001});
const jwt = require('jsonwebtoken'); 
const timeInterval = 1000;
let num = 0;
wss.on('connection',function connection (ws){
    //初始的心跳连接状态
    ws.isAlive = true;
    console.log('one client is connected');
    //接收窗口抖动
     ws.on('shake',function(msg){
         var msgObj = JSON.parse(msg);
         if(msgObj.event === 'shake'){
             ws.event  = msgObj.event;
             ws.name  = msgObj.message;
         }
          wss.clients.forEach((client) => {
              if(client.readyState === WebSocket.OPEN){ 
                  msgObj.event  = 'shake'; 
                  msgObj.name   = ws.name;
                  client.send(JSON.stringify(msgObj));
              }
          })
     })
     
     
    //接收客户端的消息
    ws.on('message',function(msg){
       // console.log(msg);
       //将消息发送到服务端
       //ws.send('server:'+msg);
       //广播消息
const msgObj = JSON.parse(msg);
if(msgObj.event === 'enter'){
ws.name = msgObj.message;
num++;
}
//鉴权
if(msgObj.event === 'auth'){
jwt.verify(msgObj.message,'secret',(err,decode) =>{
if(err){
     ws.send(JSON.stringify({
        event:'noauth',
        message:'对不起，鉴权失败，好友将无法接收你的消息！！'
    }))
console.log('auth error');
return;
}else{
//鉴权成功
console.log(decode);
ws.isAuth = true;
return;
}
})

return;
}
//拦截非鉴权的请求
if(!ws.isAuth){
    return;
}
//心跳检测
if(msgObj.event === 'heartbeat' && msgObj.message === 'pong'){
    ws.isAlive = true;
    return;
}
 wss.clients.forEach((client) => {
//如果不是本人并且客户端的状态等于WebSocket的常量就发送消息
       if(client.readyState === WebSocket.OPEN){   
 msgObj.name  = ws.name;      
msgObj.num = num;
client.send(JSON.stringify(msgObj));
}       
})
    })
//当ws客户端断开连接的时候，
ws.on('close',function(){
if(ws.name){
num--;
}
    
    let msgObj = {};
     wss.clients.forEach((client) => {
//如果不是本人并且客户端的状态等于WebSocket的常量就发送消息
       if(client.readyState === WebSocket.OPEN){   
 msgObj.name  = ws.name;      
msgObj.num = num;
msgObj.event = 'out'
 client.send(JSON.stringify(msgObj));
}       
})
})
})
//
setInterval(()=>{
    wss.clients.forEach((ws)=>{
        if(!ws.isAlive){
            return ws.terminate();
        }
    ws.isAlive = false;
    ws.send(JSON.stringify({
        event:'heartbeat',
        message:'ping',
        num:num 
    }))
    })
},timeInterval)

