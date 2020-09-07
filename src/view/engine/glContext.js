import {context as glContext} from 'gl-util';

class GlContextBuilder {
    constructor(canvas, properties) {
        this.properties = properties ? properties : {};
        this.properties.canvas = canvas;
    }

    buildContext() {
        return glContext(this.properties);
    }

    setWidth(width) {
        this.properties.width = width;
        if (this.properties.width && this.properties.height && this.properties.aspectRatio) {
            delete this.properties.aspectRatio;
        }
        return this;
    }

    setHeight(height) {
        this.properties.height = height;
        if (this.properties.width && this.properties.height && this.properties.aspectRatio) {
            delete this.properties.aspectRatio;
        }
        return this;
    }

    setAspectRatio(aspectRatio) {
        if (this.properties.width && this.properties.height) {
            delete this.properties.height;
        }
        this.properties.pixelRatio = aspectRatio;
        return this;
    }

    setAttribute(attrName, attrValue) {
        if(!this.properties.attributes) {
            this.properties.attributes = {};
        }
        this.properties.attributes[attrName] = attrValue;
        return this;
    }

    setAlpha(alpha) {
        return this.setAttribute('alpha', alpha);
    }

    setDepth(depth) {
        return this.setAttribute('depth', depth);
    }

    setStencil(stencil) {
        return this.setAttribute('stencil', stencil);
    }

    setAntialias(antialias) {
        return this.setAttribute('antialias', antialias);
    }

    setPremultipliedAlpha(premultipliedAlpha) {
        return this.setAttribute('premultipliedAlpha', premultipliedAlpha);
    }

    setPreserveDrawingBuffer(preserveDrawingBuffer) {
        return this.setAttribute('preserveDrawingBuffer', preserveDrawingBuffer);
    }

    setFailIfMajorPerformanceCaveat(failIfMajorPerformanceCaveat) {
        return this.setAttribute('failIfMajorPerformanceCaveat', failIfMajorPerformanceCaveat);
    }
}

export { GlContextBuilder };
