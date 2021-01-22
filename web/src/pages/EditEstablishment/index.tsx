import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiUser, FiLock, FiCamera } from 'react-icons/fi';
import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';

import Header from '../../components/Header';
import Button from '../../components/Button';
import Input from '../../components/Input';
import establishmentImgDefault from '../../assets/establishment_default.png';
import { useToast } from '../../hooks/toast';
import api from '../../services/apiClient';
import getValidationErrors from '../../utils/getValidationErrors';

import {
  Container,
  Content,
  FormContainer,
  InputsContainer,
  AvatarContainer,
  AvatarInput,
  TitlePage,
  InputField,
  ButtonContainer,
} from './styles';

interface EstablishmentParam {
  establishment: {
    id: string;
    name: string;
    phone: string;
    type: string;
    address: {
      street: string;
      street_number: number;
      neighborhood: string;
      zipcode: string;
      city: string;
      state: string;
    };
    avatar: string;
    avatar_url: string;
  };
}

interface EditEstablishmentFormData {
  establishment_id: string;
  name: string;
  phone: string;
  type: string;
  street: string;
  street_number: number;
  neighborhood: string;
  zipcode: string;
  city: string;
  state: string;
}

function EditEstablishment() {
  const { state } = useLocation<EstablishmentParam>();
  const [establishment] = useState(state.establishment);

  const [loading, setLoading] = useState(false);
  const [selectedFileUrl, setSelectedFilesUrl] = useState(
    establishment.avatar_url
  );
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { push } = useHistory();

  const handleEditEstablishment = useCallback(
    async (data: EditEstablishmentFormData, { reset }) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          phone: Yup.string().required('Telefone obrigatório'),
          type: Yup.string().required('Tipo do estabelecimento obrigatório'),
          street: Yup.string().required('Endereço obrigatório'),
          street_number: Yup.string().required('Número da rua obrigatório'),
          neighborhood: Yup.string().required('Bairro obrigatório'),
          zipcode: Yup.string().required('CEP obrigatório'),
          city: Yup.string().required('Cidade obrigatório'),
          state: Yup.string().required('Estado obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        data.establishment_id = establishment.id;

        await api.put('/establishments', data);

        addToast({
          type: 'success',
          title: 'Estabelecimento atualizado',
          description: 'Estabelecimento atualizado com sucesso!',
        });

        setLoading(false);
        reset();
        push('/home');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          setLoading(false);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description: 'Ocorreu um erro na atualização do estabelecimento',
        });

        setLoading(false);
      }
    },
    [addToast, push, establishment.id]
  );

  const handleAvatarChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const formData = new FormData();
        const file = e.target.files[0];

        const fileUrl = URL.createObjectURL(file);

        formData.append('avatar', file);

        await api.patch(`/avatar/${establishment.id}`, formData);

        setSelectedFilesUrl(fileUrl);

        addToast({
          type: 'success',
          title: 'Avatar atualizado',
          description: 'Avatar atualizado com sucesso!',
        });
      }
    },
    [addToast, establishment.id]
  );

  return (
    <Container>
      <Header />

      <Content>
        <TitlePage>Edite o estabelecimento aqui</TitlePage>

        <FormContainer>
          <Form
            ref={formRef}
            onSubmit={handleEditEstablishment}
            initialData={{
              name: establishment.name,
              phone: establishment.phone,
              type: establishment.type,
              street: establishment.address.street,
              street_number: establishment.address.street_number,
              neighborhood: establishment.address.neighborhood,
              zipcode: establishment.address.zipcode,
              city: establishment.address.city,
              state: establishment.address.state,
            }}
          >
            <InputsContainer>
              <AvatarContainer>
                <AvatarInput>
                  <img
                    src={selectedFileUrl || establishmentImgDefault}
                    alt="Avatar do Estabelecimento"
                  />
                  <label htmlFor="avatar">
                    <FiCamera />
                    <input
                      type="file"
                      id="avatar"
                      onChange={handleAvatarChange}
                    />
                  </label>
                </AvatarInput>
              </AvatarContainer>

              <InputField>
                <span>Nome</span>
                <Input
                  name="name"
                  type="text"
                  icon={FiUser}
                  placeholder="Insira o nome"
                />
              </InputField>

              <InputField>
                <span>Telefone</span>
                <Input
                  name="phone"
                  type="text"
                  maxLength={14}
                  icon={FiLock}
                  placeholder="Insira o telefone"
                />
              </InputField>

              <InputField>
                <span>Tipo</span>
                <Input
                  name="type"
                  type="text"
                  icon={FiLock}
                  placeholder="Insira o tipo"
                />
              </InputField>
            </InputsContainer>

            <InputsContainer>
              <InputField>
                <span>Rua</span>
                <Input
                  name="street"
                  type="text"
                  icon={FiUser}
                  placeholder="Insira o endereço"
                />
              </InputField>

              <InputField>
                <span>Número da rua</span>
                <Input
                  name="street_number"
                  type="text"
                  icon={FiLock}
                  placeholder="Insira o número da rua"
                />
              </InputField>

              <InputField>
                <span>Bairro</span>
                <Input
                  name="neighborhood"
                  type="text"
                  icon={FiLock}
                  placeholder="Insira o Bairro"
                />
              </InputField>

              <InputField>
                <span>CEP</span>
                <Input
                  name="zipcode"
                  type="text"
                  icon={FiUser}
                  placeholder="Insira o CEP"
                />
              </InputField>

              <InputField>
                <span>Cidade</span>
                <Input
                  name="city"
                  type="text"
                  icon={FiLock}
                  placeholder="Insira a cidade em que é localizada"
                />
              </InputField>

              <InputField>
                <span>Estado</span>
                <Input
                  name="state"
                  type="text"
                  icon={FiLock}
                  placeholder="Insira o estado em que é localizado"
                />
              </InputField>
            </InputsContainer>
          </Form>
        </FormContainer>
        <ButtonContainer>
          <Button
            type="submit"
            onClick={() => formRef.current?.submitForm()}
            loading={loading}
            disabled={loading}
          >
            Editar Estabelecimento
          </Button>
        </ButtonContainer>
      </Content>
    </Container>
  );
}

export default EditEstablishment;
