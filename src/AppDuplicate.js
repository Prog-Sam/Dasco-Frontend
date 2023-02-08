import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Supplier from './components/supplier';
import Brand from './components/brand';
import OrderType from './components/orderType';
import LensType from './components/lensType';
import IndexType from './components/indexType';
import ProductFamily from './components/productFamily';
import SupplyCategory from './components/supplyCategory';
import LensMaterial from './components/lensMaterial';
import LensItem from './components/lensItem';
import LensParam from './components/lensParam';
import ColorDay from './components/colorDay';
import FSCSAModel from './components/fscsaModel';
import FsItem from './components/fsItem';
import CSAItem from './components/csaItem';
import BranchType from './components/branchType';
import Mall from './components/mall';
import Branch from './components/branch';
import Unit from './components/unit';
import TransactionType from './components/transactionType';
import TransactionSeries from './components/transactionSeries';
import User from './components/user';
import Home from './components/home';

import SupplierForm from './components/supplierForm';
import BrandForm from './components/brandForm';
import OrderTypeForm from './components/orderTypeForm';
import LensTypeForm from './components/lensTypeForm';
import IndexTypeForm from './components/indexTypeForm';
import ProductFamilyForm from './components/productFamilyForm';
import SupplyCategoryForm from './components/supplyCategoryForm';
import LensMaterialForm from './components/lensMaterialForm';
import LensItemForm from './components/lensItemForm';
import LensParamForm from './components/lensParamForm';
import ColorDayForm from './components/colorDayForm';
import FSCSAModelForm from './components/fscsaModelForm';
import FsItemForm from './components/fsItemForm';
import CSAItemForm from './components/csaItemForm';
import BranchTypeForm from './components/branchTypeForm';
import MallForm from './components/mallForm';
import BranchForm from './components/branchForm';
import UnitForm from './components/unitForm';
import TransactionTypeForm from './components/transactionTypeForm';
import TransactionSeriesForm from './components/transactionSeriesForm';
import UserForm from './components/userForm';
import NotFound from './components/notFound';
import SystemSettings from './components/systemSettings';
import ItemSettings from './components/itemSettings';
import BranchSettings from './components/branchSettings';
import Navigation from './components/navigation';
import LoginForm from './components/loginForm';
import UserContext from './context/userContext';
import { getCurrentUser, logout } from './services/authService';
import ProtectedRoute from './common/protectedRoute';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

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
            <ProtectedRoute path='/suppliers/:id' component={SupplierForm} />
            <ProtectedRoute path='/brands/:id' component={BrandForm} />
            <ProtectedRoute path='/ordertypes/:id' component={OrderTypeForm} />
            <ProtectedRoute path='/lenstypes/:id' component={LensTypeForm} />
            <ProtectedRoute path='/indextypes/:id' component={IndexTypeForm} />
            <ProtectedRoute
              path='/productfamilies/:id'
              component={ProductFamilyForm}
            />
            <ProtectedRoute
              path='/supplycategories/:id'
              component={SupplyCategoryForm}
            />
            <ProtectedRoute
              path='/lensmaterials/:id'
              component={LensMaterialForm}
            />
            <ProtectedRoute path='/lensItems/:id' component={LensItemForm} />
            <ProtectedRoute path='/lensparams/:id' component={LensParamForm} />
            <ProtectedRoute path='/colordays/:id' component={ColorDayForm} />
            <ProtectedRoute
              path='/fscsamodels/:id'
              component={FSCSAModelForm}
            />
            <ProtectedRoute path='/fsitems/:id' component={FsItemForm} />
            <ProtectedRoute path='/csaitems/:id' component={CSAItemForm} />
            <ProtectedRoute
              path='/branchtypes/:id'
              component={BranchTypeForm}
            />
            <ProtectedRoute path='/malls/:id' component={MallForm} />
            <ProtectedRoute path='/branches/:id' component={BranchForm} />
            <ProtectedRoute path='/units/:id' component={UnitForm} />
            <ProtectedRoute
              path='/transactiontypes/:id'
              component={TransactionTypeForm}
            />
            <ProtectedRoute
              path='/transactionSeries/:id'
              component={TransactionSeriesForm}
            />
            <ProtectedRoute path='/users/:id' component={UserForm} />
            {/*Routes for Non Form */}
            <Route path='/login' render={(props) => <LoginForm {...props} />} />
            <Route
              path='/suppliers'
              render={(props) => <Supplier {...props} />}
            />
            <Route path='/brands' render={(props) => <Brand {...props} />} />
            <Route
              path='/ordertypes'
              render={(props) => <OrderType {...props} />}
            />
            <Route
              path='/lenstypes'
              render={(props) => <LensType {...props} />}
            />
            <Route
              path='/indextypes'
              render={(props) => <IndexType {...props} />}
            />
            <Route
              path='/productfamilies'
              render={(props) => <ProductFamily {...props} />}
            />
            <Route
              path='/supplycategories'
              render={(props) => <SupplyCategory {...props} />}
            />
            <Route
              path='/lensmaterials'
              render={(props) => <LensMaterial {...props} />}
            />
            <Route
              path='/lensItems'
              render={(props) => <LensItem {...props} />}
            />
            <Route
              path='/lensparams'
              render={(props) => <LensParam {...props} />}
            />
            <Route
              path='/colordays'
              render={(props) => <ColorDay {...props} />}
            />
            <Route
              path='/fscsamodels'
              render={(props) => <FSCSAModel {...props} />}
            />
            <Route path='/fsitems' render={(props) => <FsItem {...props} />} />
            <Route
              path='/csaitems'
              render={(props) => <CSAItem {...props} />}
            />
            <Route
              path='/branchtypes'
              render={(props) => <BranchType {...props} />}
            />
            <Route path='/malls' render={(props) => <Mall {...props} />} />
            <Route path='/branches' render={(props) => <Branch {...props} />} />
            <Route path='/units' render={(props) => <Unit {...props} />} />
            <Route
              path='/transactiontypes'
              render={(props) => <TransactionType {...props} />}
            />
            <Route
              path='/transactionseries'
              render={(props) => <TransactionSeries {...props} />}
            />
            <Route path='/users' render={(props) => <User {...props} />} />
            <Route
              path='/system-settings'
              render={(props) => <SystemSettings {...props} />}
            />
            <Route
              path='/item-settings'
              render={(props) => <ItemSettings {...props} />}
            />
            <Route
              path='/branch-settings'
              render={(props) => <BranchSettings {...props} />}
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
