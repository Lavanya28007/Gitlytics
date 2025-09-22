'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
   name: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
    lastName: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
   email: Yup.string().email('Invalid email').required('Required'),
    city: Yup.string().required('City is required'),
    password: Yup.string().required('password is required')
    .matches(/[a-z]/, 'lowercase letter is required')
    .matches(/[A-Z]/, 'uppercase letter is required')
    .matches(/[0-9]/, 'number is required')
    .matches(/\W/, 'special character is required') 
    .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string().required('Confirm password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
 });

const Signup = () => {
 const router = useRouter();

  // initialization 
  const signupForm = useFormik({
    initialValues: {
      name:'',
      lastName: '',
      email: '',
      city: '',
      password: '',
      confirmPassword: ''
    },
    onSubmit: (values, {resetForm}) => {
      console.log(values);   
      
      axios.post('http://localhost:5000/user/register', values)
      .then((result) => {
        toast.success('User registered successfully');
        resetForm();
        
      if (result.data.token) {
            localStorage.setItem('token', result.data.token);
          }
      router.push('/');

      }).catch((err) => {
        console.log(err);
        toast.error('Something went wrong');
      });

      // fetch('http://localhost:5000/user/add', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(values),
      // });

    }, 
    validationSchema: SignupSchema,
  });

  return (
    <>
      <div className="relative">
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          <h1 className="block text-3xl font-bold text-green-400 text-center  md:mb-8 lg:text-4xl">
                    Sign Up
                  </h1>
          <form onSubmit={signupForm.handleSubmit}>
            <div className="lg:max-w-lg lg:mx-auto lg:me-0 ms-auto mt-6">
              <div className="p-4 sm:p-7 flex flex-col bg-transparent border-1 border-green-300 rounded-xl shadow-xl">
                {/* <div className="text-center">
                  <h1 className="block text-3xl font-bold text-green-400">
                    Sign Up
                  </h1>
                </div> */}

                {/* Form Fields */}
                <div className="mt-7 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-lg mb-2 text-white font-semibold">First name</label>
                    <input type="text" 
                    id="name" 
                    onChange={signupForm.handleChange}
                    value={signupForm.values.name}
                    className="w-full border-2 px-4 py-2 rounded-lg  border-neutral-700 text-white  focus:border-green-500  focus:outline-none" />
                    {
                    (signupForm.touched.name && signupForm.errors.name) &&(
                    <p className="text-xs text-red-600 mt-2">
                      {signupForm.errors.name}
                    </p>
                    )
                  }
                  </div>
                  <div>
                    <label className="block text-lg mb-2 text-white font-semibold">Last name</label>
                    <input type="text" 
                    id="lastName" 
                    onChange={signupForm.handleChange}
                    value={signupForm.values.lastName}
                    className="w-full border-2 px-4 py-2 rounded-lg border-neutral-700 text-white  focus:border-green-500  focus:outline-none"/>
                    {
                    (signupForm.touched.lastName && signupForm.errors.lastName) &&(
                    <p className="text-xs text-red-600 mt-2">
                      {signupForm.errors.lastName}
                    </p>
                    )
                  }
                  </div>
                  <div className="col-span-2">
                    <label className="block text-lg mb-2 text-white font-semibold">Email</label>
                    <input type="email" 
                    id="email" 
                    onChange={signupForm.handleChange}
                    value={signupForm.values.email}
                    className="w-full border-2 px-4 py-2 rounded-lg border-neutral-700 text-white  focus:border-green-500  focus:outline-none" />
                    {
                    (signupForm.touched.email && signupForm.errors.email) &&(
                    <p className="text-xs text-red-600 mt-2">
                      {signupForm.errors.email}
                    </p>
                    )
                  }
                  </div>
                  <div className="col-span-2">
                    <label className="block text-lg mb-2 text-white font-semibold">City</label>
                    <input type="text" 
                    id="city" 
                    onChange={signupForm.handleChange}
                    value={signupForm.values.city}
                    className="w-full border-2 px-4 py-2 rounded-lg  border-neutral-700 text-white  focus:border-green-500  focus:outline-none" />
                    {
                    (signupForm.touched.city && signupForm.errors.city) &&(
                    <p className="text-xs text-red-600 mt-2">
                      {signupForm.errors.city}
                    </p>
                    )
                  }
                  </div>
                  <div className="col-span-2">
                    <label className="block text-lg mb-2 text-white font-semibold">New password</label>
                    <input type="password" 
                    id="password" 
                    onChange={signupForm.handleChange}
                    value={signupForm.values.password}
                    className="w-full border-2 px-4 py-2 rounded-lg border-neutral-700 text-white  focus:border-green-500  focus:outline-none" />
                 {
                    (signupForm.touched.password && signupForm.errors.password) &&(
                    <p className="text-xs text-red-600 mt-2">
                      {signupForm.errors.password}
                    </p>
                    )
                  }
                  </div>
                  <div className="col-span-2">
                    <label className="block text-lg mb-2 text-white font-semibold">Confirm password</label>
                    <input type="password" 
                    id="confirmPassword" 
                    onChange={signupForm.handleChange}
                    value={signupForm.values.confirmPassword}
                    className="w-full border-2 px-4 py-2 rounded-lg border-neutral-700 text-white focus:border-green-500  focus:outline-none" />
                    {
                    (signupForm.touched.confirmPassword && signupForm.errors.confirmPassword) &&(
                    <p className="text-xs text-red-600 mt-2">
                      {signupForm.errors.confirmPassword}
                    </p>
                    )
                  }
                  </div>
                </div>

                <div className="mt-4">
                  <label className="inline-flex items-center text-sm  text-white">
                    <input type="checkbox" className="form-checkbox border-gray-300 rounded dark:bg-neutral-800 dark:border-neutral-700" />
                    <span className="ml-2">
                      I accept the <a href="#" className="hover:underline dark:text-gray-400">Terms and Conditions</a>
                    </span>
                  </label>
                </div>

                {/* Get Started Button */}
                <div className="mt-5">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-m font-semibold rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700 focus:outline-hidden focus:bg-green-700"
                  >
                    Get started
                  </button>
                </div>
                {/* Already have an account moved below */}
                <div className="mt-6 text-center">
                  <p className="mt-4 text-sm dark:text-white">
                    Already have an account?
                    <a
                      className="ml-1 text-green-400 decoration-2 hover:text-green-600 hover:underline focus:outline-hidden focus:underline font-medium "
                      href="/login"
                    >
                      Sign in here
                    </a>
                  </p>
                </div>

              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
