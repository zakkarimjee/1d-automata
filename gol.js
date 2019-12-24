var state = 0;
var counter = 0;
const cell_size = 10;
const width = 1000;
const height = 500;

const cells_x = 2 * width / cell_size
const cells_y = height / cell_size
window.onload = function () {
    const canvas = document.getElementById("cnv")
    canvas.width = width;
    canvas.height = height;
    this.document.body.appendChild(canvas);
    const context = canvas.getContext('2d');
    state = this.initial_state(cells_x, cells_y)
    this.draw_state(context, cells_x, cells_y, cell_size)
    this.setInterval(this.update,100,context,simple_rule,cells_x,cells_y,cell_size)
   
};

function update(context, rule, cells_x, cells_y, cell_size){
    next_state(cells_x, cells_y, rule)
    draw_state(context, cells_x, cells_y, cell_size)
}

const tdir = (x, y) => ((x + y) % 2 == 0) ? 1 : -1
var c_three = '#333366'
var c_two = '#eb4d55'
var c_one = '#ff9d76';
var c_off = '#f6e1e1';

// coordinate system for triangles: x,y, determines position of middle of bottom for upwards pointing, tip for downwards pointing
function draw_triangle(ctx, x, y, sz) {
    dir = tdir(x, y)
    ctx.beginPath();
    const xs = (x * 0.5) * sz
    const ys = (dir == 1) ? y * sz : (y + 1) * sz //if direction is not up, then move start point to bottom
    ctx.moveTo(xs, ys);
    ctx.lineTo(xs + 0.5 * sz, ys);
    ctx.lineTo(xs, ys + dir * sz);
    ctx.lineTo(xs - 0.5 * sz, ys);
    ctx.lineTo(xs, ys);
    ctx.closePath();
}

function draw_grid(ctx, cx, cy, sz) {
    for (let i = 0; i <= cx; i++) {
        for (let j = 0; j <= cy; j++) {
            ctx.strokeStyle = '#666'
            ctx.lineWidth = 1
            this.draw_triangle(ctx, i, j, sz)
            ctx.stroke()
        }
    }
}

function draw_state(ctx, cx, cy, sz) {
    for (let i = 0; i < cx; i++) {
        for (let j = 0; j < cy; j++) {
            ctx.fillStyle = state[i][j] == 0 ? c_off : state[i][j] == 1 ? c_one: state[i][j] == 2 ? c_two : c_three
            this.draw_triangle(ctx, i, j, sz)
            ctx.fill()
        }
    }
    // draw_grid(ctx, cx, cy, sz)
}

function next_state(cx, cy, rule) {
    var newstate = state
    for (let i = 0; i < cx; i++) {
        for (let j = 0; j < cy; j++) {
            var adj = adjacent_triangles(i, j)
            var val = 0
            var klist = [0, 1, 2]
            klist.forEach(k => {
                try{
                    val += state[adj[0][k]][adj[1][k]]
                }
                catch(err){
                    console.log(err)
                    console.log(adj[0][k],adj[1][k])
                }
            });
            newstate[i][j] = rule(val)
        }
    }
    state = newstate
}

function initial_state(cx, cy) {
    var state = new Array(cx)
    for (let i = 0; i < cx; i++) {
        var empty = new Array(cy)
        empty = empty.fill(0)
        state[i] = empty
    }
    state[Math.floor(cx / 2)][Math.floor(cy / 2)] = 1
    return state
}

const simple_rule = (val) => (val+Math.floor(3*Math.random()))%4

function adjacent_triangles(x, y) {
    dir = tdir(x, y)
    var x_adj = [(x + 1+cells_x)%cells_x, (x - 1+cells_x)%cells_x, x]
    var y_adj = [y, y, (y - dir+cells_y)%cells_y]
    return [x_adj, y_adj]
}
