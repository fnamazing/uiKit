import { ADFEntity } from '@findable/adf-utils';
import { JSONDocNode } from '@findable/editor-json-transformer';
export declare function removeMarks(node: ADFEntity): {
    [x: string]: any;
    type: string;
    attrs?: {
        [name: string]: any;
    } | undefined;
    content?: ADFEntity[] | undefined;
    marks?: import("../../../../adf-utils/dist/es5/types").ADFEntityMark[] | undefined;
    text?: string | undefined;
};
export declare function sanitizeNode(json: JSONDocNode): JSONDocNode;
