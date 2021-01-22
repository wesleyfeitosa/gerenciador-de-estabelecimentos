import React from 'react';
import { useAuth } from '../../hooks/auth';

import { Container, HeaderContent, HeaderOption, HeaderLink } from './styles';

const Header: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <HeaderContent>
        <div>
          <HeaderOption>
            <HeaderLink to="/home">Início</HeaderLink>
          </HeaderOption>
          <HeaderOption>
            <HeaderLink to="/create-establishment">
              Cadastrar Estabelecimento
            </HeaderLink>
          </HeaderOption>
        </div>
        <HeaderOption onClick={() => signOut()}>Sair</HeaderOption>
      </HeaderContent>
    </Container>
  );
};

export default Header;
