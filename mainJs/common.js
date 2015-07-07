//将基于window的坐标转为相对于canvas的坐标
function windowToCanvas (canvas, x, y) 
{
	var bbox = canvas.getBoundingClientRect();

	return {
		x: x - bbox.left,
		y: y - bbox.top
	};
}