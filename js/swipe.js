/**
 * @author zhu
 * @Date 2016-02-20
 * @Method 滑动方法  针对一个大容器内部的容器做滑动封装
 * @param
 * args args.swipeDom 大容器对象
 * args.swipeType 滑动类型
 * args.swipeDistance 缓冲距离
 * 注意：子容器的高宽度是取的内容的高宽 所以padding的大小有影响
 */
if(!window.swiperbox){
    window.swiperbox = {};
}
swiperbox.iScroll = function(args){
    if(!(this instanceof arguments.callee)) return new arguments.callee(args);
    this.init(args);
};
swiperbox.iScroll.prototype = {
    constructor:swiperbox.iScroll,
    init:function(args){
        var that  = this;
        if(args.swipeDom && typeof  args.swipeDom == 'object'){
            that.parentDom = args.swipeDom;
        }
        if(!that.parentDom) return false;
        that.childDom = that.parentDom.children&&that.parentDom.children[0]?that.parentDom.children[0]:'';
        if(!that.childDom) return false;
        that.settings = {};
        that.settings.swipeType = args.swipeType?args.swipeType:'y';
        that.settings.swipeDistance = args.swipeDistance>=0?args.swipeDistance:150;
        that._scroll();
    },
    setTranslate:function(translate){
        this.currPostion = translate;
        this._addTransition();
        this._changeTranslate(this.currPostion);
    },
    _addTransition:function(){
        this.childDom.style.transition = "all .2s ease";
        this.childDom.style.webkitTransition = "all .2s ease";
    },
    _removeTransition:function(){
        this.childDom.style.transition = "none";
        this.childDom.style.webkitTransition = "none";
    },
    _changeTranslate:function(translate){
        if(this.settings.swipeType == 'y'){
            this.childDom.style.transform = "translateY("+translate+"px)";
            this.childDom.style.webkitTransform = "translateY("+translate+"px)";
        }else{
            this.childDom.style.transform = "translateX("+translate+"px)";
            this.childDom.style.webkitTransform = "translateX("+translate+"px)";
        }
    },
    _scroll:function(){
        var that = this;
        var type = that.settings.swipeType == 'y'?true:false;
        var parentHeight = type?that.parentDom.offsetHeight:that.parentDom.offsetWidth;
        var childHeight = type?that.childDom.offsetHeight:that.childDom.offsetWidth;

        if(childHeight < parentHeight){
            if(type){
                that.childDom.style.height = parentHeight + 'px';
                childHeight = parentHeight;
            }else{
                that.childDom.style.width = parentHeight + 'px';
                childHeight = parentHeight;
            }
        }

        var distance = that.settings.swipeDistance;
        that.maxPostion = 0;
        that.minPostion = -(childHeight-parentHeight);
        that.currPostion = 0;
        that.startPostion = 0;
        that.endPostion = 0;
        that.movePostion = 0;
        that.childDom.addEventListener('touchstart',function(e){
            that.startPostion = type?e.touches[0].clientY: e.touches[0].clientX;
        },false);
        that.childDom.addEventListener('touchmove',function(e){
            e.preventDefault();
            that.endPostion = type?e.touches[0].clientY: e.touches[0].clientX;
            that.movePostion = that.startPostion - that.endPostion;
            if((that.currPostion-that.movePostion)<(that.maxPostion+distance)
                &&
                (that.currPostion-that.movePostion)>(that.minPostion -distance)){
                that._removeTransition();
                that._changeTranslate(that.currPostion-that.movePostion);
            }
        },false);
        window.addEventListener('touchend',function(e){
            if((that.currPostion-that.movePostion) > that.maxPostion){
                that.currPostion = that.maxPostion;
                that._addTransition();
                that._changeTranslate(that.currPostion);
            }
            else if((that.currPostion-that.movePostion) < that.minPostion){
                that.currPostion = that.minPostion;
                that._addTransition();
                that._changeTranslate(that.currPostion);
            }
            else{
                that.currPostion = that.currPostion-that.movePostion;
            }
            that._reset();
        },false);

    },
    _reset:function(){
        var that = this;
        that.startPostion = 0;
        that.endPostion = 0;
        that.movePostion = 0;
    }
};