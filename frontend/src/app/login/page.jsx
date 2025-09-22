'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { use } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import api from "../utils/api";

const LoginSchema = Yup.object().shape({
   email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('password is required')
    .matches(/[a-z]/, 'lowercase letter is required')
    .matches(/[A-Z]/, 'uppercase letter is required')
    .matches(/[0-9]/, 'number is required')
    .matches(/\W/, 'special character is required') 
    .min(6, 'Password must be at least 6 characters'),
 });

// Removed incomplete and unused handleLogin function to fix syntax error.


const Login = () => {
const router = useRouter();

const loginForm = useFormik({ 
  initialValues: {
    email: '',
    password: ''
  },
  onSubmit: (values) => {
    console.log(values);

    api.post('/user/authenticate', values)
    .then((result) => {
      toast.success('Login Successful');
      console.log(result.data);

      if (result.data.token) {
            localStorage.setItem('token', result.data.token);
            localStorage.setItem('user', JSON.stringify(result.data));
          }
      router.push('/');
      
    }).catch((err) => {
      toast.error('Login Failed');
      console.log(err);      
    });
  },
  validationSchema: LoginSchema,
});


  return (
    
    <div className='min-h-screen'>
   <div className=" py-6 sm:py-8 lg:py-12">
  <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
<h2 className="mb-4 text-center text-3xl font-bold text-green-400 md:mb-8 lg:text-4xl">
      Sign in
    </h2>
    <form 
    onSubmit={loginForm.handleSubmit}
    className="mt-10 mx-auto max-w-lg bg-transparent border border-green-300 rounded-xl shadow-xl">
      <div className="flex flex-col gap-4 p-4 md:p-8">
        {/* <h2 className="mb-4 text-center text-2xl font-bold text-green-400 md:mb-8 lg:text-4xl">
      Sign in
    </h2> */}
        <div>
          <label
            htmlFor="email" className="mb-2 inline-block text-lg font-semibold text-white sm:text-base">
            Email:
          </label>
          <input type="email"
            id="email"
            onChange={loginForm.handleChange}
            value={loginForm.values.email}
            className="w-full border-2 px-4 py-2 rounded-lg border-neutral-700 text-white focus:border-green-500  focus:outline-none" />
            {
                    (loginForm.touched.email && loginForm.errors.email) &&(
                    <p className="text-xs text-red-600 mt-2">
                      {loginForm.errors.email}
                    </p>
                    )
                  }
        </div>
        <div>
          <label htmlFor="password" className="mb-2 inline-block text-lg font-semibold text-white sm:text-base">Password:</label>
          <input type="password"
            id="password"
            onChange={loginForm.handleChange}
            value={loginForm.values.password}
            className="w-full border-2 px-4 py-2 rounded-lg  border-neutral-700 text-white  focus:border-green-500  focus:outline-none"/>
            {
                    (loginForm.touched.password && loginForm.errors.password) &&(
                    <p className="text-xs text-red-600 mt-2">
                      {loginForm.errors.password}
                      </p>
                    )
                  } 
        </div>
        <button type="submit" className="block w-full py-3 px-4  justify-center items-center gap-x-2 text-m font-semibold rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700 focus:outline-hidden focus:bg-green-700">
          Log in
        </button>
      </div>
      <div className="flex items-center justify-center p-4">
        <p className="text-center text-sm text-white">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-green-400 transition duration-100 hover:text-green-600 hover:underline active:text-green-700"
          >
            Sign Up Here
          </a>
        </p>
      </div>
    </form>
  </div>
</div>
     </div> 
  )
}

export default Login;