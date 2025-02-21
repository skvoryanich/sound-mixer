// This file incorporates work from the project https://github.com/KaguraGateway/node-audio-volume-mixer

interface ProcessStruct {
    pid: number;
    name: string;
}

interface AudioService {
    getMasterVolumeLevelScalar(): number
    setMasterVolumeLevelScalar(volumeScale: number): void

    getAudioSessionProcesses(): Array<ProcessStruct>
    getAudioSessionVolumeLevelScalar(pid: number): number
    setAudioSessionVolumeLevelScalar(pid: number, volumeScale: number): void
}

export const AudioService: AudioService = require("../../src/audio-interface/addon.node");
