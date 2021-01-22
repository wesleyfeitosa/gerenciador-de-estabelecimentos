import React, { useEffect, useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

import api from '../../services/apiClient';
import establishmentImgDefault from '../../assets/establishment_default.png';
import Header from '../../components/Header';

import {
  Container,
  Content,
  EstablishmentTable,
  TableHeaderLine,
  TableLine,
} from './styles';

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

function Home() {
  const [establishments, setEstablishments] = useState<EstablishmentData[]>([]);

  useEffect(() => {
    api.get('/establishments').then((response) => {
      setEstablishments(response.data);
    });
  }, []);

  return (
    <Container>
      <Header />

      <Content>
        {establishments.length < 1 ? (
          <div>Nenhum estabelecimento cadastrado no momento...</div>
        ) : (
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
                  </td>
                  <td>
                    <span>{establishment.name}</span>
                  </td>
                  <td>
                    <span>{establishment.phone}</span>
                  </td>
                  <td>
                    <span>{`${establishment.address.city}/${establishment.address.state}`}</span>
                  </td>
                  <td>
                    <FiEdit size={20} color="#00bfa6" />
                    <FiTrash2
                      size={20}
                      color="#00bfa6"
                      style={{ marginLeft: '14px' }}
                    />
                  </td>
                </TableLine>
              ))}
            </tbody>
          </EstablishmentTable>
        )}
      </Content>
    </Container>
  );
}

export default Home;
