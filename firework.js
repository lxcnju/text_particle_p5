// 模拟烟花特效，主要思想是构造一个粒子系统
// 位置初始化为屏幕底端，速度初始化为y轴负方向，施加重力效果
// 向上喷射，达到最高点时开始炸裂，炸裂后生成一系列粒子，速度方向随机初始化
// 爆炸后粒子随机初始速度方向决定了烟花的形状


var explodeMinVel = 0.0;     // 炸裂后的最小速度，决定烟花大小
var explodeMaxVel = 4.0;    // 炸裂后的最大速度

var initMinVel = -12;        // 竖直方向的最小初始速度
var initMaxVel = -10;        // 竖直方向的最大初始速度


var gravity = 0.2;           // 重力
var maxExplodedNum = 400;    // 粒子爆炸后的个数

var fireworkSize = 4.0;      // 未爆炸粒子大小
var explodedFwSize = 4.0;    // 爆炸后粒子大小
var disappearSpeed = 10;      // 烟花消失的速度
var colorRandomSize = 10.0;    // 烟花颜色的波动

function firework(x, y, exploding, wordvec){
	this.pos = createVector(x, y);            // 位置
	this.vel = createVector(0.0, 0.0);                            // 速度
	this.acc = createVector(0.0, 0.0);                            // 加速度
	this.exploding = exploding;                                   // 是否是炸裂的粒子
	
	this.explodedFireworks = [];                                  // 炸裂后的粒子
	this.lifespan = 255;                                          // 生命值
	
	this.toDelete = false;                                        // 是否删除
	
	this.red = random(0, 255);                             // 红色随机颜色
	this.green = random(0, 255);                           // 红色随机颜色
	this.blue = random(0, 255);                            // 红色随机颜色
	
	this.wordvec = wordvec;                                // 词和词的像素点坐标向量
	// 初始化粒子速度
	this.initialize = function(){
		if(this.exploding == false){
			this.vel = createVector(0.0, random(initMinVel, initMaxVel));
		}else{
			// 根据字符的像素点向量赋值
			var randi = floor(random(0, this.wordvec.length));
			console.log(this.wordvec.length);
			this.vel = createVector(this.wordvec[randi].x, this.wordvec[randi].y);
			this.vel.mult(0.1);
		}
	}
	
	// 运动
	this.move = function(){
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.updateLifespan();            // 更新生命值
		// 当且仅当该粒子没有爆炸过，并且生命值结束或到达最高点时爆炸
		if(this.exploding == false && (this.lifespan <= 0.0 || this.vel.y >= 0.0)){
			this.explode();
		}
	}
	// 施加外力
	this.applyForce = function(fv){
		this.acc = createVector(0.0, 0.0);
		this.acc.add(fv);
	}
	// 更新生命值
	this.updateLifespan = function(){
		if(this.exploding == true){
			this.lifespan -= disappearSpeed;
		}
	}
	// 判断是否要删除
	this.explode = function(){
		this.exploding = true;           // 修改爆炸参数
		// 增加一系列粒子
		for(var k = 0; k < maxExplodedNum; k++){
			var fw = new firework(this.pos.x, this.pos.y, true, this.wordvec);
			fw.initialize();
			// 继承颜色并随机扰动
			fw.red = this.red + random(-colorRandomSize, colorRandomSize);
			fw.green = this.green + random(-colorRandomSize, colorRandomSize);
			fw.blue = this.blue + random(-colorRandomSize, colorRandomSize);
			fw.applyForce(createVector(0.0, gravity/2));
			this.explodedFireworks.push(fw);
		}
	}
	
	// 显示
	this.show = function(){
		if(this.exploding == true){
			if(this.explodedFireworks.length <= 0){
				this.toDelete = true;
			}
			for(var k = this.explodedFireworks.length - 1; k >= 0; k--){
				this.explodedFireworks[k].move();
				this.explodedFireworks[k].show();
				if(this.explodedFireworks[k].lifespan <= 0){
					this.explodedFireworks.splice(k, 1);
				}
			}
		}
		noStroke();
		var s = 0.0;
		fill(this.red, this.green, this.blue, this.lifespan);
		if(this.exploding == false){
			s = fireworkSize;
		}else{
			s = explodedFwSize;
		}
		for(var i = 0; i <= 0; i++){
			ellipse(this.pos.x + i * this.vel.x, this.pos.y + i * this.vel.y, s);
		}
	}
}