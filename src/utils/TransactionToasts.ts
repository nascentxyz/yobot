import { toast } from 'react-toastify';

// ** Callback for Transaction Submission **
const onTxSubmitted = async (msg='🚀 Transaction Submitted 🚀 ') => {
  toast(msg, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

// ** Callback for Transaction Failed **
const onTxFailed = async (msg='❌ Transaction Failed ❌') => {
  toast.error(msg, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

// ** User Rejection Callback **
const userRejectedCallback = async (msg='❌ Transaction Rejected ❌') => {
  toast.warn(msg, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

// ** Callback for Transaction Confirmation **
const onTxConfirmed = async (msg=`💰 Minting Successfull💰`) => {
  // ** Then, let's toast **
  toast.success(msg, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export {
  onTxSubmitted,
  onTxFailed,
  userRejectedCallback,
  onTxConfirmed
};