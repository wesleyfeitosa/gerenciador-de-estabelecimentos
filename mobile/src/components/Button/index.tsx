import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtonText } from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string;
  enabled?: boolean;
  loading?: boolean;
}

function Button({
  children,
  enabled = true,
  loading = false,
  ...rest
}: ButtonProps) {
  return (
    <Container enabled={enabled} {...rest}>
      <ButtonText>{loading ? 'Carregando...' : children}</ButtonText>
    </Container>
  );
}

export default Button;
