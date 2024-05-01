'use client';

import useCartService from '@/lib/hooks/useCartStore';
import Link from 'next/link';
import { useSession, signOut, signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';

const Menu = () => {
  const { items } = useCartService();
  const [mount, setMounted] = useState(false);

  const { data: session } = useSession();
  useEffect(() => {
    setMounted(true);
  }, []);

  const signOutHandler = () => {
    signOut({ callbackUrl: '/signin' });
  };

  return (
    <div>
      <ul className="flex items-stretch gap-5">
        <li>
          <Link href="/cart" className="btn btn-outline btn-ghost rounded-btn">
            Cart
            {mount && items.length > 0 && (
              <div className="badge badge-secondary">
                {items.reduce((a, b) => a + b.qty, 0)}
              </div>
            )}
          </Link>
        </li>
        {session && session.user ? (
          <>
            <li>
              <div className="dropdown dropdown-bottom dropdown-end">
                <label tabIndex={0} className="btn btn-warning rounded-btn">
                  {session.user.name}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </label>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content z-[1] p-2 shadow bg-base-300 rounded-box w-52"
                >
                  <li>
                    <button type="button" onClick={signOutHandler}>
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            </li>
          </>
        ) : (
          <li>
            <button
              type="button"
              onClick={() => signIn()}
              className="btn btn-warning rounded-btn"
            >
              Sign in
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Menu;
