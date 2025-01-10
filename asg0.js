/**
 * Calvin Li
 * cli166@ucsc.edu
*/
function main() {
    var canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }

    var ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var drawButton = document.getElementById('drawButton');
    drawButton.addEventListener('click', function () {
        handleDrawEvent(ctx, canvas);
    });

    var operationButton = document.getElementById('operationButton');
    operationButton.addEventListener('click', function () {
        handleDrawOperationEvent(ctx, canvas);
    });

    handleDrawEvent(ctx, canvas);
}

function handleDrawEvent(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var x1 = parseFloat(document.getElementById('x1').value);
    var y1 = parseFloat(document.getElementById('y1').value);
    var x2 = parseFloat(document.getElementById('x2').value);
    var y2 = parseFloat(document.getElementById('y2').value);
    
    const v1 = new Vector3([x1, y1, 0.0]);
    const v2 = new Vector3([x2, y2, 0.0]);

    drawVector(ctx, v1, "red");
    drawVector(ctx, v2, "blue");
}

function handleDrawOperationEvent(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var x1 = parseFloat(document.getElementById('x1').value);
    var y1 = parseFloat(document.getElementById('y1').value);
    var x2 = parseFloat(document.getElementById('x2').value);
    var y2 = parseFloat(document.getElementById('y2').value);
    var scalar = parseFloat(document.getElementById('scalar').value) || 1;

    const v1 = new Vector3([x1, y1, 0.0]);
    const v2 = new Vector3([x2, y2, 0.0]);

    drawVector(ctx, v1, "red");
    drawVector(ctx, v2, "blue");

    const operation = document.getElementById('operation').value;

    if (operation === "add") {
        const v3 = new Vector3(v1.elements).add(v2);
        drawVector(ctx, v3, "green");
    } else if (operation === "sub") {
        const v3 = new Vector3(v1.elements).sub(v2);
        drawVector(ctx, v3, "green");
    } else if (operation === "mul") {
        const v3 = new Vector3(v1.elements).mul(scalar);
        const v4 = new Vector3(v2.elements).mul(scalar);
        drawVector(ctx, v3, "green");
        drawVector(ctx, v4, "green");
    } else if (operation === "div") {
        if (scalar === 0) {
            console.log("Division by zero is not allowed");
            return;
        }
        const v3 = new Vector3(v1.elements).div(scalar);
        const v4 = new Vector3(v2.elements).div(scalar);
        drawVector(ctx, v3, "green");
        drawVector(ctx, v4, "green");
    } else if (operation === "magnitude") {
        console.log(`Magnitude v1: ${v1.magnitude()}`);
        console.log(`Magnitude v2: ${v2.magnitude()}`);
    } else if (operation === "normalize") {
        const normV1 = new Vector3(v1.elements).normalize();
        const normV2 = new Vector3(v2.elements).normalize();
        console.log(`Normalized v1: [${normV1.elements.join(", ")}]`);
        console.log(`Normalized v2: [${normV2.elements.join(", ")}]`);
        drawVector(ctx, normV1, "green");
        drawVector(ctx, normV2, "green");
    } else if (operation === "angle") {
        const angle = angleBetween(v1, v2);
        if (angle !== null) {
            console.log(`Angle: ${angle.toFixed(2)}°`);
        }
    } else if (operation === "area"){
        const area = areaTriangle(v1, v2);
        console.log(`Area of the triangle: ${area}`);
    }
}

function areaTriangle(v1, v2) {
    const crossProduct = Vector3.cross(v1, v2);
    const magnitude = crossProduct.magnitude();
    const area = 0.5 * magnitude; 
    return area;
}

function drawVector(ctx, v, color) {
    const scale = 20;
    const originX = 200;
    const originY = 200; 
    const x = v.elements[0] * scale;
    const y = v.elements[1] * scale;
    ctx.beginPath();
    ctx.moveTo(originX, originY); 
    ctx.lineTo(originX + x, originY - y);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
}

function angleBetween(v1, v2) {
    const dotProduct = Vector3.dot(v1, v2);
    const magnitudeV1 = v1.magnitude();
    const magnitudeV2 = v2.magnitude();

    if (magnitudeV1 === 0 || magnitudeV2 === 0) {
        console.error("ERROR");
        return null;
    }

    const cosTheta = dotProduct / (magnitudeV1 * magnitudeV2);
    const angleInRadians = Math.acos(Math.max(-1, Math.min(1, cosTheta)));
    const angleInDegrees = (angleInRadians * 180) / Math.PI;

    return angleInDegrees;
}