import { Box, Dialog, IconButton, makeStyles, Button } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { MODE } from '../../../constants/mode';
import Login from '../../../containers/Auth/components/Login';
import Register from '../../../containers/Auth/components/Register';
import { hideLogin } from '../../../containers/Auth/userSlice';

export const LoginModal = ({
  open,
  mode = MODE.LOGIN,
  navigate,
  message = null,
}) => {
  const useStyles = makeStyles((theme) => ({
    closeButton: {
      position: 'absolute',
      top: theme.spacing(1),
      right: theme.spacing(1),
      color: theme.palette.grey[500],
      zIndex: 1,
      outline: 'none',
    },
  }));
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleClose = () => {
    const action = hideLogin();
    dispatch(action);
    navigate(MODE.LOGIN);
  };

  return (
    <>
      <Dialog
        disableBackdropClick
        // disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <IconButton
          className={`btn-close ${classes?.closeButton}`}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
        {mode === MODE.LOGIN && (
          <>
            <Login closeDialog={handleClose} />
            {message && (
              <p
                style={{
                  padding: '12px 16px 0',
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
                className="text-center text-danger mb-0"
              >
                *{message}
              </p>
            )}

            <Box
              textAlign="center"
              className="d-flex justify-content-around my-2"
            >
              <Button
                color="primary"
                onClick={() => {
                  navigate(MODE.REGISTER);
                }}
              >
                Chưa có tài khoản?
              </Button>
              <Button
                color="primary"
                // onClick={() => {
                //   navigate(MODE.FORGOTPASSWORD);
                // }}
              >
                Quên mật khẩu?
              </Button>
            </Box>
          </>
        )}
        {mode === MODE.REGISTER && (
          <>
            <Register closeDialog={handleClose} />

            <Box textAlign="center" className="my-2">
              <Button
                color="primary"
                onClick={() => {
                  navigate(MODE.LOGIN);
                }}
              >
                Đã có tài khoản ?
              </Button>
            </Box>
          </>
        )}
      </Dialog>
    </>
  );
};
