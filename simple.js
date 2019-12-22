window.onload = function(){
    const canvas = document.getElementById("cnv")
    canvas.width = 1000;
    canvas.height = 500;
    this.document.body.appendChild(canvas);
    const context = canvas.getContext('2d');
    const cells_across = 100;
    const cell_scale = canvas.width/cells_across;
    const cells_down = canvas.height/cell_scale;
    var rulenum = Math.floor(255*Math.random())
    const rule = get_rule(rulenum);
    var rule_box = document.getElementById("rn")
    rule_box.innerHTML = "Rule no. " + rulenum
    draw_rule(context, rule, cell_scale, cells_across, cells_down)
};

var c_on = '#f6ad7b';
var c_off = '#f2eee5';

const combine = (b1,b2,b3) => (b1 << 2) + (b2 << 1) + (b3 << 0);

const get_bit = (num,pos) => (num >> pos) & 1;

const get_rule = num => (b1, b2, b3) => get_bit(num, combine(b1,b2,b3));

function draw_rule(ctx, rule, scale, width, height){
    let row = initial_row(width)
    for (let i=0; i < height; i++){
        draw_row(ctx,row,scale);
        row = next_row(row, rule)
    }
}

function initial_row(length){
    const initial_row = Array(length).fill(0);
    initial_row[Math.floor(length/2)] = 1;
    return initial_row;
}

const next_row = (row, rule) => row.map((_,i) => rule(row[i-1],row[i],row[i+1]));

function draw_row(ctx, row, scale){
    ctx.save()
    row.forEach(cell => {
        ctx.fillStyle = cell == 1 ? c_on : c_off;
        ctx.fillRect(0,0,scale,scale);
        ctx.translate(scale,0);
    });
    ctx.restore()
    ctx.translate(0,scale);

}


function draw_border(ctx,cvs,thickness){
    ctx.fillStyle = '#000';
    ctx.fillRect(0,0,cvs.width,cvs.height);
    ctx.fillStyle = '#FFF';
    ctx.fillRect(thickness,thickness,cvs.width-2*thickness,cvs.height-2*thickness);
};
