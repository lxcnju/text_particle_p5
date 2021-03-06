# text_particle_p5
A program written by p5.js, generating fireworks with special shapes, such as characters and hearts.

利用p5.js写的一个小程序，主要是模仿烟花绽放的特效，烟花可以设定为各种形状，包括文字、心形等等。

* 代码架构
* 原理解析
  * 烟花特效的粒子系统
  * 烟花各种形状的实现
  
## 代码架构
 * home.html 这个是访问的主页，运行时直接用浏览器打开即可，推荐Edge和Chrome
 * firework.js 利用粒子系统实现的烟花，设置烟花粒子大小、初始速度、烟花多少等等
 * text.js 文本处理和获得文字的像素点数组
 * sketch.js 绘图、设置要绽放的文字
 * music1.mp3 背景音乐

## 原理解析
 * 烟花特效的粒子系统 <br>
 用粒子系统(particle system)实现烟花特效，模拟从屏幕底端燃放烟花，然后向上喷射，继而爆炸的特效，爆炸后烟花可以具有很多不同的形状，可以是球状、心形，或者是文字等等。
 烟花粒子包括位置、速度、加速度、颜色等等属性，并且每个烟花粒子有一个属性exploding标识是否要爆炸。烟花粒子包括两个阶段，一是从燃放到喷射到最高点的阶段，exploding为false；另一阶段是从最高点进行炸裂，这是exploding为true的阶段。当烟花粒子，记作fwone，在第一阶段的时候，施加重力，设置加速度，继而改变速度和烟花位置；在粒子达到最高点时，构造一系列(约400个)粒子，保存在fwone的内部烟花粒子数组中,记作fwone.fws，这些粒子的初始位置都是fwone在最高点的位置，颜色会根据fwone的颜色稍作扰动，爆炸一瞬间的速度方向和大小决定了烟花的形状，所以fwone.fws的速度初始化尤为重要：可以根据心形曲线、费马螺线等曲线的方程或文字的像素点数组进行初始化，继而得到不同烟花形状。
 * 烟花各种形状的实现 <br>
 上面介绍了烟花的形状由爆炸瞬间粒子的速度方向和大小确定，下面列举几种形状：<br>
   * 球状：速度方向是圆周各个方向，速度大小是0到5。<br>
   * 圆环：速度方向是圆周哥哥方向，速度大小是2到5。<br>
   * 心形：按照心形线公式（x = r * cos(theta) * (1 - cos(theta)), y = r * sin(theta) * (1 - cos(theta))）产生(x,y)点对作为速度（大小和方向），r取值为0到5即为填充的心，r取3到5则是心形的环。<br>
   * 文字：先在屏幕上利用text绘制白底红字，然后获取屏幕图像的pixel矩阵，将红色的像素点位置挑选出来，即可获得文字的像素点位置的数组，将烟花粒子速度根据这个数组初始化即可。<br>
   
## 图片展示
![文字烟花](https://github.com/lxcnju/text_particle_p5/blob/master/pic1.png)
![蝴蝶形状烟花](https://github.com/lxcnju/text_particle_p5/blob/master/pic2.png)
