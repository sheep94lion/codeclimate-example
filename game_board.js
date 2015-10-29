function GameBoard(cols, rows, proportion){
	this.rows = rows;
	this.cols = cols;
	this.proportion = proportion;
	this.map = new Array(2);
	for (var k = 0; k < 2; k ++){
		this.map[k] = new Array(rows);
		for (var i = 0; i < rows; i ++){
			this.map[k][i] = new Array(cols);
		}
	}
	this.cur = 0;
	this.dir = [[-1, 0],[0, -2],[0, 2],[0, -1],[0, 1],[-2, 0],[1, 0],[2, 0]];

	this.init = function(cols, rows, proportion) {//初始化棋盘数组，一共有两个棋盘矩阵。
		this.rows = rows;
		this.cols = cols;
		this.proportion = proportion;
		for (var k = 0; k < 2; k ++){
			this.map[k] = new Array(rows);
			for (var i = 0; i < rows; i ++){
				this.map[k][i] = new Array(cols);
			}
		}
	}

	this.start = function () {//生成最初的活细胞
		this.cur = 0;
		for (var i = 0; i < this.rows; i ++){
			for (var j = 0; j < this.cols; j ++){
				if (Math.random() <= this.proportion){
					this.map[this.cur][i][j] = 1;//For live cell
				}
				else{
					this.map[this.cur][i][j] = 0;//For dead cell, 2 for wall block.
				}
			}
		}
	}


	this.update = function() {//更新矩阵中的细胞状态，一共两个矩阵，一个做原矩阵，计算结果存到另一个矩阵中。
		var pre = this.cur;
		var cur = 1 - pre;

		for (var i = 0; i < this.rows; i ++){
			for (var j = 0; j < this.cols; j ++){
				if (this.map[pre][i][j] != 2) {
					var cnt = 0;
					for (var k = 0; k < 8; k ++){
						var ti = i + this.dir[k][0];
						var tj = j + this.dir[k][1];
						if (ti >= 0 && ti < this.rows && tj >= 0 && tj <= this.cols){
							if (this.map[pre][ti][tj] == 1){
								if (++ cnt > 3) {
									break;
								}
							}
						}
					}
					if (cnt == 2){
						this.map[cur][i][j] = this.map[pre][i][j];
					}
					else if (cnt == 3){
						this.map[cur][i][j] = 1;
					}
					else{
						this.map[cur][i][j] = 0;
					}
				} else{
					this.map[cur][i][j] = 2;
				}
			}
		}

		this.cur = cur;
	}

	this.turn = function(x, y) {//转换该格子的细胞状态
		if (x < 0 || x >= this.rows || y < 0 || y >= this.cols){
			return;
		}
		this.map[this.cur][x][y] = (this.map[this.cur][x][y] + 1) % 3;
	}

	this.getMap = function() {//获取当前的细胞状态矩阵
		return this.map[this.cur];
	}
}