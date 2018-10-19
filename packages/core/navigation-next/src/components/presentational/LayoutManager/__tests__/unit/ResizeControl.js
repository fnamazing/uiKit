// @flow

import React from 'react';
import { mount, shallow } from 'enzyme';
import cloneDeep from 'lodash.clonedeep';
import ChevronLeft from '@atlaskit/icon/glyph/chevron-left';
import { ResizeControlBase } from '../../ResizeControl';
import { navigationExpandedCollapsed } from '../../../../../common/analytics';

jest.mock('../../../../../common/analytics', () => ({
  navigationExpandedCollapsed: jest.fn(),
}));

describe('ResizeControlBase', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  const resizeControlProps = {
    collapseToggleTooltipContent: () => ({ text: '', char: '' }),
    createAnalyticsEvent: (() => ({ fire: Function.prototype }): any),
    expandCollapseAffordanceRef: { current: null },
    experimental_flyoutOnHover: false,
    flyoutIsOpen: false,
    isDisabled: false,
    mouseIsOverNavigation: false,
    mutationRefs: [],
    navigation: {
      state: {
        isCollapsed: false,
        productNavWidth: 100,
      },
      manualResizeStart: jest.fn(),
      manualResizeEnd: jest.fn(),
      toggleCollapse: Function.prototype,
    },
  };

  it('should render correctly', () => {
    const wrapper = shallow(
      <ResizeControlBase {...resizeControlProps}>
        {() => null}
      </ResizeControlBase>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should call navigationExpandedCollapsed with chevronHover trigger when clicking on chevron while flyout is open', () => {
    const props = cloneDeep(resizeControlProps);
    props.navigation.state.isCollapsed = false;

    const wrapper = mount(
      <ResizeControlBase {...resizeControlProps} flyoutIsOpen>
        {() => null}
      </ResizeControlBase>,
    );

    wrapper.find(ChevronLeft).simulate('click');

    expect(navigationExpandedCollapsed).toHaveBeenCalledTimes(1);
    expect(navigationExpandedCollapsed).toHaveBeenCalledWith(
      resizeControlProps.createAnalyticsEvent,
      {
        trigger: 'chevronHover',
        isCollapsed: true,
      },
    );
  });

  it('should call navigationExpandedCollapsed with chevron trigger when clicking on chevron while flyout is not open', () => {
    const props = cloneDeep(resizeControlProps);
    props.navigation.state.isCollapsed = false;

    const wrapper = mount(
      <ResizeControlBase {...resizeControlProps} flyoutIsOpen={false}>
        {() => null}
      </ResizeControlBase>,
    );

    wrapper.find(ChevronLeft).simulate('click');

    expect(navigationExpandedCollapsed).toHaveBeenCalledTimes(1);
    expect(navigationExpandedCollapsed).toHaveBeenCalledWith(
      resizeControlProps.createAnalyticsEvent,
      {
        trigger: 'chevron',
        isCollapsed: true,
      },
    );
  });

  describe('When the component is resizing', () => {
    describe('When starting to drag', () => {
      it('should initialize dragging state', () => {
        const props = cloneDeep(resizeControlProps);
        const wrapper = mount(
          <ResizeControlBase {...props}>{() => null}</ResizeControlBase>,
        );
        wrapper.setState({ mouseIsDown: true, isDragging: false });

        wrapper.instance().handleResize({ pageX: 100 });
        requestAnimationFrame.step();

        expect(wrapper.state('isDragging')).toEqual(true);
        expect(wrapper.state('didDragOpen')).toEqual(false);
        expect(wrapper.state('initialWidth')).toEqual(
          props.navigation.state.productNavWidth,
        );
      });

      it('should call navigation.manualResizeStart if isCollapsed is false', () => {
        const props = cloneDeep(resizeControlProps);
        props.navigation.state.isCollapsed = false;
        const wrapper = mount(
          <ResizeControlBase {...props}>{() => null}</ResizeControlBase>,
        );
        wrapper.setState({ mouseIsDown: true, isDragging: false });

        wrapper.instance().handleResize({ pageX: 100 });
        requestAnimationFrame.step();

        expect(props.navigation.manualResizeStart).toHaveBeenCalledTimes(1);
        expect(props.navigation.manualResizeStart).toHaveBeenCalledWith(
          props.navigation.state,
        );
      });

      it('should call navigation.manualResizeStart if isCollapsed is true', () => {
        const props = cloneDeep(resizeControlProps);
        props.navigation.state.isCollapsed = true;
        const wrapper = mount(
          <ResizeControlBase {...props}>{() => null}</ResizeControlBase>,
        );
        wrapper.setState({ mouseIsDown: true, isDragging: false });

        wrapper.instance().handleResize({ pageX: 100 });
        requestAnimationFrame.step();

        expect(props.navigation.manualResizeStart).toHaveBeenCalledTimes(1);
        expect(props.navigation.manualResizeStart).toHaveBeenCalledWith({
          productNavWidth: 20,
          isCollapsed: false,
        });
        expect(wrapper.state('didDragOpen')).toEqual(true);
        expect(wrapper.state('initialWidth')).toEqual(20);
      });
    });

    describe('When dragging', () => {
      it('should not change width and delta when mouseIsDown is false', () => {
        const props = cloneDeep(resizeControlProps);
        const wrapper = mount(
          <ResizeControlBase {...props}>{() => null}</ResizeControlBase>,
        );
        wrapper.setState({ mouseIsDown: false, isDragging: true });
        const { width: cachedWidth, delta: cachedDelta } = wrapper.state();

        wrapper.instance().handleResize({ pageX: 100 });
        requestAnimationFrame.step();

        expect(wrapper.state('width')).toEqual(cachedWidth);
        expect(wrapper.state('delta')).toEqual(cachedDelta);
      });

      it('should change width and delta when mouseIsDown is true', () => {
        const props = cloneDeep(resizeControlProps);
        const wrapper = mount(
          <ResizeControlBase {...props}>{() => null}</ResizeControlBase>,
        );
        wrapper.setState({
          mouseIsDown: true,
          isDragging: true,
          initialWidth: 50,
        });

        wrapper.instance().handleResize({ pageX: 100 });
        requestAnimationFrame.step();

        expect(wrapper.state('width')).toEqual(150);
        expect(wrapper.state('delta')).toEqual(100);
      });

      it('should change mutationRef style if new value is different than old value', () => {
        const pageX = 100;
        const mutationRefs = [
          {
            property: 'padding-left',
            ref: {
              style: {
                getPropertyValue: jest.fn().mockReturnValue('562px'),
                setProperty: jest.fn(),
              },
            },
          },
          //not supposed to call setProperty for the ref below
          {
            property: 'width',
            ref: {
              style: {
                getPropertyValue: jest.fn().mockReturnValue(`${pageX}px`),
                setProperty: jest.fn(),
              },
            },
          },
        ];
        const props = { ...cloneDeep(resizeControlProps), mutationRefs };
        const wrapper = mount(
          <ResizeControlBase {...props}>{() => null}</ResizeControlBase>,
        );
        wrapper.setState({ mouseIsDown: true, isDragging: true });

        wrapper.instance().handleResize({ pageX });
        requestAnimationFrame.step();

        expect(
          mutationRefs[0].ref.style.getPropertyValue,
        ).toHaveBeenCalledTimes(1);
        expect(mutationRefs[0].ref.style.setProperty).toHaveBeenCalledWith(
          'padding-left',
          '100px',
        );
        expect(
          mutationRefs[1].ref.style.getPropertyValue,
        ).toHaveBeenCalledTimes(1);
        expect(mutationRefs[1].ref.style.setProperty).not.toHaveBeenCalled();
      });
    });

    describe('When releasing drag', () => {
      it('should collapse if dragged below collapse threshold', () => {
        const props = cloneDeep(resizeControlProps);
        const state = { delta: -100, isDragging: true, width: 140 };
        const wrapper = mount(
          <ResizeControlBase {...props}>{() => null}</ResizeControlBase>,
        );
        wrapper.setState(state);

        wrapper.instance().handleResizeEnd();

        expect(props.navigation.manualResizeEnd).toHaveBeenCalledTimes(1);
        expect(props.navigation.manualResizeEnd).toHaveBeenCalledWith({
          productNavWidth: 240,
          isCollapsed: true,
        });
      });

      it('should resize back to default width if dragged above collapse threshold and below default width', () => {
        const props = cloneDeep(resizeControlProps);
        const state = { delta: -15, isDragging: true, width: 225 };
        props.mutationRefs = [
          {
            property: 'padding-left',
            ref: {
              style: {
                getPropertyValue: jest.fn(),
                setProperty: jest.fn(),
              },
            },
          },
          {
            property: 'width',
            ref: {
              style: {
                getPropertyValue: jest.fn(),
                setProperty: jest.fn(),
              },
            },
          },
        ];
        const wrapper = mount(
          <ResizeControlBase {...props}>{() => null}</ResizeControlBase>,
        );
        wrapper.setState(state);

        wrapper.instance().handleResizeEnd();

        expect(props.navigation.manualResizeEnd).toHaveBeenCalledTimes(1);
        expect(props.navigation.manualResizeEnd).toHaveBeenCalledWith({
          productNavWidth: 240,
          isCollapsed: false,
        });
        expect(
          props.mutationRefs[0].ref.style.getPropertyValue,
        ).toHaveBeenCalledTimes(1);
        expect(
          props.mutationRefs[0].ref.style.setProperty,
        ).toHaveBeenCalledWith('padding-left', '240px');
        expect(
          props.mutationRefs[1].ref.style.getPropertyValue,
        ).toHaveBeenCalledTimes(1);
        expect(
          props.mutationRefs[1].ref.style.setProperty,
        ).toHaveBeenCalledWith('width', '240px');
      });

      it('should resize to greater width if dragged above default width', () => {
        const props = cloneDeep(resizeControlProps);
        const state = { delta: 130, isDragging: true, width: 370 };
        const wrapper = mount(
          <ResizeControlBase {...props}>{() => null}</ResizeControlBase>,
        );
        wrapper.setState(state);

        wrapper.instance().handleResizeEnd();

        expect(props.navigation.manualResizeEnd).toHaveBeenCalledTimes(1);
        expect(props.navigation.manualResizeEnd).toHaveBeenCalledWith({
          productNavWidth: 370,
          isCollapsed: false,
        });
      });
    });
  });
});

describe('ResizeControl', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });
  it('should wrap ResizeControlBase with withAnalyticsEvents HOC', () => {
    const WrappedComp = () => null;
    const mockReturn = jest.fn(() => WrappedComp);
    const mockWithAnalyticsEvents = jest.fn(() => mockReturn);
    jest.doMock('@atlaskit/analytics-next', () => ({
      createAndFireEvent: jest.fn(() => jest.fn()),
      withAnalyticsEvents: mockWithAnalyticsEvents,
      withAnalyticsContext: jest.fn(() => () => null),
    }));

    expect(mockWithAnalyticsEvents).toHaveBeenCalledTimes(0);
    const {
      default: ResizeControl,
      ResizeControlBase: RequiredResizeControlBase,
    } = require('../../ResizeControl');

    // withAnalyticsEvent map should not be called with anything
    expect(mockWithAnalyticsEvents).toHaveBeenLastCalledWith();
    // The return of the call above should be called with ResizeControlBase
    expect(mockReturn).toHaveBeenLastCalledWith(RequiredResizeControlBase);
    // The return of the call above should be the default export
    expect(ResizeControl).toBe(WrappedComp);
  });
});
