'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import bcrypt from 'bcryptjs';

const RegForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const params = useSearchParams();
  let callbackUrl = params.get('callbackUrl') || '/';

  useEffect(() => {
    if (session && session.user) {
      router.push('/');
    }
  }, [callbackUrl, router, session, params]);
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError('All fields are Mandatory..!');
    }

    try {
      setIsPending(true);
      const res = await fetch('api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (res.ok) {
        setIsPending(false);
        const form = e.target;
        form.reset();
        console.log('User registered.');
        router.push('/signin');
      } else {
        setIsPending(false);
        const err = await res.json();
        setError(err.message);
      }
    } catch (error) {
      setIsPending(false);
      console.log('Something went wrong in Registering');
    }
  };

  const reRouteToRegister = () => {
    router.push('/signin');
  };

  return (
    <div className="max-w-sm  mx-auto card bg-base-300 my-4">
      <div className="card-body">
        <h1 className="card-title">Register user</h1>
        {error && (
          <div className="alert text-error">
            {error === 'CredentialsSignin'
              ? 'Invalid email or password'
              : error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="my-2">
            <label className="label" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="input input-bordered w-full max-w-sm"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="my-2">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="input input-bordered w-full max-w-sm"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-2">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="input input-bordered w-full max-w-sm"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-4">
            <button
              type="submit"
              disabled={isPending}
              className="btn btn-warning w-full"
            >
              {isPending && (
                <span className="loading loading-spinner">Registering...</span>
              )}
              Register
            </button>
          </div>
        </form>
        <div>
          Already a customer ? <a onClick={reRouteToRegister}>Signin</a>
        </div>
      </div>
    </div>
  );
};

export default RegForm;
