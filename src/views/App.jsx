import api, { updateAuthHeader } from 'api';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';
import { guestRoutes, routes } from 'routes';
import {
  selectAccessToken,
  setUserInfo
} from 'store/user';
import s from './App.module.scss';
import { LoggedInContext } from './LoggedInContext';

const App = () => {
  const accessToken = useSelector(selectAccessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    updateAuthHeader(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      api.user.getMe().then(res => dispatch(setUserInfo(res)));
    }
  }, [accessToken, dispatch]);

  return (
    <BrowserRouter>
      <div className={s.container}>
        {!accessToken ? (
          renderRoutes(guestRoutes)
        ) : (
          <LoggedInContext>
            {renderRoutes(routes)}
          </LoggedInContext>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;