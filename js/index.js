
window.onload = function () {
    search();
    secondKill();
    srollPic();

}
/*头部搜索*/

    var search = function(){
        var search = document.getElementsByClassName('jd_header_box')[0];
        var banner = document.getElementsByClassName('jd_banner')[0];
        var height = banner.offsetHeight;
        
        window.onscroll = function () {
            var top = document.body.scrollTop;
            if(top > height){
                search.style.background = 'rgba(201,21,35,0.85)';
            }else{
                var cp = top/height *0.85;
                search.style.background = 'rgba(201,21,35,'+ cp+')';
            }
        }
    };


 var secondKill = function () {
     var parentTime = document.getElementsByClassName('sk_time')[0];
     var timeList = parentTime.getElementsByClassName('num');

     var times = 4*60*60;
     setInterval(function(){
         times--;
         var h = Math.floor(times/3600);
         var m = Math.floor(times%3600/60);
         var s = Math.floor(times%60);



         timeList[0].innerHTML = Math.floor(h>10? h/10:0);
         timeList[1].innerHTML = h%10;
         timeList[2].innerHTML = Math.floor(m>10? m/10:0);

         timeList[3].innerHTML = m%10;
         timeList[4].innerHTML = Math.floor(s>10? s/10:0);
         timeList[5].innerHTML = s%10;

     },1000)
 };

 var srollPic = function () {
     /*获取banner*/
     var banner = document.getElementsByClassName('jd_banner')[0];
     /*图片的宽度*/
     var banner_width = banner.offsetWidth;

     var imgs = banner.getElementsByTagName('ul')[0];
     var points = banner.getElementsByTagName('ul')[1];
     var pointList = points.getElementsByTagName('li');
     console.log(pointList.length)

     var index = 1 ;
     var timer ;

     var addTransition = function(){
         imgs.style.transition = 'all .3s ease 0s';
         imgs.style.webkitTransition = 'all .3s ease 0s';
     };

     var removeTransition = function(){
         imgs.style.transition = 'none';
         imgs.style.webkitTransition = 'none';
     };

     /*改变位置*/
     var setTransform = function (t) {
         imgs.style.transform = 'translateX('+t+'px)';
         imgs.style.webkitTransform = 'translateX('+t+'px)';

     };

     //改变小点
     var pointChange = function () {

         for(var k = 0,len = pointList.length;k< len;k++){
             pointList[k].className = '';
         }
         pointList[index-1].className = 'now';


     };

     timer = setInterval(function () {
         index++;

         addTransition();
         setTransform(-index*banner_width);

     },1000);

     /*添加过渡完事件*/
     imgs.addEventListener('transitionEnd', function () {

         if(index > 8){
             index = 1;

         }else if(index <= 0){
             index = 8;
         }
         removeTransition();
         setTransform(-index*banner_width);
         pointChange();
     },false);

     /*兼容老版本webkit*/
     imgs.addEventListener('webkitTransitionEnd', function () {
         if(index > 8){
             index = 1;

         }else if(index <= 0){
             index = 8;
         }
         removeTransition();
         setTransform(-index*banner_width);
         pointChange();
     },false);


     /*添加手指滑动效果*/

     var statX = 0,endX = 0; //记录开始,结束坐标
     var distance; //记录拖动位移

     //记录用户点击时的transform
     var trans_str = 0;


     banner.addEventListener('touchstart', function (e) {
         statX =  e.touches[0].clientX;
         clearInterval(timer);

     //    记住当用户点击时的imgs的transform
         trans_str = -index*banner_width;

     });
     banner.addEventListener('touchmove', function (e) {
         endX =  e.touches[0].clientX;

         setTransform(trans_str + endX - statX);

     });
     banner.addEventListener('touchend', function () {

         distance = endX - statX;

         //如果滑动距离大于盒子的1/5，如果距离大于0，index++，反之--
           if(Math.abs(distance) >= banner_width/5 ){
               index = statX - endX > 0 ? ++index : --index;
           }
         // 用户向左滑动，没有滑到阈值，图片向右移动手指滑动的距离
         addTransition();
         setTransform(-index*banner_width);

          timer = setInterval(function () {
             index++;
             addTransition();
             setTransform(-index*banner_width);
         },1000);
     })
 }

