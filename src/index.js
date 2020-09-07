import {GlContextBuilder} from './view/engine/glContext.js';
import {GlEntity} from './view/engine/glEntity.js';
import {Voxel as EuclideanVoxel} from './model/geometries/euclidean/entities/voxel.js';
import {VoxelTypes} from './model/voxelTypes.js';
import {VoxelView as EuclideanVoxelView} from './view/geometries/euclidean/entities/voxel.js';
import {GlProgram} from './view/engine/glProgram.js';
import {VertShader as EuclideanVertShader} from './view/geometries/euclidean/shaders/vertShaders.js';
import {FragShader as EuclideanFragShader} from './view/geometries/euclidean/shaders/fragShaders.js';

function main() {
    const canvas = document.querySelector("#viewport");
    const gl = new GlContextBuilder(canvas)
        .buildContext();

    const programData = initScene(gl);
    drawScene(gl, programData);
}

function initScene(gl) {
    const glProgram = new GlProgram(gl);
    glProgram.setVertexShader(EuclideanVertShader);
    glProgram.setFragmentShader(EuclideanFragShader);
    const program = glProgram.buildProgram();

    const voxelModel = new EuclideanVoxel(0.0, 0.0, 0.0, VoxelTypes.YELLOW);
    const voxelView = new EuclideanVoxelView(gl);

    const positionData = voxelView.buildVoxelPositionData(voxelModel);
    const vertexPositionLocation = glProgram.bindAttributeData('aVertexPosition', positionData.data);
    gl.vertexAttribPointer(
        vertexPositionLocation,
        positionData.size,
        positionData.type,
        positionData.normalize,
        positionData.stride,
        positionData.offset,
    );

    const colorData = voxelView.buildVoxelColorData(voxelModel.type);
    const vertexColorLocation = glProgram.bindAttributeData('aVertexColor', colorData.data);
    gl.vertexAttribPointer(
        vertexColorLocation,
        colorData.size,
        colorData.type,
        colorData.normalize,
        colorData.stride,
        colorData.offset,
    );

    return {
        program: program,
        attributes: {
            vertexPosition: {
                pointer: vertexPositionLocation,
                primitiveType: positionData.primitiveType,
                offset: positionData.offset,
                size: positionData.size,
            },
            vertexColor: {
                pointer: vertexColorLocation,
            },
        },
    };
}

function drawScene(gl, programData) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.useProgram(programData.program);

    const positionData = programData.attributes.vertexPosition;
    const colorData = programData.attributes.vertexColor;
    gl.enableVertexAttribArray(positionData.pointer);
    gl.drawArrays(positionData.primitiveType, positionData.offset, positionData.size);
}

window.onload = main;
