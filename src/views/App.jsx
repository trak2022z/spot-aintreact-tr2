import api, { updateAuthHeader } from 'api';
import { Player } from 'components/Player';
import { Sidebar } from 'components/Sidebar';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';
import { guestRoutes, routes } from 'routes';
import {
  selectAccessToken,
  setUserInfo
} from 'store/user';
import s from './App.module.scss';

const App = () => {
  const accessToken = useSelector(selectAccessToken);
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (accessToken) setLoggedIn(true);
  }, [accessToken]);

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
        {!loggedIn ? (
          renderRoutes(guestRoutes)
        ) : (
          <>
            <Sidebar className={s.sidebar} />
            {renderRoutes(routes)}
            <Player className={s.player} />
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;