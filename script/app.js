        var where = document.getElementById("where");
        var drink = document.getElementById("drink");
        var driver = document.getElementById("driver");
        var ice = document.getElementById('ice');
        var add = document.getElementById('add');
        var cup = document.getElementById("cup");
        var sugar = document.getElementById('sugar');
        var target = document.getElementById("add");
        var hotButton = document.getElementById('hotButton');
        var hotdrink = document.getElementById('hotdrink');
        var addButton = document.getElementById('addButton');
        var otherplace = document.getElementById('otherplace');
        var copyTxt = document.getElementById("forcopy");
        var otherFlag = 0;
        var submitButton = document.getElementById('submitButton');
        var randomButton = document.getElementById('randomButton');
        var drink_span = document.getElementById('drink-span');
        var num = document.getElementById('num');
        var car = document.getElementById('car');
        var cupnum = parseInt(document.getElementById('num').innerHTML);//总杯数
        var drinklist = [];
        var orderText = [];
        var curprice=13;
        var totalprice = 0;
        var hotdrink_display = false;

        var price = {
            "波霸奶茶":[10,13],
            "波霸奶绿":[10,13],
            "波霸红":[7,9],      
            "波霸绿":[7,9],   
            "珍珠奶茶":[10,13],  
            "珍珠奶绿":[10,13],
            "珍珠红":[7,9],
            "珍珠绿":[7,9],       
            "椰果奶茶":[10,13],          
            "仙草奶冻":[10,13],
            "布丁奶茶":[13,17],           
            "红豆QQ奶茶":[10,13],
            "四季如意":[8,10],              
            "燕麦奶茶":[11,14],
            "红茶拿铁":[13,17],
            "乌龙拿铁":[13,17],      
            "古早味红茶拿铁":[16,21],
            "焦糖红茶拿铁":[14,18],         
            "可可芭蕾拿铁":[16,21],
            "奶茶":[10,13],         
            "奶绿":[10,13],
            "四季奶青":[10,13],                   
            "乌龙奶茶":[10,13],
            "焦糖奶茶":[11,14],                
            "古早味奶茶":[13,17],
            "红茶玛奇朵":[12,15],
            "乌龙玛奇朵":[12,15],   
            "阿华田":[13,17],
            "可可芭蕾":[14,18],    
            "茉莉绿茶":[6,8],
            "阿萨姆红茶":[6,8],             
            "四季春茶":[6,8],
            "冻顶乌龙茶":[6,8],                  
            "翡翠柠檬":[12,15],
            "梅果绿":[12,15],              
            "蜂蜜绿*仅限冷饮*":[12,15],
            "8冰绿":[12,15],               
            "葡萄柚绿":[12,15],
            "养乐多绿*仅限冷饮*":[13,17],                
            "冰淇淋红茶*仅限冷饮*":[13,17],
            "古早味红茶":[10,13],
            "柠檬汁":[12,15],                    
            "金桔柠檬":[12,15],
            "柠檬蜜*仅限冷饮*":[13,17],              
            "柠檬梅子":[13,17],
            "柠檬养乐多*仅限冷饮*":[15,19],                  
            "蜜茶*仅限冷饮*":[12,15],
            "8冰茶":[12,15]
        };



        if(!isPC()) {
            adapt("touchend");
        } else {
            adapt("click");
        }

        where.onchange = function(){
            select("where");
            var where = getSelectValue("where");
            if(where =="我不在华工南校区") {
                otherFlag = 1;
                addClass("where-div","hide");
                //removeClass("otherplace","hide");
                removeClass("other","hide");
            }
        }
        
        driver.onchange = function(){    var text = select("driver"); drive(text);}
        drink.onchange = function(){    select("drink"); setPrice();}
     


        

        
        //复制点单信息到粘贴板
        new Clipboard(submitButton, {
            text: function() {
                var where = getSelectValue("where").replace("我在","");
                if(otherFlag) {
                     where = otherplace.value;
                }
                var driver = getSelectValue("driver");
                var how2pay = document.getElementById('how2pay').value;
                var isDriver = (driver=="我要开车");
                if(isDriver) {
                    var text = where+"发车！\n";
                } else {
                var text = where+"求车！\n";
                }
                text += orderText.join("\n");
                if(orderText.length>=2) {
                    text +="\n一共￥"+totalprice;
                }
                if(isDriver && how2pay) {
                    text +="\n【支付宝账号："+how2pay+"】";
                }
                text +="\n———————————\n【一点点拼单小助手↓】\nhttp://521diandian.club";
                if(orderText.length===0) {
                    alert('(´・ω・`)客官不喝点什么吗');
                    return false;
                } else {
                    alert('o(*≧▽≦)ツ信息已经成功复制到剪切板了哦');
                }
                return text;
            }
        });

        
function isPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}     


