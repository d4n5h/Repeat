class Repeat {
    /**
     * Starts a new repeat
     * @param {object=} options Options to be used (optional)
     * @param {function} callback Callback
     * @return {object} returns itself
     */
    constructor() {
        let options, callback;
        if (arguments.length == 2) {
            options = arguments[0];
            callback = arguments[1];
        } else if (arguments.length == 1) {
            options = {};
            callback = arguments[0];
        } else {
            throw new Error("Expecting one or two arguments")
        }

        const {
            duration,
            interval,
            date
        } = options;

        this.duration = duration || null;
        this.interval = interval || 1000;
        this.date = date || null;
        this.callback = callback;
        this.endTime = Date.now() + this.duration;

        this.stopper = false;
        this.stop = () => {
            this.stopper = true;
        };
        
        this.run()
    }

    async run() {
        let condition;
        if (this.duration) {
            condition = () => {
                return Date.now() <= this.endTime
            }
        } else {
            if (this.date) {
                condition = () => {
                    return Date.now() <= this.date
                }
            } else {
                condition = () => {
                    return true
                }
            }

        }

        while (condition() && !this.stopper) {
            this.callback(this)
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(true);
                }, this.interval);
            })
        }
    }
}

module.exports = Repeat