//屏幕大小
var win_width = document.body.clientWidth;
var win_height = document.body.clientHeight;
//粒子大小
var BALL_WIDTH = win_width/2;
var BALL_HEIGHT = win_height/2;
//粒子满值
var ball_max=300;
//粒子数组，保存页面所有存在的粒子
var balls=[];
//粒子颜色值
const colors=["#fff","#f6da40","#f68740","#00ce7d",
"#69b7f2","#6babe5","#f196ce","#d6006e","#daa9e3","#cfb5a8",
"#3f97b5","#ffc700","#d1c782","#d40054","#8348ad","#63ccca",
"#cb8342"];
//粒子固定色
var const_ball_color="#fff";
//特效模式
var modle=1;
//发光体
var center_ball={
  r:15,
  color:"rgb(240, 255, 255)"
}
//是否拖拽模式
var isDrag=false;
//判断鼠标是否下按
var isdown = false;

//点击事件
document.onclick=function(ev){
    var oEvent=ev;
    var oLeft=oEvent.clientX;
    var oTop=oEvent.clientY;
    BALL_WIDTH = oLeft;
    BALL_HEIGHT = oTop;
    if (modle==2||modle==3) {
      center_ball.color=colors[ Math.floor( Math.random()*colors.length ) ];
      const_ball_color=center_ball.color;
    }
}
//按钮点击事件
$(document).ready(function(){
    //获取鼠标拖拽位置
    $(document).mousedown(function(event){
      isdown=true;
    })
    $(document).mousemove(function(event){
      if (isdown==true&isDrag==true) {
        var e = event || window.event; 
        var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft; 
        var scrollY = document.documentElement.scrollTop || document.body.scrollTop; 
        var x = e.pageX || e.clientX + scrollX; 
        var y = e.pageY || e.clientY + scrollY; 
        BALL_WIDTH = x;
        BALL_HEIGHT = y;
        console.log('x: ' + x + '\ny: ' + y);
      }
      
    })
    $(document).mouseup(function(event){
      isdown=false;
    })
    $(document).on("touchmove", function(e) {
      if (isDrag==true) {
        e.preventDefault();
        moveEndX = e.originalEvent.changedTouches[0].pageX,
        moveEndY = e.originalEvent.changedTouches[0].pageY,
        BALL_WIDTH = moveEndX;
        BALL_HEIGHT = moveEndY;
      }
    })

    $("#model1").click(
      function(){
        modle=1;
      }
    )
    $("#model2").click(
      function(){
        modle=2;
      }
    )
    $("#model3").click(
      function(){
        modle=3;
      }
    )
    $("#isDrag1").click(
      function(){
        isDrag=true;
      }
    )
    $("#isDrag2").click(
      function(){
        isDrag=false;
      }
    )
});
//启动
window.onload = function(){

    alert("点击有惊喜");
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d");
    
    canvas.width = win_width;
    canvas.height = win_height;

    //动画函数，0.15秒刷新一次
    setInterval(
        function(){
            render( context );
            update();
        }
        ,
        150
    );
    // render(context);
   
}
//更新数据
function update(){
    //判断当前模式
    if (modle==1) {
        for (var i = 0; i <= 7; i++) {
            newball1();
        }
        center_ball.color="#fff";
    }else if (modle==2) {
        for (var i = 0; i <= 7; i++) {
            newball2();
        }
    }else if (modle==3){
        for (var i = 0; i <= 7; i++) {
            newball3();
        }
    }else{
        for (var i = 0; i <= 7; i++) {
            newball3();
        }
    }
    updateball();
}
//更新粒子的数据
function updateball(){
    for( var i = 0 ; i < balls.length ; i ++ ){
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;
        balls[i].r = balls[i].r*0.9;
    }
    //删除过期的粒子
    while( balls.length >= ball_max ){
        balls.shift();
    }
}
//模式1:新创建一个粒子
function newball1(){
  var aBall = {
      x:BALL_WIDTH,
      y:BALL_HEIGHT,
      g:0.1+Math.random()*0.3,//
      vx:getvx(),
      vy:getvy(),
      r:8,
      color: "#fff"
  }

  balls.push( aBall );
}
//模式2:新创建一个粒子
function newball2(){
  var aBall = {
      x:BALL_WIDTH,
      y:BALL_HEIGHT,
      g:0.1+Math.random()*0.3,//
      vx:getvx(),
      vy:getvy(),
      r:8,
      color: const_ball_color
  }
  
  balls.push( aBall );
}
//模式3:新创建一个粒子
function newball3(){
  var aBall = {
      x:BALL_WIDTH,
      y:BALL_HEIGHT,
      g:0.1+Math.random()*0.3,//
      vx:getvx(),
      vy:getvy(),
      r:8,
      color: colors[ Math.floor( Math.random()*colors.length ) ]
  }
  
  balls.push( aBall );
}


//获取x轴的初始速度
function getvx(){
    return Math.random()*10-5;
}
//获取y轴的初始速度
function getvy(){
    return Math.random()*10-5;
}



//绘画方法、更新画布
function render( context ){
    context.clearRect(0,0,document.body.clientWidth , document.body.clientHeight);
    drawball(BALL_WIDTH,BALL_HEIGHT,center_ball.r,context,center_ball.color);
    for( var i = 0 ; i < balls.length ; i ++ ){

        drawball( balls[i].x , balls[i].y , balls[i].r , context , balls[i].color);

    }
}
//画粒子
function drawball( x , y , r , cxt , color){
    cxt.globalCompositeOperation="destination-over"  
    cxt.shadowBlur=10;
    cxt.shadowColor="#ebd4ff";

    //设置渐变颜色
    var grd=cxt.createRadialGradient(x , y , 5 , x , y , r);
    grd.addColorStop(0,color);
    grd.addColorStop(1,color);

    cxt.fillStyle=grd;
    cxt.beginPath();
    cxt.arc(x , y , r , 0 , Math.PI*2 , true );
    cxt.closePath();
    cxt.fill();
}