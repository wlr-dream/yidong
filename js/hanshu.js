/*
getClass(classname)��ȡָ��������Ԫ��
classname ָ��Ҫ��ȡԪ�ص�classname 
range ָ���ķ�Χ,�����һ��DOMԪ��
˼·��
1.�ж������
  document.getElementByClassName
2.��ȡ���е�Ԫ��
3.Ԫ�ص������Ƿ����ָ��������
4.���������洢������
5.��������
*/

/*function getClass(classname){
	if(document.getElementsByClassName){
		return document.getElementsByClassName(classname);
	}else{
		var arr=[];
		var all=document.getElementsByTagName("*");
		for(var i=0;i<all.length;i++){
            if(all[i].className==classaname){
            	arr.push(all[i])
            } 
		}
		return arr;
	}

}
*/

function getClass(classname,range){
	// range=range===undefined?document:range;
	range=range||document;
	// range=range?range:document;
	if(document.getElementsByClassName){
		return range.getElementsByClassName(classname);
	}else{
		var arr=[];
		var all=range.getElementsByTagName("*");
		for(var i=0;i<all.length;i++){
			// ��ǰԪ�ص�className�Ƿ����ָ����classname
            if(checkClass(all[i].className,classaname)){
            	arr.push(all[i])
            } 
		}
		return arr;
	}
}

function checkClass(classStr,classname){
	var arr=classStr.split(" ");
	for(i=0;i<arr.length;i++){
       if(arr[i]===classname){
       	 return true;
       }
	}
	return false;
}


/*
��$(selecter,range)��ȡԪ��
��$(".one")��ȡָ��������Ԫ��
��$("#one")��ȡָ��id��Ԫ��
��$("div")��ȡָ����ǩ����Ԫ��
 1.��ʼ������range
 2.selecter ȥ��
 3.�жϵ�һ���ַ�
 4.��ȡԪ��
*/


function $(selecter,range){
	if(typeof selecter=="function"){
		window.onload=function(){
			selecter();
		}
	}else if(typeof selecter=="string"){
        range=range||document;
����  // ������	
	  // selecter=selecter.trim();
	  // #one .one div
	 if(selecter.charAt(0)=="."){
		return getClass(selecter.substring(1),range);
	 }else if(selecter.charAt(0)=="#"){
		return range.getElementById(selecter.substring(1),range);		
	 }else if(/^[a-z][a-z1-6]{0,8}$/.test(selecter)){
		return range.getElementsByTagName(selecter);
	 }else if(/^<[a-z][a-z1-6]{0,8}>$/.test(selecter)){
		return document.createElement(selecter.slice(1,-1))
	 }

	}
}

/*
getContent(obj,value)
��ȡ��������obj���ı�
obj����ָ������
value����ɫ���õ��ı�
1.�жϻ�ȡ������
  ��������
  value
2.��ȡ
���ж�������Ƿ�֧������
  return obj.innerText
  return obj.textContent=value
3.����
���ж�������Ƿ�֧������
��obj.innerText=value
  obj.textContent=value
*/
function getContent(obj,value){
	if(value){
		if(obj.innerText){
			obj.innerText=value;
		}else if(obj.textContent){
			obj.textContent=value;
		}
	}else{
		if(obj.innerText){
			return obj.innerText;
		}else if(obj.textContent){
			return obj.textContent;
		}

	}
}


/*
getStyle(obj,attr)������ȡָ��Ԫ�ص���ʽ
obj    ָ������
attr ����ʽ����
1.�ж�������Ƿ�֧������
2.��������ֵ
*/

