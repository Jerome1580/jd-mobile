
window.onload = function () {
  search();
    secondKill();

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

 }

