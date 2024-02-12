// react query
import { QueryClientProvider, QueryClient } from "react-query";

// providers

import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import FlashMessage from "react-native-flash-message";
import NewNote from "screens/Note";




// navigation
import Navigation from "./src/navigation/Navigation";
// tailwind Provider
import './output.css';

const client = new QueryClient();


const App = () => {
  return (
    <>
    <Provider store={store}>
     <QueryClientProvider client={client}>
          <Navigation />
    </QueryClientProvider>
    </Provider>
  <FlashMessage position="top"/>
    </>
  );
};

export default App;
