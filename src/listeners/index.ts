import { initSessionListeners } from './session.listener'
import { Services } from '../services'
import { initConsoleListeners } from './console.listener'


export default function initListeners(service: Services): void {
    initSessionListeners(service.sessionService)
    initConsoleListeners(service.consoleService)
}
