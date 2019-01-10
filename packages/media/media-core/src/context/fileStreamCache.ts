import { FileState } from '../fileState';
import { LRUCache } from 'lru-fast';
import { Observable } from 'rxjs/Observable';

export class FileStreamCache {
  private readonly fileStreams: LRUCache<string, Observable<FileState>>;
  private readonly stateDeferreds: Map<
    string,
    { promise: Promise<FileState>; deferred: Function }
  >;

  constructor() {
    this.fileStreams = new LRUCache(1000);
    this.stateDeferreds = new Map();
  }

  has(id: string): boolean {
    return !!this.fileStreams.find(id);
  }

  set(id: string, fileStream: Observable<FileState>) {
    this.fileStreams.set(id, fileStream);
    const deferred = this.stateDeferreds.get(id);

    if (deferred) {
      fileStream.toPromise().then(state => {
        deferred.deferred(state);
      });
    }
  }

  get(id: string): Observable<FileState> | undefined {
    return this.fileStreams.get(id);
  }

  // TODO: expose this on the context => context.getState or context.file.getCurrentState
  getState(id: string): Promise<FileState> {
    const state = this.get(id);

    if (state) {
      return state.toPromise();
    }
    const deferred = this.stateDeferreds.get(id);
    if (deferred) {
      return deferred.promise;
    }
    const promise = new Promise<FileState>(deferred => {
      this.stateDeferreds.set(id, { promise, deferred });
    });

    return promise;
  }

  getOrInsert(
    id: string,
    callback: () => Observable<FileState>,
  ): Observable<FileState> {
    if (!this.has(id)) {
      this.set(id, callback());
    }

    return this.get(id)!;
  }

  removeAll() {
    this.fileStreams.removeAll();
  }

  remove(id: string) {
    this.fileStreams.remove(id);
  }

  get size(): number {
    return this.fileStreams.size;
  }
}

export const fileStreamsCache = new FileStreamCache();
export default FileStreamCache;
