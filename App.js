import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import localStore from './src/res/localStore/LocalStore';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './src/res/EstilosFormularios';
import CoinsStack from './src/components/stack/Coinstack';
import { AuthProvider } from './src/context/AuthContext'; 

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={localStore}>
        <PaperProvider theme={theme}>
          <AuthProvider>
            <CoinsStack />
          </AuthProvider>
        </PaperProvider>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
