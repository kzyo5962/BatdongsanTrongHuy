import { Backdrop } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/Info';
import moment from 'moment';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import postAPI from '../../../../../../api/postAPI';
import { POSTTYPE } from '../../../../../../constants/postType';
import './style.scss';

const useStyles = makeStyles(() =>
  createStyles({
    loading: {
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    backdrop: {
      zIndex: '1000',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
);

const ManagePost = ({ list, loading, onDelete }) => {
  const [loadingToDelete, setLoadingToDelete] = React.useState(false);
  const history = useHistory();
  const classes = useStyles();

  const showStatusMethod = (status) => {
    let message = '';
    switch (status) {
      case POSTTYPE.POSTED:
        message = 'Đã đăng';
        break;
      case POSTTYPE.WAITING:
        message = 'Chờ duyệt';
        break;
      case POSTTYPE.NEEDTOPAY:
        message = 'Chưa thanh toán';
        break;
      default:
        message = 'Không tìm thấy';
        break;
    }
    return message;
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: `Bạn chắc chắn muốn xóa #${id} ?`,
      text: 'Bạn sẽ không thể khôi phục dữ liệu này!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa!',
      cancelButtonText: 'Hủy!',
    }).then((result) => {
      if (result.isConfirmed) {
        (async () => {
          try {
            setLoadingToDelete(true);
            const response = await postAPI.deletePostByUser(id);

            if (response.succeeded) {
              setLoadingToDelete(false);
              Swal.fire('Đã xóa!', 'Đã xóa thành công.', 'success');
              if (!onDelete) return;
              onDelete(id);
            }
          } catch (err) {
            console.log('Failed to delete post: ', err);
          }
          setLoadingToDelete(false);
        })();
      }
    });
  };
  return (
    <>
      <div className="box__header box__header--textLeft">
        <h3>Quản lý bài viết</h3>
      </div>

      {loadingToDelete && (
        <div className={classes.backdrop}>
          <Backdrop open={loadingToDelete} invisible={true}>
            <CircularProgress />
          </Backdrop>
        </div>
      )}
      {loading ? (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      ) : (
        <>
          {list.length === 0 ? (
            <div className="mt-4">
              <p>Hiện chưa có bài viết nào.</p>
            </div>
          ) : (
            <>
              {/* <form>
                <input placeholder="Nhập tiêu đề cần tìm kiếm..." />
              </form> */}
              <div className="table-manage">
                <table>
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Mã tin</th>
                      <th>Ảnh</th>
                      <th>Tiêu đề</th>
                      <th>Ngày bắt đầu</th>
                      <th>Ngày hết hạn</th>
                      <th>Trạng thái</th>
                      <th>Công cụ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((item, index) => {
                      return (
                        <tr key={item.id}>
                          <td>{++index}</td>
                          <td>
                            <b>#{item.id}</b>
                          </td>
                          <td>
                            <img
                              src={item?.images[0]?.url}
                              alt={item.title}
                              width="50"
                              height="50"
                            />
                          </td>
                          <td>{item.title}</td>
                          <td>{moment(item.startDate).format('DD/MM/YYYY')}</td>
                          <td>{moment(item.endDate).format('DD/MM/YYYY')}</td>
                          <td>{showStatusMethod(item.status)}</td>
                          <td>
                            <div className="tool-items d-flex">
                              <EditIcon
                                className="mx-1"
                                onClick={() => {
                                  history.push(
                                    `/bai-dang/sua-bai-viet/${item.id}`
                                  );
                                  window.location.reload();
                                }}
                              />

                              <InfoIcon
                                className="mx-1"
                                onClick={() => {
                                  history.push(`/bai-dang/${item.id}`);
                                  window.location.reload();
                                }}
                              />

                              <DeleteIcon
                                className="mx-1"
                                onClick={() => handleDelete(item.id)}
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ManagePost;