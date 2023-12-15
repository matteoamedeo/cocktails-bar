import React, { useEffect } from "react";
import banner from "../static/images/login-banner.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth } from "../redux/reducers/auth-reducer";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import RedirectSpinner from "../components/RedirectSpinner";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("*Questo campo è obbligatorio"),
      password: Yup.string().required("*Questo campo è obbligatorio"),
    }),
    onSubmit: (values) => {
      dispatch(fetchAuth("/account/login", values));
    },
  });

  useEffect(() => {
    if (auth.redirect) {
      if (auth.lastAttemptedUrl) {
        navigate(auth.lastAttemptedUrl.pathname);
      } else {
        navigate("/tutti-i-cocktail");
      }
    }
  }, [auth.redirect]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/");
    }
  }, []);

  return (
    <div className="login-wrapper container pt-5 mt-sm-5">
      {auth.loading ? <RedirectSpinner /> : ""}

      <h1 className="text-white col-12 col-md-8 py-5 m-auto">Accedi</h1>
      <form
        className="col-12 col-md-8 m-auto pb-5"
        onSubmit={formik.handleSubmit}
      >
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
        <button type="submit" className="btn btn-primary py-3">
          Accedi
        </button>
      </form>

      <div className="text-white col-12 col-md-8 py-5 m-auto">
        <p>NUOVO UTENTE?</p>
        <p>Creare un account è facile!</p>
        <a className="text-medium" href="/register">
          Registrati qui
        </a>
      </div>

      <div className="space-divider-mobile"></div>

      <div className="bannerWrapper col-12 mt-5">
        <img className="w-100" src={banner} alt={banner} />
      </div>
    </div>
  );
};

export default Login;
