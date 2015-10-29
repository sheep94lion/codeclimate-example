function Timer (trigger, interval){
	this.trigger = trigger;
	this.interval = interval;
	var that = this;
	this.start = function(){//开始游戏循环
		that.loop = setInterval(trigger, this.interval); 
	};
	this.stop = function(){//停止游戏循环
		clearInterval(that.loop);
	};
	this.change_interval = function(new_interval){
		this.interval = new_interval;
	};
}