function adapt(event) {
        //切换冰块
        ice.addEventListener(event,function(e) {
                    e.preventDefault();
                    radio(e.target);
        },false);
        //切换容量
        cup.addEventListener(event,function(e) {
            e.preventDefault();
            radio(e.target);
            setPrice();
        },false);
        //切换甜度
        sugar.addEventListener(event,function(e) {
            e.preventDefault();
            radio(e.target);
        },false);
        
        //选择加料选项
        add.addEventListener(event,function(e) {
            e.preventDefault();
            checkbox(e.target);
        },false);
            
        //随机选择事件 
        randomButton.addEventListener(event,function(e) {
            e.preventDefault();
            randomSelect();
        },false);

        //点击人气推荐按钮
        hotButton.addEventListener(event,function(e) {
            e.preventDefault();
            clickHotButton();
        },false);
        
        //添加单品按钮
        addButton.addEventListener(event,function(e) {
            e.preventDefault();
            clickAddButton();
        },false);
        
    
        //选择人气饮料按钮
        hotdrink.addEventListener(event,function(e) {
            e.preventDefault();
            if(e.target.nodeName =='IMG') {
                var drink = e.target.parentNode.lastElementChild.innerHTML;
                changeSpan(drink);                    hotdrink_display = !hotdrink_display;
                hotdrink.style.height = hotdrink_display?"108vw":"0";
                setPrice();
                return false;
            }
        },false);
}


function setPrice(){
    
    var drink = getSelectValue('drink');
    var cup = getRadioValue('cup');
    
    if(cup.indexOf("中杯")!=-1){
        curprice = price[drink][0];
    } else {
        curprice = price[drink][1];
    }
    document.getElementById("price").innerHTML = "￥"+curprice;
}

function setTotalPrice(){
    document.getElementById("totalprice").innerHTML = "￥"+totalprice;
}


function removeClass(id,classname) {
    var ele = document.getElementById(id);
    ele.className = ele.className.replace(classname,"");
}

function addClass(id,classname) {
    var txt = " "+classname;
    document.getElementById(id).className += txt;
}

function radio(target){
        var children = target.parentNode.getElementsByTagName('a');
        if(target && target.nodeName=="A") {
            for(var i=0,len = children.length;i<len;i++){
               if(children[i].className.indexOf('checked')!= -1) {
                  children[i].className ="";
                break;
               }
            }
            target.className += "checked";
        }
}

function checkbox(target) {

        if(target && target.nodeName=="A") {
            if(target.className.indexOf('checked')!=-1) {
                target.className = "";
            }  else {                
                target.className += "checked";
            }
        }
}

function drive(text){
        if(text.indexOf("我要开车")!= -1) {
             removeClass("contact","hide");
        } else {
             addClass("contact","hide");
        }
}
        
function getSelectValue(id) {
    var ele = document.getElementById(id);
    var index = ele.selectedIndex;
    return ele.options[index].text;
}
function getRadioValue(id){
    var ele = document.getElementById(id);
    var options = ele.getElementsByTagName('a');
    for(var i=0;i<options.length;i++) {
        if(options[i].className.indexOf("checked")!=-1) {
            return options[i].innerHTML;
        }
    }
}
function getCheckboxValue(id) {
    var ele = document.getElementById(id);
    var options = ele.getElementsByTagName('a');
    var arr=[];
    for(var i=0;i<options.length;i++) {
        if(options[i].className.indexOf("checked")!=-1) {
            //配料简写
            var txt = options[i].innerHTML.charAt(0);
            arr.push(txt);
        }
    }
    if(arr.length!==0) {
        arr.unshift("加");
    }
    return arr;
}

function select(id){
        var ele =document.getElementById(id);
        var index = ele.selectedIndex;
        var text = ele.options[index].text;
        document.getElementById(id+"-span").innerHTML = text;
        return text;
}

function randomSelect() {
    if(drinklist.length===0) {
        for(drink in price) {
            drinklist.push(drink);
        }
    }
    var len = drinklist.length;
    var index = Math.floor(Math.random()*len);
    var drink = drinklist[index];
    changeSpan(drink);
    setPrice();
}

function changeSpan(txt) {
    drink_span.innerHTML = txt;
    //选中相应的option
    var options = document.getElementById('drink').options;
    for(var i=0;i<options.length;i++) {
        if(options[i].text==txt) {
            options[i].selected = "true";
            break;
        }
    }
}
function clickHotButton(){
    hotdrink_display = !hotdrink_display;
    hotdrink.style.height = hotdrink_display?"108vw":"0";
}   

function clickAddButton(){
            var drink = getSelectValue('drink');
            var cup = getRadioValue('cup');
            var ice = getRadioValue('ice');
            var sugar = getRadioValue('sugar');
            var add = getCheckboxValue('add');//加料数组
          //var text = "￥13 大杯波霸奶茶 常温微糖 加珍波椰";
            var isIce = drink.indexOf("*仅限冷饮*");
            if( isIce!=-1 && ice=="加热") {
                alert("(´・ω・`)冷饮不可以加热噢");
                return false;
            } else if( isIce != -1) {
                drink = drink.replace("*仅限冷饮*","");
            }
            var text = "￥"+curprice+" "+cup+drink+" "+ice+sugar+" "+add.join("");
            var htmltext = "<p>"+text+"</p>";
            document.getElementById("price").innerHTML = "￥"+curprice;
            totalprice += parseInt(curprice);
            setTotalPrice();
            cupnum++;
            num.innerHTML = cupnum;
            car.innerHTML +=htmltext;
            orderText.push(text);
}
        