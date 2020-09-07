class GlProgram {
    constructor(gl) {
        this.gl = gl;
    }

    buildProgram() {
        if (!this.vertexShader || !this.fragShader) {
            throw 'Attempted to build program without specifying both a vertex and fragment shader.';
        }

        if (this.program) {
            throw 'Attempted to rebuild existing program';
        }

        let program = this.gl.createProgram();
        this.gl.attachShader(program, this.vertexShader);
        this.gl.attachShader(program, this.fragShader);
        this.gl.linkProgram(program);

        const linkSuccessful = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
        if(linkSuccessful) {
            this.program = program;
            return program;
        }

        console.log('Error while linking program: ' + this.gl.getProgramInfoLog(program));
        this.gl.deleteProgram(program);
    }

    bindAttributeData(name, params) {
        if (!this.program) {
            throw 'Attempted to bind attribute while program not initialized';
        }

        if (!params.bufferType) {
            params.bufferType = this.gl.ARRAY_BUFFER;
        }
        if (!params.drawMode) {
            params.drawMode = this.gl.STATIC_DRAW;
        }

        const attributeLocation = this.gl.getAttribLocation(this.program, name);
        const dataBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(params.bufferType, params.data);
        this.gl.bufferData(params.bufferType, new Float32Array(params.data), params.drawMode);

        return attributeLocation;
    }

    setVertexShader(source) {
        if (this.vertexShader) {
            throw 'Attempted to reassign vertexShader';
        }

        this.vertexShader = buildShader(this.gl, this.gl.VERTEX_SHADER, source);
    }

    setFragmentShader(source) {
        if (this.fragShader) {
            throw 'Attempted to reassign fragShader';
        }

        this.fragShader = buildShader(this.gl, this.gl.FRAGMENT_SHADER, source);
    }
}

function buildShader(gl, type, source) {
    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);

    gl.compileShader(shader);
    let compilationSuccessful = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (compilationSuccessful) {
        return shader;
    }

    console.log('Error compiling shader: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return undefined;
}

export { GlProgram };
