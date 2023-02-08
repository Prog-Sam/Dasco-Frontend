import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import User from './components/user';
import UserAccount from './components/userAccount';
import ContactType from './components/contactType';
import Contact from './components/contact';
import PlasticType from './components/plasticType';
import ContactUs from './components/contactUs';
import AboutUs from './components/aboutus';
import Home from './components/home';

import UserForm from './components/userForm';
import UserAccountForm from './components/userAccountForm';
import NotFound from './components/notFound';
import ChangePasswordForm from './components/changePasswordForm';
import Settings from './components/settings';
import Navigation from './components/navigation';
import LoginForm from './components/loginForm';
import UserContext from './context/userContext';
import { getCurrentUser, logout } from './services/authService';
import ProtectedRoute from './common/protectedRoute';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import ContactTypeForm from './components/contactTypeForm';
import ContactForm from './components/contactForm';
import PlasticTypeForm from './components/plasticTypeForm';
import PlasticTypeImageForm from './components/plasticTypeImageForm'

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    let token = localStorage.getItem('token');
    if (token) {
      setCurrentUser(getCurrentUser());
    }
  }, []);

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
  };

  return (
    <div className='App'>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <Navigation currentUser={currentUser} onLogout={handleLogout} />
        <ToastContainer />
        <main className='container'>
          <Switch>
            <ProtectedRoute path='/users/:id' component={UserForm} />
            <ProtectedRoute path='/userAccounts/:id' component={UserAccountForm} />
            <ProtectedRoute path='/contacts/:id' component={ContactForm} />
            <ProtectedRoute path='/contactTypes/:id' component={ContactTypeForm} />
            <ProtectedRoute path='/products/:id' component={PlasticTypeForm} />
            <ProtectedRoute path='/products-image/:id' component={PlasticTypeImageForm} />
            {/*Routes for Non Form */}
            <Route path='/login' render={(props) => <LoginForm {...props} />} />
            <Route path='/updatePassword' render={(props) => <ChangePasswordForm {...props} />} />
            <Route path='/users' render={(props) => <User {...props} />} />
            <Route path='/userAccounts' render={(props) => <UserAccount {...props} />} />
            <Route path='/products' render={(props) => <PlasticType {...props} />} />
            <Route path='/contacts' render={(props) => <Contact {...props} />} />
            <Route path='/contactTypes' render={(props) => <ContactType {...props} />} />
            <Route path='/contactUs' render={(props) => <ContactUs {...props} />} />
            <Route path='/aboutUs' render={(props) => <AboutUs {...props} />} />


            <Route
              path='/settings'
              render={(props) => <Settings {...props} />}
            />
            <Route path='/not-found' component={NotFound}></Route>
            <Route path='/' exact render={(props) => <Home {...props} />} />
            <Redirect to='/not-found' />
          </Switch>
        </main>
      </UserContext.Provider>
    </div>
  );
}

export default App;
