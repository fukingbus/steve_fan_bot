/**
 * Created by xeonyan on 12/9/2017.
 */

const msg_9up = [
    "額頭出暗瘡點解決好",
    "遊戲就如女人一樣會迷惑你",
    "wow",
    "包含一些羅莉控等變態元素",
    "變你老母態？",
    ["大專信用咭係點用","如果網上買嘢","例如cloud service","係咪會同debt一樣","我可唔可以min pay","😂","i have debit card only"],
    ["display card點分期","我想分3個月還","但信用卡點用都唔知"],
    "se學霸 adore",
    "唔好諗住dox我",
    ["好想打機","但係要讀書","屌"],
    "我想食蘿莉",
    "其實我都要著一著草"


]
const msg_tech_like = [
    "有無windows app係可以block steam同osu?",
    "deleting linux",
    ["怪不得我用唔到tng","我無信用咭"],
    ["其實cpu 80幾度係咪正常","利申server u"],
    "我覺得一個api call可以回傳900kb data好勁"

]
const msg_negative = [
    "@%%USERNAME%% 小心被共產黨秋後算帳",
    "jm9",
    "i dont give a fuck",
    "好啦鳩啦",
    ["真係","認真","唔撚好玩"],
    "拿事先聲明我咩都無做過",
    "??????",
    "你jm9",
    "wtf"

]

const msg_oppose = [
    "無呀邊撚到有"
]

const msg_angry = {
    level1 : [
        "屌你",
        "撚樣",
        "咪撚binc好無",
        "你班撚樣",
        ["唔撚好笑呀呢家","好撚火大呀呢家"],
        "死雞蟲",
        "i dont give a fuck",
        "咪撚再鞭鳩我屍好無？",
        "你係咪有病雞蟲",
        "你知唔知你搞撚到我有幾大心理陰影？",
        ["你睇開啲 去自殺啦你","go kill yourself","asshole"],
        "關我撚事",
        ["無ddos你條肥閪囉","你係咪又得罪咗邊個"],
        "係咪想我打撚死你？"

    ],
    level2: [
        "屌你老母臭閪",
        "關我撚事咩你條死雞蟲",
        "你老母臭閪",
        "係咪你死咗嘅老豆？",
        "你條柒頭係咪想死",
        "戇鳩",
        "咁我可唔可以屌你老母呀？"
    ],
    level3: [
        ["我警告你","唔好再攞黎玩","呢啲野唔好玩"],
        ["馬鞍山死肥閪 我認撚住你","一定會放火燒你間屋","等住紅油啦","我會幫你收屍"]
    ]
}

function SteveAI() {

}
SteveAI.prototype.gettingAngry = function (level,callback) {
    switch (level){
        case 1:
            callback(draw(msg_angry.level1));
            break;
        case 2:
            callback(draw(msg_angry.level2));
            break;
        case 3:
            callback(draw(msg_angry.level3));
            break;
    }
};
SteveAI.prototype.begin9Up = function (callback) {
    let thought = draw(["9up","tech"]);
    if(thought==="9up")
        callback(draw(msg_9up));
    else
        callback(draw(msg_tech_like));
};

SteveAI.prototype.CommonSense = function (who,msg,callback) {
    msg = msg.text;
    if(/macbook|laptop|notebook/g.test(msg.toLowerCase())){
        callback(["macbook","mac da best","no virus"])
    }
};

SteveAI.prototype.responseMention = function (who,msg,callback) {
    msg = msg.text;
    if(/有(無|冇|mo)/g.test(msg)){
        callback(draw(msg_oppose))
    }
    else if(/dllm|屌你|on9*|仆街|食.?屎|柒|弱智/g.test(msg)){
        callback(draw(msg_angry.level1))
    }
    else{
        let resp = draw(msg_negative);
        if(!(resp instanceof Array)){
            if(who.username)
                callback(resp.replace("%%USERNAME%%",who.username))
            else {
                callback(resp.replace("%%USERNAME%%",""))
            }
        }

        else
            callback(resp)
    }
};

function draw(arr) {
    return arr[Math.floor(Math.random()*arr.length)]
}



module.exports = new SteveAI();