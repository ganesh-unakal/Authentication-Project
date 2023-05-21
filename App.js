import { Switch, Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';

import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import AuthConetxt from './store/Auth-context';

function App() {

  const authCntx = useContext(AuthConetxt)

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>

        {!authCntx.isLoggedIn && (
         <Route path='/auth'>
          <AuthPage />
        </Route>)}

        <Route path='/profile'>
        {authCntx.isLoggedIn &&  <UserProfile />}
        {!authCntx.isLoggedIn && <Redirect to='/auth' />}
         
        </Route>

           

      </Switch>
    </Layout>
  );
}

export default App;
