"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StreamOverlayPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/dashboard/overview?view=overlay');
  }, [router]);
  return null;
}
