export enum EState {
    INIT = "INIT",
    STARTED = "STARTED",
    STOPPED = "STOPPED",
    PROCESS = "PROCESS",
    DESTROYED = "DESTROYED",
    UNDEFINED = "UNDEFINED",
}

export enum ERROR {
    ERROR_NEGATIVE_DELAY = "Delay must be a positive number.",
}
