import BGImage from "../../../components/BGImage/BGImage"
import "./DashboardPage.css"
import Header from "../../../components/Header/Header"
import Tracker from "../../../components/Charts/Tracker"

import { motion, useScroll, useMotionValueEvent, useTransform, useInView } from "framer-motion";
import SalesTracker from "../../../components/Charts/SalesTracker"
import { AccountBox, AssignmentInd, BarChart, ListAlt, LocalMall, PermContactCalendar, PersonOutline } from "@mui/icons-material"
import CompositionExample from "../../../components/Charts/GaugePointer"
import { LineChart } from "@mui/x-charts"

export default function DashboardPage() {
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change",
  );

  const position1 = useTransform(
      scrollYProgress,
      [0, 0.5],
      ["0%", "10%"]
  )
  const size1 = useTransform(
      scrollYProgress,
      [0, 0.5],
      ["1", "0.8"]
  )
  const blurFilter1 = useTransform(
      scrollYProgress,
      [0, 1.5],
      ["1", "0.5"]
  )
  const position2 = useTransform(
      scrollYProgress,
      [0.5, 1],
      ["0%", "10%"]
  )
  const size2 = useTransform(
      scrollYProgress,
      [0.5, 1],
      ["1", "0.8"]
  )
  const blurFilter2 = useTransform(
      scrollYProgress,
      [0.5, 1.5],
      ["1", "0.5"]
  )
  const position3 = useTransform(
      scrollYProgress,
      [0.8, 1.5],
      ["0%", "10%"]
  )
  const size3 = useTransform(
      scrollYProgress,
      [0.8, 1.5],
      ["1", "0.8"]
  )
  const blurFilter3 = useTransform(
      scrollYProgress,
      [0.8, 2],
      ["1", "0.5"]
  )
  return (
    <div className='dashBoardPage'>
        <BGImage />
        <motion.div  className="dashBoardContainer"
              style={{y: position1, scale: size1, opacity: blurFilter1}}>
          <Header title="ADMIN DASHBOARD" subtitle="Welcome to your dashboard" />
          
          <div className="counterContainer" >
            <Tracker icon={<AccountBox />} title="Daily Register" number="100000000" />
            <Tracker icon={<AssignmentInd />} title="Weekly Register" number="20" />
            <Tracker icon={<PermContactCalendar />} title="Monthly Register" number="80" />
          </div>
          
        </motion.div >

        <motion.div  className="dashBoardContainer"
            style={{y: position2, scale: size2, opacity: blurFilter2}}>

            <div className="statistaContainer">
                <div className="statTitle">Today's Sales</div>
                <span className="statSubTitle">Sales Summary</span>
                
                <div className="trackerContainer" >
                    <SalesTracker icon={<BarChart />} number="$5k" title="Total Sales" profit="+10% from yesterday" />
                    <SalesTracker icon={<ListAlt />} number="500" title="Total Order" profit="+10% from yesterday" />
                    <SalesTracker icon={<LocalMall />} number="9" title="Product Sold" profit="+10% from yesterday" />
                    <SalesTracker icon={<PersonOutline />} number="12" title="New Customer" profit="+10% from yesterday" />
                </div>
            </div>
          
        </motion.div >

        <motion.div  className="dashBoardContainer"
            style={{y: position3, scale: size3, opacity: blurFilter3}}>

            <div className="chartContainer">
                <div className="chartTitle">Earnings</div>
                <span className="chartSubTitle">Total Expense</span>
                
                <div className="progressGaugeContainer" >
                    <CompositionExample />
                    <div className='valuePercentage'>30%</div>
                </div>
            </div>

            <div className="lineChartContainer">
                <div className="chartTitle">AI Request Rate</div>
                
                <div className="lineChartBox" >
                    <LineChart className="lineChart"
                        
                        series={[
                            { curve: "linear", data: [1, 5, 2, 6, 3, 9.3] },
                            { curve: "linear", data: [6, 3, 7, 9.5, 4, 2] },
                        ]}
                    />
                </div>
            </div>
        </motion.div >

    </div>
  )
}
