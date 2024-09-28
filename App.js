import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import CoinsStack from './src/components/stack/Coinstack';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './src/res/EstilosFormularios';
import localStore from './src/res/localStore/LocalStore';



const App = () => {
  return (
    <NavigationContainer>
      <Provider store={localStore}>
      <PaperProvider theme={theme} >

          <CoinsStack />
          </PaperProvider>

       


      </Provider>
    </NavigationContainer>
  );
};

export default App;

