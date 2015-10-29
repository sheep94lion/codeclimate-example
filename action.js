		var game_board = new GameBoard(1000, 600, 0.4);
		var ui;
		var grid_size = 20;
		function isPositiveNum(s){//是否为正整数 
			var re = /^[0-9]*[1-9][0-9]*$/ ; 
			return re.test(s) 
		};
		function trigger(){//触发游戏运行
			ui.draw.call(ui, game_board.getMap(), game_board.rows, game_board.cols, grid_size);
			game_board.update.call(game_board);
			console.log("trigger");
		};
		function get_map_width(){
			return document.getElementById('map_width').value;
		};
		function get_map_height(){
			return document.getElementById('map_height').value;
		};
		function get_livecell_rate(){
			return document.getElementById('density').value;
		};
		function get_frequency(){
			return document.getElementById('frequency').value;
		};
		function pre_start(){
			timer.stop();
			var board_width = get_map_width();
			var board_height = get_map_height();
			if (!isPositiveNum(board_height) || !isPositiveNum(board_width)){
				alert('无效的地图尺寸');
				return;
			}
			board_height = Number(board_height);
			board_width = Number(board_width);
			var livecell_rate = Number(get_livecell_rate());
			if (livecell_rate < 0 || livecell_rate > 1) {
				alert('无效的活细胞密度');
				return;
			}
			game_board.init(board_width, board_height, livecell_rate);
			var size_width = board_width * grid_size;
			var size_height = board_height * grid_size;
			//$('#canvas').css('width', size_width.toString());
			//$('#canvas').css('height', size_height.toString());
			var cvs = document.getElementById("canvas");
			cvs.width = size_width;
			cvs.height = size_height;
			ui = new UI(cvs);
			game_board.start();
			var frequency = Number(get_frequency());
			if (frequency <= 0){
				alert('无效的刷新频率');
				return;
			}
			timer.change_interval(1000 / frequency);
			ui.draw.call(ui, game_board.getMap(), game_board.rows, game_board.cols, grid_size);
		};
		function on_start(){
			run();
		};
		var timer = new Timer(trigger, 100);

		function run(){//开始游戏循环
			timer.stop();
			timer.start();
		}
		$('#canvas').click(function (e){//canvas上的点击处理函数，转换对应方格的细胞状态
			var x = e.pageX - $('#canvas').position().left;
			var y = e.pageY - $('#canvas').position().top;
 			var gridWidth = $('#canvas').width() / game_board.cols;
 			var gridHeight = $('#canvas').height() / game_board.rows;
 			var x_index = Math.floor(x / gridWidth);
 			var y_index = Math.floor(y / gridHeight);
 			game_board.turn(y_index, x_index);
 			ui.draw.call(ui, game_board.getMap(), game_board.rows, game_board.cols, grid_size);
		});