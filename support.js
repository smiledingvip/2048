

var support=(function(){
	/*
	 *randomNumber产生两个随机数
	 *以数组的形势返回
	 */
	var randomNumber=function(amount){
		var random=[];
		for(var i=0;i<amount;i++){
			random.push(parseInt(Math.random()>0.6?4:2));
		}
		return random;
	}
	/*
	 *将随机数随机的加入到arr中
	 *list 表示产生的随机数组
	 */
	var appendRandom=function(arr,list){
		for(var i,j,num=0;num<list.length;num++){
			do{
				i=Math.floor(Math.random()*4);
				j=Math.floor(Math.random()*4);
			}while(arr[i][j]!=0);
			arr[i][j]=list[num];
		}
	}
	/*
	 *将arr加入到square-cell标签中
	 *id 从2048传入的田字格内每一格的id
	 */
	var update=function(arr,id){
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				$(id+"-"+i+"-"+j).empty();
				if(arr[i][j] != 0){
					$(id+"-"+i+"-"+j).html(arr[i][j]);
				}else{
					
				}
				
			}
		}
	}

	/*
	 *判断是否能向左移动
	 *行数组两个条件满足其一
	 *1、行数组存在两个相邻或隔n个0的数字相等
	 *2、存在非空数字前还有0
	 */
	var canMoveLeft=function(arr){
		if(condition1(arr)||condition2(arr)){
			return true;
		}
		return false;
	} 

	/*
	 *判断是否能向右移动
	 *行数组两个条件满足其一
	 *1、行数组存在两个相邻或隔n个0的数字相等
	 *2、存在非空数字前还有0
	 */
	var canMoveRight=function(arr){
		if(condition3(arr)||condition4(arr)){
			return true;
		}
		return false;
	} 

	/*
	 *判断是否能向上移动
	 *行数组两个条件满足其一
	 *1、行数组存在两个相邻或隔n个0的数字相等
	 *2、存在非空数字前还有0
	 */
	var canMoveTop=function(arr){
		if(condition1(arr)||condition2(arr)){
			return true;
		}
		return false;
	} 

	/*
	 *判断是否能向下移动
	 *行数组两个条件满足其一
	 *1、行数组存在两个相邻或隔n个0的数字相等
	 *2、存在非空数字前还有0
	 */
	var canMoveBottom=function(arr){
		if(condition3(arr)||condition4(arr)){
			return true;
		}
		return false;
	} 

	var allMoveLeft=function(arr){
		for(var i=0; i<4; i++){
			if(this.canMoveLeft(arr[i])){
				return true;
			}
		}
		return false;
	}

	var allMoveRight=function(arr){
		for(var i=0; i<4; i++){
			if(this.canMoveRight(arr[i])){
				return true;
			}
		}
		return false;
	}

	var allMoveTop=function(arr){
		for(var i=0; i<4; i++){
			temp=[arr[0][i], arr[1][i], arr[2][i], arr[3][i]];
			if(this.canMoveTop(temp)){
				return true;
			}
		}
		return false;
	}

	var allMoveBottom=function(arr){
		for(var i=0; i<4; i++){
			temp=[arr[0][i], arr[1][i], arr[2][i], arr[3][i]];
			if(this.canMoveBottom(temp)){
				return true;
			}
		}
		return false;
	}
	/*
	 *正序判断条件1
	 */
	function condition1(arr){
		var temp=[null,null];
		for(var i=0;i<4;i++){
			if(arr[i]==0){
				temp[0]=i;
			}else{
				temp[1]=i;
			}
			if(temp[0]!=null&&temp[1]!=null&&temp[0]<temp[1]){
				return true;
				break;
			}
		}
		return false;
	}

	/*
	 *正序判断条件2
	 */
	function condition2(arr){
		for(var temp,i=0;i<4;i++){
			if(arr[i]!=0){
				if(temp==arr[i]){
					return true;
					return temp;
					break;
				}else{
					temp=arr[i];
				}
			}
		}
		return false;
	}

	/*
	 *逆序判断条件1
	 */
	function condition3(arr){
		var temp=[null,null];
		for(var i=3;i>=0;i--){
			if(arr[i]==0){
				temp[0]=i;
			}else{
				temp[1]=i;
			}
			if(temp[0]!=null&&temp[1]!=null&&temp[0]>temp[1]){
				return true;
				break;
			}
		}
		return false;
	}

	/*
	 *逆序判断条件2
	 */
	function condition4(arr){
		for(var temp,i=3;i>=0;i--){
			if(arr[i]!=0){
				if(temp==arr[i]){
					return true;
					return temp;
					break;
				}else{
					temp=arr[i];
				}
			}
		}
		return false;
	}

	var colorCheck = function(val,i,j){
		switch(val){
			case 0:
				$("#square_cell"+"-"+i+"-"+j).css('background','#CCC0B2');
				break;
			case 2:
				$("#square_cell"+"-"+i+"-"+j).css('background','#EEE4DA').css('color', '#7C736A');
				break;
			case 4:
				$("#square_cell"+"-"+i+"-"+j).css('background','#ECE0C8').css('color', '#7C736A');
				break;
			case 8:
				$("#square_cell"+"-"+i+"-"+j).css('background','#F2B179').css('color', '#fff');
				break;
			case 16:
				$("#square_cell"+"-"+i+"-"+j).css('background','#F59563').css('color', '#fff');
				break;
			case 32:
				$("#square_cell"+"-"+i+"-"+j).css('background','#F57C5F').css('color', '#fff');
				break;
			case 64:
				$("#square_cell"+"-"+i+"-"+j).css('background','#F65D3B').css('color', '#fff');
				break;
			case 128:
				$("#square_cell"+"-"+i+"-"+j).css('background','#EDCE71').css('color', '#fff');
				break;
			case 256:
				$("#square_cell"+"-"+i+"-"+j).css('background','#EBCC63').css('color', '#fff');
				break;
			case 512:
				$("#square_cell"+"-"+i+"-"+j).css('background','#E2B71F').css('color', '#fff');
				break;
			case 1024:
				$("#square_cell"+"-"+i+"-"+j).css('background','#C8A01A').css('color', '#fff');
				break;
			case 2048:
				$("#square_cell"+"-"+i+"-"+j).css('background','#AD8B16').css('color', '#fff');
				break;
		}
	}
	
	return {
		randomNumber : randomNumber,
		appendRandom : appendRandom,
		update : update,
		canMoveLeft : canMoveLeft,
		canMoveRight : canMoveRight,
		canMoveTop : canMoveTop,
		canMoveBottom : canMoveBottom,
		allMoveLeft : allMoveLeft,
		allMoveRight : allMoveRight,
		allMoveTop : allMoveTop,
		allMoveBottom : allMoveBottom,
		colorCheck : colorCheck
	}

})();
