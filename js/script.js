$(function(){
    //历史轨迹tab
    tabFunc(".history-con", ".ht-tab li", "cur", ".ht-tab-con", "active", "mousedown");
    //党史人物tab
    tabFunc(".figure-con", ".figure-tab li", "cur", ".figure-tab-con", "active", "mousedown");
   

    //轮播
    var videoScroll1 = new LScroll();
    videoScroll1.dom = $(".books .book-list");
    videoScroll1.speed = 5000;
    $("img.go-left1").click(function () { videoScroll1.prev(); });
    $("img.go-right1").click(function () { videoScroll1.next(); });
    videoScroll1.tabmarq(0, 0, 1);

    placeholderFunc();//placeholder 兼容ie低版本



});

//placeholder 兼容
function placeholderFunc(){
    // 如果不支持placeholder，用jQuery来完成
    if (!isSupportPlaceholder()) {
        // 遍历所有input对象, 除了密码框
        $('input').not("input[type='password']").each(
            function () {
                var self = $(this);
                var val = self.attr("placeholder");
                input(self, val);
            }
        );
    }

    // 判断浏览器是否支持placeholder属性
    function isSupportPlaceholder() {
        var input = document.createElement('input');
        return 'placeholder' in input;
    }

    // jQuery替换placeholder的处理
    function input(obj, val) {
        var $input = obj;
        var val = $.trim(val);
        $input.attr({ "value": val,"style":"color:#999"});
        $input.focus(function () {
            if ($.trim($input.val()) == val) {
                $(this).attr({ "value": "","style":"color:#333"});
            }
        }).blur(function () {
            if ($input.val() == "") {
                $(this).attr({ "value": val,"style":"color:#999"});
            }
        });
    }
};

 // 标签切换
  function tabFunc(boxDom, tablist, current, tabcont, active, mouseEvent){
     $(boxDom).each(function () {
                var _this = $(this);
                var index = 0;
                _this.on(mouseEvent, tablist, function () {
                    if ($(this).hasClass(current)) {
                        return
                    }
                    index = $(this).index();
                    $(this).addClass(current).siblings().removeClass(current);
                    _this.find(tabcont).removeClass(active).eq(index).addClass(active)
                })
            })
  }
/*--轮播 start--*/
var LScroll = function () {
    var LScroll = function () {
        return LScroll.fn.init();
    };
    LScroll.fn = LScroll.prototype = {
        init: function () {
            return this;
        },
        speed: 100,
        pwidth: 1000,
        positive: true,
        dom: null
    };
    var timer, isAct = false, maxlen = 0, curpose, curno = 0, anim;

    function scrollInit(mode) {
        curpose = LScroll.fn.positive;
        if (mode == 1) {
            LScroll.fn.dom.find("li").each(function () {
                maxlen += $(this).height();
            });
            LScroll.fn.dom.css("height", maxlen);
        }
        else {
            LScroll.fn.dom.find("li").each(function () {
                maxlen += $(this).width();
            });
            LScroll.fn.dom.css("width", maxlen);
        }
    }

    function move() {
        LScroll.fn.dom.hover(function () {
            stop();
        }, function () {
            curpose = LScroll.fn.positive;
            start();
        });
    }

    function start() {
        if (isAct) return;
        isAct = true;
        timer = setInterval(anim, LScroll.fn.speed);
    }

    function stop() {
        isAct = false;
        clearInterval(timer);
    }

    LScroll.fn.prev = function () {
        stop();
        curpose = true;
        anim();
        start();
    };
    LScroll.fn.next = function () {
        stop();
        curpose = false;
        anim();
        start();
        curpose = true;
    }; //此处将滑动顺序恢复默认
    LScroll.fn.reset = function () {
        stop();
        LScroll.fn.dom.unbind("mouseenter").unbind("mouseleave");
    };
    //轮播图效果，无缝滚动 mode-0:左右，1：上下 startno-置为0，实现无缝 tabnum-每次滚动个数
    LScroll.fn.tabmarq = function (mode, startno, tabnum) {
        tabnum = tabnum == null ? 1 : tabnum;
        startno = startno == null ? 0 : startno;
        scrollInit(mode);
        anim = function () {
            if (curpose) { //先移动动画，结束后将第一个元素移动到最后
                mode == 1 ? LScroll.fn.dom.animate({ top: 0 - $(LScroll.fn.dom.find("li").get(startno)).height() * tabnum }, "slow", function () {
                    LScroll.fn.dom.append(LScroll.fn.dom.find("li").slice(startno, startno + tabnum));
                    LScroll.fn.dom.css({ top: 0 });
                }) : LScroll.fn.dom.animate({ left: 0 - $(LScroll.fn.dom.find("li").get(startno)).width() * tabnum }, "slow", function () {
                    LScroll.fn.dom.append(LScroll.fn.dom.find("li").slice(startno, startno + tabnum));
                    LScroll.fn.dom.css({ left: 0 });
                });
            }
            else { //先将最后一个元素移动到最前面，然后移动动画
                $(LScroll.fn.dom.find("li").get(startno)).before(LScroll.fn.dom.find("li").slice(LScroll.fn.dom.find("li").length - tabnum, LScroll.fn.dom.find("li").length));
                mode == 1 ? LScroll.fn.dom.css({ top: 0 - $(LScroll.fn.dom.find("li").get(startno)).height() * tabnum }) : LScroll.fn.dom.css({ left: 0 - $(LScroll.fn.dom.find("li").get(startno)).width() * tabnum });
                mode == 1 ? LScroll.fn.dom.animate({ top: 0 }, "slow") : LScroll.fn.dom.animate({ left: 0 }, "slow");
            }
        };
        isAct = true;
        timer = setInterval(anim, this.speed);
        move();
    };
    //跑马灯效果，不能实现无缝滚动 mode-0:左右，1：上下 plen-每次移动像素
    LScroll.fn.marquee = function (mode, plen) {
        scrollInit(mode);
        anim = function () {
            if (mode == 1) {
                var wdt = LScroll.fn.dom.position().top;
                //wdt + maxlen < 0 && (wdt = plen);
                LScroll.fn.dom.css("top", wdt - plen);
            }
            else {
                var wdt = LScroll.fn.dom.position().left;
                //wdt + maxlen < 0 && (wdt = plen);
                LScroll.fn.dom.css("left", wdt - plen);
            }
        };
        isAct = true;
        timer = setInterval(anim, this.speed);
        move();
    };
    LScroll.fn.fade = function (startno, numdom) {
        curno = startno = startno == null ? 0 : startno;
        curno++;
        scrollInit(1);
        if (numdom && numdom.length) {
            numdom.hover(function () { LScroll.fn.reset(); }, function () { move(); });
            numdom.find("li").click(function () {
                curno = $(this).index();
                anim();
            });
        }
        anim = function () {
            curno = curno < LScroll.fn.dom.find("li").length - startno ? curno : startno;
            if (numdom && numdom.length) {
                numdom.find(".on").removeClass("on");
                numdom.find("li").eq(curno).addClass("on");
            }
            LScroll.fn.dom.fadeOut(500, function () {
                LScroll.fn.dom.css({ top: 0 - $(LScroll.fn.dom.find("li").get(startno)).height() * curno });
                curno++;
            }).fadeIn(1000);
        };
        isAct = true;
        timer = setInterval(anim, this.speed);
        move();
    };
    return LScroll();
};
/*--轮播 end--*/