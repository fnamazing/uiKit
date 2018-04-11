export interface MentionBridge {
  showMentions(query: String);
  dismissMentions();
}

export interface TextFormattingBridge {
  updateTextFormat(markStates: string);
  updateText(content: string);
}

export interface MediaBridge {
  getServiceHost(): string;
  getAuth(context?: string): string;
  getCollection(): string;
}

export type Auth = {
  serviceHost: string;
  clientId: string;
  token: string;
};

export interface PromiseBridge {
  submitPromise(name: string, uuid: string, args: string);
}

export default interface NativeBridge
  extends MentionBridge,
    TextFormattingBridge,
    MediaBridge,
    PromiseBridge {};
