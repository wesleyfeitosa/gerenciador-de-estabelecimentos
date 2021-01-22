import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/apiClient';
import { messageAlert } from '../../utils';
import getValidationErrors from '../../utils/getValidationErrors';

import {
  Container,
  Title,
  Content,
  TitleInputContainer,
  TitleInputText,
  ForgotPasswordText,
  Loading,
  CreateAccountText,
} from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

function SignUp() {
  const navigation = useNavigation();
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        setIsLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
          password_confirmation: Yup.string()
            .min(6, 'Senha deve ter no mínimo 6 dígitos')
            .oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/sessions/register', {
          name: data.name,
          email: data.email,
          password: data.password,
        });

        messageAlert('Usuário criado', 'Usuário criado com sucesso!');
        setIsLoading(false);
        navigation.navigate('SignIn');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          setIsLoading(false);
          return;
        }

        messageAlert(
          'Erro na criação de usuário',
          'Ocorreu um erro na criação de usuário, por favor tente novamente!',
        );
      }
    },
    [navigation],
  );

  return (
    <Container>
      <Content>
        <Title>Gerenciador de Estabelecimentos</Title>

        <Form ref={formRef} onSubmit={handleSignUp}>
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
            <TitleInputText>E-mail</TitleInputText>
          </TitleInputContainer>
          <Input
            name="email"
            autoCompleteType="off"
            autoCapitalize="none"
            returnKeyType="next"
            keyboardType="email-address"
          />

          <TitleInputContainer>
            <Icon name="lock" size={20} color="#222222" />
            <TitleInputText>Senha</TitleInputText>
          </TitleInputContainer>
          <Input
            name="password"
            returnKeyType="next"
            secureTextEntry
            autoCompleteType="off"
          />

          <TitleInputContainer>
            <Icon name="lock" size={20} color="#222222" />
            <TitleInputText>Confirmação da Senha</TitleInputText>
          </TitleInputContainer>
          <Input
            name="password"
            returnKeyType="next"
            secureTextEntry
            autoCompleteType="off"
          />

          <Button onPress={() => formRef.current?.submitForm()}>
            Criar Usuário
          </Button>
        </Form>

        <ForgotPasswordText isKeyboardVisible={isKeyboardVisible}>
          Já tem uma conta?{' '}
          <CreateAccountText onPress={() => navigation.navigate('SignIn')}>
            Fazer Logon
          </CreateAccountText>
        </ForgotPasswordText>

        {/* {isLoading && <Loading />} */}
      </Content>
    </Container>
  );
}

export default SignUp;
