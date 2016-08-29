// javascript document
window.onload = function(){
	var Oprev_all = document.getElementById('prev_all');
	startMove(Oprev_all,{'width':400,'height':446},function(){
		startMoveBoom(Oprev_all,'top',100)
	});
		Oprev_all.onmousedown = function(ev){
			var ev = ev||event;
			var disX = event.clientX - Oprev_all.offsetLeft;
			var disY = event.clientY - Oprev_all.offsetTop;
			var LastX = 0;
			var LastY = 0;
			var iSpeedX = 0;
			var iSpeedY = 0;
			document.onmousemove = function(ev){
				if (Oprev_all.setCapture){ 	 //添加全局捕获，兼容ie
						Oprev_all.setCapture( )
					}
				var ev = ev||event;
				var L = event.clientX - disX;
				var T = event.clientY - disY;
				Oprev_all.style.left = L + 'px';
				Oprev_all.style.top = T +'px';
				iSpeedX = L - LastX;
				iSpeedY = T - LastY;
				LastX = L;
				LastY = T;
			}
			document.onmouseup = function(){
				document.onmouseup = document.onmousemove = null;
				if ( Oprev_all.releaseCapture){ 	 //释放全局捕获，兼容ie
					Oprev_all.releaseCapture( )
				}
				startMoveG(Oprev_all,iSpeedX,iSpeedY)
			}
			return false;
		}

	var Oprior = document.getElementById('Pri');
	var Onex = document.getElementById('Nex');

	Oprior.onmouseover = Onex.onmouseover= function(){
		startMove(this,{opacity:1});
	}

	Oprior.onmouseout = Onex.onmouseout= function(){
		startMove(this,{opacity:0});
	}
	var Obtn_left = Oprior.getElementsByTagName('a')[0];
	var Obtn_right = Onex.getElementsByTagName('a')[0];
	var OPic_list = document.getElementById('Pic_list');
	var Apic_li = OPic_list.getElementsByTagName('li');
	var itop = 0;
	var Othumb_list = document.getElementById('thumb_list');
	var Othumb_list_li = Othumb_list.getElementsByTagName('li');
	Othumb_list.innerHTML += Othumb_list.innerHTML;
	Othumb_list.style.width = Othumb_list_li.length*130+'px';
	var ileft = 0;
	Obtn_right.onclick = function(){
		itop -=320;
		ileft -=130;
		if (itop<(Apic_li.length-1)*(-320)) {
			itop = 0;
		}
		if (ileft==-910) {
			Othumb_list.style.left = 0;
			ileft=-130
		}

		startMove(OPic_list,{'top':itop});
		startMove(Othumb_list,{'left':ileft});
	}
	Obtn_left.onclick = function(){
		
		if (ileft==0) {
			Othumb_list.style.left = -780+'px';
			ileft=-650;
		}else{ileft+=130;}
		if (itop==0) {
			itop=(Apic_li.length-1)*(-320)
		}else{itop +=320;}
		startMove(OPic_list,{'top':itop})
		startMove(Othumb_list,{'left':ileft});
	}
	

	
}

function startMove(obj,json,fn){
	clearInterval(obj.timer);
	var ispeed = '';
	for(var attr in json){
		if(attr=='opacity') json[attr] = json[attr]*100;//如果属性为透明度目标点转换为2位整数
	}

	obj.timer = setInterval(function(){
		var bStop = true;
		for(var attr in json){		
				var Cstyle = getStyle(obj,attr);
				if (attr == 'opacity') {
					ispeed = (json[attr]-parseFloat(Cstyle)*100)/8;
				}else{
						ispeed =(json[attr]-parseInt(Cstyle))/8;
						}	
				ispeed = ispeed>0?Math.ceil(ispeed):Math.floor(ispeed);
				var psn = attr=='opacity'?parseInt(parseFloat(Cstyle)*100)+ispeed:parseInt(Cstyle)+ispeed;
				if(psn!==json[attr]){
					bStop = false;
				}

				if(attr=='opacity'){
					obj.style[attr] = psn/100;
					obj.style.filter = 'alpha(opacity:'+psn+')';
				}else{
					obj.style[attr] = psn+'px';
					}
		}

		if(bStop){
			clearInterval(obj.timer);
			fn&&fn();
		
			}

			
		},30)}

		function startMoveBoom(obj,attr,target){ 
				var speed =0;
				var psn =0;

				clearInterval(obj.timer);
			
				obj.timer = setInterval(function(){	
					speed += (target-parseInt(getStyle(obj,attr)))/5
					speed = speed*0.7;
					psn += speed;
					if(Math.abs(speed)<1 && Math.abs(psn-target)<1){
						clearInterval(obj.timer);
						obj.style[attr]=target+'px';
					}else{obj.style[attr]= psn +'px';}	
				},30)
		}

		function startMoveG(obj,SpeedX,SpeedY){
			var iSpeedX = SpeedX;
			var iSpeedY = SpeedY;
			clearInterval(obj.timer);
			obj.timer =	setInterval(function(){
				iSpeedY += 3;
				var L =obj.offsetLeft + iSpeedX;
				var T =obj.offsetTop + iSpeedY;
				if(T>=document.documentElement.clientHeight-obj.offsetHeight){
					iSpeedY *=-0.8;
					iSpeedX *=0.8;
					T =document.documentElement.clientHeight-obj.offsetHeight;
				}else if(T<=0){
					iSpeedY *=-0.8;
					iSpeedX *=0.8;
					T = 0;
				}
				if (L>=document.documentElement.clientWidth-obj.offsetWidth) {
					iSpeedX *=-0.8
					L = document.documentElement.clientWidth-obj.offsetWidth;
				}else if(L<=0){
					iSpeedX *=-0.8;
					L = 0 ;
				}
				if (Math.abs(iSpeedX)<1) {
					iSpeedX=0;
				}
				if (Math.abs(iSpeedY)<1) {
					iSpeedY=0;
				}

				if(Math.abs(iSpeedX)==0 && Math.abs(iSpeedY)==0 && T==document.documentElement.clientHeight-obj.offsetHeight){
					clearInterval(obj.timer)
					//alert('close')
				}else{
						obj.style.left = L +'px';
						obj.style.top = T +'px';
				}
			
				obj.style.left = L +'px';
				obj.style.top = T +'px';
			},30)

		}
			


function getStyle(obj,attr){
			return  obj.currentStyle? obj.currentStyle[attr] : getComputedStyle(obj,false)[attr] ;
			}
