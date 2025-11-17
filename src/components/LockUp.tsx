import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const ComponentName: React.FC = () => {
  const { t } = useTranslation();
  const [isIndex, setIsIndex] = React.useState(false);
  useEffect(() => { 
    const currentUrl = window.location.pathname;
    if (currentUrl === '/') {
      setIsIndex(true)
    } else {
      setIsIndex(false)
    }
  }, [window.location.href]);
  return (
    <div className="">

      <div className="absolute top-[-400px] right-[-400px]  h5:hidden
    z-0 w-[628px] h-[628px] bg-[#7BFF48] rounded-full"
        style={{
          top: isIndex ? '1000px' : '-400px',
          filter: 'blur(150px)'
        }}
      ></div>
      <div className="absolute top-[250px] left-[-500px]  h5:hidden
    z-0 w-[628px] h-[628px] bg-[#FFFEAB] rounded-full"
        style={{
          top: isIndex ? '1700px' : '250px',
          filter: 'blur(150px)'
        }}
      ></div>
      <div className="absolute top-[1120px] right-[-430px]  h5:hidden
    z-0 w-[628px] h-[628px] bg-[#FFFEAB] rounded-full"
        style={{
          top: isIndex ? '2820px' : '1120px',
          filter: 'blur(150px)'
        }}
      ></div>
      <div className="absolute top-[1920px] left-[-500px]  h5:hidden
    z-0 w-[628px] h-[628px] bg-[#7BFF48] rounded-full"
        style={{
          top: isIndex ? '3600px' : '1920px',
          filter: 'blur(150px)'
        }}
      >2323</div>
    </div>
  );
};

export default ComponentName;
