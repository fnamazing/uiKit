import { UsageClearEmojiResource, MockEmojiResourceConfig } from './MockEmojiResource';
import { EmojiServiceResponse } from '@findable/emoji';
export declare const getStandardEmojiData: () => EmojiServiceResponse;
export declare const getAtlassianEmojiData: () => EmojiServiceResponse;
export declare const loggedUser = "blackpanther";
export declare const getSiteEmojiData: () => EmojiServiceResponse;
export declare const getAllEmojiData: () => EmojiServiceResponse;
export declare const getStandardEmojis: () => any[];
export declare const getAtlassianEmojis: () => any[];
export declare const getSiteEmojis: () => any[];
export declare const getEmojis: () => any[];
export declare const lorem = "\n  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tincidunt,\n  lorem eu vestibulum sollicitudin, erat nibh ornare purus, et sollicitudin lorem\n  felis nec erat. Quisque quis ligula nisi. Cras nec dui vestibulum, pretium massa ut,\n  egestas turpis. Quisque finibus eget justo a mollis. Mauris quis varius nisl. Donec\n  aliquet enim vel eros suscipit porta. Vivamus quis molestie leo. In feugiat felis mi,\n  ac varius odio accumsan ac. Pellentesque habitant morbi tristique senectus et netus et\n  malesuada fames ac turpis egestas. Mauris elementum mauris ac leo porta venenatis.\n  Integer hendrerit lacus vel faucibus sagittis. Mauris elit urna, tincidunt at aliquet\n  sit amet, convallis placerat diam. Mauris id aliquet elit, non posuere nibh. Curabitur\n  ullamcorper lectus mi, quis varius libero ultricies nec. Quisque tempus neque ligula,\n  a semper massa dignissim nec.\n";
export declare const getEmojiRepository: () => any;
export declare const getEmojiResource: (config?: MockEmojiResourceConfig | undefined) => Promise<any>;
export declare const getEmojiResourceWithStandardAndAtlassianEmojis: (config?: MockEmojiResourceConfig | undefined) => Promise<any>;
export declare const getUsageClearEmojiResource: () => UsageClearEmojiResource;
