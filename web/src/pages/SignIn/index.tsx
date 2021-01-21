import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiUser, FiLock } from 'react-icons/fi';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Title,
  Content,
  FormContainer,
  InputField,
  ToSignUpContainer,
  ToSignUpText,
  LinkToSignUp,
  Background,
} from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

function SignIn() {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const { push } = useHistory();
  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string().email().required('Usuário obrigatório'),
          password: Yup.string()
            .required('Senha obrigatória')
            .min(6, 'Senha deve ter no mínimo 6 caracteres'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        setLoading(false);
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
          description: 'Ocorreu um erro ao fazer login cheque as credenciais',
        });

        setLoading(false);
      }
    },
    [addToast, signIn]
  );

  return (
    <Container>
      <Background />

      <Content>
        <FormContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Title>Gerenciador de Estabelecimentos</Title>

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

            <Button type="submit" loading={loading} disabled={loading}>
              Entrar
            </Button>

            <ToSignUpContainer>
              <ToSignUpText>
                Não tem uma conta ainda?{' '}
                <LinkToSignUp to="/signup">Criar Conta</LinkToSignUp>
              </ToSignUpText>
            </ToSignUpContainer>
          </Form>
        </FormContainer>
      </Content>
    </Container>
  );
}

export default SignIn;
