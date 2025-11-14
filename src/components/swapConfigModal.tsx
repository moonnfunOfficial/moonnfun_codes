import { Modal } from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { defaultSlippage } from "../config"

interface MyComponentProps {
  open: boolean;
  refreshTrades: any;
}
const App: React.FC<MyComponentProps> = ({ open, refreshTrades }) => {
  const [maxSlippage, setMaxSlippage]: any = React.useState(localStorage.getItem('maxSlippage') ?? '');

  let { t, i18n } = useTranslation();
  useEffect(() => {
    if (localStorage.getItem('maxSlippage')) {
      setMaxSlippage(localStorage.getItem('maxSlippage') ?? defaultSlippage);
    }
  }, [open])
  return (
    <div className="">
      <Modal
        width={670}
        open={open}
        centered={true}
        onCancel={() => {
          refreshTrades();
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
            <div className=" text-[#FFFD41] text-[24px] font-[600] pb-20
            h5:text-[20px] h5:pb-14 h5:leading-6
            ">
              {t('62')}
            </div>
          </div>
          <svg 
            className="absolute top-[18px] right-[18px] cursor-pointer"
            onClick={() => {
              refreshTrades();
            }}
            xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 0C4.11429 0 0 4.11429 0 9C0 13.8857 4.11429 18 9 18C13.8857 18 18 13.8857 18 9C18 4.11429 13.8857 0 9 0ZM12.8571 11.5714C13.2429 11.9571 13.2429 12.4714 12.8571 12.7286C12.4714 13.1143 11.9571 13.1143 11.7 12.7286L9.12857 10.1571L6.42857 12.8571C6.04286 13.2429 5.52857 13.2429 5.14286 12.8571C4.75714 12.4714 4.75714 11.8286 5.14286 11.5714L7.84286 8.87143L5.27143 6.3C4.88571 6.04286 4.88571 5.52857 5.27143 5.14286C5.65714 4.75714 6.17143 4.75714 6.42857 5.14286L9 7.71429L11.7 5.01429C12.0857 4.62857 12.6 4.62857 12.9857 5.01429C13.3714 5.4 13.3714 5.91429 12.9857 6.3L10.2857 9L12.8571 11.5714Z" fill="#FFFD41" />
          </svg> 
          <div className="">
            <div className="text-[#fff] text-[16px] font-[500]">{t('63')}</div>
            <input type="text"
              placeholder={`${defaultSlippage}%`}
              value={maxSlippage}
              onChange={(e) => {
                console.log(e);

                // setMaxSlippage(e.target.value); 
                let val = e.target.value
                if (val === '') {
                  setMaxSlippage('')
                  return
                } 
                if (!/^\d*\.?\d*$/.test(val)) return 
                const decimalMatch = val.match(/^\d+(\.\d{0,2})?/)
                if (decimalMatch) {
                  setMaxSlippage(decimalMatch[0])
                }
                if (isNaN(Number(maxSlippage)) || Number(maxSlippage) <= 1) {
                  // setMaxSlippage(1.1)
                }
              }}
              className='h-[48px] w-full px-[10px] my-6 bg-[#2E2E2E] rounded-lg text-[#fff] text-[16px] font-[600]' />
            <div className="text-[#5F5F5F] text-[16px] font-[400] mb-[70px] h5:mb-[20px]">{t('64')}: 5%</div>
            <div className="bg-[#FFFD41] text-[#1E1E1E] text-[20px] font-[500] text-center rounded-full py-10 cursor-pointer
            h5:text-[16px] h5:h-[46px] h5:flex h5:items-center h5:justify-center 
            "
              onClick={() => {
                if (!maxSlippage) {
                  setMaxSlippage(1.1)
                }
                const _val: any = Number(maxSlippage) < 1.1 ? 1.1 : Number(maxSlippage)
                localStorage.setItem('maxSlippage', _val);
                setMaxSlippage('')
                refreshTrades();
              }}
            >{t('65')}</div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;