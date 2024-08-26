import React from 'react';
import {
  BodyBox,
  FormBox,
  LoginContainer,
  LoginForm,
  Logo,
  SignInButton
} from './_styles';
import { Link, TextField, Typography } from '@mui/material';
import { useMutation } from '@apollo/client';
import { LOGIN } from './_graphql';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useTranslation } from '../../../hooks/useTranslation';
import { AlertMessage } from '../../alert';
import { NextSeo } from 'next-seo';
import { useFormik } from 'formik';
import * as yup from 'yup';

export default function Login() {
  const { t } = useTranslation();
  const [alertOpen, setAlertOpen] = React.useState<boolean>(false);
  const [alertSuccess, setAlertSuccess] = React.useState<boolean>(false);

  const [login] = useMutation(LOGIN);
  const router = useRouter();

  const validationSchema = yup.object({
    emailAddress: yup
      .string()
      .email(t('login.validations.emailAddress.email'))
      .required(t('login.validations.emailAddress.required')),
    password: yup
      .string()
      .min(8, t('login.validations.password.minCharacters'))
      .required(t('login.validations.password.required'))
  });

  const formik = useFormik({
    initialValues: {
      emailAddress: '',
      password: ''
    },
    validationSchema,
    onSubmit: (values) => {
      try {
        login({ variables: values })
          .then((result) => {
            setAlertSuccess(true);
            Cookies.set('user', JSON.stringify(result?.data?.login));
            router.replace('/data-generator');
          })
          .catch(() => {
            setAlertSuccess(false);
          })
          .finally(() => {
            setAlertOpen(true);
          });

        formik.resetForm();
      } catch (err) {}
    }
  });

  return (
    <>
      <NextSeo title={t('header.mergeTitle') + ' - ' + t('general.signIn')} />
      <LoginContainer>
        <LoginForm>
          <FormBox>
            <Typography sx={{ fontSize: 40 }} component="h1">
              {t('general.signIn')}
            </Typography>
            <Logo src={'/assets/logo.png'} />
            <BodyBox>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  size="small"
                  margin="normal"
                  required
                  fullWidth
                  id="emailAddress"
                  label={t('login.emailAddress')}
                  name="emailAddress"
                  autoComplete="emaemailAddressil"
                  autoFocus
                  value={formik.values.emailAddress}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.emailAddress &&
                    Boolean(formik.errors.emailAddress)
                  }
                  helperText={
                    formik.touched.emailAddress && formik.errors.emailAddress
                  }
                />
                <TextField
                  size="small"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label={t('login.password')}
                  type="password"
                  id="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  autoComplete="current-password"
                />
                <Typography sx={{ marginTop: 1 }} color={'rgb(98 91 91)'}>
                  {t('login.wouldYouLikeToRegister')}&nbsp;
                  <Link href="/sign-up">{t('general.signUp')}</Link>
                </Typography>

                <SignInButton type="submit" fullWidth>
                  {t('general.signIn').charAt(-1).toLocaleLowerCase() +
                    t('general.signIn').slice(0)}
                </SignInButton>
              </form>
            </BodyBox>
          </FormBox>
        </LoginForm>
      </LoginContainer>
      <AlertMessage
        openState={alertOpen}
        description={
          alertSuccess ? t('login.successMessage') : t('login.errorMessage')
        }
        alertSuccess={alertSuccess}
        onClose={() => setAlertOpen(false)}
      ></AlertMessage>
    </>
  );
}
