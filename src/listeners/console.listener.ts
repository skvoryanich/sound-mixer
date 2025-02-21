import { ipcMain } from 'electron'
import { IConsoleService } from '../services/console.service'

export function initConsoleListeners(consoleService: IConsoleService): void {
    ipcMain.handle('console.log', async (_e, msg: any) => {
        return consoleService.log(msg)
    })
}
