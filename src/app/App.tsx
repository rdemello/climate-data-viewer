import React from 'react';
import Content from './Content';
import ThemeProvider from 'de_common_ui/ThemeProvider';
import { AuthProvider } from 'de_origin/Orial';

function App() {
    return (
        <div>
            <ThemeProvider initialColorMode="light">
                <AuthProvider>
                    <Content />
                </AuthProvider>
            </ThemeProvider>
        </div>
    );
}

export default App;
