import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";

import { Navigate } from "react-router-dom";
import styles from "./Login.module.scss";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";


export const Login = () => {

  const isAuth = useSelector(selectIsAuth);
  
  const { register, handleSubmit, setError, formState: {errors, isValid} } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });
  console.log(isAuth);
  
  const dispatch = useDispatch();

 

  const onSubmit = async  (value) => {
    const data = await dispatch(fetchAuth(value));

    if(!data.payload){

    }
    if('token' in data.payload){
      window.localStorage.setItem('token', data.payload.token);
    }else {
      alert('не удалось')
    }
  };
  if(isAuth) {
    return <Navigate to="/"/>
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
    <form onSubmit={handleSubmit(onSubmit)}>
    <TextField
        className={styles.field}
        label="E-Mail"
        error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        {...register('email',{ required: 'Укажите почту'})}
        fullWidth
      />
      <TextField 
       className={styles.field}
       label="Пароль" 
       error={Boolean(errors.email?.message)}
       helperText={errors.password?.message}
      {...register('password', { required: 'Укажите почту'})}
      fullWidth />



      <Button type="submit" size="large" variant="contained" fullWidth>
        Войти
      </Button>
    </form>
    </Paper>
  );
};
