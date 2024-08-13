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
    constructor(yz, xz, xy) {
        this.yz = yz;
        this.xz = xz;
        this.xy = xy;
    }

    add(rott) {
        return new rot(this.yz + rott.yz, this.xz + rott.xz, this.xy + rott.xy);
    }
}

class triangle {
    constructor(p1, p2, p3) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
    }
}

class obj {
    constructor(vertices, triangles, pos, rot) {
        for (let i = 0; i < triangles.length; i++) {
            triangles[i].p1 -= 1;
            triangles[i].p2 -= 1;
            triangles[i].p3 -= 1;
        }
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
        let p1 = objectee.vertices[objectee.triangles[i].p1]
        p1 = new pos(p1.x + objectee.pos.x, p1.y + objectee.pos.y, p1.z + objectee.pos.z)
        let p2 = objectee.vertices[objectee.triangles[i].p2]
        p2 = new pos(p2.x + objectee.pos.x, p2.y + objectee.pos.y, p2.z + objectee.pos.z)
        let p3 = objectee.vertices[objectee.triangles[i].p3]
        p3 = new pos(p3.x + objectee.pos.x, p3.y + objectee.pos.y, p3.z + objectee.pos.z)
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

let cube = new obj(vertices, triangles, new pos(0, 0, -1), new rot(0, 0, 0));
let cube2 = new obj(vertices, triangles, new pos(0, 0, 1), new rot(0, 0, 0));

drawobj(cube)
drawobj(cube2)