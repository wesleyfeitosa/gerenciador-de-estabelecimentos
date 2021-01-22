import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiUser, FiLock } from 'react-icons/fi';
import * as Yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';

import {
  Container,
  Title,
  Content,
  FormContainer,
  InputField,
  ToSignInContainer,
  ToSignInText,
  LinkToSignIn,
  Background,
} from './styles';
import api from '../../services/apiClient';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

function SignUp() {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
          password_confirmation: Yup.string()
            .min(6, 'Senha deve ter no mínimo 6 dígitos')
            .oneOf(
              [Yup.ref('password'), undefined],
              'As senhas devem ser iguais'
            ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/sessions/register', {
          name: data.name,
          email: data.email,
          password: data.password,
        });

        addToast({
          type: 'success',
          title: 'Cadastro realizado',
          description:
            'Você já pode fazer o seu logon no Gerenciamento de Estabelecimentos!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          setLoading(false);
          return;
        }

        addToast({
          type: 'error',
          title: 'Error no cadastro',
          description:
            'Ocorreu um erro ao fazer o cadastro cheque as credenciais',
        });

        setLoading(false);
      }
    },
    [addToast]
  );

  return (
    <Container>
      <Content>
        <FormContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Title>Gerenciador de Estabelecimentos</Title>

            <InputField>
              <span>Nome</span>
              <Input
                name="name"
                type="text"
                icon={FiUser}
                placeholder="Insira seu nome"
              />
            </InputField>

            <InputField>
              <span>E-mail</span>
              <Input
                name="email"
                type="text"
                icon={FiUser}
                placeholder="Insira seu e-mail"
              />
            </InputField>

            <InputField>
              <span>Senha</span>
              <Input
                name="password"
                type="password"
                icon={FiLock}
                placeholder="Insira sua senha"
              />
            </InputField>

            <InputField>
              <span>Confirmação da Senha</span>
              <Input
                name="password_confirmation"
                type="password"
                icon={FiLock}
                placeholder="Insira sua senha novamente"
              />
            </InputField>

            <Button type="submit" loading={loading} disabled={loading}>
              Criar Usuário
            </Button>

            <ToSignInContainer>
              <ToSignInText>
                Já tem uma conta cadastrada?{' '}
                <LinkToSignIn to="/singin">Fazer Logon</LinkToSignIn>
              </ToSignInText>
            </ToSignInContainer>
          </Form>
        </FormContainer>
      </Content>

      <Background />
    </Container>
  );
}

export default SignUp;
