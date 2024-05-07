import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  password: Yup.string().required('password is required'),
  confirmPassword: Yup.string()
    .required('password is required')
    .oneOf([Yup.ref('password')], 'your password do not match'),
});
