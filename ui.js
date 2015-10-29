function UI(cvs){//绘制用户界面，采用双缓冲技术
	this.cvsbuf = document.createElement('canvas');
	$(document.body).append(this.cvsbuf);
	$(this.cvsbuf).css('visibility', 'hidden');
	//$(this.cvsbuf).css('width', $(cvs).css('width'));
	//$(this.cvsbuf).css('height', $(cvs).css('height'));
	this.cvsbuf.width = parseInt($(cvs).css('width'));
	this.cvsbuf.height = parseInt($(cvs).css('height'));
	this.cvs = cvs;
	this.height = cvs.height; 
	this.width = cvs.width;
	this.cvsbufctx = this.cvsbuf.getContext('2d');
	this.cvsctx = cvs.getContext('2d');
	that = this;
	this.draw = function(matrix, rows, cols, grid_size){//绘制棋盘
		this.cvsbufctx.clearRect(0, 0, this.cvsbuf.width, this.cvsbuf.height);
		this.cvsctx.clearRect(0, 0, cvs.width, cvs.height);
		var gridWidth = grid_size;
		var gridHeight = grid_size;
		var x = 0; 
		var y = 0;
		this.cvsbufctx.strokeStyle = "#fff";
		for (var i = 0; i < rows; i++){//根据矩阵在棋盘对应位置绘制黑色方块
			x = 0;
			for (var j = 0; j < cols; j++){
				if (matrix[i][j] == 1) {
					this.drawLivecell(x, y, gridWidth, gridHeight);
				} else if (matrix[i][j] == 2){
					this.drawWall(x, y, gridWidth, gridHeight);
				}
				x += gridWidth;
			}
			y += gridHeight;
		}
		this.cvsctx.drawImage(this.cvsbuf, 0, 0);
	}
	this.drawLivecell = function(x, y, gridWidth, gridHeight){
		this.cvsbufctx.fillStyle = "#000";
		this.cvsbufctx.fillRect(x, y, gridWidth, gridHeight);
		this.cvsbufctx.strokeRect(x, y, gridWidth, gridHeight);
	};
	this.drawWall = function(x, y, gridWidth, gridHeight){
		this.cvsbufctx.fillStyle = "#f00";
		this.cvsbufctx.fillRect(x, y, gridWidth, gridHeight);
		this.cvsbufctx.strokeRect(x, y, gridWidth, gridHeight);
	};
}