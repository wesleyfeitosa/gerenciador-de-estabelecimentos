import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiUser, FiLock, FiCamera } from 'react-icons/fi';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

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

interface CreateEstablishmentFormData {
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

function CreateEstablishment() {
  const [loading, setLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState({} as File);
  const [selectedFileUrl, setSelectedFilesUrl] = useState('');
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { push } = useHistory();

  const handleCreateEstablishment = useCallback(
    async (data: CreateEstablishmentFormData, { reset }) => {
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

        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('phone', data.phone);
        formData.append('type', data.type);
        formData.append('street', data.street);
        formData.append('street_number', String(data.street_number));
        formData.append('neighborhood', data.neighborhood);
        formData.append('zipcode', data.zipcode);
        formData.append('city', data.city);
        formData.append('state', data.state);
        if (avatarFile) formData.append('avatar', avatarFile);

        await api.post('/establishments', data);

        addToast({
          type: 'success',
          title: 'Cadastro realizado',
          description: 'Estabelecimento cadastrado com sucesso!',
        });

        setLoading(false);
        reset();
        setAvatarFile({} as File);
        setSelectedFilesUrl('');
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
          title: 'Error na autenticação',
          description: 'Ocorreu um erro na criação do estabelecimento',
        });

        setLoading(false);
      }
    },
    [addToast, push, avatarFile]
  );

  const handleAvatarChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const fileUrl = URL.createObjectURL(file);

      setAvatarFile(file);
      setSelectedFilesUrl(fileUrl);
    }
  }, []);

  return (
    <Container>
      <Header />

      <Content>
        <TitlePage>Cadastre um novo estabelecimento aqui</TitlePage>

        <FormContainer>
          <Form ref={formRef} onSubmit={handleCreateEstablishment}>
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
            Criar Estabelecimento
          </Button>
        </ButtonContainer>
      </Content>
    </Container>
  );
}

export default CreateEstablishment;
