/// <reference types="node" />
import * as http from "http";
import * as https from "https";
import Servient, { ProtocolServer, ExposedThing } from "@node-wot/core";
import { HttpConfig } from "./http";
export default class HttpServer implements ProtocolServer {
    readonly scheme: "http" | "https";
    private readonly ALL_DIR;
    private readonly ALL_PROPERTIES;
    private readonly PROPERTY_DIR;
    private readonly ACTION_DIR;
    private readonly EVENT_DIR;
    private readonly OBSERVABLE_DIR;
    private readonly port;
    private readonly address;
    private readonly securityScheme;
    private readonly server;
    private readonly things;
    private servient;
    constructor(config?: HttpConfig);
    start(servient: Servient): Promise<void>;
    stop(): Promise<void>;
    getServer(): http.Server | https.Server;
    getPort(): number;
    private updateInteractionNameWithUriVariablePattern;
    expose(thing: ExposedThing): Promise<void>;
    private checkCredentials;
    private parseUrlParameters;
    private handleRequest;
    private isEmpty;
    private resetMultiLangThing;
    private resetMultiLangInteraction;
}
