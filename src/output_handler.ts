export interface OutputHandler {
    write(output: string): void
}

export class ConsoleOutputHandler {
    write(output: string) {
        console.log(output);
    }
}