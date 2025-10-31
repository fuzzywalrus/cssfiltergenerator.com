'use client';

import { useEffect, useState } from 'react';

interface ClientOnlyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function ClientOnlyWrapper({ children, fallback = null }: ClientOnlyWrapperProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}