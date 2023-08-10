const endpointHostTemplate = "%endpoint-host%";

export type TemplateMap = {
    [key: number]: string;
};

const SERVER_ROUT_ROOT = "";

export class TemplatesHandler {
    constructor(private _templatesMap: TemplateMap) {}

    public get(templateName: number): string {
        const templateContent  = this._templatesMap[templateName];
        if (!templateContent) {
            return "";
        }
        return templateContent.replace(new RegExp(endpointHostTemplate, "g"), SERVER_ROUT_ROOT);
    }
}
