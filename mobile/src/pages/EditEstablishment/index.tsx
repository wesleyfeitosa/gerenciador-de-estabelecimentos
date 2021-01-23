import React, { useCallback, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';
import * as ImagePicker from 'react-native-image-picker';
import { ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { Text } from 'react-native';
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
import { RootStackParamList } from '../../routes/app.routes';

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
  street_number: string;
  neighborhood: string;
  zipcode: string;
  city: string;
  state: string;
}

type Props = StackScreenProps<RootStackParamList, 'EditEstablishment'>;

function EditEstablishment({ navigation, route }: Props) {
  const { goBack, navigate } = navigation;
  const {
    params: { establishment },
  } = route;
  const [loading, setLoading] = useState(false);
  const [selectedFileUrl, setSelectedFilesUrl] = useState(
    establishment.avatar_url,
  );
  const formRef = useRef<FormHandles>(null);

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

        messageAlert(
          'Estabelecimento atualizado',
          'Estabelecimento atualizado com sucesso!',
        );

        setLoading(false);
        reset();
        navigate('Home');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          setLoading(false);
          return;
        }

        messageAlert(
          'Erro na atualização',
          'Ocorreu um erro na atualização do estabelecimento',
        );

        setLoading(false);
      }
    },
    [navigate, establishment.id],
  );

  const handleAvatarChange = useCallback(async () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo' }, async response => {
      if (response.didCancel) {
        return;
      }

      if (response.errorMessage) {
        messageAlert('Error ao atualizar seu avatar');
        return;
      }

      const formData = new FormData();

      formData.append('avatar', {
        type: 'image/jpeg',
        name: `${establishment.name}.jpg`,
        uri: response.uri,
      });

      await api.patch(`/avatar/${establishment.id}`, formData);

      setSelectedFilesUrl(String(response.uri));
    });
  }, [establishment]);

  return (
    <Container>
      <Header>
        <Icon
          name="chevron-left"
          size={26}
          color="#ffffff"
          onPress={() => goBack()}
        />
        <HeaderTitle>Editar Estabelecimento</HeaderTitle>
      </Header>

      <ScrollView>
        <Content>
          {establishment ? (
            <Form
              ref={formRef}
              onSubmit={handleEditEstablishment}
              initialData={{
                name: establishment.name,
                phone: establishment.phone,
                type: establishment.type,
                street: establishment.address.street,
                street_number: String(establishment.address.street_number),
                neighborhood: establishment.address.neighborhood,
                zipcode: establishment.address.zipcode,
                city: establishment.address.city,
                state: establishment.address.state,
              }}
            >
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
                <Icon name="at-sign" size={20} color="#222222" />
                <TitleInputText>Telefone</TitleInputText>
              </TitleInputContainer>
              <Input
                name="phone"
                returnKeyType="next"
                keyboardType="phone-pad"
              />

              <TitleInputContainer>
                <Icon name="lock" size={20} color="#222222" />
                <TitleInputText>Tipo</TitleInputText>
              </TitleInputContainer>
              <Input name="type" returnKeyType="next" />

              <TitleInputContainer>
                <Icon name="lock" size={20} color="#222222" />
                <TitleInputText>Nome da Rua</TitleInputText>
              </TitleInputContainer>
              <Input name="street" returnKeyType="next" />

              <TitleInputContainer>
                <Icon name="lock" size={20} color="#222222" />
                <TitleInputText>Número da Rua</TitleInputText>
              </TitleInputContainer>
              <Input name="street_number" returnKeyType="next" />

              <TitleInputContainer>
                <Icon name="lock" size={20} color="#222222" />
                <TitleInputText>Bairro</TitleInputText>
              </TitleInputContainer>
              <Input name="neighborhood" returnKeyType="next" />

              <TitleInputContainer>
                <Icon name="lock" size={20} color="#222222" />
                <TitleInputText>CEP</TitleInputText>
              </TitleInputContainer>
              <Input name="zipcode" returnKeyType="next" />

              <TitleInputContainer>
                <Icon name="lock" size={20} color="#222222" />
                <TitleInputText>Cidade</TitleInputText>
              </TitleInputContainer>
              <Input name="city" returnKeyType="next" />

              <TitleInputContainer>
                <Icon name="lock" size={20} color="#222222" />
                <TitleInputText>Estado</TitleInputText>
              </TitleInputContainer>
              <Input name="state" returnKeyType="next" />

              <Button
                loading={loading}
                onPress={() => formRef.current?.submitForm()}
              >
                Atualizar Estabelecimento
              </Button>
            </Form>
          ) : (
            <Text>Carregando...</Text>
          )}
        </Content>
      </ScrollView>
    </Container>
  );
}

export default EditEstablishment;
