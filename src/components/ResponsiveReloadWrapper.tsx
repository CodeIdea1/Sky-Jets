'use client';

import { useResponsiveReload } from '@/hooks/useResponsiveReload';

export default function ResponsiveReloadWrapper({ children }: { children: React.ReactNode }) {
  useResponsiveReload(768);
  return <>{children}</>;
}
