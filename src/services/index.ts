import { ISessionService, SessionService } from './session.service'
import { IConsoleService, ConsoleService } from './console.service'

export interface Services {
    sessionService: ISessionService
    consoleService: IConsoleService
}

export default function initServices(): Services {
    return {
        sessionService: new SessionService(),
        consoleService: new ConsoleService()
    }
}
