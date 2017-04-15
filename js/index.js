$(function () {
    pageShow();
    bottomSwiper();
    googsProduct();
    watchRight();
    cart();
    foods();
    evaluate();
});
// 商品评价栏固定，顶部出现店面名称：
var h = $(".top_return").height() - (-5);
// var liTop = $(".product_l li:last-child").scrollTop();
$(function () {
    $(window).scroll(function () {
        var hTop = $("body").scrollTop();
        if (h <= hTop) {
            $(".storename").css("display", "inline-block");
            $(".container-fluid").addClass("navbarfixed");
            $(".product_l ul").css("position", "fixed");
            $(".product_l ul").css("top", "70px");
        } else {
            $(".storename").css("display", "none");
            $(".container-fluid").removeClass("navbarfixed");
            $(".product_l ul").css("position", "relative");
            $(".product_l ul").css("top", "0");
        }
    })
});
//活动页面的现示与隐藏：
function pageShow() {
    var flag = true;
    $(".privilege .active").on("click", function () {
        if (flag) {
            $(".privilege .active i").css("transform", "rotate(180deg)");
            $(".header .top_return .privilege .xin_p").show(100);
            flag = false;
        } else {
            $(".privilege .active i").css("transform", "rotate(0deg)");
            $(".header .top_return .privilege .xin_p").hide(100);
            flag = true;
        }
    })
}
// 上部的下拉效果
function bottomSwiper() {
    // swiperbox.iScroll({
    //     swipeDom:document.querySelector('.bottom_box'),
    //     // swipeType:'y',
    //     swipeDistance:100
    // });
}
// 左侧点击效果
function googsProduct() {
    var lis = document.querySelectorAll(".product_l li");
    for (var i = 0; i < lis.length; i++) {
        lis[i].onclick = function () {
            for (var j = 0; j < lis.length; j++) {
                lis[j].className="";
            }
            this.className="active";
        }
    }

}
//右侧滚动监听
function watchRight(){
    $('.product_r').scrollspy({ target: '#navbar' });
}
//点击出现购物车页面
function cart(){
    var con = true;
    $(".footbtn").on("click",function(){
        if(con){
            $(".cartview-JFaw9").show(200);
            $(".cartbg").show(200);
            con=false;
        }else{
            $(".cartview-JFaw9").css("display","none");
            $(".cartbg").css("display","none");
            con=true;
        }
    })
    $(".cartbg").on("click",function(){
        $(".cartview-JFaw9").css("display","none");
        $(".cartbg").css("display","none");
    })
}
//点击加号获取相应数据
function foods() {
    var food = {};
    var foodName = null;
    var foodMoney = null;
    var foodNumber = 0;
    var html = "";
    //点击加号数量增加
    $(".lanjia").on("click", function () {
        $(this).prev().prev().css("display", "block");
        $(this).prev().css("display", "block");
        foodNumber = $(this).prev().html();
        foodNumber++;
        $(this).prev().html(foodNumber);
        foodName = $(this).parent().siblings(".foodtitle").children()[0].innerHTML;
        foodMoney = $(this).parent().siblings(".foodprice").children()[0].innerHTML;
        food[foodName] = [{"foodName": foodName}, {"foodMoney": foodMoney}, {"foodNumber": foodNumber}];
    });
    //点击减号数量减少
    $(".lanjian").on("click", function () {
        foodNumber = $(this).next().html();
        foodNumber--;
        if (foodNumber == -1) {
            return;
        }
        $(this).next().html(foodNumber);
        foodName = $(this).parent().siblings(".foodtitle").children()[0].innerHTML;
        food[foodName] = [{"foodName": foodName}, {"foodMoney": foodMoney}, {"foodNumber": foodNumber}];
        if (foodNumber == 0) {
            $(this).css("display", "none");
            $(this).next().css("display", "none");
            delete food[foodName];
        }
    });
    $(".footbtn").on("click", function () {
        $(".footerbox").empty();
        $.each(food, function (i, v) {
            html = '<div class="cartview-2cVz8">'
                + '    <span class="goodsname">' + v[0].foodName + '</span>'
                + '    <div class="goodsnum fr">'
                + '        <span class="goodprice">' + v[1].foodMoney + '</span>'
                + '        <span class=" glyphicon glyphicon-minus-sign goodminus "></span>'
                + '        <span class="num1">' + v[2].foodNumber + '</span>'
                + '        <span class=" glyphicon glyphicon-plus-sign goodplus"></span>'
                + '    </div>'
                + '</div>';
            $(".footerbox").append(html);
        });
    });
}

//评价页面
function evaluate() {
    $(".nav_r").click(function(){
        $(".goodsBox").hide();
    })
    $("#link>div").click(function () {
        $(this).addClass("cen_active").siblings("div").removeClass("cen_active");
        var index = $(this).index();
        $(".bottom_content>div").eq(index).addClass("selected").siblings().removeClass("selected");
    });
    $(".eva_classify>span").click(function () {
        // console.log("111");
        $(this).addClass("bgc").siblings("span").removeClass("bgc");

    });
}


// function getGoodMenu() {
//     $.getJSON("./js/data.json", function (res) {
//         var html = template("getGoodNews", res);
//         $(".goods>.product_l").html(html);
//     });
//
//
// }