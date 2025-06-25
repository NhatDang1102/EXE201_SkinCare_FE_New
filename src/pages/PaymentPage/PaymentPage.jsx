import { ArrowBack, ArrowForward, CurrencyExchange } from '@mui/icons-material'
import './PaymentPage.css'
import { useState } from 'react';
import Spline from '@splinetool/react-spline';
import Scene2 from "../../assets/scene (2).splinecode";
import { useNavigate } from 'react-router-dom';
import PaymentPopup from '../../components/PaymentPopup/PaymentPopup';
import PayOSLogo from '../../assets/PayOSimage.png'
import { showLoading, updateToast } from '../../utils/toastUtils';

export default function PaymentPage() {
  const [paymentPopup, setPaymentPopup] = useState(false);
  const navigate = useNavigate();

  const handlePayOS = async () => {
    const toastId = showLoading("Directing To PayOS...");
    setTimeout(() => {
      updateToast(toastId, "error", "PayOS not available");
    }, 100);
  }
  return (
    <div className='paymentPage'>
      <button className="back-btn" onClick={() => { navigate("/VIP-purchase"); } }>
        <ArrowBack />
      </button>
      <div className="paymentScene">
        <Spline scene={Scene2} />
        { paymentPopup ? (
            <PaymentPopup />
          ) : (<div className='payOSNavi'>
            <img src={PayOSLogo} alt='' className='payOSLogo' role="button"/>
            <button onClick={handlePayOS}>Thanh Toán <ArrowForward /></button>
          </div>)
        }
      </div>
      <button className={paymentPopup ? "back-btn next" : "back-btn next back"} onClick={() => { setPaymentPopup(!paymentPopup) } }>
        <CurrencyExchange />
      </button>
    </div>
  )
}
