import React, { ButtonHTMLAttributes, ReactElement } from 'react';

import { Container, ButtonText } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

function Button({
  children,
  loading = false,
  ...rest
}: ButtonProps): ReactElement {
  return (
    <Container type="button" {...rest}>
      <ButtonText>{loading ? 'Carregando...' : children}</ButtonText>
    </Container>
  );
}

export default Button;
