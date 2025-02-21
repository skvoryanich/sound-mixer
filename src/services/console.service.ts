
export interface IConsoleService {
    log(message: string): void
}

export class ConsoleService {
    log(message: string): void {
        console.log(message)
    }
}
