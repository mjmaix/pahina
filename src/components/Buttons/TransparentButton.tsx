import React from 'react';
import { Button, Text } from 'react-native-elements';

interface Props {
  label: string;
  onPress: () => void;
}

const TransparentButton: React.FC<Props> = ({ label, onPress }: Props) => {
  return (
    <Button type="clear" onPress={onPress}>
      <Text>{label}</Text>
    </Button>
  );
};

export { TransparentButton };
