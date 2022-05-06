export namespace CreateTime {
    export interface Option {
        hour?: number
        minute?: number
        second?: number
    }

    export type Unit = 'millisecond' | 'second'
}