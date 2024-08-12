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

for (let i = 0; i < triangles.length; i++) {
    triangles[i][0] -= 1;
    triangles[i][1] -= 1;
    triangles[i][2] -= 1;
}

let dist = 1
let fov = 110;
let angle = 2 * Math.atan(dist / 2 * fov);
let width = canvas.width
let height = canvas.height
let aspectratio = width / height
let cam = {x:0,y:0,z:-3}

function project(pos) {
    let x = ((pos.x - cam.x) * (dist / pos.z)) + cam.x;
    let y = ((pos.y - cam.y) * (dist / pos.z)) + cam.y;
    x = x * width
    y = y * width
    return {x:x, y:y};
}

function drawline(pos1, pos2) {
    ctx.beginPath();
    ctx.moveTo(pos1.x, pos1.y);
    ctx.lineTo(pos2.x, pos2.y);
    ctx.closePath();
    ctx.stroke();
}

for (let i = 0; i < 8; i++) {
    drawline(project(vertices[triangles[i][0]]), project(vertices[triangles[i][1]]));
    drawline(project(vertices[triangles[i][1]]), project(vertices[triangles[i][2]]));
    drawline(project(vertices[triangles[i][2]]), project(vertices[triangles[i][0]]));
}
