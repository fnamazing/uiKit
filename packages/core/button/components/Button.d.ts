import * as React from 'react';
import { ButtonProps } from '../types';
export declare type ButtonState = {
    isActive: boolean;
    isFocus: boolean;
    isHover: boolean;
};
export declare const defaultProps: Pick<ButtonProps, 'appearance' | 'isDisabled' | 'isSelected' | 'isLoading' | 'spacing' | 'type' | 'shouldFitContainer' | 'autoFocus'>;
export declare class Button extends React.Component<ButtonProps, ButtonState> {
    button: HTMLElement | undefined;
    state: {
        isActive: boolean;
        isFocus: boolean;
        isHover: boolean;
    };
    componentWillReceiveProps(nextProps: ButtonProps): void;
    componentDidMount(): void;
    private customComponent;
    isInteractive: () => boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onMouseDown: (e: Event) => void;
    onMouseUp: () => void;
    onFocus: React.FocusEventHandler<HTMLButtonElement>;
    onBlur: React.FocusEventHandler<HTMLButtonElement>;
    onInnerClick: React.MouseEventHandler<HTMLButtonElement>;
    getStyledComponent(): React.StatelessComponent<any> | React.ComponentClass<any, any> | import("styled-components").StyledComponentClass<(React.ClassAttributes<HTMLButtonElement> & React.ButtonHTMLAttributes<HTMLButtonElement> & Partial<{
        'aria-label': string | undefined;
        onBlur: (event: React.FocusEvent<HTMLButtonElement>) => void;
        onClick: ((e: React.MouseEvent<HTMLButtonElement>, analyticsEvent: import("@findable/analytics-next-types").UIAnalyticsEvent) => void) | undefined;
        onFocus: (event: React.FocusEvent<HTMLButtonElement>) => void;
        onMouseDown: (e: Event) => void;
        onMouseEnter: () => void;
        onMouseLeave: () => void;
        onMouseUp: () => void;
        tabIndex: number | undefined;
        appearance: "default" | "danger" | "link" | "primary" | "subtle" | "subtle-link" | "warning" | "help" | undefined;
        className: string | undefined;
        disabled: boolean;
        isActive: boolean;
        isFocus: boolean;
        isHover: boolean;
        isLoading: boolean;
        isSelected: boolean;
        spacing: "default" | "compact" | "none";
        fit: boolean;
        id: string | undefined;
    }> & {
        theme?: any;
    }) | (React.ClassAttributes<HTMLButtonElement> & React.ButtonHTMLAttributes<HTMLButtonElement> & Partial<{
        'aria-label': string | undefined;
        onBlur: (event: React.FocusEvent<HTMLButtonElement>) => void;
        onClick: ((e: React.MouseEvent<HTMLButtonElement>, analyticsEvent: import("@findable/analytics-next-types").UIAnalyticsEvent) => void) | undefined;
        onFocus: (event: React.FocusEvent<HTMLButtonElement>) => void;
        onMouseDown: (e: Event) => void;
        onMouseEnter: () => void;
        onMouseLeave: () => void;
        onMouseUp: () => void;
        tabIndex: number | undefined;
        appearance: "default" | "danger" | "link" | "primary" | "subtle" | "subtle-link" | "warning" | "help" | undefined;
        className: string | undefined;
        disabled: boolean;
        isActive: boolean;
        isFocus: boolean;
        isHover: boolean;
        isLoading: boolean;
        isSelected: boolean;
        spacing: "default" | "compact" | "none";
        fit: boolean;
        id: string | undefined;
        children?: React.ReactNode;
        ariaControls?: string | undefined;
        ariaExpanded?: boolean | undefined;
        ariaLabel?: string | undefined;
        ariaHaspopup?: boolean | undefined;
        component?: React.ComponentClass<{}, any> | React.StatelessComponent<{}> | undefined;
        form?: string | undefined;
        href?: string | undefined;
        iconAfter?: string | number | React.ReactElement<any> | undefined;
        iconBefore?: string | number | React.ReactElement<any> | undefined;
        innerRef?: ((element: HTMLElement) => void) | undefined;
        isDisabled: boolean;
        target?: string | undefined;
        type: "button" | "submit" | "reset";
        shouldFitContainer: boolean;
        autoFocus: boolean;
        theme?: string | undefined;
    }> & {
        theme?: any;
    }), any, (React.ClassAttributes<HTMLButtonElement> & React.ButtonHTMLAttributes<HTMLButtonElement> & Partial<{
        'aria-label': string | undefined;
        onBlur: (event: React.FocusEvent<HTMLButtonElement>) => void;
        onClick: ((e: React.MouseEvent<HTMLButtonElement>, analyticsEvent: import("@findable/analytics-next-types").UIAnalyticsEvent) => void) | undefined;
        onFocus: (event: React.FocusEvent<HTMLButtonElement>) => void;
        onMouseDown: (e: Event) => void;
        onMouseEnter: () => void;
        onMouseLeave: () => void;
        onMouseUp: () => void;
        tabIndex: number | undefined;
        appearance: "default" | "danger" | "link" | "primary" | "subtle" | "subtle-link" | "warning" | "help" | undefined;
        className: string | undefined;
        disabled: boolean;
        isActive: boolean;
        isFocus: boolean;
        isHover: boolean;
        isLoading: boolean;
        isSelected: boolean;
        spacing: "default" | "compact" | "none";
        fit: boolean;
        id: string | undefined;
    }> & {
        theme?: any;
    }) | (React.ClassAttributes<HTMLButtonElement> & React.ButtonHTMLAttributes<HTMLButtonElement> & Partial<{
        'aria-label': string | undefined;
        onBlur: (event: React.FocusEvent<HTMLButtonElement>) => void;
        onClick: ((e: React.MouseEvent<HTMLButtonElement>, analyticsEvent: import("@findable/analytics-next-types").UIAnalyticsEvent) => void) | undefined;
        onFocus: (event: React.FocusEvent<HTMLButtonElement>) => void;
        onMouseDown: (e: Event) => void;
        onMouseEnter: () => void;
        onMouseLeave: () => void;
        onMouseUp: () => void;
        tabIndex: number | undefined;
        appearance: "default" | "danger" | "link" | "primary" | "subtle" | "subtle-link" | "warning" | "help" | undefined;
        className: string | undefined;
        disabled: boolean;
        isActive: boolean;
        isFocus: boolean;
        isHover: boolean;
        isLoading: boolean;
        isSelected: boolean;
        spacing: "default" | "compact" | "none";
        fit: boolean;
        id: string | undefined;
        children?: React.ReactNode;
        ariaControls?: string | undefined;
        ariaExpanded?: boolean | undefined;
        ariaLabel?: string | undefined;
        ariaHaspopup?: boolean | undefined;
        component?: React.ComponentClass<{}, any> | React.StatelessComponent<{}> | undefined;
        form?: string | undefined;
        href?: string | undefined;
        iconAfter?: string | number | React.ReactElement<any> | undefined;
        iconBefore?: string | number | React.ReactElement<any> | undefined;
        innerRef?: ((element: HTMLElement) => void) | undefined;
        isDisabled: boolean;
        target?: string | undefined;
        type: "button" | "submit" | "reset";
        shouldFitContainer: boolean;
        autoFocus: boolean;
        theme?: string | undefined;
    }> & {
        theme?: any;
    })> | import("styled-components").StyledComponentClass<(React.ClassAttributes<HTMLAnchorElement> & React.AnchorHTMLAttributes<HTMLAnchorElement> & Partial<{
        'aria-label': string | undefined;
        onBlur: (event: React.FocusEvent<HTMLButtonElement>) => void;
        onClick: ((e: React.MouseEvent<HTMLButtonElement>, analyticsEvent: import("@findable/analytics-next-types").UIAnalyticsEvent) => void) | undefined;
        onFocus: (event: React.FocusEvent<HTMLButtonElement>) => void;
        onMouseDown: (e: Event) => void;
        onMouseEnter: () => void;
        onMouseLeave: () => void;
        onMouseUp: () => void;
        tabIndex: number | undefined;
        appearance: "default" | "danger" | "link" | "primary" | "subtle" | "subtle-link" | "warning" | "help" | undefined;
        className: string | undefined;
        disabled: boolean;
        isActive: boolean;
        isFocus: boolean;
        isHover: boolean;
        isLoading: boolean;
        isSelected: boolean;
        spacing: "default" | "compact" | "none";
        fit: boolean;
        id: string | undefined;
    }> & {
        theme?: any;
    }) | (React.ClassAttributes<HTMLAnchorElement> & React.AnchorHTMLAttributes<HTMLAnchorElement> & Partial<{
        'aria-label': string | undefined;
        onBlur: (event: React.FocusEvent<HTMLButtonElement>) => void;
        onClick: ((e: React.MouseEvent<HTMLButtonElement>, analyticsEvent: import("@findable/analytics-next-types").UIAnalyticsEvent) => void) | undefined;
        onFocus: (event: React.FocusEvent<HTMLButtonElement>) => void;
        onMouseDown: (e: Event) => void;
        onMouseEnter: () => void;
        onMouseLeave: () => void;
        onMouseUp: () => void;
        tabIndex: number | undefined;
        appearance: "default" | "danger" | "link" | "primary" | "subtle" | "subtle-link" | "warning" | "help" | undefined;
        className: string | undefined;
        disabled: boolean;
        isActive: boolean;
        isFocus: boolean;
        isHover: boolean;
        isLoading: boolean;
        isSelected: boolean;
        spacing: "default" | "compact" | "none";
        fit: boolean;
        id: string | undefined;
        children?: React.ReactNode;
        ariaControls?: string | undefined;
        ariaExpanded?: boolean | undefined;
        ariaLabel?: string | undefined;
        ariaHaspopup?: boolean | undefined;
        component?: React.ComponentClass<{}, any> | React.StatelessComponent<{}> | undefined;
        form?: string | undefined;
        href?: string | undefined;
        iconAfter?: string | number | React.ReactElement<any> | undefined;
        iconBefore?: string | number | React.ReactElement<any> | undefined;
        innerRef?: ((element: HTMLElement) => void) | undefined;
        isDisabled: boolean;
        target?: string | undefined;
        type: "button" | "submit" | "reset";
        shouldFitContainer: boolean;
        autoFocus: boolean;
        theme?: string | undefined;
    }> & {
        theme?: any;
    }), any, (React.ClassAttributes<HTMLAnchorElement> & React.AnchorHTMLAttributes<HTMLAnchorElement> & Partial<{
        'aria-label': string | undefined;
        onBlur: (event: React.FocusEvent<HTMLButtonElement>) => void;
        onClick: ((e: React.MouseEvent<HTMLButtonElement>, analyticsEvent: import("@findable/analytics-next-types").UIAnalyticsEvent) => void) | undefined;
        onFocus: (event: React.FocusEvent<HTMLButtonElement>) => void;
        onMouseDown: (e: Event) => void;
        onMouseEnter: () => void;
        onMouseLeave: () => void;
        onMouseUp: () => void;
        tabIndex: number | undefined;
        appearance: "default" | "danger" | "link" | "primary" | "subtle" | "subtle-link" | "warning" | "help" | undefined;
        className: string | undefined;
        disabled: boolean;
        isActive: boolean;
        isFocus: boolean;
        isHover: boolean;
        isLoading: boolean;
        isSelected: boolean;
        spacing: "default" | "compact" | "none";
        fit: boolean;
        id: string | undefined;
    }> & {
        theme?: any;
    }) | (React.ClassAttributes<HTMLAnchorElement> & React.AnchorHTMLAttributes<HTMLAnchorElement> & Partial<{
        'aria-label': string | undefined;
        onBlur: (event: React.FocusEvent<HTMLButtonElement>) => void;
        onClick: ((e: React.MouseEvent<HTMLButtonElement>, analyticsEvent: import("@findable/analytics-next-types").UIAnalyticsEvent) => void) | undefined;
        onFocus: (event: React.FocusEvent<HTMLButtonElement>) => void;
        onMouseDown: (e: Event) => void;
        onMouseEnter: () => void;
        onMouseLeave: () => void;
        onMouseUp: () => void;
        tabIndex: number | undefined;
        appearance: "default" | "danger" | "link" | "primary" | "subtle" | "subtle-link" | "warning" | "help" | undefined;
        className: string | undefined;
        disabled: boolean;
        isActive: boolean;
        isFocus: boolean;
        isHover: boolean;
        isLoading: boolean;
        isSelected: boolean;
        spacing: "default" | "compact" | "none";
        fit: boolean;
        id: string | undefined;
        children?: React.ReactNode;
        ariaControls?: string | undefined;
        ariaExpanded?: boolean | undefined;
        ariaLabel?: string | undefined;
        ariaHaspopup?: boolean | undefined;
        component?: React.ComponentClass<{}, any> | React.StatelessComponent<{}> | undefined;
        form?: string | undefined;
        href?: string | undefined;
        iconAfter?: string | number | React.ReactElement<any> | undefined;
        iconBefore?: string | number | React.ReactElement<any> | undefined;
        innerRef?: ((element: HTMLElement) => void) | undefined;
        isDisabled: boolean;
        target?: string | undefined;
        type: "button" | "submit" | "reset";
        shouldFitContainer: boolean;
        autoFocus: boolean;
        theme?: string | undefined;
    }> & {
        theme?: any;
    })> | import("styled-components").StyledComponentClass<(React.ClassAttributes<HTMLSpanElement> & React.HTMLAttributes<HTMLSpanElement> & Partial<{
        'aria-label': string | undefined;
        onBlur: (event: React.FocusEvent<HTMLButtonElement>) => void;
        onClick: ((e: React.MouseEvent<HTMLButtonElement>, analyticsEvent: import("@findable/analytics-next-types").UIAnalyticsEvent) => void) | undefined;
        onFocus: (event: React.FocusEvent<HTMLButtonElement>) => void;
        onMouseDown: (e: Event) => void;
        onMouseEnter: () => void;
        onMouseLeave: () => void;
        onMouseUp: () => void;
        tabIndex: number | undefined;
        appearance: "default" | "danger" | "link" | "primary" | "subtle" | "subtle-link" | "warning" | "help" | undefined;
        className: string | undefined;
        disabled: boolean;
        isActive: boolean;
        isFocus: boolean;
        isHover: boolean;
        isLoading: boolean;
        isSelected: boolean;
        spacing: "default" | "compact" | "none";
        fit: boolean;
        id: string | undefined;
    }> & {
        theme?: any;
    }) | (React.ClassAttributes<HTMLSpanElement> & React.HTMLAttributes<HTMLSpanElement> & Partial<{
        'aria-label': string | undefined;
        onBlur: (event: React.FocusEvent<HTMLButtonElement>) => void;
        onClick: ((e: React.MouseEvent<HTMLButtonElement>, analyticsEvent: import("@findable/analytics-next-types").UIAnalyticsEvent) => void) | undefined;
        onFocus: (event: React.FocusEvent<HTMLButtonElement>) => void;
        onMouseDown: (e: Event) => void;
        onMouseEnter: () => void;
        onMouseLeave: () => void;
        onMouseUp: () => void;
        tabIndex: number | undefined;
        appearance: "default" | "danger" | "link" | "primary" | "subtle" | "subtle-link" | "warning" | "help" | undefined;
        className: string | undefined;
        disabled: boolean;
        isActive: boolean;
        isFocus: boolean;
        isHover: boolean;
        isLoading: boolean;
        isSelected: boolean;
        spacing: "default" | "compact" | "none";
        fit: boolean;
        id: string | undefined;
        children?: React.ReactNode;
        ariaControls?: string | undefined;
        ariaExpanded?: boolean | undefined;
        ariaLabel?: string | undefined;
        ariaHaspopup?: boolean | undefined;
        component?: React.ComponentClass<{}, any> | React.StatelessComponent<{}> | undefined;
        form?: string | undefined;
        href?: string | undefined;
        iconAfter?: string | number | React.ReactElement<any> | undefined;
        iconBefore?: string | number | React.ReactElement<any> | undefined;
        innerRef?: ((element: HTMLElement) => void) | undefined;
        isDisabled: boolean;
        target?: string | undefined;
        type: "button" | "submit" | "reset";
        shouldFitContainer: boolean;
        autoFocus: boolean;
        theme?: string | undefined;
    }> & {
        theme?: any;
    }), any, (React.ClassAttributes<HTMLSpanElement> & React.HTMLAttributes<HTMLSpanElement> & Partial<{
        'aria-label': string | undefined;
        onBlur: (event: React.FocusEvent<HTMLButtonElement>) => void;
        onClick: ((e: React.MouseEvent<HTMLButtonElement>, analyticsEvent: import("@findable/analytics-next-types").UIAnalyticsEvent) => void) | undefined;
        onFocus: (event: React.FocusEvent<HTMLButtonElement>) => void;
        onMouseDown: (e: Event) => void;
        onMouseEnter: () => void;
        onMouseLeave: () => void;
        onMouseUp: () => void;
        tabIndex: number | undefined;
        appearance: "default" | "danger" | "link" | "primary" | "subtle" | "subtle-link" | "warning" | "help" | undefined;
        className: string | undefined;
        disabled: boolean;
        isActive: boolean;
        isFocus: boolean;
        isHover: boolean;
        isLoading: boolean;
        isSelected: boolean;
        spacing: "default" | "compact" | "none";
        fit: boolean;
        id: string | undefined;
    }> & {
        theme?: any;
    }) | (React.ClassAttributes<HTMLSpanElement> & React.HTMLAttributes<HTMLSpanElement> & Partial<{
        'aria-label': string | undefined;
        onBlur: (event: React.FocusEvent<HTMLButtonElement>) => void;
        onClick: ((e: React.MouseEvent<HTMLButtonElement>, analyticsEvent: import("@findable/analytics-next-types").UIAnalyticsEvent) => void) | undefined;
        onFocus: (event: React.FocusEvent<HTMLButtonElement>) => void;
        onMouseDown: (e: Event) => void;
        onMouseEnter: () => void;
        onMouseLeave: () => void;
        onMouseUp: () => void;
        tabIndex: number | undefined;
        appearance: "default" | "danger" | "link" | "primary" | "subtle" | "subtle-link" | "warning" | "help" | undefined;
        className: string | undefined;
        disabled: boolean;
        isActive: boolean;
        isFocus: boolean;
        isHover: boolean;
        isLoading: boolean;
        isSelected: boolean;
        spacing: "default" | "compact" | "none";
        fit: boolean;
        id: string | undefined;
        children?: React.ReactNode;
        ariaControls?: string | undefined;
        ariaExpanded?: boolean | undefined;
        ariaLabel?: string | undefined;
        ariaHaspopup?: boolean | undefined;
        component?: React.ComponentClass<{}, any> | React.StatelessComponent<{}> | undefined;
        form?: string | undefined;
        href?: string | undefined;
        iconAfter?: string | number | React.ReactElement<any> | undefined;
        iconBefore?: string | number | React.ReactElement<any> | undefined;
        innerRef?: ((element: HTMLElement) => void) | undefined;
        isDisabled: boolean;
        target?: string | undefined;
        type: "button" | "submit" | "reset";
        shouldFitContainer: boolean;
        autoFocus: boolean;
        theme?: string | undefined;
    }> & {
        theme?: any;
    })>;
    getInnerRef: (ref: HTMLElement) => void;
    render(): JSX.Element;
}
export declare const DefaultedButton: React.ComponentClass<Partial<Pick<ButtonProps, "appearance" | "isDisabled" | "isLoading" | "isSelected" | "spacing" | "type" | "shouldFitContainer" | "autoFocus">> & Pick<ButtonProps, "form" | "onClick" | "ariaControls" | "ariaExpanded" | "ariaLabel" | "ariaHaspopup" | "className" | "component" | "href" | "iconAfter" | "iconBefore" | "innerRef" | "id" | "onBlur" | "onMouseDown" | "onMouseEnter" | "onMouseLeave" | "onMouseUp" | "onFocus" | "tabIndex" | "target" | "theme">, any>;
export declare type ButtonType = Button;
export declare const ButtonBase: typeof Button;
export declare const ButtonWithoutAnalytics: React.ComponentClass<Partial<Pick<ButtonProps, "appearance" | "isDisabled" | "isLoading" | "isSelected" | "spacing" | "type" | "shouldFitContainer" | "autoFocus">> & Pick<ButtonProps, "form" | "onClick" | "ariaControls" | "ariaExpanded" | "ariaLabel" | "ariaHaspopup" | "className" | "component" | "href" | "iconAfter" | "iconBefore" | "innerRef" | "id" | "onBlur" | "onMouseDown" | "onMouseEnter" | "onMouseLeave" | "onMouseUp" | "onFocus" | "tabIndex" | "target" | "theme"> & {
    appearance?: "default" | "danger" | "link" | "primary" | "subtle" | "subtle-link" | "warning" | "help" | undefined;
}, any>;
declare const _default: React.ComponentClass<Pick<Pick<Partial<Pick<ButtonProps, "appearance" | "isDisabled" | "isLoading" | "isSelected" | "spacing" | "type" | "shouldFitContainer" | "autoFocus">> & Pick<ButtonProps, "form" | "onClick" | "ariaControls" | "ariaExpanded" | "ariaLabel" | "ariaHaspopup" | "className" | "component" | "href" | "iconAfter" | "iconBefore" | "innerRef" | "id" | "onBlur" | "onMouseDown" | "onMouseEnter" | "onMouseLeave" | "onMouseUp" | "onFocus" | "tabIndex" | "target" | "theme"> & {
    appearance?: "default" | "danger" | "link" | "primary" | "subtle" | "subtle-link" | "warning" | "help" | undefined;
}, "form" | "appearance" | "onClick" | "ariaControls" | "ariaExpanded" | "ariaLabel" | "ariaHaspopup" | "className" | "component" | "href" | "iconAfter" | "iconBefore" | "innerRef" | "id" | "isDisabled" | "isLoading" | "isSelected" | "onBlur" | "onMouseDown" | "onMouseEnter" | "onMouseLeave" | "onMouseUp" | "onFocus" | "spacing" | "tabIndex" | "target" | "type" | "shouldFitContainer" | "autoFocus" | "theme">, "form" | "appearance" | "onClick" | "ariaControls" | "ariaExpanded" | "ariaLabel" | "ariaHaspopup" | "className" | "component" | "href" | "iconAfter" | "iconBefore" | "innerRef" | "id" | "isDisabled" | "isLoading" | "isSelected" | "onBlur" | "onMouseDown" | "onMouseEnter" | "onMouseLeave" | "onMouseUp" | "onFocus" | "spacing" | "tabIndex" | "target" | "type" | "shouldFitContainer" | "autoFocus" | "theme">, any>;
export default _default;