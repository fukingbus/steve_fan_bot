const TelegramBot = require('node-telegram-bot-api');
const steve = require('./steve_ai');


const token = 'YOURTOKEN';
const bot = new TelegramBot(token, {polling: true});

console.log('Hi, I`m 18 y.o. coder from Hong Kong; https://blog.stevefan1999.me');
// Hello World!

prepareNext9Up();
function prepareNext9Up() {
    let nextTick = Math.floor(Math.random()*60*15)*1000;
    console.log('The next 9up will begin in '+ Math.floor(nextTick/60000) + ' minutes ('+nextTick+') ms')
    setTimeout(function () {
        steve.begin9Up(function (thoughts) {
            speakSequentially(thoughts,"GROUP ID");
            prepareNext9Up()
        })
    },nextTick);
}

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const msgId = msg.message_id;
    const who = msg.from;
    if(who === 418244191)
    //if(who.id === 11457427)
        bot.sendMessage(chatId,"?????"  ,{reply_to_message_id:msgId});


    if(msg.document){
       if(msg.document.file_name === "Minecraft DDOS 事件.pdf" || msg.document.file_size === 497557)
           steve.gettingAngry(3,function (thoughts) {
               speakSequentially(thoughts,chatId);
           })
    }
    try {
        if(/范俊賢|fan chun yin/g.test(msg.text)){
            steve.gettingAngry(3,function (msg) {
                speakSequentially(msg,chatId);
            })
        }
        if (msg.text.indexOf("@stevefan1999") != -1)
            steve.responseMention(who, msg, function (thoughts) {
                speakSequentially(thoughts, chatId);
            })
        else
            steve.CommonSense(who, msg, function (thoughts) {
                speakSequentially(thoughts, chatId);
            })
    }
    catch (ex){
        //
    }
});


function speakSequentially(msgs,chatId) {
    if(msgs instanceof Array){
        let msgContent = msgs.shift();
        let msgLength = msgContent.length;
        bot.sendChatAction(chatId,"typing");
        delay(msgContent,msgLength*350,function (content) {
            speak(content,chatId);
            if(msgs.length>0)
                speakSequentially(msgs,chatId)
        });
    }
    else
        speak(msgs,chatId)
}
function speak(msg,chatId){
    bot.sendMessage(chatId,msg)
}

function delay(content,timeout,callback){
    setTimeout(function(){callback(content)},timeout)
}