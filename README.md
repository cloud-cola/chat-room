# chat-room
这是我用Node.js和WebSocket搭建的简易聊天室项目，如果有幸被小伙伴们下载使用，请务必对错误的地方批评指正，真心希望我们可以一起学习交流！
###### 技术栈：WS（WebSocket库） + vue + jquery  
###### 链  接：http://175.24.18.36/chat-room.html
###### 安  装：在server文件夹下，使用命令行工具,输入 npm install --save
###### 启  动：cd server命令进入server文件夹，node index.js命令启动服务（注意修改端口号）
###### 说明：  
1.本聊天室是前后端分离项目，服务端使用WS库监听端口，无需使用http创建服务，index.js文件启动后自动监听设置的端口，前端只需在JS代码里利用WebSocket协议即可跟服务端双向对话，具体操作在代码里。  
2.我是用宝塔面板安装PM2进程管理器来启动index.js文件的，只需要输入命令 pm2 start index.js ，任务启动后就能自动监控进程，一旦进程崩溃后可以自动重启，这里也建议有需要的小伙伴使用此方法来代替node index.js 这个命令。3.对于clients文件夹，这是展现到客户端的，一般情况下，浏览器打开就能正常运行，如果需要部署在云端，请将clients文件夹和server文件夹放置在一个目录下，避免引起跨域问题。如果遇到跨域无法访问的情况，建议使用Nginx反向代理。 
3.本人水平有限，描述存在一定的遗漏和不精确的地方，欢迎指出。（狗头保命^.^）  
# 演示截图  
### 登录界面
![image](http://cdn.mc.huluxia.net/g4/M01/4F/37/rBAAdl9l2faARUeOAABexpaLfdo406.png)  

### 聊天界面  
![image](http://cdn.mc.huluxia.net/g4/M01/4F/38/rBAAdl9l2mmAfVKFAAsaqxaa68E948.png)
