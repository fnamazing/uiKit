import { MentionDescription, AbstractMentionResource } from '@findable/mention';
import { MockMentionConfig } from './MockMentionResource';
export declare class MockMentionResourceWithInfoHints extends AbstractMentionResource {
    private config;
    private lastReturnedSearch;
    constructor(config: MockMentionConfig);
    filter(query: string): void;
    recordMentionSelection(mention: MentionDescription): void;
}
