// @flow

import SearchIcon from '@findable/icon/glyph/search';
import CreateIcon from '@findable/icon/glyph/add';
import StarLargeIcon from '@findable/icon/glyph/star-large';
import NotificationIcon from '@findable/icon/glyph/notification';
import SettingsIcon from '@findable/icon/glyph/settings';
import AtlassianSwitcherIcon from '@findable/icon/glyph/app-switcher';
import { SwitchToTooltipText } from '@findable/atlassian-switcher';

import type { DefaultConfigShape } from './types';

export default function generateDefaultConfig(): DefaultConfigShape {
  return {
    product: {
      label: 'Atlassian',
      rank: 1,
      section: 'primary',
      tooltip: 'Atlassian',
      id: 'productLogo',
    },
    starred: {
      icon: StarLargeIcon,
      label: 'Starred and recent',
      rank: 2,
      section: 'primary',
      tooltip: 'Starred and recent',
      id: 'starDrawer',
    },
    search: {
      icon: SearchIcon,
      label: 'Search',
      section: 'primary',
      rank: 3,
      tooltip: 'Search',
      id: 'quickSearch',
    },
    create: {
      icon: CreateIcon,
      label: 'Create',
      section: 'primary',
      rank: 4,
      tooltip: 'Create',
      id: 'create',
    },
    // ==============  secondary section  ==============
    notification: {
      icon: NotificationIcon,
      label: 'Notifications',
      section: 'secondary',
      rank: 1,
      tooltip: 'Notifications',
      id: 'notifications',
    },
    appSwitcher: {
      section: 'secondary',
      rank: 2,
      id: 'appSwitcher',
    },
    help: {
      label: 'Help',
      section: 'secondary',
      rank: 3,
      tooltip: 'Help',
      id: 'help',
    },
    settings: {
      icon: SettingsIcon,
      label: 'Settings',
      section: 'secondary',
      rank: 4,
      tooltip: 'Settings',
      id: 'settings',
    },
    atlassianSwitcher: {
      icon: AtlassianSwitcherIcon,
      label: 'Atlassian Switcher',
      section: 'secondary',
      rank: 3,
      tooltip: SwitchToTooltipText,
      id: 'atlassianSwitcher',
    },
    profile: {
      label: 'Your profile and Settings',
      section: 'secondary',
      rank: 5,
      tooltip: 'Your profile and Settings',
      id: 'profile',
    },
  };
}
