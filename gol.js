window.onload = function () {
    const canvas = document.getElementById("cnv")
    canvas.width = 1000;
    canvas.height = 500;
    this.document.body.appendChild(canvas);
    const context = canvas.getContext('2d');
    const cell_size = 50;
    const cells_x = 2 * canvas.width / cell_size
    const cells_y = canvas.height / cell_size

    for (let i = 0; i <= cells_x; i++) {
        for (let j = 0; j <= cells_y; j++) {
            context.fillStyle = ((i+j)%2 == 0) ? c_on : c_off
            this.draw_triangle(context, i, j, cell_size)
            context.fill()
        }
    }
    context.fillStyle = '#000'
    var x = 5
    var y = 3
    const adj = this.adjacent_triangles(x,y)
    this.console.log(adj)
    this.draw_triangle(context, x, y, cell_size)
    context.fill()
    context.fillStyle = '#00F'
    this.draw_triangle(context, adj[0][0], adj[1][0], cell_size)
    context.fill()
    this.draw_triangle(context, adj[0][1], adj[1][1], cell_size)
    context.fill()
    this.draw_triangle(context, adj[0][2], adj[1][2], cell_size)
    context.fill()
};

const tdir = (x,y) => ((x+y)%2 ==0)?1:-1

var c_on = '#f6ad7b';
var c_off = '#f2eee5';
// coordinate system for triangles: x,y, determines position of middle of bottom for upwards pointing, tip for downwards pointing
function draw_triangle(ctx, x, y, sz) {
    dir = tdir(x,y)
    ctx.beginPath();
    const xs = (x*0.5)*sz
    const ys = (dir == 1) ? y*sz : (y+1)*sz //if direction is not up, then move start point to bottom
    ctx.moveTo(xs, ys);
    ctx.lineTo(xs + 0.5*sz, ys);
    ctx.lineTo(xs, ys + dir * sz);
    ctx.lineTo(xs - 0.5*sz, ys);
    ctx.lineTo(xs, ys);
    ctx.closePath();
}

function adjacent_triangles(x,y){
    dir = tdir(x,y)
    var x_adj = [x+1,x-1,x]
    var y_adj = [y,y,y-dir]
    return [x_adj,y_adj]
}
