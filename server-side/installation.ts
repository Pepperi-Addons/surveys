
/*
The return object format MUST contain the field 'success':
{success:true}

If the result of your code is 'false' then return:
{success:false, erroeMessage:{the reason why it is false}}
The error Message is importent! it will be written in the audit log and help the user to understand what happen
*/

import { Client, Request } from '@pepperi-addons/debug-server'
import { Relation } from '@pepperi-addons/papi-sdk'
import MyService from './my.service';

export async function install(client: Client, request: Request): Promise<any> {
    await createPageBlockRelation(client);
    return {success:true,resultObject:{}}
}

export async function uninstall(client: Client, request: Request): Promise<any> {
    return {success:true,resultObject:{}}
}

export async function upgrade(client: Client, request: Request): Promise<any> {
    return {success:true,resultObject:{}}
}

export async function downgrade(client: Client, request: Request): Promise<any> {
    return {success:true,resultObject:{}}
}


async function createPageBlockRelation(client: Client): Promise<any> {
    try {
        // TODO: change to block name (this is the unique relation name and the description that will be on the page builder editor in Blocks section).
        const blockName = 'SurveyBlock';

        // TODO: Change to fileName that declared in webpack.config.js
        const filename = 'survey_block';

        const pageComponentRelation: Relation = {
            RelationName: "PageBlock",
            Name: blockName,
            Description: `Survey`,
            Type: "NgComponent",
            SubType: "NG11",
            AddonUUID: client.AddonUUID,
            AddonRelativeURL: filename,
            ComponentName: `BlockComponent`, // This is should be the block component name (from the client-side)
            ModuleName: `BlockModule`, // This is should be the block module name (from the client-side)
            EditorComponentName: `BlockEditorComponent`, // This is should be the block editor component name (from the client-side)
            EditorModuleName: `BlockEditorModule` // This is should be the block editor module name (from the client-side)
        };

        const service = new MyService(client);
        const result = await service.upsertRelation(pageComponentRelation);
        return { success:true, resultObject: result };
    } catch(err) {
        return { success: false, resultObject: err , errorMessage: `Error in upsert relation. error - ${err}`};
    }
}