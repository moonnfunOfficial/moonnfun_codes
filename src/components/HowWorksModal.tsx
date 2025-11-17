import { useAppKitNetwork } from '@reown/appkit/react';
import { Modal } from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
const App: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [tabIndex, setTabIndex] = React.useState(0);
  const [tabIndex1, setTabIndex1] = React.useState(0);
  const [tabIndex2, setTabIndex2] = React.useState(0);
  const { switchNetwork, chainId } = useAppKitNetwork(); 

  let { t, i18n } = useTranslation();

  return (
    <div className=""> 
      <div className="flex justify-center items-center pt-16 h5:pt-10">
        <span className="text-center text-[14px] font-[500] cursor-pointer text-[#B3B3B3]
        hover:opacity-80 hover:text-[#fff]"
        onClick={() => {
          setOpen(true);
          }}>
          {t('8')}
        </span>
      </div>
      <Modal
        width={670}
        open={open}
        centered={true}
        onCancel={() => {
          setOpen(false);
        }}
        closable={false}
        footer={null}
        title={null}
        style={{
          border: "2px solid #fff",
          borderRadius: "20px",
          paddingBottom: "0px",
        }}
        destroyOnHidden={true}
      >
        <div className='p-[10px] pb-[20px] h5:px-[6px] h5:py-[14px]'>
          <div className="relative ">
            <div className=" text-[#FFFD41] text-[24px] font-[600] pb-10
            h5:text-[20px]
            ">
              {t('9')}
            </div>
            <div className="text-[#5F5F5F] text-[16px] font-[400]
            h5:text-[14px]
            ">
              {t('10')}
            </div>
          </div> 
          <svg
            className="absolute top-[18px] right-[18px] cursor-pointer"
            onClick={() => {
              setOpen(false);
            }} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 0C4.11429 0 0 4.11429 0 9C0 13.8857 4.11429 18 9 18C13.8857 18 18 13.8857 18 9C18 4.11429 13.8857 0 9 0ZM12.8571 11.5714C13.2429 11.9571 13.2429 12.4714 12.8571 12.7286C12.4714 13.1143 11.9571 13.1143 11.7 12.7286L9.12857 10.1571L6.42857 12.8571C6.04286 13.2429 5.52857 13.2429 5.14286 12.8571C4.75714 12.4714 4.75714 11.8286 5.14286 11.5714L7.84286 8.87143L5.27143 6.3C4.88571 6.04286 4.88571 5.52857 5.27143 5.14286C5.65714 4.75714 6.17143 4.75714 6.42857 5.14286L9 7.71429L11.7 5.01429C12.0857 4.62857 12.6 4.62857 12.9857 5.01429C13.3714 5.4 13.3714 5.91429 12.9857 6.3L10.2857 9L12.8571 11.5714Z" fill="#FFFD41" />
          </svg>
          <div className="pt-16">
            <div className="bg-[#2E2E2E] rounded-[12px] px-16 py-12">
              <div className="flex items-center cursor-pointer"
                onClick={() => {
                  setTabIndex(tabIndex === 1 ? 0 : 1);
                }
                }>
                <div className="flex-1 text-[#fff] font-[500] text-[16px]">{t('11')}</div>
                {
                  tabIndex === 1 ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                      <path d="M13.2717 7.63428H2.63418C2.18262 7.63428 1.81543 8.00146 1.81543 8.45303C1.81543 8.90459 2.18262 9.27178 2.63418 9.27178H13.2732C13.7248 9.27178 14.092 8.90459 14.092 8.45303C14.092 8.00146 13.7248 7.63428 13.2717 7.63428Z" fill="white" />
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 2C8.17681 2 8.34638 2.07024 8.4714 2.19526C8.59643 2.32029 8.66667 2.48986 8.66667 2.66667V7.33333H13.3333C13.5101 7.33333 13.6797 7.40357 13.8047 7.5286C13.9298 7.65362 14 7.82319 14 8C14 8.17681 13.9298 8.34638 13.8047 8.4714C13.6797 8.59643 13.5101 8.66667 13.3333 8.66667H8.66667V13.3333C8.66667 13.5101 8.59643 13.6797 8.4714 13.8047C8.34638 13.9298 8.17681 14 8 14C7.82319 14 7.65362 13.9298 7.5286 13.8047C7.40357 13.6797 7.33333 13.5101 7.33333 13.3333V8.66667H2.66667C2.48986 8.66667 2.32029 8.59643 2.19526 8.4714C2.07024 8.34638 2 8.17681 2 8C2 7.82319 2.07024 7.65362 2.19526 7.5286C2.32029 7.40357 2.48986 7.33333 2.66667 7.33333H7.33333V2.66667C7.33333 2.48986 7.40357 2.32029 7.5286 2.19526C7.65362 2.07024 7.82319 2 8 2Z" fill="white" />
                    </svg>
                }
              </div>
              <div className={`${tabIndex === 1 ? 'block' : 'hidden'}`}>
                <div className="text-[#5F5F5F] text-[16px] font-[400] pt-4
                      h5:text-[12px]
                      ">
                  1. {t('12')}
                </div>
                <div className="text-[#5F5F5F] text-[16px] font-[400]
                      h5:text-[12px]
                      ">
                  2. {t('13')}
                </div>
                <div className="text-[#5F5F5F] text-[16px] font-[400]
                      h5:text-[12px]
                      ">
                  3. {t('14')}
                </div>
              </div>
            </div>
            <div className="bg-[#2E2E2E] rounded-[12px] px-16 py-12 my-12">
              <div className="flex items-center cursor-pointer"
                onClick={() => {
                  setTabIndex1(tabIndex1 === 1 ? 0 : 1);
                }
                }>
                <div className="flex-1 text-[#fff] font-[500] text-[16px]">{t('15')}</div>
                {
                  tabIndex1 === 1 ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                      <path d="M13.2717 7.63428H2.63418C2.18262 7.63428 1.81543 8.00146 1.81543 8.45303C1.81543 8.90459 2.18262 9.27178 2.63418 9.27178H13.2732C13.7248 9.27178 14.092 8.90459 14.092 8.45303C14.092 8.00146 13.7248 7.63428 13.2717 7.63428Z" fill="white" />
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 2C8.17681 2 8.34638 2.07024 8.4714 2.19526C8.59643 2.32029 8.66667 2.48986 8.66667 2.66667V7.33333H13.3333C13.5101 7.33333 13.6797 7.40357 13.8047 7.5286C13.9298 7.65362 14 7.82319 14 8C14 8.17681 13.9298 8.34638 13.8047 8.4714C13.6797 8.59643 13.5101 8.66667 13.3333 8.66667H8.66667V13.3333C8.66667 13.5101 8.59643 13.6797 8.4714 13.8047C8.34638 13.9298 8.17681 14 8 14C7.82319 14 7.65362 13.9298 7.5286 13.8047C7.40357 13.6797 7.33333 13.5101 7.33333 13.3333V8.66667H2.66667C2.48986 8.66667 2.32029 8.59643 2.19526 8.4714C2.07024 8.34638 2 8.17681 2 8C2 7.82319 2.07024 7.65362 2.19526 7.5286C2.32029 7.40357 2.48986 7.33333 2.66667 7.33333H7.33333V2.66667C7.33333 2.48986 7.40357 2.32029 7.5286 2.19526C7.65362 2.07024 7.82319 2 8 2Z" fill="white" />
                    </svg>
                }
              </div>
              <div className={`${tabIndex1 === 1 ? 'block' : 'hidden'}`}>
                <div className="text-[#5F5F5F] text-[16px] font-[400] pt-4
                      h5:text-[12px]
                      ">
                  {t('16')}
                </div>
              </div>
            </div>
            <div className={`bg-[#2E2E2E] rounded-[12px] px-16 py-12 ${!!chainId ? 'block' : 'hidden'}`}>
              <div className="flex items-center cursor-pointer"
                onClick={() => {
                  setTabIndex2(tabIndex2 === 1 ? 0 : 1);
                }
                }>
                <div className="flex-1 text-[#fff] font-[500] text-[16px]">{chainId === 113329 || chainId === 1328 || chainId === 1329 ?
                  t('17') :
                  (chainId === 56 || chainId === 97) ? t('17_2') :
                    t('17_1')}
                </div>
                {
                  tabIndex2 === 1 ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                      <path d="M13.2717 7.63428H2.63418C2.18262 7.63428 1.81543 8.00146 1.81543 8.45303C1.81543 8.90459 2.18262 9.27178 2.63418 9.27178H13.2732C13.7248 9.27178 14.092 8.90459 14.092 8.45303C14.092 8.00146 13.7248 7.63428 13.2717 7.63428Z" fill="white" />
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 2C8.17681 2 8.34638 2.07024 8.4714 2.19526C8.59643 2.32029 8.66667 2.48986 8.66667 2.66667V7.33333H13.3333C13.5101 7.33333 13.6797 7.40357 13.8047 7.5286C13.9298 7.65362 14 7.82319 14 8C14 8.17681 13.9298 8.34638 13.8047 8.4714C13.6797 8.59643 13.5101 8.66667 13.3333 8.66667H8.66667V13.3333C8.66667 13.5101 8.59643 13.6797 8.4714 13.8047C8.34638 13.9298 8.17681 14 8 14C7.82319 14 7.65362 13.9298 7.5286 13.8047C7.40357 13.6797 7.33333 13.5101 7.33333 13.3333V8.66667H2.66667C2.48986 8.66667 2.32029 8.59643 2.19526 8.4714C2.07024 8.34638 2 8.17681 2 8C2 7.82319 2.07024 7.65362 2.19526 7.5286C2.32029 7.40357 2.48986 7.33333 2.66667 7.33333H7.33333V2.66667C7.33333 2.48986 7.40357 2.32029 7.5286 2.19526C7.65362 2.07024 7.82319 2 8 2Z" fill="white" />
                    </svg>
                }
              </div>
              <div className={`${tabIndex2 === 1 ? 'block' : 'hidden'}`}>
                <div className="text-[#5F5F5F] text-[16px] font-[400] pt-4
                      h5:text-[12px]
                      ">
                  1. 100% {t('18')} 
                  {chainId === 113329 || chainId === 1328 || chainId === 1329 ? t("18_1") :
                    (chainId === 56 || chainId === 97) ? t('17_2') :
                      t('18_2')}
                  {t('18_3')}
                </div>
                <div className="text-[#5F5F5F] text-[16px] font-[400]
                      h5:text-[12px]
                      ">
                  2. {t('19')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;