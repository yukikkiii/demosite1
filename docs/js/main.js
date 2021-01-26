





var windowW = $(window).width();
var caucelSetLoop;
var salonSetLoop;


$(function(){
    carMouseOver();
    document.querySelectorAll(".js-scroll-visible").forEach(target => {
        const io = new IntersectionObserver((entries, observer)=>{
            entries.forEach( entry =>{
            if(entry.isIntersecting){
                const target = entry.target;
                var type = target.getAttribute("type");
                if(type === "addClass") {
                    var addClass = target.getAttribute("add");
                    target.classList.add(addClass)

                } else {
                    var delay = target.getAttribute("delay")
                    delay === null ? delay = "" : delay = delay;
                    target.classList.add(`fadeIn${delay}`)
                }
                
                
                observer.disconnect();
            }
            });
        });
        io.observe(target);
    })
    
})

function carMouseOver(){
    var
    cursor = $("#stalker"),
    follower = $("#follower"),
    cWidth = 8, //カーソルの大きさ
    fWidth = 40, //フォロワーの大きさ
    delay = 10, //数字を大きくするとフォロワーがより遅れて来る
    mouseX = 0, //マウスのX座標
    mouseY = 0, //マウスのY座標
    posX = 0, //フォロワーのX座標
    posY = 0; //フォロワーのX座標
    windowW = $(window).width();
    
    TweenMax.to({}, .001, {
      repeat: -1,
      onRepeat: function() {
        posX += (mouseX - posX) / delay;
        posY += (mouseY - posY) / delay;
        
        TweenMax.set(follower, {
            css: {    
              left: posX - (fWidth / 2),
              top: posY - (fWidth / 2)
            }
        });
        
        TweenMax.set(cursor, {
            css: {    
              left: mouseX - (cWidth / 2),
              top: mouseY - (cWidth / 2)
            }
        });
      }
    });
    
    $(document).on("mousemove", function(e) {
        mouseX = e.pageX;
        mouseY = e.pageY;
        console.log("ok")
    });
    
    $(".hover-cursor").on({
      "mouseenter": function() {
        cursor.addClass("is-active");
        follower.addClass("is-active");
        windowW / 2 > mouseX ? cursor.removeClass("right").addClass("left") : cursor.removeClass("left").addClass("right");
      },
      "mousemove": function(){
        windowW / 2 > mouseX ? cursor.removeClass("right").addClass("left") : cursor.removeClass("left").addClass("right");
      },
      "click": function(){
        var dir = cursor.hasClass("right") ? "right": "left";
        console.log(dir)
        var imgsList = $(this).find(".content__img");
        clearTimeout(caucelSetLoop);
        
        imgsList.each(function(){
          var order = Number($(this).attr("order"));
          $(this).addClass("transition-clear");
          
          // if (dir === "right") {
          //   if (order === 0) $(this).attr("order", imgsList.length - 1)
          //   else $(this).attr("order", order - 1)
          // }
          // else {
          //   if (order === 0) $(this).attr("order", imgsList.length - 1)
          //   else $(this).attr("order", order - 1)
          // }
        })
        // $(this).removeClass("transition-clear");
        caucelLoop()
        
      },
      "mouseleave": function() {
        cursor.removeClass("is-active left right");
        follower.removeClass("is-active");
      }
    });
}



// function caucelLoop(){
//   var $slides = $(".slide-counsel-imgs").eq(0);
  
//   loopImg($slides)
//   caucelSetLoop = setTimeout(caucelLoop, 5000)
// }
// function salonLoop(){
//   var $slides = $(".slide-salon-imgs").eq(0);
//   loopImg($slides)
//   salonSetLoop = setTimeout(salonLoop, 5000)
// }
// function loopImg($slides){
//   var last = false
//   var imgsList = $slides.find('.content__img');
//   imgsList.each(function(){
//       $(this).removeClass("transition-clear");
//       var order = Number($(this).attr("order"));
//       if (order === 0) $(this).attr("order", imgsList.length - 1)
//       else $(this).attr("order", order - 1)
//   })
// }
