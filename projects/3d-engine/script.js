let canvas = document.getElementById("viewport");
let ctx = canvas.getContext("2d");
ctx.strokeStyle = "white";

let vertices = [
    {x:-1,y:-1,z:1},
    {x:1,y:-1,z:1},
    {x:-1,y:1,z:1},
    {x:1,y:1,z:1},
    {x:-1,y:1,z:-1},
    {x:1,y:1,z:-1},
    {x:-1,y:-1,z:-1},
    {x:1,y:-1,z:-1},
];

let triangles = [
    [2, 3, 4],
    [8, 7, 6],
    [5, 6, 2],
    [6, 7, 3],
    [3, 7, 8],
    [1, 4, 8],
    [1, 2, 4],
    [5, 8, 6],
    [1, 5, 2],
    [2, 6, 3],
    [4, 3, 8],
    [5, 1, 8],
];

let angle = 110;
let fov = 1.0 / Math.tan(angle / 2.0);
let width = canvas.width
let height = canvas.height
let aspectratio = width / height
let cam = {x:0,y:0,z:0}

function project(pos) {
    let x = ((pos.x - cam.x) * (fov / pos.z)) + cam.x
    let y = ((pos.y - cam.y) * (fov / pos.z)) + cam.y
    return {x:x, y:y}
}

function drawline(pos1, pos2) {
    ctx.beginPath();
    ctx.moveTo(pos1.x, pos1.y * -1);
    ctx.lineTo(pos2.x, pos2.y * -1);
    ctx.closePath();
    ctx.stroke();
}

for (let i = 0; i < triangles.length; i++) {
    drawline(vertices[triangles[i][0] - 1], vertices[triangles[i][1] - 1]);
    drawline(vertices[triangles[i][1] - 1], vertices[triangles[i][2] - 1]);
    drawline(vertices[triangles[i][0] - 1], vertices[triangles[i][2] - 1]);
}