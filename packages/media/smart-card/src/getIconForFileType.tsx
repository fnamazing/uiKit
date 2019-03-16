import * as React from 'react';
import * as Loadable from 'react-loadable';

export const getIconForFileType = (
  fileMimeType: string,
): React.ReactNode | undefined => {
  let icon = typeToIcon[fileMimeType.toLowerCase()];
  if (!icon) {
    return;
  }

  const [label, importCb] = icon;

  if (!importCb) {
    return;
  }

  const Icon = Loadable({
    loader: () => importCb().then(module => module.default),
    loading: () => null,
  }) as any; // because we're using dynamic loading here, TS will not be able to infer the type

  return <Icon label={label} /> as React.ReactNode;
};

export const getLabelForFileType = (
  fileMimeType: string,
): React.ReactNode | undefined => {
  let icon = typeToIcon[fileMimeType.toLowerCase()];
  if (!icon) {
    return;
  }

  const [label] = icon;

  return label;
};

type iconDescriptor = [string, (() => Promise<any>) | undefined];

const typeToIcon: { [key: string]: iconDescriptor } = {
  'text/plain': [
    'Document',
    () => import('@findable/icon-file-type/glyph/document/24'),
  ],
  'application/vnd.oasis.opendocument.text': [
    'Document',
    () => import('@findable/icon-file-type/glyph/document/24'),
  ],
  'application/vnd.apple.pages': [
    'Document',
    () => import('@findable/icon-file-type/glyph/document/24'),
  ],
  'application/vnd.google-apps.document': [
    'Google Doc',
    () => import('@findable/icon-file-type/glyph/google-doc/24'),
  ],
  'application/vnd.ms-word': [
    'Word document',
    () => import('@findable/icon-file-type/glyph/word-document/24'),
  ],
  'application/pdf': [
    'PDF document',
    () => import('@findable/icon-file-type/glyph/pdf-document/24'),
  ],
  'application/vnd.oasis.opendocument.spreadsheet': [
    'Spreadsheet',
    () => import('@findable/icon-file-type/glyph/spreadsheet/24'),
  ],
  'application/vnd.apple.numbers': [
    'Spreadsheet',
    () => import('@findable/icon-file-type/glyph/spreadsheet/24'),
  ],
  'application/vnd.google-apps.spreadsheet': [
    'Google Sheet',
    () => import('@findable/icon-file-type/glyph/google-sheet/24'),
  ],
  'application/vnd.ms-excel': [
    'Excel spreadsheet',
    () => import('@findable/icon-file-type/glyph/excel-spreadsheet/24'),
  ],
  'application/vnd.oasis.opendocument.presentation': [
    'Presentation',
    () => import('@findable/icon-file-type/glyph/presentation/24'),
  ],
  'application/vnd.apple.keynote': [
    'Presentation',
    () => import('@findable/icon-file-type/glyph/presentation/24'),
  ],
  'application/vnd.google-apps.presentation': [
    'Google Slide',
    () => import('@findable/icon-file-type/glyph/google-slide/24'),
  ],
  'application/vnd.mspowerpoint': [
    'PowerPoint presentation',
    () => import('@findable/icon-file-type/glyph/powerpoint-presentation/24'),
  ],
  'application/vnd.google-apps.form': [
    'Google Form',
    () => import('@findable/icon-file-type/glyph/google-form/24'),
  ],
  'image/png': [
    'Image',
    () => import('@findable/icon-file-type/glyph/image/24'),
  ],
  'image/jpeg': [
    'Image',
    () => import('@findable/icon-file-type/glyph/image/24'),
  ],
  'image/bmp': [
    'Image',
    () => import('@findable/icon-file-type/glyph/image/24'),
  ],
  'image/webp': [
    'Image',
    () => import('@findable/icon-file-type/glyph/image/24'),
  ],
  'image/svg+xml': [
    'Image',
    () => import('@findable/icon-file-type/glyph/image/24'),
  ],
  'image/gif': ['GIF', () => import('@findable/icon-file-type/glyph/gif/24')],
  'audio/midi': [
    'Audio',
    () => import('@findable/icon-file-type/glyph/audio/24'),
  ],
  'audio/mpeg': [
    'Audio',
    () => import('@findable/icon-file-type/glyph/audio/24'),
  ],
  'audio/webm': [
    'Audio',
    () => import('@findable/icon-file-type/glyph/audio/24'),
  ],
  'audio/ogg': [
    'Audio',
    () => import('@findable/icon-file-type/glyph/audio/24'),
  ],
  'audio/wav': [
    'Audio',
    () => import('@findable/icon-file-type/glyph/audio/24'),
  ],
  'video/mp4': [
    'Video',
    () => import('@findable/icon-file-type/glyph/video/24'),
  ],
  'video/webm': [
    'Video',
    () => import('@findable/icon-file-type/glyph/video/24'),
  ],
  'video/ogg': [
    'Video',
    () => import('@findable/icon-file-type/glyph/video/24'),
  ],
  'video/x-ms-wmv': [
    'Video',
    () => import('@findable/icon-file-type/glyph/video/24'),
  ],
  'video/x-msvideo': [
    'Video',
    () => import('@findable/icon-file-type/glyph/video/24'),
  ],
  'application/zip': [
    'Archive',
    () => import('@findable/icon-file-type/glyph/archive/24'),
  ],
  'application/x-tar': [
    'Archive',
    () => import('@findable/icon-file-type/glyph/archive/24'),
  ],
  'application/x-gtar': [
    'Archive',
    () => import('@findable/icon-file-type/glyph/archive/24'),
  ],
  'application/x-7z-compressed': [
    'Archive',
    () => import('@findable/icon-file-type/glyph/archive/24'),
  ],
  'application/x-apple-diskimage': [
    'Archive',
    () => import('@findable/icon-file-type/glyph/archive/24'),
  ],
  'application/dmg': [
    'Executable',
    () => import('@findable/icon-file-type/glyph/executable/24'),
  ],
  'text/css': [
    'Source Code',
    () => import('@findable/icon-file-type/glyph/source-code/24'),
  ],
  'text/html': [
    'Source Code',
    () => import('@findable/icon-file-type/glyph/source-code/24'),
  ],
  'application/javascript': [
    'Source Code',
    () => import('@findable/icon-file-type/glyph/source-code/24'),
  ],
  'application/octet-stream': [
    'Binary file',
    () => import('@findable/icon-file-type/glyph/generic/24'),
  ],
  'application/invision.prototype': ['Prototype', undefined],

  // TODO: Figure a way to detect those
  'application/sketch': [
    'Sketch',
    () => import('@findable/icon-file-type/glyph/sketch/24'),
  ],
};
