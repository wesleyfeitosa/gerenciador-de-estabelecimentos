/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-curly-newline */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Table, TableWrapper, Cell } from 'react-native-table-component';
import Icon from 'react-native-vector-icons/Feather';
import RNPickerSelect from 'react-native-picker-select';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { Text } from 'react-native';
import api from '../../services/apiClient';
import estadosECidades from '../../assets/estados-cidades.json';
import { messageAlert } from '../../utils';
import Button from '../../components/Button';

import {
  Container,
  HeaderContainer,
  HeaderTitle,
  Content,
  SearchContainer,
  SearchButtonContainer,
  ButtonsContainer,
  ButtonContent,
  ButtonActions,
  ButtonActionsText,
  TableAdvice,
} from './styles';
import { useAuth } from '../../hooks/auth';

export interface EstablishmentData {
  id: string;
  name: string;
  phone: string;
  type: string;
  address: {
    id: string;
    street: string;
    street_number: number;
    neighborhood: string;
    zipcode: string;
    city: string;
    state: string;
  };
  avatar_url: string;
}

interface Item {
  label: string;
  value: string;
  color: string;
}

interface StateAndCitiesData {
  estados: { sigla: string; nome: string; cidades: string[] }[];
}

function Home() {
  const [establishments, setEstablishments] = useState<EstablishmentData[]>([]);
  const { navigate, addListener } = useNavigation();
  const { signOut } = useAuth();

  const estadoECidadesBrasil: StateAndCitiesData = estadosECidades;
  const [city, setCity] = useState('Selecione um Estado');
  const [state, setState] = useState('Selecione uma cidade');
  const [searchVisible, setSearchVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = addListener('focus', () => {
      api.get('/establishments').then(response => {
        setEstablishments(response.data);
      });
    });
    return unsubscribe;
  }, [addListener]);

  useEffect(() => {
    api.get('/establishments').then(response => {
      setEstablishments(response.data);
    });
  }, []);

  const statesOfBrasil: Item[] = useMemo(() => {
    if (estadoECidadesBrasil.estados.length > 0) {
      return estadoECidadesBrasil.estados.map(value => ({
        label: value.nome,
        value: value.nome,
        color: '#222222',
      }));
    }

    return [] as Item[];
  }, [estadoECidadesBrasil.estados]);

  const citiesOfState: Item[] = useMemo(() => {
    const estado = estadoECidadesBrasil.estados.find(
      value => value.nome === state,
    );

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (estado) {
      return estado.cidades.map(cityMap => ({
        label: cityMap,
        value: cityMap,
        color: '#222222',
      }));
    }
    return [{ label: 'Cidades...', value: 'Cidades...', color: '#222222' }];
  }, [estadoECidadesBrasil.estados, state]);

  const handleSearch = useCallback(async () => {
    if (!city || !state) {
      const response = await api.get('/establishments');

      setEstablishments(response.data);

      return;
    }

    const response = await api.get<EstablishmentData[]>(
      `/search?city=${city}&state=${state}`,
    );

    setEstablishments(response.data);
    setSearchVisible(false);
  }, [city, state]);

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await api.delete(`/establishments/${id}`);

        setEstablishments(establishments.filter(value => value.id !== id));

        messageAlert(
          'Estabelecimento removido',
          'Estabelecimento removido com sucesso!',
        );
      } catch (err) {
        messageAlert(
          'Erro na remoção',
          'Ocorreu um erro na remoção do estabelecimento',
        );
      }
    },
    [establishments],
  );

  return (
    <Container>
      <HeaderContainer>
        <HeaderTitle>Início</HeaderTitle>
        <Icon
          name="log-out"
          size={26}
          color="#ffffff"
          onPress={() => signOut()}
        />
      </HeaderContainer>

      <ScrollView>
        <Content>
          <ButtonsContainer>
            <ButtonContent>
              <ButtonActions onPress={() => navigate('CreateEstablishment')}>
                <ButtonActionsText>Criar Estabelecimento</ButtonActionsText>
              </ButtonActions>
            </ButtonContent>
            <ButtonContent>
              <ButtonActions
                onPress={() => setSearchVisible(stateValue => !stateValue)}
              >
                <ButtonActionsText>Pesquisar</ButtonActionsText>
              </ButtonActions>
            </ButtonContent>
          </ButtonsContainer>

          {searchVisible && (
            <SearchContainer>
              <RNPickerSelect
                value={state}
                onValueChange={value => setState(value)}
                items={statesOfBrasil}
                style={{ inputAndroid: { color: 'black' } }}
              />

              <RNPickerSelect
                value={city}
                onValueChange={value => setCity(value)}
                items={citiesOfState}
                style={{ inputAndroid: { color: 'black' } }}
              />

              <SearchButtonContainer>
                <Button onPress={() => handleSearch()}>Pesquisar</Button>
              </SearchButtonContainer>
            </SearchContainer>
          )}

          <TableAdvice>Toque em um estabelecimento para editar...</TableAdvice>
          <Table
            borderStyle={{ borderColor: 'transparent', marginVertical: 32 }}
          >
            <TableWrapper
              style={{
                flexDirection: 'row',
                backgroundColor: '#00bfa630',
                borderBottomWidth: 0.7,
                borderBottomColor: '#a1a1a1',
              }}
            >
              <Cell
                data="#"
                style={{ marginHorizontal: 20, marginVertical: 16 }}
              />
              <Cell data="Nome" />
              <Cell data="Cidade/Estado" />
              <Cell
                data="..."
                style={{ marginHorizontal: 20, marginVertical: 16 }}
              />
            </TableWrapper>
            {establishments.map((establishment, index) => (
              <TableWrapper
                key={establishment.id}
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#00bfa610',
                  borderBottomWidth: 0.7,
                  borderBottomColor: '#a1a1a1',
                }}
              >
                <Cell
                  data={
                    <Text
                      style={{ paddingVertical: 6 }}
                      onPress={() =>
                        navigate('EditEstablishment', { establishment })
                      }
                    >
                      {index + 1}
                    </Text>
                  }
                  style={{ marginHorizontal: 20, marginVertical: 16 }}
                />
                <Cell
                  data={
                    <Text
                      style={{ paddingVertical: 6 }}
                      onPress={() =>
                        navigate('EditEstablishment', { establishment })
                      }
                    >
                      {establishment.name}
                    </Text>
                  }
                />
                <Cell
                  data={
                    <Text
                      style={{ paddingVertical: 6 }}
                      onPress={() =>
                        navigate('EditEstablishment', { establishment })
                      }
                    >
                      {`${establishment.address.city}/${establishment.address.state}`}
                    </Text>
                  }
                />
                <Cell
                  data={
                    // eslint-disable-next-line react/jsx-wrap-multilines
                    <Icon
                      name="trash-2"
                      size={20}
                      color="#222222"
                      onPress={() => handleDelete(establishment.id)}
                    />
                  }
                  style={{ marginHorizontal: 20, marginVertical: 16 }}
                />
              </TableWrapper>
            ))}
          </Table>
        </Content>
      </ScrollView>
    </Container>
  );
}

export default Home;
