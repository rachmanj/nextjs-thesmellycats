import dynamic from 'next/dynamic';
import { signIn, getSession } from 'next-auth/client';

import { useRouter } from 'next/router';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { errorHelper } from 'helpers/functions';
const Loader = dynamic(() => import('helpers/loader'));

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
  errorDispatcher,
  successDispatcher,
} from 'store/actions/notifications.action';

const SignIn = () => {
  const [formType, setFormType] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter;
  const dispatch = useDispatch();

  const formik = useFormik({
    // initialValues: { email: '', password: '' },
    initialValues: { email: 'oman@gmail.com', password: '12345678' },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Email is required')
        .email('This not a valid email'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: values => {
      // console.log(values);
      submitForm(values);
    },
  });

  const submitForm = async values => {
    setLoading(true);
    if (formType) {
      // register
      axios
        .post('/api/auth/register', values)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          setLoading(false);
          dispatch(errorDispatcher(error.response.data.message));
        });
    } else {
      // sign in
      const result = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result.error) {
        setLoading(false);
        dispatch(errorDispatcher(result.error));
      } else {
        setLoading(false);
        const session = await getSession();
        console.log(session);
      }
    }
  };

  const handleFormType = () => {
    setFormType(!formType);
  };
  return (
    <div className="container full_vh small top-space">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1>{formType ? 'Register' : 'Sign In'}</h1>
          <form className="mt-3" onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <TextField
                name="email"
                label="Enter your email"
                variant="filled"
                {...formik.getFieldProps('email')}
                {...errorHelper(formik, 'email')}
              />
            </div>

            <div className="form-group mt-3">
              <TextField
                name="password"
                label="Enter your password"
                variant="filled"
                type="password"
                {...formik.getFieldProps('password')}
                {...errorHelper(formik, 'password')}
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              size="small"
              className="mr-2 mt-3"
            >
              {formType ? 'Register' : 'Sign In'}
            </Button>
            <Button
              variant="contained"
              color="default"
              size="small"
              className="mx-3 mt-3"
              onClick={handleFormType}
            >
              {formType
                ? 'Already Register, click here'
                : 'Need register? Click here'}
            </Button>
          </form>
        </>
      )}
    </div>
  );
};

export default SignIn;
