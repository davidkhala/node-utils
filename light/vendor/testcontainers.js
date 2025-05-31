// import {StartedTestContainer, GenericContainer} from "testcontainers"

export class Controller {
    /**
     @type GenericContainer
     */
    container
    /**
     * @type StartedTestContainer
     */
    handler

    async start() {
        this.handler = await this.container.start();
    }

    /**
     * @abstract
     */
    get port() {
    }

    get portMap() {
        return this.handler.startedTestContainer.boundPorts.ports
    }


    async stop() {
        return await this.handler.stop()
    }
}