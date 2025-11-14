import { Popover } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface MyComponentProps {
  RefreshBack?: any;
  ResetBack?: any;
}
const App: React.FC<MyComponentProps> = ({ RefreshBack, ResetBack }) => {
  const [tabIndex, setTabIndex] = React.useState(0);
  const [openPopover, setOpenPopover] = useState(false);

  const handleClearAll = () => {
    setMarketCap1("")
    setMarketCap2("")
    setVolume1("")
    setVolume2("")
    setHolders1("")
    setHolders2("")
  }
  const handleSearch = () => {
    const popover: any = document.getElementsByClassName('ant-popover')[0];
    if (popover) {
      // popover.style.left = '-1000px'; 
      setOpenPopover(false)
    }
    ResetBack({
      marketCap1: marketCap1,
      marketCap2: marketCap2,
      volume1: volume1,
      volume2: volume2,
      holders1: holders1,
      holders2: holders2
    })
  }

  let { t, i18n } = useTranslation();
  const [marketCap1, setMarketCap1] = useState<any>("");
  const [marketCap2, setMarketCap2] = useState<any>("");
  const [volume1, setVolume1] = useState<any>("");
  const [volume2, setVolume2] = useState<any>("");
  const [holders1, setHolders1] = useState<any>("");
  const [holders2, setHolders2] = useState<any>("");
  const _content = (
    <div className='p-6'>
      <div >
        <div className="text-[#62573A] text-[14px] font-[500]">{t('66')}(USD)</div>
        <div className="flex items-center mb-24 mt-6">
          <div className="flex items-center bg-[#fff] rounded-full px-12 py-6 text-[#DCD8CB] text-[14px] font-[500]">
            <input type="text"
              value={marketCap1} onChange={(e) => setMarketCap1(e.target.value)}
              className='w-[76px] text-[#62573A] text-[14px] font-[500]' placeholder={t('67')} />
            K
          </div>
          <div className="text-[#62573A] text-[14px] font-[500] mx-8">{t('66_1')}</div>
          <div className="flex items-center bg-[#fff] rounded-full px-12 py-6 text-[#DCD8CB] text-[14px] font-[500]">
            <input type="text"
              value={marketCap2} onChange={(e) => setMarketCap2(e.target.value)}
              className='w-[76px] text-[#62573A] text-[14px] font-[500]' placeholder={t('68')} />
            K
          </div>
        </div>
      </div>
      <div >
        <div className="text-[#62573A] text-[14px] font-[500]">{t('69')}(USD)</div>
        <div className="flex items-center mb-24 mt-6">
          <div className="flex items-center bg-[#fff] rounded-full px-12 py-6 text-[#DCD8CB] text-[14px] font-[500]">
            <input type="text"
              value={volume1} onChange={(e) => setVolume1(e.target.value)}
              className='w-[76px] text-[#62573A] text-[14px] font-[500]' placeholder={t('67')} />
            K
          </div>
          <div className="text-[#62573A] text-[14px] font-[500] mx-8">{t('66_1')}</div>
          <div className="flex items-center bg-[#fff] rounded-full px-12 py-6 text-[#DCD8CB] text-[14px] font-[500]">
            <input type="text"
              value={volume2} onChange={(e) => setVolume2(e.target.value)}
              className='w-[76px] text-[#62573A] text-[14px] font-[500]' placeholder={t('68')} />
            K
          </div>
        </div>
      </div>
      <div >
        <div className="text-[#62573A] text-[14px] font-[500]">{t('70')}</div>
        <div className="flex items-center mb-24 mt-6">
          <div className="flex items-center bg-[#fff] rounded-full px-12 py-6 text-[#DCD8CB] text-[14px] font-[500]">
            <input type="text"
              value={holders1} onChange={(e) => setHolders1(e.target.value)}
              className='w-[76px] text-[#62573A] text-[14px] font-[500]' placeholder={t('67')} />
            K
          </div>
          <div className="text-[#62573A] text-[14px] font-[500] mx-8">{t('66_1')}</div>
          <div className="flex items-center bg-[#fff] rounded-full px-12 py-6 text-[#DCD8CB] text-[14px] font-[500]">
            <input type="text"
              value={holders2} onChange={(e) => setHolders2(e.target.value)}
              className='w-[76px] text-[#62573A] text-[14px] font-[500]' placeholder={t('68')} />
            K
          </div>
        </div>
      </div>
      <div className="text-[#F47126] text-[14px] font-[500] text-center cursor-pointer"
        onClick={handleClearAll}
      >{t('71')}</div>
      <div className="flex items-center justify-between mt-24">
        <div className="hover-effect cursor-pointer text-[#fff] text-[14px] font-[500] bg-[#999] rounded-full px-[32px] py-8"
          onClick={() => {
            const popover: any = document.getElementsByClassName('ant-popover')[0];
            if (popover) {
              // popover.style.left = '-1000px';
              setOpenPopover(!openPopover)
            }
          }}
        >{t('72')}</div>
        <div
          onClick={handleSearch}
          className="hover-effect cursor-pointer text-[#fff] text-[14px] font-[500] bg-[#F47126] rounded-full px-[32px] py-8">{t('73')}</div>
      </div>
    </div>
  )

  return (
    <div className="hidden bg-[#FBF8EF] rounded-t-[20px] h5:block">
      <div className="flex items-center"
        style={{
          borderBottom: '1px solid #DDD9CD',
        }}>
        <div className="flex-1 flex items-center pr-20">
          <div className="flex items-center  pb-8 text-[14px] font-[600] pl-2 mr-[18px]"
            style={{
              color: tabIndex === 0 ? '#F47126' : '#62573A',
              borderBottom: tabIndex === 0 ? '1px solid #F47126' : '1px solid transparent',
            }}
            onClick={() => {
              setTabIndex(0)
              RefreshBack(0)
            }}>
            {t('56')}
          </div>
          <div className="flex items-center pb-8 text-[14px] font-[600]"
            style={{
              color: tabIndex === 1 ? '#F47126' : '#62573A',
              borderBottom: tabIndex === 1 ? '1px solid #F47126' : '1px solid transparent',
            }}
            onClick={() => {
              setTabIndex(1)
              RefreshBack(1)
            }}>
            {t('74')}
          </div>
        </div>
        <svg
          onClick={() => {
            ResetBack()
          }}
          className='mr-8 mb-8' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M13.9952 6.11642H11.2979C11.2161 6.11643 11.1351 6.10033 11.0596 6.06905C10.984 6.03776 10.9154 5.9919 10.8575 5.93408C10.7997 5.87626 10.7538 5.80761 10.7225 5.73206C10.6912 5.65651 10.6751 5.57553 10.6751 5.49375C10.6751 5.41197 10.6912 5.331 10.7225 5.25544C10.7538 5.17989 10.7997 5.11125 10.8575 5.05342C10.9154 4.9956 10.984 4.94974 11.0596 4.91845C11.1351 4.88717 11.2161 4.87107 11.2979 4.87108H12.3812C11.884 4.16552 11.2244 3.58989 10.458 3.19273C9.69168 2.79557 8.84105 2.58853 7.97789 2.58908C6.91095 2.58922 5.86802 2.90572 4.98096 3.49857C4.0939 4.09143 3.40255 4.93401 2.99434 5.91976C2.58614 6.90552 2.4794 7.99019 2.68763 9.03661C2.89586 10.083 3.4097 11.0442 4.16419 11.7986C4.91867 12.553 5.87991 13.0667 6.92636 13.2748C7.9728 13.4829 9.05745 13.376 10.0432 12.9677C11.0289 12.5594 11.8714 11.8679 12.4641 10.9808C13.0568 10.0937 13.3732 9.05069 13.3732 7.98375C13.3705 7.90031 13.3846 7.81717 13.4146 7.73928C13.4447 7.66139 13.4901 7.59034 13.5481 7.53035C13.6062 7.47036 13.6757 7.42266 13.7526 7.39008C13.8294 7.3575 13.9121 7.34071 13.9956 7.34071C14.079 7.34071 14.1617 7.3575 14.2385 7.39008C14.3154 7.42266 14.3849 7.47036 14.443 7.53035C14.5011 7.59034 14.5465 7.66139 14.5765 7.73928C14.6065 7.81717 14.6206 7.90031 14.6179 7.98375C14.6179 11.6504 11.6446 14.6238 7.97789 14.6238C4.31122 14.6238 1.33789 11.6504 1.33789 7.98375C1.33789 4.31708 4.31122 1.34375 7.97789 1.34375C9.03359 1.34325 10.0741 1.59519 11.0126 2.07855C11.9512 2.56192 12.7606 3.26269 13.3732 4.12242V3.00375C13.3705 2.92031 13.3846 2.83717 13.4146 2.75928C13.4447 2.68139 13.4901 2.61034 13.5481 2.55035C13.6062 2.49036 13.6757 2.44266 13.7526 2.41008C13.8294 2.3775 13.9121 2.36071 13.9956 2.36071C14.079 2.36071 14.1617 2.3775 14.2385 2.41008C14.3154 2.44266 14.3849 2.49036 14.443 2.55035C14.5011 2.61034 14.5465 2.68139 14.5765 2.75928C14.6065 2.83717 14.6206 2.92031 14.6179 3.00375V5.49375C14.6179 5.65889 14.5523 5.81727 14.4355 5.93404C14.3187 6.05082 14.1604 6.11642 13.9952 6.11642Z" fill="#62573A" />
        </svg>
        <Popover content={_content} color="#FDFBF5" trigger="hover" placement="bottomRight" open={openPopover}
          onOpenChange={(open) => {
            setOpenPopover(open)
          }}
        >
          <svg className='mb-8'
            onClick={() => {
              setOpenPopover(!openPopover)
            }}
            xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M14.4675 3.30637C14.4547 3.32396 14.4243 3.34154 14.4083 3.35593L10.5454 7.18685V13.4784C10.5454 14.2027 9.99061 14.7911 9.26472 14.7911C8.92894 14.7911 8.64434 14.6632 8.39972 14.433C8.38183 14.4214 8.36522 14.408 8.35015 14.393L7.2757 13.3314C7.143 13.2002 7.14141 12.9876 7.27251 12.8533L7.7298 12.3928C7.8593 12.2665 8.06714 12.2649 8.19827 12.3912L9.17998 13.4081C9.19436 13.4209 9.20076 13.4337 9.21834 13.4497C9.20875 10.7492 9.20556 7.5338 9.20556 6.89107V6.77754C9.20556 6.68801 9.2855 6.59687 9.34947 6.53451L13.4778 2.44138C13.489 2.42698 13.5017 2.38701 13.5145 2.38701H2.49825C2.51105 2.38701 2.50944 2.42538 2.51903 2.43977L6.58819 6.5409C6.65214 6.60485 6.65853 6.6896 6.65853 6.77913V9.47005C6.65853 9.47326 6.66812 9.47806 6.66812 9.48124C6.66014 9.84579 6.37553 10.1352 6.01739 10.1352C5.65284 10.1352 5.31708 9.83779 5.31708 9.47326V7.18685L1.52933 3.34954C1.51495 3.33515 1.53892 3.31116 1.52773 3.29516C1.29589 3.04735 1.16639 2.72118 1.16798 2.38221C1.16798 1.65793 1.75637 1.04395 2.47908 1.04395H13.5353C13.8855 1.04395 14.2149 1.20545 14.4627 1.45326C14.7105 1.70109 14.8384 2.04326 14.8384 2.39341C14.8352 2.73076 14.6993 3.06173 14.4675 3.30637ZM6.06536 10.4038C6.46827 10.4182 6.78325 10.7556 6.76886 11.1585C6.75608 11.5422 6.44748 11.8492 6.06536 11.862C5.66244 11.8476 5.34745 11.5102 5.36184 11.1073C5.37464 10.7252 5.68162 10.4166 6.06536 10.4038Z" fill="#62573A" />
          </svg>
        </Popover>
      </div>
    </div>
  );
}

export default App;