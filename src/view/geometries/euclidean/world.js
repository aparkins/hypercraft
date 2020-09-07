import {VoxelView} from './entities/voxel.js';

class WorldView {
    constructor(gl) {
        this.gl = gl;
    }

    buildPositionBuffer(worldModel) {
        const voxelView = new VoxelView(this.gl);
        let allPositions = [];
        for (var i = 0; i < worldModel.voxels.length; i++) {
            const curVoxel = worldModel.voxels[i];
            const curVoxelPosData = voxelView.buildVoxelPositionData(curVoxel);
            allPositions = allPositions.concat(curVoxelPosData);
        }

        glAttribute(this.gl, 'aVertexPosition', {
            data: positions,
            size: 3,
            stride: 0,
            offset: 0,
        });
    }
}

export { WorldView };
