import {VoxelTypes} from '../../../../model/voxelTypes.js';

class VoxelView {
    constructor(gl) {
        this.gl = gl;
    }

    buildVoxelPositionData(voxel) {
        const lowX = voxel.posX;
        const hiX = lowX + 1;
        const lowY = voxel.posY;
        const hiY = lowY + 1;
        const lowZ = voxel.posZ;
        const hiZ = lowZ + 1;

        return {
            data: [
                 hiX,   hiY,   hiZ,
                lowX,   hiY,   hiZ,
                 hiX,   hiY,  lowZ,
                lowX,   hiY,  lowZ,
                 hiX,  lowY,   hiZ,
                lowX,  lowY,   hiZ,
                lowX,  lowY,  lowZ,
                 hiX,  lowY,  lowZ,
            ],
            size: 3,
            type: this.gl.FLOAT,
            normalize: false,
            stride: 0,
            offset: 0,
            primitiveType: this.gl.TRIANGLE_STRIP,
        };
    }

    buildVoxelColorData(voxelType) {
        let colorVec;
        switch (voxelType) {
            case VoxelTypes.RED:
                colorVec = [1.0, 0.0, 0.0, 1.0];
                break;
            case VoxelTypes.GREEN:
                colorVec = [0.0, 1.0, 0.0, 1.0];
                break;
            case VoxelTypes.BLUE:
                colorVec = [0.0, 0.0, 1.0, 1.0];
                break;
            case VoxelTypes.YELLOW:
                colorVec = [1.0, 1.0, 0.0, 1.0];
                break;
            case VoxelTypes.CYAN:
                colorVec = [0.0, 1.0, 1.0, 1.0];
                break;
            case VoxelTypes.MAGENTA:
                colorVec = [1.0, 0.0, 1.0, 1.0];
                break;
            case VoxelTypes.WHITE:
                colorVec = [1.0, 1.0, 1.0, 1.0];
                break;
        }

        let colors = [];
        for (var i = 0; i < 8; i++) {
            colors = colors.concat(colorVec);
        }

        return {
            data: colors,
            size: 4,
            type: this.gl.FLOAT,
            normalize: false,
            stride: 0,
            offset: 0,
        };
    }
}

export { VoxelView };
