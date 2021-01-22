import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

import { Link } from 'react-router-dom';
import api from '../../services/apiClient';
import establishmentImgDefault from '../../assets/establishment_default.png';
import estadosECidades from '../../assets/estados-cidades.json';
import Header from '../../components/Header';

import {
  Container,
  Content,
  SearchContainer,
  EstablishmentTable,
  TableHeaderLine,
  TableLine,
} from './styles';
import { useToast } from '../../hooks/toast';

interface EstablishmentData {
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

interface StateAndCitiesData {
  estados: { sigla: string; nome: string; cidades: string[] }[];
}

function Home() {
  const [establishments, setEstablishments] = useState<EstablishmentData[]>([]);
  const { addToast } = useToast();

  const estadoECidadesBrasil: StateAndCitiesData = estadosECidades;
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  useEffect(() => {
    api.get('/establishments').then((response) => {
      setEstablishments(response.data);
    });
  }, []);

  const statesOfBrasil = useMemo(() => {
    const result = [
      'Selecione um Estado',
      ...estadoECidadesBrasil.estados.map((value) => value.nome),
    ];
    return result;
  }, [estadoECidadesBrasil.estados]);

  const citiesOfState = useMemo(() => {
    const result = [
      'Selecione uma cidade',
      ...(estadoECidadesBrasil.estados.find((value) => value.nome === state)
        ?.cidades || []),
    ];

    return result;
  }, [estadoECidadesBrasil.estados, state]);

  const handleSearch = useCallback(async () => {
    if (city === 'Selecione uma cidade' || state === 'Selecione um Estado') {
      const response = await api.get('/establishments');

      setEstablishments(response.data);

      return;
    }

    const response = await api.get<EstablishmentData[]>(
      `/search?city=${city}&state=${state}`
    );

    setEstablishments(response.data);
  }, [city, state]);

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await api.delete(`/establishments/${id}`);

        setEstablishments(establishments.filter((value) => value.id !== id));

        addToast({
          type: 'success',
          title: 'Estabelecimento removido',
          description: 'Estabelecimento removido com sucesso!',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na remoção',
          description: 'Ocorreu um erro na remoção do estabelecimento',
        });
      }
    },
    [addToast, establishments]
  );

  return (
    <Container>
      <Header />

      <Content>
        {establishments.length < 1 ? (
          <div>Nenhum estabelecimento cadastrado no momento...</div>
        ) : (
          <>
            <SearchContainer>
              <select
                name="states"
                id="states"
                onChange={(e) => setState(e.target.value)}
                value={state}
              >
                {statesOfBrasil.map((estado) => (
                  <option key={estado} value={estado}>
                    {estado}
                  </option>
                ))}
              </select>

              <select
                name="cities"
                id="cities"
                onChange={(e) => setCity(e.target.value)}
                value={city}
              >
                {citiesOfState.map((cidade) => (
                  <option key={cidade} value={cidade}>
                    {cidade}
                  </option>
                ))}
              </select>

              <button type="button" onClick={() => handleSearch()}>
                Pesquisar
              </button>
            </SearchContainer>

            <EstablishmentTable>
              <thead>
                <TableHeaderLine>
                  <th>#</th>
                  <th>Avatar</th>
                  <th>Nome</th>
                  <th>Telefone</th>
                  <th>Cidade/Estado</th>
                  <th>...</th>
                </TableHeaderLine>
              </thead>

              <tbody>
                {establishments.map((establishment, index) => (
                  <TableLine key={establishment.id}>
                    <td>
                      <span>{index + 1}</span>
                    </td>
                    <td>
                      <Link
                        to={{
                          pathname: '/edit-establishment',
                          state: { establishment },
                        }}
                        style={{ textDecoration: 'none', color: '#222222' }}
                      >
                        {establishment.avatar_url ? (
                          <img
                            src={establishment.avatar_url}
                            alt={establishment.name}
                          />
                        ) : (
                          <img
                            src={establishmentImgDefault}
                            alt={establishment.name}
                          />
                        )}
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={{
                          pathname: '/edit-establishment',
                          state: { establishment },
                        }}
                        style={{ textDecoration: 'none', color: '#222222' }}
                      >
                        <span>{establishment.name}</span>
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={{
                          pathname: '/edit-establishment',
                          state: { establishment },
                        }}
                        style={{ textDecoration: 'none', color: '#222222' }}
                      >
                        <span>{establishment.phone}</span>
                      </Link>
                    </td>
                    <td>
                      <span>{`${establishment.address.city}/${establishment.address.state}`}</span>
                    </td>
                    <td>
                      <Link
                        to={{
                          pathname: '/edit-establishment',
                          state: { establishment },
                        }}
                      >
                        <FiEdit size={20} color="#00bfa6" />
                      </Link>
                      <FiTrash2
                        size={20}
                        color="#00bfa6"
                        style={{ marginLeft: '14px', cursor: 'pointer' }}
                        onClick={() => handleDelete(establishment.id)}
                      />
                    </td>
                  </TableLine>
                ))}
              </tbody>
            </EstablishmentTable>
          </>
        )}
      </Content>
    </Container>
  );
}

export default Home;
