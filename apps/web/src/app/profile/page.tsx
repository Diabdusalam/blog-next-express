'use client';

import AuthGuard from '@/hoc/AuthGuard';
import React from 'react';

const profile = () => {
  return (
    <main className="container mx-auto px-4">
      <h1 className="text-center">Profile PAge</h1>
    </main>
  );
};

export default AuthGuard(profile);
