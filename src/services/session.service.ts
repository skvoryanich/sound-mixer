import { AudioService } from "../audio-interface"

export interface ISessionService {
    getAll(): Promise<string[]>

    setVolume(pid: number, volume: number): Promise<void>

    getVolume(pid: number): Promise<number>
}

export class SessionService {
    async getAll(): Promise<string[]> {
        const sessions = AudioService.getAudioSessionProcesses()
        const result = []
        for (const session of sessions) {
            if (session.pid !== 0) {
                result.push({ pid: session.pid, name: session.name })
            }
        }
        return result
    }

    async setVolume(pid: number, volume: number): Promise<void> {
        AudioService.setAudioSessionVolumeLevelScalar(pid, volume/100)
    }

    async getVolume(pid: number): Promise<number> {
        return Math.round(AudioService.getAudioSessionVolumeLevelScalar(pid) * 100)
    }
}
