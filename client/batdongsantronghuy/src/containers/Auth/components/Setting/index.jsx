import React from 'react';
import './style.scss';
import { Container, Row, Col } from 'react-bootstrap';
import { addDefaultSrc } from '../../../../ults/addDefaultSrc';
import { noAvatar } from '../../../../constants/config';
import {
  BrowserRouter,
  Route,
  Link,
  Switch,
  useHistory,
} from 'react-router-dom';
import { router } from '../../../../constants/router';
import { NotFoundPage } from '../../../../pages/NotFound';
import ChangePassword from './components/ChangePassword';
import ChangeUserInfo from './components/ChangeUserInfo';
import ManagePost from './components/ManagePost';
import useGetManagePost from './hooks/useGetManagePost';
import { POSTTYPE } from '../../../../constants/postType';

function Setting({ user }) {
  const { postList, setPostList, loading } = useGetManagePost();
  const history = useHistory();
  if (!user) return <NotFoundPage />;
  const posted = postList.filter((x) => x.status === POSTTYPE.POSTED);
  const waiting = postList.filter((x) => x.status === POSTTYPE.WAITING);
  const needToPay = postList.filter((x) => x.status === POSTTYPE.NEEDTOPAY);

  const handleDelete = (id) => {
    const listAfterDelete = postList.filter((x) => x.id !== id);
    setPostList(listAfterDelete);
  };
  return (
    <BrowserRouter>
      <Container>
        <Row>
          <Col className="col-3 info">
            <div className="box__header">
              <h3>Trang cá nhân</h3>
            </div>
            <div className="box__avatar">
              {user.image ? (
                <img
                  src={user.image}
                  alt="Your avatar"
                  onError={addDefaultSrc}
                />
              ) : (
                <img src={noAvatar} alt="Your avatar" onError={addDefaultSrc} />
              )}
            </div>
            <div className="box__info">
              <h4>{user?.fullName}</h4>
              <p>Email: {user?.email}</p>
              <p>Địa chỉ: {user?.address ? user?.address : 'Chưa cập nhật'}</p>
              <p>
                SĐT: {user?.phoneNumber ? user?.phoneNumber : 'Chưa cập nhật'}
              </p>
            </div>

            <div className="box__post-status">
              <p>
                Bài viết đang đã đăng: <b>{posted.length}</b>
              </p>
              <p>
                Bài viết đang chờ phê duyệt: <b>{waiting.length}</b>
              </p>
              <p>
                Bài viết đang chưa thanh toán: <b>{needToPay.length}</b>
              </p>
            </div>
            <div className="box__header">
              <h3>Quản lý thông tin cá nhân</h3>
            </div>
            <div className="box__manage-account">
              <ul>
                <li>
                  <Link
                    to={router.THAYDOITHONGTINCANHAN}
                    title="Thay đổi thông tin cá nhân"
                  >
                    Thay đổi thông tin cá nhân
                  </Link>
                </li>
                {!user?.isSocial && (
                  <li>
                    <Link to={router.DOIMATKHAU} title="Đổi mật khẩu">
                      Đổi mật khẩu
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            <div className="box__header">
              <h3>Quản lý bài viết</h3>
            </div>
            <div className="box__manage-account">
              <ul>
                <li>
                  <Link to={router.QUANLYBAIVIET} title="Quản lý bài viết">
                    Quản lý bài viết
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      history.push(router.TAOBAIVIET);
                    }}
                    to={router.TAOBAIVIET}
                    title="Tạo bài viết"
                  >
                    Đăng bài
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col className="col-9 manage-post">
            <Switch>
              <Route
                exact
                path={router.THAYDOITHONGTINCANHAN}
                component={ChangeUserInfo}
              />
              <Route
                exact
                path={router.QUANLYBAIVIET}
                render={() => (
                  <ManagePost
                    setList={setPostList}
                    list={postList}
                    loading={loading}
                    onDelete={handleDelete}
                  />
                )}
              />
              <Route
                exact
                path={router.DOIMATKHAU}
                component={ChangePassword}
              />
            </Switch>
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
}

export default Setting;
