import React from 'react';
import Content from './Content';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
    const queryClient = new QueryClient();
    return (
        <div>
            <QueryClientProvider client={queryClient}>
                <Content />
            </QueryClientProvider>
        </div>
    );
}

export default App;
