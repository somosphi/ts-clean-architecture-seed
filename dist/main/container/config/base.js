"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseContainer = void 0;
class BaseContainer {
    constructor(container) {
        this.container = container;
        this.loadContainer();
    }
    loadContainer() {
        this.loadProviders().forEach(providers => {
            this.container.register(providers.name, providers);
        });
        const configs = this.loadConfigs();
        for (const key in configs) {
            if (key) {
                this.container.register(key, { useValue: configs[key] });
            }
        }
    }
    getContainer() {
        return this.container;
    }
}
exports.BaseContainer = BaseContainer;
