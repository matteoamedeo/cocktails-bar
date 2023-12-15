import React, { useEffect, useState } from "react";
import banner from "../static/images/login-banner.png";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
// import { createData } from "../redux/reducers/api-reducer";
import { apiCreateUser, fetchAuth } from "../redux/reducers/auth-reducer";
import RedirectSpinner from "../components/RedirectSpinner";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state);
  const [serverMessage, setServerMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("*Questo campo è obbligatorio"),
      lastName: Yup.string().required("*Questo campo è obbligatorio"),
      email: Yup.string().required("*Questo campo è obbligatorio"),
      password: Yup.string()
        .matches(
          /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/,
          "La password deve contenere almeno 8 caratteri, una lettera maiuscola, un numero e un carattere speciale"
        )
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Le password devono essere uguali")
        .required("Questo campo è obbligatorio"),
    }),
    onSubmit: (values) => {
      dispatch(apiCreateUser("/account/createAccount", values));
    },
  });

  useEffect(() => {
    if (auth.created.status) {
      console.log(formik);
      dispatch(fetchAuth("/account/login", formik.values));

      // navigate("/tutti-i-cocktail");
    } else {
      setServerMessage(auth.created.msg);
    }
  }, [auth.created]);

  useEffect(() => {
    if (auth.redirect) {
      if (auth.lastAttemptedUrl) {
        navigate(auth.lastAttemptedUrl.pathname);
      } else {
        navigate("/tutti-i-cocktail");
      }
    }
  }, [auth.redirect]);

  return (
    <div className="register-wrapper container pt-5 mt-sm-5">
      {auth.loading ? <RedirectSpinner /> : ""}

      <h1 className="text-white col-12 col-md-8 py-5 m-auto">
        Crea il tuo account
      </h1>
      <form
        className="col-12 col-md-8 m-auto row"
        onSubmit={formik.handleSubmit}
      >
        <div className="form-group py-3 col-sm-6">
          <input
            type="firstName"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Nome"
            id="firstName"
            name="firstName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div className="invalid-feedback d-block">
              {formik.errors.firstName}
            </div>
          ) : null}
        </div>
        <div className="form-group py-3 col-sm-6">
          <input
            type="lastName"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Cognome"
            id="lastName"
            name="lastName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div className="invalid-feedback d-block">
              {formik.errors.lastName}
            </div>
          ) : null}
        </div>
        <div className="form-group py-3">
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="invalid-feedback d-block">
              {formik.errors.email}
            </div>
          ) : null}
        </div>
        <div className="form-group py-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="invalid-feedback d-block">
              {formik.errors.password}
            </div>
          ) : null}
        </div>
        <div className="form-group py-3">
          <input
            type="password"
            className="form-control"
            placeholder="Conferma password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="invalid-feedback d-block">
              {formik.errors.confirmPassword}
            </div>
          ) : null}
        </div>
        <div className="form-group py-3">
          <button type="submit" className="btn btn-primary py-3">
            Registrati
          </button>
        </div>
        <div
          className={
            auth.created.serverError ? "invalid-feedback d-block" : "d-none"
          }
        >
          {serverMessage}
        </div>
      </form>

      <div className="space-divider-mobile"></div>

      <div className="bannerWrapper col-12 mt-5">
        <img className="w-100" src={banner} alt={banner} />
      </div>
    </div>
  );
};

export default Register;
