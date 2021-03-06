import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import { router } from '../../constants/router';
import SettingPage from '../../pages/SettingPage';
import EditPost from '../../pages/EditPost';
import { NotFoundPage } from '../../pages/NotFound';

const SettingRouter = () => {
  //   const match = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route exact path={router.DOIMATKHAU} component={SettingPage} />
        <Route exact path={router.QUANLYBAIVIET} component={SettingPage} />
        <Route
          exact
          path={router.THAYDOITHONGTINCANHAN}
          component={SettingPage}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
};

export default SettingRouter;
