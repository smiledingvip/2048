function Run2048(main, start){
	this.main = main;
	this.arr = [];
	this.start = start;
	this.eventListener();
}

Run2048.prototype = {
	constructor : Run2048,
	init : function(){
		for(var i = 0; i < 4; i++){
			for(var j = 0; j < 4; j++){
				$("<div></div>")
				.attr("id", "square_cell"+"-"+i+"-"+j)
				.addClass("square_cell")
				.css({
					"top" : 15*(i+1)+100*i+'px',
					"left" : 15*(j+1)+100*j+'px'
				})
				.appendTo(this.main);
			}
		}
		for(var i = 0; i < 4; i++){
			this.arr[i] = [];
			for(var j=0; j < 4; j++){
				this.arr[i][j] = 0;
			}
		}
		var randomList = support.randomNumber(2);
		support.appendRandom(this.arr,randomList);
		support.update(this.arr,"#square_cell");

		for(var i=0; i<4; i++){
			for(var j=0; j<4; j++){
				support.colorCheck(this.arr[i][j], i, j);
			}
		}
	},

	/*
	 *eventListener 事件监听器 对键盘上下左右作出反应
	 */ 
	eventListener: function(){
		var _this=this;
		$(document).on('keydown',function(e){
			switch(e.keyCode){				//switch语句相比if语句效率高，并不会一级级的去判断，而是直接进入相应case中
				case 37:
					// alert(_this.moveLeft());
					if(_this.moveLeft()){
						// alert(_this.moveLeft());
						var randomList = support.randomNumber(1);
						support.appendRandom(_this.arr, randomList);
						setTimeout(function(){
							support.update(_this.arr,"#square_cell");
							for(var i=0; i<4; i++){
								for(var j=0; j<4; j++){
									support.colorCheck(_this.arr[i][j], i, j);
								}
							}
						},250);
						
						_this.gameOver(_this.arr);
					}
					break;
				case 38:
					if(_this.moveTop()){
						var randomList = support.randomNumber(1);
						support.appendRandom(_this.arr, randomList);
						setTimeout(function(){
							support.update(_this.arr,"#square_cell");
							for(var i=0; i<4; i++){
								for(var j=0; j<4; j++){
									support.colorCheck(_this.arr[i][j], i, j);
								}
							}
						},250);
						_this.gameOver(_this.arr);
					}
					break;
				case 39:
					if(_this.moveRight()){
						var randomList = support.randomNumber(1);
						support.appendRandom(_this.arr, randomList);
						setTimeout(function(){
							support.update(_this.arr,"#square_cell");
							for(var i=0; i<4; i++){
								for(var j=0; j<4; j++){
									support.colorCheck(_this.arr[i][j], i, j);
								}
							}
						},250);
						_this.gameOver(_this.arr);
					}
					break;
				case 40:
					if(_this.moveBottom()){
						var randomList = support.randomNumber(1);
						support.appendRandom(_this.arr, randomList);
						setTimeout(function(){
							support.update(_this.arr,"#square_cell");
							for(var i=0; i<4; i++){
								for(var j=0; j<4; j++){
									support.colorCheck(_this.arr[i][j], i, j);
								}
							}
						},250);
						_this.gameOver(_this.arr);
					}
					break;	
			}
		});
		$(this.start).click(function(){
			if($(this.main).length>0){
				$(this.main).empty();
				_this.init();
			}else{
				_this.init();
			}
		})
	},
	/*
	 *向左移动
	 */
	moveLeft:function(){
		var moveable=[];
		var _this=this.arr;
		for(var i=0; i<4; i++){
			if(support.canMoveLeft(this.arr[i])){
				moveable[i]=1;
				for(var j=0; j<4; j++){
					for(var k=j+1; k<4; k++){
						if(this.arr[i][j] == 0 && this.arr[i][k] != 0){
							animate.moveHoriz(i, j, k);
							this.arr[i][j] = this.arr[i][k];
							this.arr[i][k] = 0;
						}
						if(this.arr[i][j] != 0 && this.arr[i][j] == this.arr[i][k]){
							animate.moveHoriz(i, j, k);
							this.arr[i][j] = this.arr[i][j]+this.arr[i][k];
							this.arr[i][k] = 0;
							break;
						}
						if(this.arr[i][j] != 0 && this.arr[i][k] >0 && this.arr[i][k] != this.arr[i][j]){
							break;
						}
					}
					
				}
				
			}
		}

		
		for(var i=0; i<4; i++){
			// alert(_this);
			if(moveable[i]==1){
				// alert(_this);
				return this.arr;
			}
		}
		return false;
		
	},

	/*
	 *向右移动
	 */
	moveRight:function(){
		var moveable=[];
		for(var i=0; i<4; i++){
			if(support.canMoveRight(this.arr[i])){
				moveable[i]=1;
				for(var j=3; j>=0; j--){
					for(var k=j-1; k>=0; k--){
						if(this.arr[i][j] == 0 && this.arr[i][k] != 0){
							animate.moveHoriz(i, j, k);
							this.arr[i][j] = this.arr[i][k];
							this.arr[i][k] = 0;
						}
						if(this.arr[i][j] != 0 && this.arr[i][j] == this.arr[i][k]){
							animate.moveHoriz(i, j, k);
							this.arr[i][j] = this.arr[i][j]+this.arr[i][k];
							this.arr[i][k] = 0;
							break;
						}
						if(this.arr[i][j] != 0 && this.arr[i][k] >0 && this.arr[i][k] != this.arr[i][j]){
							break;
						}
					}
					
				}
				
			}
		}
		for(var i=0; i<4; i++){
			if(moveable[i]==1){
				return this.arr;
			}
		}
		return false;

	},
	/*
	 *向上移动
	 */
	moveTop:function(){
		var moveable=[];
		var temp=[];
		for(var i=0; i<4; i++){
			temp=[this.arr[0][i], this.arr[1][i], this.arr[2][i], this.arr[3][i]];
			if(support.canMoveTop(temp)){
				moveable[i]=1;
				for(var j=0; j<4; j++){
					for(var k=j+1; k<4; k++){
						if(temp[j] == 0 && temp[k] != 0){
							animate.moveVert(i, j, k);
							temp[j] = temp[k];
							temp[k] = 0;
						}
						if(temp[j] != 0 && temp[j] == temp[k]){
							animate.moveVert(i, j, k);
							temp[j] = temp[j] + temp[k];
							temp[k] = 0;
							break;
						}
						if(temp[j] != 0 && temp[k] >0 && temp[k] != temp[j]){
							break;
						}
					}
					this.arr[j][i] = temp[j];
				}
			}
		}
		for(var i=0; i<4; i++){
			if(moveable[i]==1){
				// alert(i);
				return this.arr;
			}
		}
		return false;

	},
	/*
	 *向下移动
	 */
	moveBottom:function(){
		var moveable=[];
		var temp=[];
		for(var i=0; i<4; i++){
			temp=[this.arr[0][i], this.arr[1][i], this.arr[2][i], this.arr[3][i]];
			if(support.canMoveBottom(temp)){
				moveable[i]=1;
				for(var j=3; j>=0; j--){
					for(var k=j-1; k>=0; k--){
						if(temp[j] == 0 && temp[k] != 0){
							animate.moveVert(i, j, k);
							temp[j] = temp[k];
							temp[k] = 0;
						}
						if(temp[j] != 0 && temp[j] == temp[k]){
							animate.moveVert(i, j, k);
							temp[j] = temp[j] + temp[k];
							temp[k] = 0;
							break;
						}
						if(temp[j] != 0 && temp[k] >0 && temp[k] != temp[j]){
							break;
						}
					}
					this.arr[j][i] = temp[j];
				}
			}
		}
		for(var i=0; i<4; i++){
			if(moveable[i]==1){
				// alert(i);
				return this.arr;
			}
		}
		return false;

	},
	/*
	 *判断游戏结束：两个条件
	 *1、已出现2048
	 *2、上下左右均不能移动
	 */
	gameOver : function(){
		for(var i=0; i<4; i++){
			for(var j=0; j<4; j++){
				if(this.arr[i][j]==2048){
					alert("恭喜你!");
					return false;
				}
			}
		}
		
		
		if((support.allMoveLeft(this.arr)) || (support.allMoveRight(this.arr) ) || (support.allMoveTop(this.arr)) || (support.allMoveBottom(this.arr))){
			return true;
		}else{
			alert("游戏结束！");
			return false;
		}
	}
}


var run2048 = new Run2048("#square_container","#start");
$("#start").button();


