import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';
import * as ImagePicker from 'react-native-image-picker';
import { ScrollView } from 'react-native';

import establishmentImgDefault from '../../assets/establishment_default.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { messageAlert } from '../../utils';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/apiClient';

import {
  Container,
  Header,
  HeaderTitle,
  Content,
  TitleInputContainer,
  TitleInputText,
  EstablishmentAvatarButton,
  EstablishmentAvatar,
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
  const [avatarFile, setAvatarFile] = useState(
    {} as ImagePicker.ImagePickerResponse,
  );
  const [selectedFileUrl, setSelectedFilesUrl] = useState('');
  const { goBack, navigate } = useNavigation();
  const formRef = useRef<FormHandles>(null);

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

        if (!avatarFile) {
          messageAlert(
            'Erro no upload da foto',
            'A foto do estabelecimento é obrigatória.',
          );
          return;
        }

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
        formData.append('avatar', {
          type: 'image/jpeg',
          name: `${data.name}.jpg`,
          uri: avatarFile.uri,
        });

        await api.post('/establishments', formData);

        messageAlert(
          'Cadastro realizado',
          'Estabelecimento cadastrado com sucesso!',
        );

        setLoading(false);
        reset();
        setAvatarFile({} as ImagePicker.ImagePickerResponse);
        setSelectedFilesUrl('');
        navigate('Home');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          setLoading(false);
          return;
        }
        messageAlert(
          'Error no cadastro',
          'Ocorreu um erro na criação do estabelecimento',
        );

        setLoading(false);
      }
    },
    [avatarFile, navigate],
  );

  const handleAvatarChange = useCallback(() => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.didCancel) {
        return;
      }

      if (response.errorMessage) {
        messageAlert('Error ao atualizar seu avatar');
        return;
      }

      setAvatarFile(response);
      setSelectedFilesUrl(String(response.uri));
    });
  }, []);

  return (
    <Container>
      <Header>
        <Icon
          name="chevron-left"
          size={26}
          color="#ffffff"
          onPress={() => goBack()}
        />
        <HeaderTitle>Criar Estabelecimento</HeaderTitle>
      </Header>

      <ScrollView>
        <Content>
          <Form ref={formRef} onSubmit={handleCreateEstablishment}>
            <EstablishmentAvatarButton onPress={handleAvatarChange}>
              {selectedFileUrl ? (
                <EstablishmentAvatar source={{ uri: selectedFileUrl }} />
              ) : (
                <EstablishmentAvatar source={establishmentImgDefault} />
              )}
            </EstablishmentAvatarButton>

            <TitleInputContainer>
              <Icon name="user" size={20} color="#222222" />
              <TitleInputText>Nome</TitleInputText>
            </TitleInputContainer>
            <Input
              name="name"
              autoCompleteType="off"
              returnKeyType="next"
              keyboardType="default"
            />

            <TitleInputContainer>
              <Icon name="phone" size={20} color="#222222" />
              <TitleInputText>Telefone</TitleInputText>
            </TitleInputContainer>
            <Input name="phone" returnKeyType="next" keyboardType="phone-pad" />

            <TitleInputContainer>
              <Icon name="type" size={20} color="#222222" />
              <TitleInputText>Tipo</TitleInputText>
            </TitleInputContainer>
            <Input name="type" returnKeyType="next" />

            <TitleInputContainer>
              <Icon name="map-pin" size={20} color="#222222" />
              <TitleInputText>Nome da Rua</TitleInputText>
            </TitleInputContainer>
            <Input name="street" returnKeyType="next" />

            <TitleInputContainer>
              <Icon name="map-pin" size={20} color="#222222" />
              <TitleInputText>Número da Rua</TitleInputText>
            </TitleInputContainer>
            <Input name="street_number" returnKeyType="next" />

            <TitleInputContainer>
              <Icon name="map-pin" size={20} color="#222222" />
              <TitleInputText>Bairro</TitleInputText>
            </TitleInputContainer>
            <Input name="neighborhood" returnKeyType="next" />

            <TitleInputContainer>
              <Icon name="map-pin" size={20} color="#222222" />
              <TitleInputText>CEP</TitleInputText>
            </TitleInputContainer>
            <Input name="zipcode" returnKeyType="next" />

            <TitleInputContainer>
              <Icon name="map-pin" size={20} color="#222222" />
              <TitleInputText>Cidade</TitleInputText>
            </TitleInputContainer>
            <Input name="city" returnKeyType="next" />

            <TitleInputContainer>
              <Icon name="map-pin" size={20} color="#222222" />
              <TitleInputText>Estado</TitleInputText>
            </TitleInputContainer>
            <Input name="state" returnKeyType="next" />

            <Button
              loading={loading}
              onPress={() => formRef.current?.submitForm()}
            >
              Criar Estabelecimento
            </Button>
          </Form>
        </Content>
      </ScrollView>
    </Container>
  );
}

export default CreateEstablishment;
