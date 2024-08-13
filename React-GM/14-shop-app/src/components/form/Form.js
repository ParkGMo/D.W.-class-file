import React from "react";
import styles from "./Form.module.scss";
import { useForm } from "react-hook-form";

function Form({ title, getDataForm, firebaseError }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });
  // trigger 조건(submit 되기 이전에 실행) = { mode: "onChange", }:변할때마다 error를 확인
  // console.log(errors);

  const userEmail = {
    required: "필수 필드입니다.",
  };

  const userPassword = {
    required: "필수 필드입니다.",
    minLength: { value: 6, message: "최소 6자 이상 입력하세요." },
  };

  const onSubmit = ({ email, password }) => {
    // email과  password를 객체로 받을 수 있다.
    // console.log(submitObj);
    getDataForm(email, password);
    reset(); // form 초기화
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          type="email"
          placeholder="Email"
          {...register("email", userEmail)}
        />
        {errors?.email && (
          <div>
            <span className={styles.form_error}>{errors.email.message}</span>
          </div>
        )}
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          {...register("password", userPassword)}
        />
        {errors?.email && (
          <div>
            <span className={styles.form_error}>{errors.password.message}</span>
          </div>
        )}
      </div>
      <button>{title}</button>
      {firebaseError && (
        <span className={styles.form_error}>{firebaseError}</span>
      )}
    </form>
  );
}

export default Form;
