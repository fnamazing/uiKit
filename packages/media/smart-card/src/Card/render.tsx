import * as React from 'react';
import { WithAnalyticsEventProps } from '@findable/analytics-next-types';
import { CardProps, CardWithData, CardWithUrl } from './types';
import { CardWithUrlContent as CardWithUrlContentType } from './renderCardWithUrl';
import { CardWithDataContent as CardWithDataContentType } from './renderCardWithData';
import { CardLinkView } from '@findable/media-ui';
import { auth } from '@findable/outbound-auth-flow-client';

export const isCardWithData = (props: CardProps): props is CardWithData =>
  !!(props as CardWithData).data;

export class CardWithURLRenderer extends React.PureComponent<
  CardWithUrl & WithAnalyticsEventProps
> {
  static CardContent: typeof CardWithUrlContentType | null = null;

  static moduleImporter(target: CardWithURLRenderer) {
    import(/* webpackChunkName:"@atlaskit-internal-smartcard-urlcardcontent" */ './renderCardWithUrl').then(
      module => {
        CardWithURLRenderer.CardContent = module.CardWithUrlContent;
        target.forceUpdate();
      },
    );
  }

  componentDidMount() {
    if (CardWithURLRenderer.CardContent === null) {
      (this.props.importer || CardWithURLRenderer.moduleImporter)(this);
    }
  }

  render() {
    const {
      url,
      client,
      appearance,
      isSelected,
      onClick,
      createAnalyticsEvent,
    } = this.props;

    if (!url) {
      throw new Error('@findable/smart-card: url property is missing.');
    }

    return CardWithURLRenderer.CardContent !== null ? (
      <CardWithURLRenderer.CardContent
        url={url}
        client={client!}
        appearance={appearance}
        onClick={onClick}
        isSelected={isSelected}
        createAnalyticsEvent={createAnalyticsEvent}
        authFn={auth}
      />
    ) : (
      <CardLinkView key={'chunk-placeholder'} link={url} />
    );
  }
}

export class CardWithDataRenderer extends React.PureComponent<
  CardWithData & WithAnalyticsEventProps
> {
  static CardContent: typeof CardWithDataContentType | null = null;

  static moduleImporter(target: CardWithDataRenderer) {
    import(/* webpackChunkName:"@atlaskit-internal-smartcard-datacardcontent" */ './renderCardWithData').then(
      module => {
        CardWithDataRenderer.CardContent = module.CardWithDataContent;
        target.forceUpdate();
      },
    );
  }

  componentDidMount() {
    if (CardWithDataRenderer.CardContent === null) {
      (this.props.importer || CardWithDataRenderer.moduleImporter)(this);
    }
  }

  render() {
    const { appearance, data, isSelected, onClick } = this.props;
    if (!data) {
      throw new Error(
        '@findable/smart-cards: you are trying to render a card with data, but does not provide any',
      );
    }
    if (CardWithDataRenderer.CardContent) {
      return (
        <CardWithDataRenderer.CardContent
          appearance={appearance}
          data={data}
          isSelected={isSelected}
          onClick={onClick}
        />
      );
    }
    return <div card-with-data />;
  }
}
