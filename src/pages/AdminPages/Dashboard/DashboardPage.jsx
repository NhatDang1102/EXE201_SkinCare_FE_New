import BGImage from "../../../components/BGImage/BGImage"
import "./DashboardPage.css"
import Header from "../../../components/Header/Header"
import Tracker from "../../../components/Charts/Tracker"

import skincareIcon2 from "../../../assets/product_icon_2.png";
import skincareIcon3 from "../../../assets/product_icon_3.png";

import { motion, useScroll, useMotionValueEvent, useTransform, useInView } from "framer-motion";
import SalesTracker from "../../../components/Charts/SalesTracker"
import { AccountBox, AssignmentInd, BarChart, ListAlt, LocalMall, MonetizationOn, PermContactCalendar, PersonOutline } from "@mui/icons-material"
import CompositionExample from "../../../components/Charts/GaugePointer"
import { LineChart } from "@mui/x-charts"
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import ExcelAccess from "../../../components/Charts/ExcelAccess";

export default function DashboardPage() {
  const { scrollYProgress } = useScroll();
  const [dailyRegister, setDailyRegister] = useState(0);
  const [weeklyRegister, setWeeklyRegister] = useState(0);
  const [monthlyRegister, setMonthlyRegister] = useState(0);
  
  const [dailyLogin, setDailyLogin] = useState(0);
  const [profitMargin, setProfitMargin] = useState(0);
  const [total, setTotal] = useState("");
  const [logs, setLogs] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [routineFeedback, setRoutineFeedback] = useState([]);

  const [revenuePeriod, setRevenuePeriod] = useState("monthly");
  const [revenuePeriodLabel, setRevenuePeriodLabel] = useState("tháng");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const revenueMap = {
    "Hàng ngày": {
      api: "daily",
      label: "ngày"
    },
    "Hàng tuần": {
      api: "weekly",
      label: "tuần"
    },
    "Hàng tháng": {
      api: "monthly",
      label: "tháng"
    }
  };

  useMotionValueEvent(scrollYProgress, "change",);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchDailyRegister = async () => {
      try {
        const response = await axios.get("https://skincareapp.somee.com/SkinCare/Admin/users/reg-users-daily", {
          withCredentials: true
        });
        if (response.data && typeof response.data.count === "number") {
          setDailyRegister(response.data.count);
        }
      } catch (error) {
        console.error("Failed to fetch daily register count", error);
      }
    };

    fetchDailyRegister();
    const interval = setInterval(fetchDailyRegister, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchWeeklyRegister = async () => {
      try {
        const response = await axios.get("https://skincareapp.somee.com/SkinCare/Admin/users/reg-users-weekly", {
          withCredentials: true
        });
        if (response.data && typeof response.data.count === "number") {
          setWeeklyRegister(response.data.count);
        }
      } catch (error) {
        console.error("Failed to fetch weekly register count", error);
      }
    };

    fetchWeeklyRegister();
    const interval = setInterval(fetchWeeklyRegister, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchMonthlyRegister = async () => {
      try {
        const response = await axios.get("https://skincareapp.somee.com/SkinCare/Admin/users/reg-users-monthly", {
          withCredentials: true
        });
        if (response.data && typeof response.data.count === "number") {
          setMonthlyRegister(response.data.count);
        }
      } catch (error) {
        console.error("Failed to fetch monthly register count", error);
      }
    };

    fetchMonthlyRegister();
    const interval = setInterval(fetchMonthlyRegister, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchDailyLogin = async () => {
      try {
        const response = await axios.get("https://skincareapp.somee.com/SkinCare/Admin/users/count-login-daily", {
          withCredentials: true
        });
        if (response.data && typeof response.data.count === "number") {
          setDailyLogin(response.data.count);
        }
      } catch (error) {
        console.error("Failed to fetch monthly register count", error);
      }
    };

    fetchDailyLogin();
    const interval = setInterval(fetchDailyLogin, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchProfitMargin = async () => {
      try {
        const response = await axios.get("https://skincareapp.somee.com/SkinCare/Admin/revenue/monthly", {
          withCredentials: true
        });
        if (response.data && typeof response.data.total === "number") {
          setProfitMargin(response.data.total);
        }
      } catch (error) {
        console.error("Failed to fetch Profit", error);
      }
    };

    fetchProfitMargin();
    const interval = setInterval(fetchProfitMargin, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get(`https://skincareapp.somee.com/SkinCare/Admin/revenue/${revenuePeriod}`, {
          withCredentials: true,
        });

        const fetchedLogs = res.data.logs || [];
        const pendingLogs = fetchedLogs.filter(log => log.paymentStatus === "Pending");
        const completed = fetchedLogs.length - pendingLogs.length;
        const percent = fetchedLogs.length > 0
          ? ((completed / fetchedLogs.length) * 100)
          : 0;

        setLogs(fetchedLogs);
        setTotal(res.data.total || 0);
        setPendingCount(pendingLogs.length);
        setCompletedCount(completed);
        setProgressPercent(Number(percent.toFixed(1))); // round to 1 decimal
      } catch (err) {
        console.error("Failed to fetch revenue logs", err);
      }
    };

    fetchLogs();
    const interval = setInterval(fetchLogs, 10000);
    return () => clearInterval(interval);
  }, [revenuePeriod]);

  useEffect(() => {
    const fetchRoutineFeedback = async () => {
      try {
        const response = await axios.get("https://skincareapp.somee.com/SkinCare/Admin/routine-feedbacks", {
          withCredentials: true
        });
        console.log("Routine", response.data)
        if (response.data) {
          setRoutineFeedback(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch Routine Feedback", error);
      }
    };

    fetchRoutineFeedback();
    const interval = setInterval(fetchRoutineFeedback, 100000);
    return () => clearInterval(interval);
  }, []);

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
      [0.9, 1],
      ["0%", "0%"]
  )
  const size3 = useTransform(
      scrollYProgress,
      [0.9, 1],
      ["1", "1"]
  )
  const blurFilter3 = useTransform(
      scrollYProgress,
      [0.9, 1.5],
      ["1", "1"]
  )

  const position4 = useTransform(
      scrollYProgress,
      [0.9, 2],
      ["0%", "10%"]
  )
  const size4 = useTransform(
      scrollYProgress,
      [1, 2],
      ["1", "0.8"]
  )
  const blurFilter4 = useTransform(
      scrollYProgress,
      [1, 2],
      ["1", "0.5"]
  )
  const position5 = useTransform(
      scrollYProgress,
      [1, 1.5],
      ["0%", "10%"]
  )
  const size5 = useTransform(
      scrollYProgress,
      [1, 1.5],
      ["1", "0.8"]
  )
  const blurFilter5 = useTransform(
      scrollYProgress,
      [1, 2],
      ["1", "0.5"]
  )
  return (
    <div className='dashBoardPage'>
        <BGImage />
        <img src={skincareIcon2} alt="" className="misc2"/>
        <img src={skincareIcon3} alt="" className="misc3"/>
        <motion.div  className="dashBoardContainer"
              style={{y: position1, scale: size1, opacity: blurFilter1}}>
          <Header title="Trang quản trị" subtitle="Chào mừng bạn đến với bảng điều khiển" />
          
          <div className="counterContainer" >
            <Tracker icon={<AccountBox />} title="Đăng ký trong 24h qua" number={dailyRegister} />
            <Tracker icon={<AssignmentInd />} title="Đăng ký trong tuần này" number={weeklyRegister} />
            <Tracker icon={<PermContactCalendar />} title="Đăng ký trong tháng này" number={monthlyRegister} />
          </div>
          
        </motion.div >

        <motion.div  className="dashBoardContainer"
            style={{y: position2, scale: size2, opacity: blurFilter2}}>

            <div className="statistaContainer">
                <div className="statTitle">Doanh số</div>
                <span className="statSubTitle">Tổng quan doanh số</span>
                <div className="countTrackerContainer">
                  <div className="routine-feedbackContainer">
                    <h2>Phản hồi về AI Routine</h2>
                    <div className="routine-feedback-message-container">
                      {routineFeedback.length === 0 ? (
                        <div className="no-feedback-message">Chưa có phản hồi nào.</div>
                      ) : (
                        routineFeedback.map((feedback, index) => (
                          <>
                            <div key={feedback.id || index} className="feedback-card">
                            <div className="feedback-header">
                              <span className="feedback-username">{feedback.userName}</span>
                              <span className="feedback-email">{feedback.userEmail}</span>
                              <span className="feedback-message">{feedback.message}</span>
                            </div>
                            <div className="feedback-date">
                                {new Date(feedback.createdAt).toLocaleString('vi-VN')}
                            </div>
                          </div>
                          <div key={feedback.id || index} className="feedback-card">
                            <div className="feedback-header">
                              <span className="feedback-username">Nguyen Van A</span>
                              <span className="feedback-email">NguyenVanA@gmail.com</span>
                              <span className="feedback-message">Thông báo ở đâu, việc theo dõi thời gian biểu có nghiêm ngặt không, tôi có thể hủy hoặc trì hoãn nếu không thể tuân thủ không? Ví dụ như chuyện gì sẽ xảy ra nếu tôi không tuân thủ trong vài ngày liên tục? Kiểu như... tôi không hiểu rõ lắm.</span>
                            </div>
                            <div className="feedback-date">
                                {new Date(feedback.createdAt).toLocaleString('vi-VN')}
                            </div>
                          </div>
                          <div key={feedback.id || index} className="feedback-card">
                            <div className="feedback-header">
                              <span className="feedback-username">Nguyen Van B</span>
                              <span className="feedback-email">NguyenVanB@gmail.com</span>
                              <span className="feedback-message">Có thể cần cải thiện một chút. Như là cung cấp một số lời động viên khi tôi đạt được khoảng 60% tiến độ chẳng hạn :))</span>
                            </div>
                            <div className="feedback-date">
                                {new Date(feedback.createdAt).toLocaleString('vi-VN')}
                            </div>
                          </div>
                          <div key={feedback.id || index} className="feedback-card">
                            <div className="feedback-header">
                              <span className="feedback-username">Nguyen Van C</span>
                              <span className="feedback-email">NguyenVanC@gmail.com</span>
                              <span className="feedback-message">Đủ tốt rồi.</span>
                            </div>
                            <div className="feedback-date">
                                {new Date(feedback.createdAt).toLocaleString('vi-VN')}
                            </div>
                          </div>
                          <div key={feedback.id || index} className="feedback-card">
                            <div className="feedback-header">
                              <span className="feedback-username">Nguyen Van D</span>
                              <span className="feedback-email">NguyenVanD@gmail.com</span>
                              <span className="feedback-message">Rất tốt. Sẽ giới thiệu cho bạn bè của tôi</span>
                            </div>
                            <div className="feedback-date">
                                {new Date(feedback.createdAt).toLocaleString('vi-VN')}
                            </div>
                          </div>
                          <div key={feedback.id || index} className="feedback-card">
                            <div className="feedback-header">
                              <span className="feedback-username">Nguyen Van E</span>
                              <span className="feedback-email">NguyenVanE@gmail.com</span>
                              <span className="feedback-message">Ngày xửa ngày xưa, ở một vùng đất xa xôi, rất xa, có một cô gái trẻ xinh đẹp bị lạc đường trong chuyến hành trình. Khi mặt trời lặn và mặt trăng mọc, cô tình cờ gặp một lâu đài nguy nga. Sau khi gõ những cánh cửa đồ sộ và được dẫn vào bên trong, cô phát hiện ra đây chính là lâu đài của nhà vua của đất nước mà cô đã đi qua. Nhà vua đến gặp vị khách. Sau khi chào hỏi, cô gái tự xưng là công chúa của một nước láng giềng và xin được đối xử như hoàng gia.</span>
                            </div>
                            <div className="feedback-date">
                                {new Date(feedback.createdAt).toLocaleString('vi-VN')}
                            </div>
                          </div>
                          <div key={feedback.id || index} className="feedback-card">
                            <div className="feedback-header">
                              <span className="feedback-username">Nguyen Van B</span>
                              <span className="feedback-email">NguyenVanB@gmail.com</span>
                              <span className="feedback-message">Có thể cần cải thiện một chút. Như là cung cấp một số lời động viên khi tôi đạt được khoảng 60% tiến độ chẳng hạn :))</span>
                            </div>
                            <div className="feedback-date">
                                {new Date(feedback.createdAt).toLocaleString('vi-VN')}
                            </div>
                          </div>
                          <div key={feedback.id || index} className="feedback-card">
                            <div className="feedback-header">
                              <span className="feedback-username">Nguyen Van A</span>
                              <span className="feedback-email">NguyenVanA@gmail.com</span>
                              <span className="feedback-message">Thông báo ở đâu, việc theo dõi thời gian biểu có nghiêm ngặt không, tôi có thể hủy hoặc trì hoãn nếu không thể tuân thủ không? Ví dụ như chuyện gì sẽ xảy ra nếu tôi không tuân thủ trong vài ngày liên tục? Kiểu như... tôi không hiểu rõ lắm.</span>
                            </div>
                            <div className="feedback-date">
                                {new Date(feedback.createdAt).toLocaleString('vi-VN')}
                            </div>
                          </div>
                          <div key={feedback.id || index} className="feedback-card">
                            <div className="feedback-header">
                              <span className="feedback-username">Nguyen Van B</span>
                              <span className="feedback-email">NguyenVanB@gmail.com</span>
                              <span className="feedback-message">Có thể cần cải thiện một chút. Như là cung cấp một số lời động viên khi tôi đạt được khoảng 60% tiến độ chẳng hạn :))</span>
                            </div>
                            <div className="feedback-date">
                                {new Date(feedback.createdAt).toLocaleString('vi-VN')}
                            </div>
                          </div>
                          </>
                        ))
                      )}
                    </div>
                  </div>
                  <div className="trackerContainer" >
                    <SalesTracker icon={<BarChart />} number={profitMargin} title="Tổng doanh thu" profit="Lợi nhuận tháng này" available={true} currency={true}/>
                    <SalesTracker icon={<ListAlt />} number={weeklyRegister} title="Đăng ký hàng tuần" profit={`${dailyLogin} đăng nhập trong 24h qua`} available={true} />
                    <SalesTracker icon={<LocalMall />} number="00" title="Sản phẩm đã bán" profit="Currently No Data" available={false} />
                    <SalesTracker icon={<PersonOutline />} number={monthlyRegister} title="Người dùng mới" profit="+30% so với tháng trước" available={true} />
                  </div>
                </div>
            </div>
          
        </motion.div >

        <motion.div  className="dashBoardContainer"
              style={{y: position3, scale: size3, opacity: blurFilter3}}>
          <Header title="Excel Spreadsheets" subtitle="Tải excel để xem" />
          
          <div className="spreadsheetsContainer" >
            <ExcelAccess icon={<AccountBox />} title="Excel về người dùng" link="https://skincareapp.somee.com/SkinCare/Admin/users/excel" fname="users.xlsx" />
            <ExcelAccess icon={<MonetizationOn />} title="Excel về doanh thu hàng ngày" link="https://skincareapp.somee.com/SkinCare/Admin/revenue/daily/excel" fname="revenue-daily.xlsx" />
            <ExcelAccess icon={<MonetizationOn />} title="Excel về doanh thu hàng tuần" link="https://skincareapp.somee.com/SkinCare/Admin/revenue/weekly/excel" fname="revenue-weekly.xlsx" />
            <ExcelAccess icon={<MonetizationOn />} title="Excel về doanh thu hàng tháng" link="https://skincareapp.somee.com/SkinCare/Admin/revenue/monthly/excel" fname="revenue-monthly.xlsx" />
          </div>
          
        </motion.div >

        <motion.div  className="dashBoardContainer revenue"
            style={{y: position4, scale: size4, opacity: blurFilter4}}>
          <div className="revenue-title">
            <div className="revenue-title-header">Doanh thu hàng {revenuePeriodLabel}</div>
            <div className="revenue-total-profit"><div className="profitValue">{logs.length-pendingCount}  /  {logs.length}</div><span>Hoàn Tất</span></div>
            <div className="revenue-total-profit pending"><div className="profitValue">{pendingCount}  /  {logs.length}</div><span>Chưa Trả</span></div>
          </div>
          <div className="revenueProgress-card">
            <div className="revenueProgress-box">
              <h3>Tổng số giao dịch ({logs.length})</h3>
              <div className="revenueProgress-percent">
                <svg>
                  <circle cx="70" cy="70" r="70"></circle>
                  <circle cx="70" cy="70" r="70" style={{"--value": progressPercent}}></circle>
                </svg>
                    <div className="num">
                      <h2>{progressPercent}<span>%</span></h2>
                    </div>
              </div>
                  <h2 className="revenueProgress-text">{completedCount} / {logs.length}</h2>
            </div>
          </div>
          <div
            className={`swanky_wrapper ${isDropdownOpen ? 'open' : ''}`}
            ref={dropdownRef}
          >
            <div className="swanky_header" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <img src="..." alt="" />
              <span>Giai đoạn</span>
              <div className="lil_arrow" />
              <div className="bar" />
            </div>

            {isDropdownOpen && (
              <div className="swanky_wrapper__content">
                <ul>
                  {["Hàng ngày", "Hàng tuần", "Hàng tháng"].map((item, idx) => (
                    <li key={idx} onClick={() => {
                      setIsDropdownOpen(false);
                      const { api, label } = revenueMap[item];
                      setRevenuePeriod(api);
                      setRevenuePeriodLabel(label);
                    }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="revenue-slider revenue-auto-slider" style={{
            "--width": "300px",
            "--height": "200px",
            "--quantity": logs.length
          }}>
            {logs.length === 0 ? (
              <div className="no-revenue-data">Không có dữ liệu cho giai đoạn này.</div>
            ) : (
              <div className="list">
                {logs.map((log, i) => (
                  <div className="item" key={i} style={{ "--position": i + 1 }}>
                    <div className="revenue-card">
                      <div className="revenue-card-header">{log.userEmail}</div>
                      <div className="revenue-card-body">
                        <h5 className="revenue-card-title">{log.packageName}</h5>
                        <h3 className="revenue-card-profit">
                          {new Intl.NumberFormat('vi-VN').format(log.paymentAmount)}
                        </h3>
                        <p className="revenue-card-text">{log.paymentStatus}</p>
                        <p className="revenue-card-date">
                          {new Date(log.paymentDate).toLocaleString('vi-VN')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        <motion.div  className="dashBoardContainer"
            style={{y: position5, scale: size5, opacity: blurFilter5}}>
            <div className="chartContainer">
                <div className="chartTitle">Thu nhập</div>
                <span className="chartSubTitle">Tổng chi phí</span>
                
                <div className="progressGaugeContainer" >
                    <CompositionExample />
                    <div className='valuePercentage'>47%</div>
                </div>
            </div>

            <div className="lineChartContainer">
                <div className="chartTitle">Mức độ sử dụng AI</div>
                
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
