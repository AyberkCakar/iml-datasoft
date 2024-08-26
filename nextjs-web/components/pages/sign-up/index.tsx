import React from 'react';
import {
  SignUpContainer,
  SignUpForm,
  SignUpButton,
  FormBox,
  BodyBox,
  Logo
} from './_styles';
import { Link, TextField, Typography } from '@mui/material';
import { useMutation } from '@apollo/client';
import { SIGN_UP } from './_graphql';
import { useRouter } from 'next/router';
import { useTranslation } from '../../../hooks/useTranslation';
import { AlertMessage } from '../../alert';
import { NextSeo } from 'next-seo';
import { useFormik } from 'formik';
import * as yup from 'yup';

export default function SignUp() {
  const { t } = useTranslation();
  const [alertOpen, setAlertOpen] = React.useState<boolean>(false);
  const [alertSuccess, setAlertSuccess] = React.useState<boolean>(false);

  const [signUp] = useMutation(SIGN_UP);
  const router = useRouter();

  const validationSchema = yup.object({
    firstName: yup
      .string()
      .required(t('signUp.validations.firstName.required')),
    lastName: yup.string().required(t('signUp.validations.lastName.required')),
    emailAddress: yup
      .string()
      .email(t('signUp.validations.emailAddress.email'))
      .required(t('signUp.validations.emailAddress.required')),
    password: yup
      .string()
      .min(8, t('signUp.validations.password.minCharacters'))
      .required(t('signUp.validations.password.required'))
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: ''
    },
    validationSchema,
    onSubmit: (values) => {
      try {
        signUp({ variables: values })
          .then((result) => {
            setAlertSuccess(true);
            localStorage.setItem('user', result.data?.signUp);
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
      <NextSeo title={t('header.mergeTitle') + ' - ' + t('general.signUp')} />
      <SignUpContainer>
        <SignUpForm>
          <FormBox>
            <Typography sx={{ fontSize: 40 }} component="h1">
              {t('general.signUp')}
            </Typography>
            <Logo src={'/assets/logo.png'} />
            <BodyBox>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  size="small"
                  margin="normal"
                  required
                  fullWidth
                  id="firstName"
                  label={t('signUp.firstName')}
                  name="firstName"
                  autoComplete="firstName"
                  autoFocus
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
                <TextField
                  size="small"
                  margin="normal"
                  required
                  fullWidth
                  id="lastName"
                  label={t('signUp.lastName')}
                  name="lastName"
                  autoComplete="lastName"
                  autoFocus
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
                <TextField
                  size="small"
                  margin="normal"
                  required
                  fullWidth
                  id="emailAddress"
                  label={t('signUp.emailAddress')}
                  name="emailAddress"
                  autoComplete="emailAddress"
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
                  label={t('signUp.password')}
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
                <Typography sx={{ marginTop: 1 }} color={'rgb(98 91 91)'}>
                  {t('signUp.alreadyHaveRegister')}&nbsp;
                  <Link href="/login">{t('general.signIn')}</Link>
                </Typography>

                <SignUpButton type="submit" fullWidth variant="contained">
                  {t('general.signUp').charAt(-1).toLocaleLowerCase() +
                    t('general.signUp').slice(0)}
                </SignUpButton>
              </form>
            </BodyBox>
          </FormBox>
        </SignUpForm>
      </SignUpContainer>
      <AlertMessage
        openState={alertOpen}
        description={
          alertSuccess ? t('signUp.successMessage') : t('signUp.errorMessage')
        }
        alertSuccess={alertSuccess}
        onClose={() => setAlertOpen(false)}
      ></AlertMessage>
    </>
  );
}
