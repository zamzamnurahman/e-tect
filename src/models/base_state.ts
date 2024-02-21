
export class BaseState<T>{
    data: T | undefined
    loading: boolean = true
    error: string | undefined

    constructor(data: T | undefined, loading: boolean, error: string | undefined) {
        this.data = data
        this.loading = loading
        this.error = error
    }

    static loading<T>(): BaseState<T>{
        return new BaseState<T>(undefined, true, undefined)
    }

    static error<T>(error: string): BaseState<T>{
        return new BaseState<T>(undefined, false, error)
    }

    static success<T>(data: T): BaseState<T>{
        return new BaseState<T>(data, false, undefined)
    }

}