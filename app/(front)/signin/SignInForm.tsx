'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

const SignInForm = () => {
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
    if (!email || !password) {
      setError('All fields are Mandatory..!');
    }

    try {
      setIsPending(true);
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError(res.error);
        setIsPending(false);
      }

      router.replace('/');
    } catch (error) {}
  };

  const reRouteToRegister = () => {
    router.push('/register');
  };

  return (
    <div className="max-w-sm  mx-auto card bg-base-300 my-4">
      <div className="card-body">
        <h1 className="card-title">Sign in</h1>
        {error && (
          <div className="alert text-error">
            {error === 'CredentialsSignin'
              ? 'Invalid email or password'
              : error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="my-2">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              type="text"
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
                <span className="loading loading-spinner">Signing in...</span>
              )}
              Sign in
            </button>
          </div>
        </form>
        <div>
          Need an account? <a onClick={reRouteToRegister}>Register</a>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
