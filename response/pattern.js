export default class ServerResponse {

    constructor(success, data, message, error) {
        this.success = success
        this.data = data
        this.message = message
        this.error = error
    }
    
} 