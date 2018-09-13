import {
  MediaFileProcessingStatus,
  MediaFile,
  MediaStoreResponse,
  MediaType,
} from '@atlaskit/media-store';

export type FileStatus =
  | 'uploading'
  | 'processing'
  | 'processed'
  | 'error'
  | 'failed';
export interface FilePreview {
  blob: Blob;
  originalDimensions?: {
    width: number;
    height: number;
  };
}
export interface PreviewOptions {}
export interface GetFileOptions {
  preview?: PreviewOptions;
  collectionName?: string;
  occurrenceKey?: string;
}
export interface UploadingFileState {
  status: 'uploading';
  id: string;
  name: string;
  size: number;
  progress: number;
  mediaType: MediaType;
  mimeType: string;
  preview?: FilePreview;
}
export interface ProcessingFileState {
  status: 'processing';
  id: string;
  name: string;
  size: number;
  mediaType: MediaType;
  mimeType: string;
  preview?: FilePreview;
}
export interface ProcessedFileState {
  status: 'processed';
  id: string;
  name: string;
  size: number;
  artifacts: Object;
  mediaType: MediaType;
  mimeType: string;
  binaryUrl: string;
  preview?: FilePreview;
}
export interface ProcessingFailedState {
  status: 'failed';
  id: string;
  name: string;
  size: number;
  artifacts: Object;
  mediaType: MediaType;
  mimeType: string;
  binaryUrl: string;
}
export interface ErrorFileState {
  status: 'error';
  id: string;
  message?: string;
}
export type FileState =
  | UploadingFileState
  | ProcessingFileState
  | ProcessedFileState
  | ErrorFileState
  | ProcessingFailedState;

const apiProcessingStatusToFileStatus = (
  fileStatus?: MediaFileProcessingStatus,
): FileStatus => {
  switch (fileStatus) {
    case 'pending':
      return 'processing';
    case 'succeeded':
      return 'processed';
    case 'failed':
      return 'failed';
    case undefined:
      return 'processing';
  }
};

export const mapMediaFileToFileState = (
  mediaFile: MediaStoreResponse<MediaFile>,
): FileState => {
  const {
    id,
    name,
    size,
    processingStatus,
    artifacts,
    mediaType,
    mimeType,
  } = mediaFile.data;
  const status = apiProcessingStatusToFileStatus(processingStatus);

  switch (processingStatus) {
    case 'pending':
    case undefined:
      return {
        id,
        status,
        name,
        size,
        mediaType,
        mimeType,
      } as ProcessingFileState;
    case 'succeeded':
      return {
        id,
        status,
        name,
        size,
        artifacts,
        mediaType,
        mimeType,
        binaryUrl: `/file/${id}/binary`,
      } as ProcessedFileState;
    // case 'failed':
    //   return {
    //     id,
    //     status
    //   } as ErrorFileState;
    case 'failed':
      return {
        id,
        status,
        name,
        size,
        artifacts,
        mediaType,
        mimeType,
        binaryUrl: `/file/${id}/binary`,
      } as ProcessingFailedState;
  }
};
