let canvas = document.getElementById("viewport");
let ctx = canvas.getContext("2d");
ctx.strokeStyle = "white";

class pos {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(poss) {
        return new pos(this.x + poss.x, this.y + poss.y, this.z + poss.z);
    }
}

class rot {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(rott) {
        return new rot(this.x + rott.x, this.y + rott.y, this.z + rott.z);
    }
}

class triangle {
    constructor(p1, p2, p3) {
        this.p1 = p1 - 1;
        this.p2 = p2 - 1;
        this.p3 = p3 - 1;
    }
}

class obj {
    constructor(vertices, triangles, pos, rot) {
        this.vertices = vertices;
        this.triangles = triangles;
        this.pos = pos;
        this.rot = rot;
    }
}

let dist = 1
let fov = 110;
let angle = 2 * Math.atan(dist / 2 * fov);
let width = canvas.width
let height = canvas.height
let aspectratio = width / height
let cam = {pos:new pos(0, 0, -5),rot:new rot(0, 0, 0)}

function rotatepos(poss, rott) {
    let xrot = rott.x - cam.rot.x
    let yrot = rott.y - cam.rot.y
    let zrot = rott.z - cam.rot.z

    let x = poss.x
    let y = poss.y
    let z = poss.z

    let xbuffer = x
    let ybuffer = y
    let zbuffer = z
    
    x = (xbuffer * Math.cos(zrot)) - (ybuffer * Math.sin(zrot));
    y = (xbuffer * Math.sin(zrot)) + (ybuffer * Math.cos(zrot));
    z = zbuffer;

    xbuffer = x
    ybuffer = y
    zbuffer = z

    x = (xbuffer * Math.cos(yrot)) + (zbuffer * Math.sin(yrot));
    y = ybuffer;
    z = (-xbuffer * Math.sin(yrot)) + (zbuffer * Math.cos(yrot));

    xbuffer = x
    ybuffer = y
    zbuffer = z

    x = xbuffer;
    y = (ybuffer * Math.cos(xrot)) - (zbuffer * Math.sin(xrot));
    z = (ybuffer * Math.sin(xrot)) + (zbuffer * Math.cos(xrot));

    newPos = new pos(x, y, z);
    return newPos;
}

function project(position) {
    position = new pos((position.x - cam.pos.x),(position.y - cam.pos.y),(position.z - cam.pos.z));
    let x = position.x * (dist / position.z);
    let y = position.y * (dist / position.z);
    x = x * width;
    y = y * height;
    x = x + (width / 2);
    y = y + (height / 2);
    return new pos(x, y);
}

function drawline(pos1, pos2) {
    ctx.beginPath();
    ctx.moveTo(pos1.x, pos1.y);
    ctx.lineTo(pos2.x, pos2.y);
    ctx.stroke();
}

function drawobj(objectee) {
    for (let i = 0; i < objectee.vertices.length; i++) {
        let p1 = objectee.vertices[objectee.triangles[i].p1];
        let p2 = objectee.vertices[objectee.triangles[i].p2];
        let p3 = objectee.vertices[objectee.triangles[i].p3];
        p1 = rotatepos(p1, objectee.rot);
        p2 = rotatepos(p2, objectee.rot);
        p3 = rotatepos(p3, objectee.rot);
        p1 = new pos(p1.x + objectee.pos.x, p1.y + objectee.pos.y, p1.z + objectee.pos.z);
        p2 = new pos(p2.x + objectee.pos.x, p2.y + objectee.pos.y, p2.z + objectee.pos.z);
        p3 = new pos(p3.x + objectee.pos.x, p3.y + objectee.pos.y, p3.z + objectee.pos.z);
        drawline(project(p1), project(p2));
        drawline(project(p2), project(p3));
        drawline(project(p3), project(p1));
    }
}

let vertices = [
    new pos(-1,-1,1),
    new pos(1,-1,1),
    new pos(-1,1,1),
    new pos(1,1,1),
    new pos(-1,1,-1),
    new pos(1,1,-1),
    new pos(-1,-1,-1),
    new pos(1,-1,-1),
];

let triangles = [
    new triangle(1, 2, 3),
    new triangle(3, 2, 4),

    new triangle(3, 4, 5),
    new triangle(5, 4, 6),

    new triangle(5, 6, 7),
    new triangle(7, 6, 8),

    new triangle(7, 8, 1),
    new triangle(1, 8, 2),

    new triangle(2, 8, 4),
    new triangle(4, 8, 6),

    new triangle(7, 1, 5),
    new triangle(5, 1, 3),
];

let objects = [new obj(vertices, triangles, new pos(-1.5, 0, 1), new rot(0, 0, 0)), new obj(vertices, triangles, new pos(1.5, 0, 1), new rot(0, 0, 0))];
function draw() {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < objects.length; i++) {
        try {
            drawobj(objects[i]);
            objects[i].rot.y += 0.01;
            objects[i].rot.x += 0.01;
        } catch (error) {
            alert(error);
        }
    }
}

setInterval(draw, 1);