/// <reference types="react" />
import { EditorView } from 'prosemirror-view';
import { ProviderFactory, ExtensionHandlers } from '@findable/editor-common';
import { EventDispatcher } from '../event-dispatcher';
import EditorActions from '../actions';
import { UIComponentFactory, ToolbarUIComponentFactory, ReactComponents, InsertMenuCustomItem } from '../types';
import { CollabEditOptions } from '../plugins/collab-edit';
import { AnalyticsEventPayload } from '../plugins/analytics';
export interface EditorAppearanceComponentProps {
    onUiReady?: (ref: HTMLElement) => void;
    onSave?: (editorView: EditorView) => void;
    onCancel?: (editorView: EditorView) => void;
    providerFactory: ProviderFactory;
    editorActions?: EditorActions;
    editorDOMElement: JSX.Element;
    editorView?: EditorView;
    eventDispatcher?: EventDispatcher;
    dispatchAnalyticsEvent?: (payload: AnalyticsEventPayload) => void;
    maxHeight?: number;
    contentComponents?: UIComponentFactory[];
    primaryToolbarComponents?: ToolbarUIComponentFactory[];
    secondaryToolbarComponents?: UIComponentFactory[];
    customContentComponents?: ReactComponents;
    customPrimaryToolbarComponents?: ReactComponents;
    customSecondaryToolbarComponents?: ReactComponents;
    insertMenuItems?: InsertMenuCustomItem[];
    addonToolbarComponents?: ReactComponents;
    popupsMountPoint?: HTMLElement;
    popupsBoundariesElement?: HTMLElement;
    popupsScrollableElement?: HTMLElement;
    extensionHandlers?: ExtensionHandlers;
    disabled?: boolean;
    collabEdit?: CollabEditOptions;
}
