import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Keyboard, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Feather';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationErrors';
import { messageAlert } from '../../utils';

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

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn = () => {
  const navigation = useNavigation();
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { signIn } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

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

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email é obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string()
            .min(6, 'Senha tem o mínimo de 6 caracteres')
            .required('Senha é obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        setLoading(false);
        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        setLoading(false);
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        if (String(err).includes('401')) {
          messageAlert(
            'Falha na autenticação',
            'Email e senha incorretos, por favor tente novamente.',
          );

          return;
        }

        messageAlert(
          'Error na autenticação',
          'Ocorreu um error ao fazer login cheque as credenciais',
        );
      }
    },
    [signIn],
  );

  return (
    <Container>
      <Content>
        <Title>Gerenciador de Estabelecimentos</Title>

        <Form ref={formRef} onSubmit={handleSignIn}>
          <TitleInputContainer>
            <Icon name="at-sign" size={20} color="#222222" />
            <TitleInputText>E-mail</TitleInputText>
          </TitleInputContainer>
          <Input
            ref={emailInputRef}
            name="email"
            autoCompleteType="off"
            autoCapitalize="none"
            returnKeyType="next"
            keyboardType="email-address"
            onSubmitEditing={() => {
              passwordInputRef.current?.focus();
            }}
          />

          <TitleInputContainer>
            <Icon name="lock" size={20} color="#222222" />
            <TitleInputText>Senha</TitleInputText>
          </TitleInputContainer>
          <Input
            ref={passwordInputRef}
            name="password"
            returnKeyType="next"
            secureTextEntry
            autoCompleteType="off"
            onSubmitEditing={() => {
              formRef.current?.submitForm();
            }}
          />

          <Button
            loading={loading}
            onPress={() => formRef.current?.submitForm()}
          >
            Entrar
          </Button>
        </Form>

        <ForgotPasswordText isKeyboardVisible={isKeyboardVisible}>
          Não tem uma conta ainda?{' '}
          <CreateAccountText onPress={() => navigation.navigate('SignUp')}>
            Criar Conta
          </CreateAccountText>
        </ForgotPasswordText>

        {/* {isLoading && <Loading />} */}
      </Content>
    </Container>
  );
};

export default SignIn;
