import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtonText } from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string;
  enabled?: boolean;
}

function Button({ children, enabled = true, ...rest }: ButtonProps) {
  return (
    <Container enabled={enabled} {...rest}>
      <ButtonText>{children}</ButtonText>
    </Container>
  );
}

export default Button;
