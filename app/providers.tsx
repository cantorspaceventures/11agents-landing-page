'use client';

import { FounderModeProvider } from '@/context/FounderModeContext';
import FounderModeToggle from '@/components/FounderModeToggle';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <FounderModeProvider>
            {children}
            <FounderModeToggle />
        </FounderModeProvider>
    );
}
