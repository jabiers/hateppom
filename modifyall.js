
var page = 1;
var total = 1;

function httpGetAsync(theUrl, method, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open(method, theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

var isStart = false;
var paramList = [];
function modifyallitem(replace) {
    if (replace == 'text') {
        alert('text 를 바꿔주세요.');
        return;
    }
    
    var url = 'http://www.ppomppu.co.kr/myinfo/member_my_write_list.php?page='+page;
    var self = this;
    httpGetAsync(url, "GET", function (responseText) {
        var reg = new RegExp(/view.php\?id=.*&no=[0-9]+" target/ig);
        var result;

        var i = 0;
        while ((result = reg.exec(responseText)) !== null) {
            i++;

            var param = result[0].replace("view.php?", "");
            param = param.replace("\" target", "");
            paramList.push(param);
            if (!isStart) {
                this.ppomppumodify(replace);
                isStart = true;
            }
        }
        if (i != 0) {
              page++;
              modifyallitem();
        }
    });
}

function ppomppumodify(replace) {
    var param = paramList.pop();

    if (param.indexOf("market_phone") > -1) {
      return;
    }
    var url = 'http://www.ppomppu.co.kr/zboard/write.php?' + param + '&mode=modify';
    console.log('open');
    var target = window.open (url,param);
    var self = this;
    var count = 0;
    target.addEventListener('load', function () {
        console.log('onload');
        target.document.getElementsByName('subject')[0].value = replace;
        target.document.getElementsByName('memo')[0].value = replace;
        target.document.getElementById('ok_button').click();
        console.log('finish');
        if (paramList.length > 0) {
            self.ppomppumodify(replace);
        }
    });
    target.addEventListener('unload', function () {
      if (count == 1) {
        target.window.close();
      }
      count = 1;
        console.log('onunload');
    });
}


function ppomppumodify(replace) {
    var param = paramList.pop();

    if (param.indexOf("id=market_phone&") > -1
    || param.indexOf("id=market&") > -1
    || param.indexOf("id=cmarket&") > -1
    || param.indexOf("id=onmarket&") > -1
    || param.indexOf("id=market_social&") > -1
    || param.indexOf("id=market_oversea&") > -1
    || param.indexOf("id=market_item&") > -1
    || param.indexOf("id=market_talent&") > -1
    || param.indexOf("id=market_bike&") > -1
    || param.indexOf("id=market_ecig&") > -1
    || param.indexOf("id=market_car&") > -1
    || param.indexOf("id=market_camping&") > -1
    || param.indexOf("id=gonggu&") > -1
    || param.indexOf("id=gonggu_request&") > -1
    || param.indexOf("id=market_agent&") > -1
    || param.indexOf("id=guin&") > -1
    || param.indexOf("id=market_story&") > -1
    || param.indexOf("id=relay&") > -1
    || param.indexOf("id=love&") > -1
    || param.indexOf("id=stock&") > -1) {
      return;
    }
    var url = 'http://www.ppomppu.co.kr/zboard/write.php?' + param + '&mode=modify';
    console.log('open');
    var target = window.open (url,param);
    var self = this;
    var count = 0;
    target.addEventListener('load', function () {
        console.log('onload');
        target.document.getElementsByName('subject')[0].value = replace;
        target.document.getElementsByName('memo')[0].value = replace;
        target.document.getElementById('ok_button').click();
        console.log('finish');
        if (paramList.length > 0) {
            self.ppomppumodify(replace);
        }
    });
    target.addEventListener('unload', function () {
      if (count == 1) {
        target.window.close();
      }
      count = 1;
        console.log('onunload');
    });
}


modifyallitem('text')