function getStyle(obj,attr){
	if(window.getComputedStyle){
		return getComputedStyle(obj,null)[attr];
	}else{
		return obj.currentStyle[attr];
	}
}
/*
 getChilds(obj)������ȡָ���������Ԫ�ؼ���
 obj �� ָ���Ķ���
 type   ָ����ȡ��Ԫ�ؽڵ������
        true  Ԫ�ؽڵ�   
        false Ԫ�ؽڵ����������ı�
 1.��ȡ���е���Ԫ��
 2.�ڵ�����  1����
*/
function getChilds(obj,type){
	type=type==undefined?true:type;
	var arr=[];
	var childs=obj.childNodes;
	if(type){
	  for(var i=0;i<childs.length;i++){
		if(childs[i].nodeType==1){
			arr.push(childs[i]);
		}
	  }
	}else{
	  for(var i=0;i<childs.length;i++){
		if(childs[i].nodeType==1||(childs[i].nodeType==3&& childs[i].nodeValue.replace(/^\s*|\s*$/g,""))){
			arr.push(childs[i]);
		}
	  }
	}
	return arr;	
}

// ��ȡԪ�ص�һ����Ԫ��
function firstChild(obj){
	return getChilds(obj)[0];
}

// ��ȡԪ�����һ����Ԫ��
function lastChild(obj){
	var childs=getChilds(obj);
	return childs[childs.length-1];
}

// �����ȡ
function randomChild(obj,num){
	var childs=getChilds(obj);
	return childs[num];
}

/*
 getNext(obj)����ȡobj��Ԫ�ؽڵ�
 1.�Ȼ�ȡ�ֵܽڵ�  next
 ��û�С�false
 2.��
 ���ж��ֵܽڵ㡡nodeType!==1
    next=next.nextSibling;
    next==null   false
    �ظ� ����2
   nodeType==1
    ����next
*/
function getNext(obj,type){
 type=type==undefined?true:type;
 if(type){
 	var next=obj.nextSibling;
	if(next==null){
		return false;
	}
	while(next.nodeType==3||next.nodeType==8){
		next=next.nextSibling;
		if(next==null){
			return false;
		}
	}
	return next; 
  }else if(type==false){
  	var next=obj.nextSibling;
	if(next==null){
		return false;
	}
	while(!(next.nodeType==1||(next.nodeType==3&& next.nodeValue.replace(/^\s*|\s*$/g,"")))){
		next=next.nextSibling;
		if(next==null){
			return false;
		}
	}
	return next;
  }
}


/*getPrevious(obj)����ȡobj��Ԫ�ؽڵ�
 1.�Ȼ�ȡ�ֵܽڵ�  previous
 ��û�С�false
 2.��
 ���ж��ֵܽڵ㡡nodeType!==1
    previous=previous.previousSibling;
    previous==null   false
    �ظ� ����2
   nodeType==1
    ����next
*/
function getPrevious(obj,type){
 type=type==undefined?true:type;
 if(type){
 	var previous=obj.previousSibling;
	if(previous==null){
		return false;
	}
	while(previous.nodeType==3||previous.nodeType==8){
		previous=previous.previousSibling;
		if(previous==null){
			return false;
		}
	}
	return previous;
  }else if(type==false){
  	var previous=obj.previousSibling;
	if(previous==null){
		return false;
	}
	while(!(previous.nodeType==1||(previous.nodeType==3&& previous.nodeValue.replace(/^\s*|\s*$/g,"")))){
		previous=previous.previousSibling;
		if(previous==null){
			return false;
		}
	}
	return previous;
  }
}




/*
 insertAfter(newobj,obj,type)   
 ��newobj���뵽obj����
 newobj Ҫ�����Ԫ��
 obj    �����λ��
 type   ����
        true  Ԫ�ؽڵ�
        false Ԫ�ؽڵ����������ı�
1.��ȡobj����һ�ֵ�Ԫ��  next
2.��ȡobj�ĸ�Ԫ�ء���    parent
3. next   false
   parent.appendChild(newobj)
4. parent.inserBefore(newobj,next);
*/
function insertAfter(newobj,obj,type){
	var next=getNext(obj,type);
	var parent=obj.parentNode;
	if(next){
		parent.insertBefore(newobj,next);
	}else{
		parent.appendChild(newobj);
	}
}