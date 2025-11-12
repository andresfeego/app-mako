import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text, TextInput as RNTextInput } from 'react-native';
import { Provider } from 'react-redux';
import localStore from './src/res/localStore/LocalStore';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './src/res/EstilosFormularios';
import CoinsStack from './src/components/stack/Coinstack';
import { AuthProvider } from './src/context/AuthContext'; 

// Set global default font family
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.style = [Text.defaultProps.style, { fontFamily: 'CaviarDreams' }];
RNTextInput.defaultProps = RNTextInput.defaultProps || {};
RNTextInput.defaultProps.style = [RNTextInput.defaultProps.style, { fontFamily: 'CaviarDreams' }];

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
