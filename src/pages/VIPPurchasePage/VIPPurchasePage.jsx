import { Check } from '@mui/icons-material'
import BGImage from '../../components/BGImage/BGImage'
import './VIPPurchasePage.css'

export default function VIPPurchasePage() {
  return (
    <div className='purchasePage'>
      <BGImage />
      <div className='purchaseContainer'>
        <div className='content'>
          <div className='title'>Exclusive VIP Skincare Consultation</div>
          <div className='pricing'>180,000 VND / Month</div>
          <div className='benefits'>VIP Membership Benefits:</div>
          <p className='block'>
            <div>
              <Check /> <span>Personalized skincare plans based on AI skin analysis</span>
            </div>
            <div>
              <Check /> <span>Priority access to new and exclusive skincare products</span>
            </div>
            <div>
              <Check /> <span>Monthly progress tracking and AI follow-ups</span>
            </div>
            <div>
              <Check /> <span>24/7 skincare support and emergency advice</span>
            </div>
          </p>
          <button className='joinServiceBtn'>Join Now</button>
        </div>
      </div>
    </div>
  )
}
