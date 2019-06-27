import React from 'react';
import { Avatar, AvatarProps } from 'react-native-elements';

import { StyleGuide } from '../../themes';
import { PreviewAvatar } from '../Images/PreviewAvatar';
import { AppSyncUser } from '../../shared';

interface Props extends AvatarProps {
  user: AppSyncUser | null;
}

const size = 'medium';
function ListItemS3ImageAvatar(props: Props) {
  const { user, ...props2 } = props;
  if (!user || !user.picture) {
    return <Avatar size={size} {...props2} icon={StyleGuide.userIcon} />;
  }

  const ImageComponent = class extends React.Component<{}> {
    public render() {
      if (!user.picture) {
        return null;
      }
      return (
        <PreviewAvatar
          editable={false}
          size={size}
          imgKey={user.picture}
          level={'protected'}
          identityId={user.identityId || ''}
          {...props2}
        />
      );
    }
  };

  return <Avatar size={size} ImageComponent={ImageComponent} {...props2} />;
}

export { ListItemS3ImageAvatar };
