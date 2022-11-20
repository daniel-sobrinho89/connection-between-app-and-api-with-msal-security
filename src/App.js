import React from "react";
import { PageLayout } from "./components/PageLayout";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { useMsal } from "@azure/msal-react";
import OrderRegistration from "./pages/OrderRegistration";
import SimpleForm from "./pages/SimpleForm";
import SimpleSearch from "./pages/SimpleSearch";
import NavCanvas from "./components/NavCanvas";
import Home from "./components/Home";
import { Route } from 'react-router';
import { Routes, HashRouter} from "react-router-dom";
import { apiRequest } from "./services/Config";

function App() {
  const { instance, accounts } = useMsal();
  
  async function getApiToken() {
    const request = {
      ...apiRequest,
      account: accounts[0]
    };

    return await instance.acquireTokenSilent(request)
      .then((response) => {            
        return response.accessToken;
      })
      .catch((e) => {
          console.log(e);
      });
  }

  return (
    <HashRouter>
      <AuthenticatedTemplate>
        <NavCanvas />
        <div className="container mt-5">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="OrderRegistration" element={<OrderRegistration getToken={getApiToken} />} />
            <Route exact path="SimpleForm" element={<SimpleForm getToken={getApiToken} />} />
            <Route exact path="SimpleSearch" element={<SimpleSearch getToken={getApiToken} />} />
          </Routes>
        </div>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <PageLayout />
      </UnauthenticatedTemplate>
    </HashRouter>
  );
}

export default App;
