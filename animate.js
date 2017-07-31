
var animate = (function(){
	/*
	 *水平移动的特效
	 *通过将编号为k的方格复制一份移动至j的同时将原来k编号的方格初始化
	 *移动到位后再将复制的那份删除
	 */
	var moveHoriz=function(i, j, k){
		var move = $("#square_cell"+"-"+i+"-"+k).clone();
		move.css({
					"top" : 15*(i+1)+100*i+'px',
					"left" : 15*(k+1)+100*k+'px',
					"z-index" : 2,
				});
		
		$("#square_cell"+"-"+i+"-"+k).empty().css("background-color","#CCC0B2");
		$("#square_cell"+"-"+i+"-"+k).after(move);
		move.animate({
			left: 15+115*j+'px',
			
			},250,function(){				//callback回调函数
				move.remove();
		});
	}


	/*
	 *垂直移动的特效
	 *通过将编号为k的方格复制一份移动至j的同时将原来k编号的方格初始化
	 *移动到位后再将复制的那份删除
	 */
	var moveVert=function(i, j, k){
		var move = $("#square_cell"+"-"+k+"-"+i).clone();
		move.css({
					"top" : 15*(k+1)+100*k+'px',
					"left" : 15*(i+1)+100*i+'px',
					"z-index" : 2,
				});
		
		$("#square_cell"+"-"+k+"-"+i).empty().css("background-color","#CCC0B2");
		$("#square_cell"+"-"+k+"-"+i).after(move);
		move.animate({
			top: 15+115*j+'px',
			
			},250,function(){				//callback回调函数
				move.remove();
				// alert("完成");
		});
	}

	return {
		moveHoriz : moveHoriz,
		moveVert : moveVert
	}

})();
