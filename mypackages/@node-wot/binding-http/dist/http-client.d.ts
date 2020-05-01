import * as TD from "@node-wot/td-tools";
import { ProtocolClient, Content } from "@node-wot/core";
import { HttpForm, HttpConfig } from "./http";
export default class HttpClient implements ProtocolClient {
    private readonly agent;
    private readonly provider;
    private proxyOptions;
    private authorization;
    private authorizationHeader;
    private allowSelfSigned;
    constructor(config?: HttpConfig, secure?: boolean);
    private getContentType;
    toString(): string;
    readResource(form: HttpForm): Promise<Content>;
    writeResource(form: HttpForm, content: Content): Promise<any>;
    invokeResource(form: HttpForm, content?: Content): Promise<Content>;
    unlinkResource(form: HttpForm): Promise<any>;
    subscribeResource(form: HttpForm, next: ((value: any) => void), error?: (error: any) => void, complete?: () => void): any;
    start(): boolean;
    stop(): boolean;
    setSecurity(metadata: Array<TD.SecurityScheme>, credentials?: any): boolean;
    private uriToOptions;
    private generateRequest;
    private checkResponse;
}
