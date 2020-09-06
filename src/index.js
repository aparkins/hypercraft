import {context as glContext} from 'gl-util';

function main() {
    const canvas = document.querySelector("#viewport");
    const gl = glContext(canvas);

    drawScene(gl);
}

function drawScene(gl) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

window.onload = main;
