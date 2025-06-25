import { Check } from '@mui/icons-material'
import { motion, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import './VIPPurchasePage.css'

import WaterSurface from '../../assets/daniel-sinoca-AANCLsb0sU0-unsplash.jpg'
import Bottle from '../../assets/product_transparent_bottle.png'
import Bottle1 from '../../assets/alex-ware-fWJt5zarh30-unsplash.png'
import Bottle2 from '../../assets/lora-seis-k1tSnHMHHWk-unsplash.png'
import { useNavigate } from 'react-router-dom';

export default function VIPPurchasePage() {
  const { scrollYProgress } = useScroll();
  useMotionValueEvent(scrollYProgress, "change");
  
  const Paralax = useTransform(scrollYProgress, [0.1, 0.2], ["translateY(-100px)", "translateY(-200px)"]);
  const ParalaxBg = useTransform(scrollYProgress, [0, 0.3], ["0", "-300px"]);
  const ParalaxMisc = useTransform(scrollYProgress, [0.15, 0.25], ["600px", "650px"]);
  const ParalaxBgFade = useTransform(scrollYProgress, [0, 0.1], ["1", "0.1"]);
  const ParalaxMiscFade = useTransform(scrollYProgress, [0.15, 0.25], ["0.1", "0.5"]);
  const ParalaxRays = useTransform(scrollYProgress, [0.15, 0.25], ["0.2", "0.8"]);
  const transition = { duration: 2, type: "spring" };
    
  const navigate = useNavigate();

  return (
    <div className='purchasePage'>
      <motion.img style={{top: ParalaxBg, opacity: ParalaxBgFade}} transition={transition} className='waterSurfaceImg' src={WaterSurface} alt='' />
      <motion.ul class="light-rays" style={{opacity: ParalaxRays}} transition={transition}>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        
        <li></li>
        <li></li>
      </motion.ul>
      <motion.img style={{top: ParalaxMisc, opacity: ParalaxMiscFade, filter: 'blur(12px)'}} transition={transition} className='productFloatImg' src={Bottle} alt='' />
      <motion.img style={{top: ParalaxMisc, opacity: ParalaxMiscFade, filter: 'blur(3px)'}} transition={transition} className='productFloatImg1' src={Bottle1} alt='' />
      <motion.img transition={transition} className='productFloatImg2' src={Bottle2} alt='' />
      <motion.div className='purchaseContainer' style={{transform: Paralax}} transition={transition}>
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
          <button className='joinServiceBtn' onClick={() => navigate('/payment-page')}>Join Now</button>
        </div>
      </motion.div>
      <div class='canvas'>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
        <div class='bubble'></div>
      </div>
    </div>
  )
}
