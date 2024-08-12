let canvas = document.getElementById("viewport");
let ctx = canvas.getContext("2d");
ctx.strokeStyle = "white";

let vertices = [
    {x:-1,y:-1,z:6},
    {x:1,y:-1,z:6},
    {x:-1,y:1,z:6},
    {x:1,y:1,z:6},
    {x:-1,y:1,z:4},
    {x:1,y:1,z:4},
    {x:-1,y:-1,z:4},
    {x:1,y:-1,z:4},
];

let triangles = [
    [1, 2, 3],
    [3, 2, 4],

    [3, 4, 5],
    [5, 4, 6],

    [5, 6, 7],
    [7, 6, 8],

    [7, 8, 1],
    [1, 8, 2],

    [2, 8, 4],
    [4, 8, 6],

    [7, 1, 5],
    [5, 1, 3],
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
let cam = {x:0,y:0,z:0}

function project(pos) {
    let x = pos.x * (dist / pos.z);
    let y = pos.y * (dist / pos.z);
    x = x * width
    y = y * height
    x = x + (width / 2)
    y = y + (height / 2)
    return {x:x, y:y};
}

function drawline(pos1, pos2) {
    ctx.beginPath();
    ctx.moveTo(pos1.x, pos1.y);
    ctx.lineTo(pos2.x, pos2.y);
    ctx.stroke();
}

for (let i = 0; i < vertices.length; i++) {
    drawline(project(vertices[triangles[i][0]]), project(vertices[triangles[i][1]]));
    drawline(project(vertices[triangles[i][1]]), project(vertices[triangles[i][2]]));
    drawline(project(vertices[triangles[i][2]]), project(vertices[triangles[i][0]]));
}