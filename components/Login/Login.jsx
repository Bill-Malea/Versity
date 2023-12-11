import React, { useState } from 'react';
import { auth } from '@/firebase';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Input validation
      if (!email || !password) {
        setError('Please fill in all fields.');
        return;
      }

      await auth.signInWithEmailAndPassword(email, password);
      // Redirect user upon successful login
    } catch (error) {
      setError(`Error logging in: ${error.message}`);
    }
  };

  return (
    <div className="flex justify-center items-start pt-20  h-screen w-auto">
      <div className="bg-white p-8 rounded-md shadow-lg w-96 block border border-gray-300   hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div className="">
          <h2 className="text-2xl font-semibold mb-6">Login</h2>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-950 ">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border border-gray-300 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-900 ">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-3 border border-gray-300 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="bg-black text-green-500 px-10 py-2 rounded-md"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
