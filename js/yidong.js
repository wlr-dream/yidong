window.onload=function(){
/*头部*/
 var denglu=$(".denglu");
 var dl=$(".dl");
  for(var i=0;i<denglu.length;i++){
    denglu[i].index=i;
	denglu[i].onmouseover=function(){
	 dl[this.index].style.display="block";
	 denglu[this.index].style.background="white";
	}
  }
  for(var i=0;i<denglu.length;i++){
    denglu[i].index=i;
	denglu[i].onmouseout=function(){
	dl[this.index].style.display="none";
	denglu[this.index].style.background="none";
   }
  }


 var yyt=$(".yyt");
 var yyt1=$(".yyt1");
  for(var i=0;i<yyt.length;i++){
    yyt[i].index=i;
	yyt[i].onmouseover=function(){
	 yyt1[this.index].style.display="block";
	 yyt[this.index].style.background="white";
	}
  }
  for(var i=0;i<denglu.length;i++){
    yyt[i].index=i;
	yyt[i].onmouseout=function(){
	yyt1[this.index].style.display="none";
	yyt[this.index].style.background="none";
   }
  }


/*导航*/
 var item=$(".item");
 var list=$(".list");
  for(var i=0;i<item.length;i++){
    item[i].index=i;
	item[i].onmouseover=function(){
	 list[this.index].style.display="block";
	}
  }
  for(var i=0;i<item.length;i++){
    item[i].index=i;
	item[i].onmouseout=function(){
	list[this.index].style.display="none";
   }
  }


  var imgs=$("a",$(".imgBox")[0]);
  var buttons=$("div",$(".b1")[0]);
  var middle=$(".bannerMiddle")[0];
  var btnL=$(".btnLeft")[0];
  var btnR=$(".btnRight")[0];
  var aa=parseInt(getStyle(middle,"width"));   
  for(var i=0;i<imgs.length;i++){
	if(i==0){
		continue;
	}
	imgs[i].style.left=aa+"px";
}
  // buttons[0].className="buttom";
  buttons[0].classList.add("buttom");
/*now  记录当前窗口中图片
  next 记录下一张图片
1.下一张就位
2.动画
imgs[now]   left   mw 
imgs[next]  left   0
3.更新
*/
var now=0;
var next=0;
var t=setInterval(move,2000);
middle.onmouseover=function(){
	clearInterval(t);
}
middle.onmouseout=function(){
	t=setInterval(move,2000);
}
/*选项卡*/
for(var i=0;i<buttons.length;i++){
	buttons[i].index=i;
	buttons[i].onclick=function(){
		/*next this.index*/
		if(now>this.index){
		 imgs[this.index].style.left=-aa+"px";
	     animate(imgs[now],{left:aa});
	     animate(imgs[this.index],{left:0});
	    }else if(now<this.index){
	  	 imgs[this.index].style.left=aa+"px";
	     animate(imgs[now],{left:-aa});
	     animate(imgs[this.index],{left:0});
	    }else{
	  	 return;
	   }
	  buttons[now].classList.remove("buttom");
	  buttons[this.index].classList.add("buttom");
      now=this.index;
      next=this.index;
	}
}

/*左右按钮*/
var flag=true;
btnR.onclick=function(){
	if(flag){
	move();
	flag=false;
	}
}
btnL.onclick=function(){
    if(flag){
      moveL();
	 flag=false;
	}
}
function moveL(){
	next--;
	if(next<0){
		next=imgs.length-1;
	}
	imgs[next].style.left=-aa+"px";
	buttons[now].classList.remove("buttom")
	buttons[next].classList.add("buttom")
	animate(imgs[now],{left:aa},function(){flag=true;});
	animate(imgs[next],{left:0},function(){flag=true;});
    now=next;
}


function move(){
	next++;
	if(next==imgs.length){
		next=0;
	}
	imgs[next].style.left=aa+"px";
	buttons[now].classList.remove("buttom");
	buttons[next].classList.add("buttom");
	animate(imgs[now],{left:-aa},function(){flag=true;});
	animate(imgs[next],{left:0},function(){flag=true;});
    now=next;
}
    /*节点轮播*/



             var items1=$(".items1")[0];
			 var imgbox=$("img",$(".items1")[0])
			 var aw=parseInt(getStyle(imgbox[0],"width"))+parseInt(getStyle(imgbox[0],"border-right"))
			 var btnl=$(".btnl")[0]
			 var btnr=$(".btnr")[0]
			 console.log(btnl)
			 var flag2=true;
			 
			 items1.style.width=aw*imgbox.length+"px"
			 var r=setInterval(remove,2000);
			 var f=$(".yewu")[0];
			 f.onmouseover=function(){
                clearInterval(r)
			 }
			f.onmouseout=function(){
                r=setInterval(remove,2000);
			 }
			 function remove(){
				 animate(items1,{left:-aw},function(){
				 var first=firstChild(items1);
				 items1.appendChild(first)
				 items1.style.left=0;
				 flag2=true;
				 })}
				 function removel(){
				 var first=firstChild(items1);
				 var last=lastChild(items1);
				 items1.insertBefore(last,first);
				 items1.style.left=-aw+"px";
				 animate(items1,{left:0},function(){flag2=true})}
				 btnl.onclick=function(){
			    if(flag2)
				 { remove();
			       flag2=false;
			                }
			 }
			    btnr.onclick=function(){
			    if(flag2)
				 { removel();
			       flag2=false;
			              }
			       }

//公告
var ggg=$(".ggg");
var gd=$(".gd")[0];
var gd1=$(".gd1")[0];
var gnext=0;
ggg[0].style.display="block";
gd.onclick=function(){
  gmovel();  
}
gd1.onclick=function(){
  gmove();   
}
  function gmove () {
	  gnext++;
	  if(gnext==ggg.length){
	  gnext=0;
	  }
	  for(var i=0;i<ggg.length;i++){
	  ggg[i].style.display="none";
	  }
	  ggg[gnext].style.display="block"
  }
    function gmovel () {
	  gnext--;
	  if(gnext<0){
	  gnext=ggg.length-1;
	  }
	  for(var i=0;i<ggg.length;i++){
	  ggg[i].style.display="none";
	  }
	  ggg[gnext].style.display="block"
  }

//客服
var n3=$(".n3")[0];
console.log(n3)
var n4=$(".n4")[0];
var n5=$(".n5")[0];
n3.onmouseover=function(){
 animate(n3,{right:32})
}
n3.onmouseout=function(){
animate(n3,{right:-25})
}
n4.onmouseover=function(){
 animate(n4,{right:32})
}
n4.onmouseout=function(){
animate(n4,{right:-25})
}
n5.onmouseover=function(){
 animate(n5,{right:32})
}
n5.onmouseout=function(){
animate(n5,{right:-25})
}




}


