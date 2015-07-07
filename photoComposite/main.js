var canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d'),
	selectBtn = document.getElementById('select');

function DrawText()
{
	ctx.save();
	//wet Text shadow
	ctx.shadowColor = 'rgba(100, 100, 150, .8)';
	ctx.shadowOffsetX = 5;
	ctx.shadowOffsetY = 5;
	ctx.shadowBlur = 10;

	//set text fillStyle 
	ctx.fillStyle = 'cornflowerblue';
	ctx.fillText('HTML5', 20, 250);

	//set text strokeStyle 
	ctx.strokeStyle = 'yellow';
	ctx.strokeText('HTML5', 20, 250);

	ctx.restore();

}
function windwowToCanvas(canvas, x, y)
{
	var DomRect = canvas.getBoundingClientRect();

	return {
		x: x - DomRect.left,
		y: y - DomRect.top
	};
}
canvas.onmousemove = function(e)
{
	var loc = windwowToCanvas(canvas, e.clientX, e.clientY);

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	DrawText();

	ctx.save();

	ctx.globalCompositeOperation = selectBtn.value;
	ctx.beginPath();
	ctx.arc(loc.x, loc.y, 100, 0, Math.PI*2, false);
	ctx.fillStyle = 'orange';
	ctx.stroke();
	ctx.fill();

	ctx.restore();
};
window.onload = function()
{
	//var box = canvas.getBoundingClientRect();
	//调用该方法可获取元素的top、left、right、bottom
	// width、height的值，返回值类型为DOMRect对象
	/*console.log(canvas.width)
	console.log(box.width);*/

	selectBtn.selectedIndex = 3;
	ctx.lineWidth = .5;
	ctx.font = '128pt Arial';
	DrawText();
};