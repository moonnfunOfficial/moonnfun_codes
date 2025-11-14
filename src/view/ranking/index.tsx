import React, { useEffect, useState } from 'react';
import FooterBar from '../../components/footerBar';
import TopBar from '../../components/topBar';
import ranking1 from "../../assets/image/ranking1.png"
import ranking2 from "../../assets/image/ranking2.png"
import ranking3 from "../../assets/image/ranking3.png"
import icon1 from "../../assets/image/icon1.png"
import { useNavigate } from 'react-router-dom';
import MarketCap from "./components/marketCap"
import Volume from "./components/volume"
import { getFormattedTime, isMobile } from '../../utils/tool';
import { useTranslation } from 'react-i18next';

const App: React.FC = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState('-');
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getFormattedTime());
    }, 1000);

    return () => clearInterval(timer); 
  }, []);
  const [tabIndex, setTabIndex] = useState(0);

  let { t, i18n } = useTranslation();

  return (
    <div className="w-full">
      <TopBar />
      <div className="pt-[104px] w-[1200px] mx-auto h5:w-full h5:pt-[64px]">
        <div className="text-[30px] font-bold text-[#FFFD41] text-center hidden
            h5:block h5:px-16">{t('50')}</div>
        <div className="flex justify-center mb-[30px]
         h5:px-16 h5:mb-[0px]">
          <img src={icon1} className='w-[118px] h5:w-[82px] h5:h-[75px]' alt="" />
          <div className="mx-[60px] whitespace-nowrap h5:mx-16 h5:mt-10 ">
            <div className="text-[40px] font-bold text-[#FFFD41] text-center 
            h5:hidden">{t('50')}</div>
            <div className="text-[14px] text-[#5F5F5F] text-center">
              {t('51')} &nbsp;
              <div className="hidden h5:block"></div>
              {currentTime}
              &nbsp;(UTC+8)</div>
          </div>
          <img src={icon1} className='w-[118px] h5:w-[82px] h5:h-[75px]' alt="" />
        </div>
        <div className="hidden bg-[#1E1E1E] mt-[30px] rounded-t-[20px] pt-14 mx-16 h5:block">
          <div className="flex items-center"
            style={{
              borderBottom: '1px solid #FFFD41',
            }}>
            <div className="flex-[44%] flex items-center justify-center pb-8 text-[14px] font-[600] pl-2"
              style={{
                color: tabIndex === 0 ? '#FFFD41' : '#636443',
                borderBottom: tabIndex === 0 ? '1px solid #FFFD41' : '1px solid transparent',
              }}
              onClick={() => {
                setTabIndex(0)
              }}>
              {t('52')}
            </div>
            <div className="flex items-center justify-center flex-[56%] pb-8 text-[14px] font-[600]"
              style={{
                color: tabIndex === 1 ? '#FFFD41' : '#636443',
                borderBottom: tabIndex === 1 ? '1px solid #FFFD41' : '1px solid transparent',
              }}
              onClick={() => {
                setTabIndex(1)
              }}>
              {t('53')}
            </div>
          </div>
        </div>
        <div className="flex items-start mb-[30px] relative z-10 h5:px-16">
          {
            isMobile() && tabIndex === 0 ?
              <MarketCap />
              : isMobile() && tabIndex === 1 ?
                <Volume /> :
                <>
                  <MarketCap />
                  <Volume />
                </>
          }
        </div>
      </div>
      <div className="w-full h-[100px] h5:hidden"></div>
      <FooterBar index={1} />

    </div >
  );
}

export default App;