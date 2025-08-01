import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

// routing
import router from "./routes";
import store, { persistor } from "./redux/store";

// project imports
import NavigationScroll from "./layout/NavigationScroll";

import ThemeCustomization from "./themes";
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";

// auth provider
import { ChatProvider } from "./contexts/ChatContext";

export default function App() {
  return (
    <ChatProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeCustomization>
            <NavigationScroll>
              <>
                <RouterProvider router={router} />
              </>
            </NavigationScroll>
          </ThemeCustomization>
        </PersistGate>
      </Provider>
    </ChatProvider>
  );
}
