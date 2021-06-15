"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseWorker = void 0;
class BaseWorker {
    constructor(container) {
        this.container = container;
    }
    resolveJobs() {
        this.jobs = this.loadJobs().map(job => this.container.resolve(job));
    }
    stop() {
        this.jobs.forEach(job => {
            if (job.running)
                job.stop();
        });
    }
}
exports.BaseWorker = BaseWorker;
