import { ipcMain } from 'electron'
import { ISessionService } from '../services/session.service'

export function initSessionListeners(sessionService: ISessionService): void {
    ipcMain.handle('session.get.all', async (_e) => {
        return sessionService.getAll()
    })

    ipcMain.handle('session.set.volume', async (_e, pid: number, volume: number) => {
        return sessionService.setVolume(pid, volume)
    })

    ipcMain.handle('session.get.volume', async (_e, pid: number) => {
        return sessionService.getVolume(pid)
    })
}
