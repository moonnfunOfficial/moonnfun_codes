import React, { useEffect, useState } from 'react';
import TopBar from '../../components/topBar';
import FooterBar from '../../components/footerBar'; 
import { submitSupport, userDetail } from '../../API';
import { containsScript, showLoding } from '../../utils/tool';
import { useTranslation } from 'react-i18next';
import { useAppKit, useAppKitAccount, useDisconnect } from '@reown/appkit/react'; 
import copy from 'copy-to-clipboard';
import { notification } from 'antd';

const App: React.FC = () => { 
  const [name, setName] = useState('') 
  const [description, setDescription] = useState('')
  const [website, setWebsite] = useState('')
  const [twitter, setTwitter] = useState('') 
  const [email, setEmail] = useState('')
  const { open: openModal, close } = useAppKit();
  const { address: web3ModalAccount, isConnected } = useAppKitAccount();
  const [isSupport, setIsSupport] = useState('')

  const handleSubmit = async () => {  
    const fieldsToCheck: any = { name, description, website, twitter, email }; 
    const hasIllegalScript = Object.values(fieldsToCheck).some(containsScript);
    if (hasIllegalScript) {
      return notification.open({
        message: t('202'),
        key: 'Illegal parameters',
      });
    }
    if (!web3ModalAccount) {
      openModal();
      return
    }
    if (!name || !website || !description) { return } 
    showLoding(true)
    submitSupport({
      name: name, 
      description: description, 
      website: website,
      twitter: twitter,
      email: email, 
    }).then((res: any) => {
      setIsSupport(res.data?.key) 
      showLoding(false)
    }).catch((err: any) => {
      console.log(err);
      showLoding(false)
    })
  } 
  let { t, i18n } = useTranslation();   
  const handleInfo = () => {
    userDetail({
          address: web3ModalAccount
        }).then((res: { data: any; }) => {
          setIsSupport(res.data?.key) 
        }).catch((err: any) => {
          console.log(err);
        })
  }
  useEffect(() => {
    if(!web3ModalAccount) return
    handleInfo()
  }, [web3ModalAccount])

  return (
    <div className="w-full">
      <TopBar />
      <div className="pt-[104px] w-[740px] mx-auto
      h5:w-full h5:pt-[64px] h5:px-[16px]
      ">
        <div className="text-center text-[40px] text-[#FFFD41] font-bold pb-[60px]
        h5:text-[30px] h5:pb-[24px]">{t('161')}</div> 
        
        <div className='mt-[0px] mb-[260px]'
            style={{
              display: isSupport ? 'block' : 'none',
            }}>
          <div className="text-[18px] text-[#fff] font-[500] flex items-center
              h5:text-[14px]
              ">
            key
          </div>
          <div className='w-full h-[50px] bg-[#1E1E1E] px-16 flex items-center rounded-[10px] mt-[6px]'>
            <div className='w-full bg-transparent text-[16px] text-[#fff] font-[600]
              h5:text-[14px]'>{isSupport}</div>
            <svg className='cursor-pointer' 
                onClick={() => { 
                    copy(isSupport) 
                    notification.open({
                        message: t("Copied successfully"),
                    });
                }}
                xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <g clipPath="url(#clip0_1304_9230)">
                    <path d="M14.4 12.8H12.8V14.4C12.8 15.28 12.08 16 11.2 16H1.6C0.72 16 0 15.28 0 14.4V4.8C0 3.92 0.72 3.2 1.6 3.2H3.2V1.6C3.2 0.72 3.92 0 4.8 0H14.4C15.28 0 16 0.72 16 1.6V11.2C16 12.08 15.28 12.8 14.4 12.8ZM2.4 4.8C1.92 4.8 1.6 5.12 1.6 5.6V13.6C1.6 14.08 1.92 14.4 2.4 14.4H10.4C10.88 14.4 11.2 14.08 11.2 13.6V5.6C11.2 5.12 10.88 4.8 10.4 4.8H2.4ZM14.4 2.4C14.4 1.92 14.08 1.6 13.6 1.6H5.6C5.12 1.6 4.8 1.92 4.8 2.4V3.2H11.2C12.08 3.2 12.8 3.92 12.8 4.8V11.2H13.6C14.08 11.2 14.4 10.88 14.4 10.4V2.4Z" fill="black"/>
                </g>
                <defs>
                    <clipPath id="clip0_1304_9230">
                    <rect width="16" height="16" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
          </div>
          <div className="pt-[36px]">
            <div className="text-[14px] text-[#5F5F5F] font-[500] flex items-start">
                1. 
              <span className='text-[14px] text-[#5F5F5F] font-[500] pl-4'>{t('164')}</span>
            </div>
            <div className="text-[14px] text-[#5F5F5F] font-[500] flex items-start my-6">
                2. 
              <span className='text-[14px] text-[#5F5F5F] font-[500] pl-4'>{t('165')}</span>
            </div>
            <div className="text-[14px] text-[#5F5F5F] font-[500] flex items-start">
                3. 
              <span className='text-[14px] text-[#5F5F5F] font-[500] pl-4'>{t('166')}</span>
            </div>
          </div>
        </div>  
        <div className={`${isSupport ? 'hidden' : 'block'}`}>
            <div className='mt-[0px]'>
            <div className="text-[18px] text-[#fff] font-[500] flex items-center
                h5:text-[14px]
                ">
                {t('162')}
                <span className='text-[18px] text-[#D62727] font-[500] ml-4 relative top-[2px]'>*</span>
            </div>
            <div className='w-full h-[50px] bg-[#1E1E1E] px-16 flex items-center rounded-[10px] mt-[6px]'>
                <input type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='w-full bg-transparent text-[16px] text-[#fff] font-[600]
                h5:text-[14px]
                ' />
            </div>
            </div> 
            <div className='mt-[20px]'>
            <div className="text-[18px] text-[#fff] font-[500] flex items-center
                h5:text-[14px]
                ">
                {t('41')}
                <span className='text-[18px] text-[#D62727] font-[500] ml-4 relative top-[2px]'>*</span>
            </div>
            <div className='w-full bg-[#1E1E1E] px-16 py-10 flex items-center rounded-[10px] mt-[6px]'>
                <textarea
                value={description}
                onChange={(e) => {
                    if (e.target.value.length <= 100)
                    setDescription(e.target.value)
                }}
                className='w-full h-[80px] bg-transparent text-[16px] text-[#fff] font-[600] 
                h5:text-[14px]
                ' />
            </div>
            </div> 
            <div className='mt-[20px]'>
            <div className="text-[18px] text-[#fff] font-[500] flex items-center
                h5:text-[14px]
                ">
                {t('44')}
                <span className='text-[18px] text-[#D62727] font-[500] ml-4 relative top-[2px]'>*</span>
            </div>
            <div className='w-full h-[50px] bg-[#1E1E1E] px-16 flex items-center rounded-[10px] mt-[6px]'>
                <input type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className='w-full bg-transparent text-[16px] text-[#fff] font-[600]
                h5:text-[14px]
                ' />
            </div>
            </div>
            <div className='mt-[20px]'>
            <div className="text-[18px] text-[#fff] font-[500] flex items-center
                h5:text-[14px]
                ">
                {t('45')} {t('137')}
            </div>
            <div className='w-full h-[50px] bg-[#1E1E1E] px-16 flex items-center rounded-[10px] mt-[6px]'>
                <input type="text"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                className='w-full bg-transparent text-[16px] text-[#fff] font-[600]
                h5:text-[14px]
                ' />
            </div>
            </div>
            <div className='mt-[20px] mb-[40px]'>
            <div className="text-[18px] text-[#fff] font-[500] flex items-center
                h5:text-[14px]
                ">
                {t('163')} {t('137')}
            </div>
            <div className='w-full h-[50px] bg-[#1E1E1E] px-16 flex items-center rounded-[10px] mt-[6px]'>
                <input type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full bg-transparent text-[16px] text-[#fff] font-[600]
                h5:text-[14px]
                ' />
            </div>
            </div>  
          <div className="hover-effect bg-[#FFFD41] text-[#1E1E1E] text-[20px] font-[600] text-center justify-center rounded-full py-10 cursor-pointer
            h5:text-[16px] h5:h-[46px]
            "
            style={{
                cursor: name && website && description ? "pointer" : "not-allowed",
                opacity: name && website && description ? 1 : 0.5
            }}
            onClick={handleSubmit}>
            {web3ModalAccount ? t('Confirm') : t('0')}
            </div>
        </div>
      </div>
      <FooterBar index={1} /> 
    </div>
  );
}

export default App;