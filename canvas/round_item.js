/**
 * @author 徐文韬
 * @date 19/4/18
 * @param {number} index 
 * @param {number} x 
 * @param {number} y 
 */
function Round_item (index, x, y, context) {
    this.index = index;
    this.x = x;
    this.y = y;
    this.r = Math.random() * 2 + 1;
    var alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2;
    this.color = `rgba(255,255,255,${alpha})`;
    this.context = context;

}

Round_item.prototype.draw = function () {
    this.context.fillStyle = this.color;
    this.context.shadowBlur = this.r * 2;
    this.context.beginPath();   //从此刻开始，所有一切以此次为准
    this.context.arc(this.x, this.y, this.r, 0, 2*Math.PI,false);
    this.context.closePath();
    this.context.fill();
}
Round_item.prototype.move = function () {
    this.y -= 0.15;
    // if(this.y <= -10) {
    //     this.y = HEIGHT + 10;
    // }
    this.draw();
}