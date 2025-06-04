import { useEffect, useState } from 'react';
import { AccountBox } from '@mui/icons-material';

import './ProfilePage.css';
import BGImage from '../../components/BGImage/BGImage';

export default function ProfilePage() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedName = sessionStorage.getItem("username");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  return (
    <div className='profilePage'>
      <BGImage />
      <AccountBox /> {userName}
    </div>
  );
}
