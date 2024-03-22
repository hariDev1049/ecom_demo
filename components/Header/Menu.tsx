'use client';

import useCartService from '@/lib/hooks/useCartStore';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Menu = () => {
  const { items } = useCartService();
  const [mount, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

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
        <li>
          <Link href="/signin" className="btn btn-warning btn-rounded">
            Signin
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
