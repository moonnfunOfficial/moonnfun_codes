import { Modal, Pagination, Popover, notification } from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { defaultSlippage } from "../../../config"
import logo2 from "../../../assets/image/logo2.png"
import { formatAmount, isMobile, showLoding, timestampToDateString } from '../../../utils/tool';
import { useAppKitAccount, useAppKitNetwork } from '@reown/appkit/react';
import { getInsureClaim, getInsureDetail, getInsureList } from '../../../API';
import { getQueryParam } from '../../../utils/getUrlParamsLegacy';
import { Contracts } from '../../../web3';
import NoData from '../../../components/NoData';
import { chainCoinName } from '../../coinName';

interface MyComponentProps {
  open: boolean;
  refreshTrades: any;
  info: any
}
const App: React.FC<MyComponentProps> = ({ open, refreshTrades, info: coinInfo }) => {  
  const { switchNetwork, chainId } = useAppKitNetwork(); 
  let { t, i18n } = useTranslation();
  const _address: any = getQueryParam("address")
  const [info, setInfo]: any = React.useState();
  const handleDetail = () => {
    getInsureDetail({
      address: web3ModalAccount,
      tokenAddress: _address
    }).then((res) => {
      setInfo(res.data)
    }).catch((err) => {

    })
  }
  const { address: web3ModalAccount, isConnected } = useAppKitAccount();
  useEffect(() => { 
    if (!!web3ModalAccount) {
      handleDetail()
    }
  }, [open, web3ModalAccount])

  const [open1, setOpen1] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  const [pageNum, setPageNum] = React.useState(1);
  const [list, setList]: any = React.useState([])
  const handleGetList = async (status: string, kind: string) => {
    //status: issued已发放, claimed已领取
    showLoding(true)
    await getInsureList({
      address: web3ModalAccount,
      tokenAddress: _address,
      status: status,
      kind: kind,
      offset: pageNum,
      limit: 20
    }).then((res) => {
      setList(res.data.data)
      setTotal(res.data.total)
    }).catch((err) => {
    }).finally(() => {
      showLoding(false)
    })
  }

  useEffect(() => {
    if (!!web3ModalAccount) {
      handleGetList(open1 ? 'issued' : "claimed", open1 ? 'issued' : open2 ? 'ju' : 'rate')
    }
  }, [pageNum, web3ModalAccount])

  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);

  const handleClaim = () => {
    if (!web3ModalAccount || Number(info?.issuedAmountTotal || 0) === 0) {
      return
    }
    showLoding(true)
    getInsureClaim({
      tokenAddress: _address,
      address: web3ModalAccount,
    }).then(async (data: any) => {
      if (data?.data) {
        await Contracts.example?.claimToken(data?.data, web3ModalAccount).then((res: any) => {
          refreshTrades();
          notification.open({
            message: t('214'),
          });
        }).catch((err: any) => {
          console.log(err);
        })
      } else {
        refreshTrades();
        notification.open({
          message: t('214'),
        });
      }
    }).catch((err: any) => {
      console.log(err); 
    }).finally(() => {
      showLoding(false)
    })
  }

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
            <div className=" text-[#F47126] text-[24px] font-[600] pb-20
            h5:text-[20px] h5:pb-14 h5:leading-6
            ">
              {t('216')}
            </div>
          </div>
          <svg
            className="absolute top-[18px] right-[18px] cursor-pointer"
            onClick={() => {
              refreshTrades();
            }}
            xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 0C4.11429 0 0 4.11429 0 9C0 13.8857 4.11429 18 9 18C13.8857 18 18 13.8857 18 9C18 4.11429 13.8857 0 9 0ZM12.8571 11.5714C13.2429 11.9571 13.2429 12.4714 12.8571 12.7286C12.4714 13.1143 11.9571 13.1143 11.7 12.7286L9.12857 10.1571L6.42857 12.8571C6.04286 13.2429 5.52857 13.2429 5.14286 12.8571C4.75714 12.4714 4.75714 11.8286 5.14286 11.5714L7.84286 8.87143L5.27143 6.3C4.88571 6.04286 4.88571 5.52857 5.27143 5.14286C5.65714 4.75714 6.17143 4.75714 6.42857 5.14286L9 7.71429L11.7 5.01429C12.0857 4.62857 12.6 4.62857 12.9857 5.01429C13.3714 5.4 13.3714 5.91429 12.9857 6.3L10.2857 9L12.8571 11.5714Z" fill="#F47126" />
          </svg>
          <div className="">
            <div className="flex items-center">
              <img src={coinInfo?.imageUrl || logo2} className='w-[48px] rounded-xl h5:w-[36px]' alt="" />
              <div className="text-[#000] text-[20px] font-[600] ml-10 h5:text-[16px] h5:ml-6">
                {info?.symbol} / {chainCoinName(chainId)}
              </div>
            </div>
            <div className="bg-[#FBF8EF] rounded-xl p-16 mt-16 mb-12 h5:p-14">
              <div className="text-[#000] text-[16px] font-[600]">{t('217')}</div>
              <div className="bg-[#DDD9CD] h-1 my-20 h5:my-12"></div>
              <div className="flex items-center">
                <div className="flex-1">
                  <div className="text-[#000] text-[20px] font-[600] text-center h5:text-[16px]">{formatAmount(info?.buyAmountJU)}</div>
                  <div className="text-[#62573A] text-[16px] font-[500] text-center h5:text-[12px]">{t('218')}({chainCoinName(chainId)})</div>
                </div>
                <div className="flex-1">
                  <div className="text-[#000] text-[20px] font-[600] text-center h5:text-[16px]">{formatAmount(info?.buyTokenAmount)}</div>
                  <div className="text-[#62573A] text-[16px] font-[500] text-center h5:text-[12px]">{t('219')}</div>
                </div>
                <div className="flex-1">
                  <div className="text-[#000] text-[20px] font-[600] text-center h5:text-[16px]">{formatAmount(info?.balance)}</div>
                  <div className="text-[#62573A] text-[16px] font-[500] text-center h5:text-[12px]">{t('220')}</div>
                </div>
              </div>
              <div className="flex items-center mt-20">
                <div className="flex-1">
                  <div className="text-[#000] text-[20px] font-[600] text-center h5:text-[16px]">{formatAmount(info?.sellAmountJU)}</div>
                  <div className="text-[#62573A] text-[16px] font-[500] text-center h5:text-[12px]">{t('221')}({chainCoinName(chainId)})</div>
                </div>
                <div className="flex-1">
                  <div className="text-[#000] text-[20px] font-[600] text-center h5:text-[16px]">{formatAmount(info?.sellTokenAmount)}</div>
                  <div className="text-[#62573A] text-[16px] font-[500] text-center h5:text-[12px]">{t('222')}</div>
                </div>
                <div className="flex-1">
                  <div className="text-[#000] text-[20px] font-[600] text-center h5:text-[16px]">{info?.lossRate}%</div>
                  <div className="text-[#62573A] text-[16px] font-[500] text-center h5:text-[12px]">{t('223')}</div>
                </div>
              </div>
            </div>
            <div className="bg-[#FBF8EF] rounded-xl p-16 mt-16 mb-12">
              <div className="text-[#000] text-[16px] font-[600]">{t('224')}</div>
              <div className="bg-[#DDD9CD] h-1 my-20 h5:my-12"></div>
              <div className="flex items-center h5:block">
                <div className="flex-1  h5:flex h5:items-center">
                  <div className="text-[#000] cursor-pointer text-[20px] font-[600] text-center 
                  flex items-center justify-center h5:justify-start h5:text-[16px] h5:order-2"
                    onClick={async () => {
                      await handleGetList('issued', 'issued')
                      setOpen1(!open1)
                    }}
                  >
                    {/* {formatAmount(info?.issuedAmountTotal)} */}
                    {formatAmount(info?.issuedRateAmountTotal || 0)}
                    <svg className='ml-4' xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                      <rect x="0.5" width="16" height="16" rx="8" fill="black" fill-opacity="0.1" />
                      <path d="M6.94859 4.14602C6.84729 4.05507 6.71093 4.00281 6.56789 4.00011C6.42485 3.99741 6.28616 4.04448 6.18072 4.13152C6.07528 4.21856 6.01121 4.33885 6.00186 4.46735C5.99251 4.59585 6.03859 4.72264 6.13052 4.82131L6.16302 4.85306L9.65863 7.99977L6.16274 11.1465C6.06442 11.235 6.00654 11.3534 6.00052 11.4784C5.9945 11.6035 6.04079 11.726 6.13024 11.8218L6.16274 11.8535C6.26105 11.942 6.39266 11.9941 6.53156 11.9995C6.67047 12.0049 6.80659 11.9633 6.91303 11.8828L6.94831 11.8535L10.8373 8.35329C10.9356 8.26481 10.9935 8.14636 10.9995 8.02134C11.0055 7.89631 10.9592 7.7738 10.8698 7.678L10.8373 7.64625L6.94831 4.14602H6.94859Z" fill="black" />
                    </svg>
                  </div>
                  <div className="text-[#62573A] whitespace-nowrap text-[14px] font-[500] text-center flex-1 flex items-center justify-center
                  h5:text-[12px] h5:justify-start h5:text-left h5:order-1">
                    {t('225_2')}
                    {/* <Popover
                      content={<div>
                        <div className="w-[106px] font-[500] text-[#62573A]">JU:
                          <span className='font-bold text-[#000] pl-2'>{info?.issuedJuAmountTotal || 0}</span>
                        </div>
                        <div className="w-[106px] font-[500] text-[#62573A]">{t('225_1')}:
                          <span className='font-bold text-[#000] pl-2'>{info?.issuedRateAmountTotal || 0}</span>
                        </div>
                      </div>}
                      trigger="hover"
                    >
                      <svg
                        className="hidden h5:block"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M7.9998 2.30005C4.8518 2.30005 2.2998 4.85205 2.2998 8.00005C2.2998 11.148 4.8518 13.7 7.9998 13.7C11.1478 13.7 13.6998 11.148 13.6998 8.00005C13.6998 4.85205 11.1478 2.30005 7.9998 2.30005ZM7.9998 3.30005C10.5958 3.30005 12.6998 5.40405 12.6998 8.00005C12.6998 10.596 10.5958 12.7 7.9998 12.7C5.4038 12.7 3.2998 10.596 3.2998 8.00005C3.2998 5.40405 5.4038 3.30005 7.9998 3.30005Z"
                          fill="#62573A"
                        />
                        <path
                          d="M8.00047 7.22363C8.34714 7.22363 8.52047 7.39697 8.52047 7.74363V10.4476C8.52047 10.7943 8.34714 10.9676 8.00047 10.9676C7.6538 10.9676 7.48047 10.7943 7.48047 10.4476V7.74363C7.48047 7.39697 7.6538 7.22363 8.00047 7.22363Z"
                          fill="#62573A"
                        />
                        <path
                          d="M7.24023 5.79247C7.24023 5.99404 7.32031 6.18734 7.46283 6.32987C7.60536 6.4724 7.79867 6.55247 8.00023 6.55247C8.2018 6.55247 8.39511 6.4724 8.53764 6.32987C8.68016 6.18734 8.76023 5.99404 8.76023 5.79247C8.76023 5.59091 8.68016 5.3976 8.53764 5.25507C8.39511 5.11254 8.2018 5.03247 8.00023 5.03247C7.79867 5.03247 7.60536 5.11254 7.46283 5.25507C7.32031 5.3976 7.24023 5.59091 7.24023 5.79247Z"
                          fill="#62573A"
                        />
                      </svg>
                      <svg
                        className="ml-2 mr-12 mb-2 cursor-pointer block h5:hidden"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M8.00005 2.30005C4.85205 2.30005 2.30005 4.85205 2.30005 8.00005C2.30005 11.148 4.85205 13.7 8.00005 13.7C11.148 13.7 13.7 11.148 13.7 8.00005C13.7 4.85205 11.148 2.30005 8.00005 2.30005ZM8.00005 3.30005C10.596 3.30005 12.7 5.40405 12.7 8.00005C12.7 10.596 10.596 12.7 8.00005 12.7C5.40405 12.7 3.30005 10.596 3.30005 8.00005C3.30005 5.40405 5.40405 3.30005 8.00005 3.30005Z"
                          fill="#62573A"
                        />
                        <path
                          d="M7.99998 7.22363C8.34665 7.22363 8.51998 7.39697 8.51998 7.74363V10.4476C8.51998 10.7943 8.34665 10.9676 7.99998 10.9676C7.65331 10.9676 7.47998 10.7943 7.47998 10.4476V7.74363C7.47998 7.39697 7.65331 7.22363 7.99998 7.22363Z"
                          fill="#62573A"
                        />
                        <path
                          d="M7.23999 5.79247C7.23999 5.99404 7.32006 6.18734 7.46259 6.32987C7.60512 6.4724 7.79843 6.55247 7.99999 6.55247C8.20156 6.55247 8.39486 6.4724 8.53739 6.32987C8.67992 6.18734 8.75999 5.99404 8.75999 5.79247C8.75999 5.59091 8.67992 5.3976 8.53739 5.25507C8.39486 5.11254 8.20156 5.03247 7.99999 5.03247C7.79843 5.03247 7.60512 5.11254 7.46259 5.25507C7.32006 5.3976 7.23999 5.59091 7.23999 5.79247Z"
                          fill="#62573A"
                        />
                      </svg>
                    </Popover> */}
                  </div>
                </div>
                <div className="flex-1  h5:flex h5:items-center">
                  <div className="text-[#000] cursor-pointer text-[20px] font-[600] text-center 
                  flex items-center justify-center h5:text-[16px] h5:order-2"
                    onClick={async () => {
                      await handleGetList('issued', 'issued')
                      setOpen1(!open1)
                    }}
                  >
                    {formatAmount(info?.issuedJuAmountTotal || 0)}
                    <svg className='ml-4' xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                      <rect x="0.5" width="16" height="16" rx="8" fill="black" fill-opacity="0.1" />
                      <path d="M6.94859 4.14602C6.84729 4.05507 6.71093 4.00281 6.56789 4.00011C6.42485 3.99741 6.28616 4.04448 6.18072 4.13152C6.07528 4.21856 6.01121 4.33885 6.00186 4.46735C5.99251 4.59585 6.03859 4.72264 6.13052 4.82131L6.16302 4.85306L9.65863 7.99977L6.16274 11.1465C6.06442 11.235 6.00654 11.3534 6.00052 11.4784C5.9945 11.6035 6.04079 11.726 6.13024 11.8218L6.16274 11.8535C6.26105 11.942 6.39266 11.9941 6.53156 11.9995C6.67047 12.0049 6.80659 11.9633 6.91303 11.8828L6.94831 11.8535L10.8373 8.35329C10.9356 8.26481 10.9935 8.14636 10.9995 8.02134C11.0055 7.89631 10.9592 7.7738 10.8698 7.678L10.8373 7.64625L6.94831 4.14602H6.94859Z" fill="black" />
                    </svg>
                  </div>
                  <div className="text-[#62573A] whitespace-nowrap text-[14px] font-[500] text-center flex-1 flex items-center justify-center
                  h5:text-[12px] h5:justify-start h5:order-1">
                    {t('225_3')} 
                  </div>
                </div>
                <div className="flex-1  h5:flex h5:items-center">
                  <div className="text-[#000] cursor-pointer text-[20px] font-[600] 
                  text-center flex items-center justify-center h5:text-[16px] h5:order-2"
                    onClick={async () => {
                      await handleGetList('claimed', 'ju')
                      setOpen2(!open2)
                    }}>
                    {formatAmount(info?.insureAmountTotal)}
                    <svg className='ml-4' xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                      <rect x="0.5" width="16" height="16" rx="8" fill="black" fill-opacity="0.1" />
                      <path d="M6.94859 4.14602C6.84729 4.05507 6.71093 4.00281 6.56789 4.00011C6.42485 3.99741 6.28616 4.04448 6.18072 4.13152C6.07528 4.21856 6.01121 4.33885 6.00186 4.46735C5.99251 4.59585 6.03859 4.72264 6.13052 4.82131L6.16302 4.85306L9.65863 7.99977L6.16274 11.1465C6.06442 11.235 6.00654 11.3534 6.00052 11.4784C5.9945 11.6035 6.04079 11.726 6.13024 11.8218L6.16274 11.8535C6.26105 11.942 6.39266 11.9941 6.53156 11.9995C6.67047 12.0049 6.80659 11.9633 6.91303 11.8828L6.94831 11.8535L10.8373 8.35329C10.9356 8.26481 10.9935 8.14636 10.9995 8.02134C11.0055 7.89631 10.9592 7.7738 10.8698 7.678L10.8373 7.64625L6.94831 4.14602H6.94859Z" fill="black" />
                    </svg>
                  </div>
                  <div className="text-[#62573A] text-[14px] font-[500] text-center  flex-1
                  h5:text-[12px] h5:text-left h5:order-1">{t('226')}</div>
                </div>
                <div className="flex-1  h5:flex h5:items-center">
                  <div className="text-[#000] cursor-pointer text-[20px] font-[600] 
                  text-center flex items-center justify-center h5:text-[16px] h5:order-2"
                    onClick={async () => {
                      await handleGetList('claimed', 'rate')
                      setOpen3(!open3)
                    }}>
                    {formatAmount(info?.insureRateAmountTotal)}
                    <svg className='ml-4' xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                      <rect x="0.5" width="16" height="16" rx="8" fill="black" fill-opacity="0.1" />
                      <path d="M6.94859 4.14602C6.84729 4.05507 6.71093 4.00281 6.56789 4.00011C6.42485 3.99741 6.28616 4.04448 6.18072 4.13152C6.07528 4.21856 6.01121 4.33885 6.00186 4.46735C5.99251 4.59585 6.03859 4.72264 6.13052 4.82131L6.16302 4.85306L9.65863 7.99977L6.16274 11.1465C6.06442 11.235 6.00654 11.3534 6.00052 11.4784C5.9945 11.6035 6.04079 11.726 6.13024 11.8218L6.16274 11.8535C6.26105 11.942 6.39266 11.9941 6.53156 11.9995C6.67047 12.0049 6.80659 11.9633 6.91303 11.8828L6.94831 11.8535L10.8373 8.35329C10.9356 8.26481 10.9935 8.14636 10.9995 8.02134C11.0055 7.89631 10.9592 7.7738 10.8698 7.678L10.8373 7.64625L6.94831 4.14602H6.94859Z" fill="black" />
                    </svg>
                  </div>
                  <div className="text-[#62573A] text-[14px] font-[500] text-center  flex-1
                  h5:text-[12px] h5:text-left h5:order-1">{t('227')}</div>
                </div>
              </div>
            </div>
            <div className="text-[#62573A] text-[14px] font-[500] text-center mt-[30px] mb-8 h5:text-[12px]">{t('228')}</div>
            <div className="bg-[#F47126] text-[#fff] text-[20px] font-[500] text-center rounded-full py-10 cursor-pointer
            h5:text-[16px] h5:h-[46px] h5:flex h5:items-center h5:justify-center 
            "
              style={{
                background: Number(info?.issuedAmountTotal || 0) === 0 ? '#CCC' : '#F47126',
                opacity: Number(info?.issuedAmountTotal || 0) === 0 ? 0.5 : 1,
                cursor: Number(info?.issuedAmountTotal || 0) === 0 ? 'not-allowed' : 'pointer'
              }}
              onClick={() => { 
                handleClaim()
              }}
            >{t('229')}</div>
          </div>
        </div>
      </Modal>

      {/* 赔付ju发放记录 */}
      <Modal
        width={670}
        open={open1}
        centered={true}
        onCancel={() => {
          setOpen1(false);
        }}
        maskClosable={true}
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
        <div className='p-[10px] pb-[20px] h5:px-[0px] h5:py-[14px]'>
          <div className="relative ">
            <div className=" text-[#F47126] text-[24px] font-[600] pb-20
          h5:text-[20px] h5:pb-14 h5:leading-6
          ">
              {t('230')}
            </div>
          </div>
          <svg
            className="absolute top-[18px] right-[18px] cursor-pointer"
            onClick={() => {
              setOpen1(false);
            }}
            xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 0C4.11429 0 0 4.11429 0 9C0 13.8857 4.11429 18 9 18C13.8857 18 18 13.8857 18 9C18 4.11429 13.8857 0 9 0ZM12.8571 11.5714C13.2429 11.9571 13.2429 12.4714 12.8571 12.7286C12.4714 13.1143 11.9571 13.1143 11.7 12.7286L9.12857 10.1571L6.42857 12.8571C6.04286 13.2429 5.52857 13.2429 5.14286 12.8571C4.75714 12.4714 4.75714 11.8286 5.14286 11.5714L7.84286 8.87143L5.27143 6.3C4.88571 6.04286 4.88571 5.52857 5.27143 5.14286C5.65714 4.75714 6.17143 4.75714 6.42857 5.14286L9 7.71429L11.7 5.01429C12.0857 4.62857 12.6 4.62857 12.9857 5.01429C13.3714 5.4 13.3714 5.91429 12.9857 6.3L10.2857 9L12.8571 11.5714Z" fill="#F47126" />
          </svg>
          <div className="flex items-center">
            <div className={` text-[#62573A] text-[12px] font-[500] ${isMobile() ? "w-[110px]" : "w-[110px]"}`}>{t('231')}</div>
            <div className="flex-1 text-[#62573A] text-[12px] font-[500]">{t('232')}</div>
            <div className={`w-[120px] text-[#62573A] text-[12px] font-[500] ${isMobile() ? "hidden" : ""}`}>{t('223')}</div>
            <div className={`${isMobile() ? 'w-[90px]' : 'w-[120px]'} text-[#62573A] text-[12px] font-[500]`}>{t('233')}</div>
            <div className="w-[80px] text-[#62573A] text-[12px] font-[500]" >{t('234')}</div>
          </div>
          {
            list && list.map((item: any, index: number) => (
              <div className="flex items-center mt-10" key={index}>
                <div className={` text-[#000] text-[12px] font-[500] ${isMobile() ? "w-[110px]" : "w-[110px]"}`}>
                  {item?.createdAt
                    ? timestampToDateString(item?.createdAt)
                    : ""}
                </div>
                <div className="flex-1 text-[#000] text-[12px] font-[500] line-clamp-1_1 ">{info?.symbol} / {chainCoinName(chainId)}</div>
                <div className={`w-[120px] text-[#000] text-[12px] font-[500] ${isMobile() ? "hidden" : ""}`}>{item.lossRate}%</div>
                <div className={`${isMobile() ? 'w-[90px]' : 'w-[120px]'} text-[#000] text-[12px] font-[500]`} >{item.insureAmountJU}</div>
                <div className="w-[80px] text-[#000] text-[12px] font-[500]">
                  {item.claimStatus === 'claimed' ? t('235') : t('236')}
                </div>
              </div>
            ))
          }
          {
            list && list.length === 0 ? <NoData /> : null
          }
          <div
            className={`${total > 20 ? "flex" : "hidden"
              } justify-center text-center mt-[20px] w-full`}
          >
            <Pagination
              current={pageNum}
              defaultPageSize={20}
              total={total}
              showSizeChanger={false}
              onChange={(page: any) => {
                setPageNum(page);
              }}
            />
          </div>
        </div>
      </Modal>
      {/* JU赔付领取记录 */}
      <Modal
        width={670}
        open={open2}
        centered={true}
        onCancel={() => {
          setOpen2(false);
        }}
        maskClosable={true}
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
        <div className='p-[10px] pb-[20px] h5:px-[0px] h5:py-[14px]'>
          <div className="relative ">
            <div className=" text-[#F47126] text-[24px] font-[600] pb-20
          h5:text-[20px] h5:pb-14 h5:leading-6
          ">
              {t('237')}
            </div>
          </div>
          <svg
            className="absolute top-[18px] right-[18px] cursor-pointer"
            onClick={() => {
              setOpen2(false);
            }}
            xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 0C4.11429 0 0 4.11429 0 9C0 13.8857 4.11429 18 9 18C13.8857 18 18 13.8857 18 9C18 4.11429 13.8857 0 9 0ZM12.8571 11.5714C13.2429 11.9571 13.2429 12.4714 12.8571 12.7286C12.4714 13.1143 11.9571 13.1143 11.7 12.7286L9.12857 10.1571L6.42857 12.8571C6.04286 13.2429 5.52857 13.2429 5.14286 12.8571C4.75714 12.4714 4.75714 11.8286 5.14286 11.5714L7.84286 8.87143L5.27143 6.3C4.88571 6.04286 4.88571 5.52857 5.27143 5.14286C5.65714 4.75714 6.17143 4.75714 6.42857 5.14286L9 7.71429L11.7 5.01429C12.0857 4.62857 12.6 4.62857 12.9857 5.01429C13.3714 5.4 13.3714 5.91429 12.9857 6.3L10.2857 9L12.8571 11.5714Z" fill="#F47126" />
          </svg>
          <div className="flex items-center">
            <div className={`  text-[#62573A] text-[12px] font-[500] ${isMobile() ? "w-[90px]" : "w-[100px]"}`}>{t('231')}</div>
            <div className="flex-1 text-[#62573A] text-[12px] font-[500]">{t('232')}</div>
            <div className={`w-[120px] text-[#62573A] text-[12px] font-[500] ${isMobile() ? "hidden" : ""}`}>{t('223')}</div>
            <div className={`w-[120px] text-[#62573A] text-[12px] font-[500] ${isMobile() ? "w-[90px] pl-2" : "w-[120px]"}`}>{t('233')}</div>
            <div className="w-[50px] text-[#62573A] text-[12px] font-[500]">{t('234')}</div>
          </div>
          {
            list && list.map((item: any, index: number) => (
              <div className="flex items-center mt-10" key={index}>
                <div className={` text-[#000] text-[12px] font-[500] ${isMobile() ? "w-[90px]" : "w-[100px]"}`}>
                  {item?.createdAt
                    ? timestampToDateString(item?.createdAt)
                    : ""}
                </div>
                <div className="flex-1 text-[#000] text-[12px] font-[500] line-clamp-1_1 ">{info?.symbol} / {chainCoinName(chainId)}</div>
                <div className={`w-[120px] text-[#000] text-[12px] font-[500] ${isMobile() ? "hidden" : ""}`}>{item.lossRate}%</div>
                <div className={`w-[120px] text-[#000] text-[12px] font-[500] ${isMobile() ? "w-[90px] pl-2" : "w-[120px]"}`}>{item.insureRateAmountJU}</div>
                <div className="w-[50px] text-[#000] text-[12px] font-[500]">{t('235')}</div>
              </div>
            ))
          }
          {
            list && list.length === 0 ? <NoData /> : null
          }
          <div
            className={`${total > 20 ? "flex" : "hidden"
              } justify-center text-center mt-[20px] w-full`}
          >
            <Pagination
              current={pageNum}
              defaultPageSize={20}
              total={total}
              showSizeChanger={false}
              onChange={(page: any) => {
                setPageNum(page);
              }}
            />
          </div>
        </div>
      </Modal>
      {/* JU算力赔付发放记录 */}
      <Modal
        width={670}
        open={open3}
        centered={true}
        onCancel={() => {
          setOpen3(false);
        }}
        maskClosable={true}
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
        <div className='p-[10px] pb-[20px] h5:px-[0px] h5:py-[14px]'>
          <div className="relative ">
            <div className=" text-[#F47126] text-[24px] font-[600] pb-20
          h5:text-[20px] h5:pb-14 h5:leading-6
          ">
              {t('238')}
            </div>
          </div>
          <svg
            className="absolute top-[18px] right-[18px] cursor-pointer"
            onClick={() => {
              setOpen3(false);
            }}
            xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 0C4.11429 0 0 4.11429 0 9C0 13.8857 4.11429 18 9 18C13.8857 18 18 13.8857 18 9C18 4.11429 13.8857 0 9 0ZM12.8571 11.5714C13.2429 11.9571 13.2429 12.4714 12.8571 12.7286C12.4714 13.1143 11.9571 13.1143 11.7 12.7286L9.12857 10.1571L6.42857 12.8571C6.04286 13.2429 5.52857 13.2429 5.14286 12.8571C4.75714 12.4714 4.75714 11.8286 5.14286 11.5714L7.84286 8.87143L5.27143 6.3C4.88571 6.04286 4.88571 5.52857 5.27143 5.14286C5.65714 4.75714 6.17143 4.75714 6.42857 5.14286L9 7.71429L11.7 5.01429C12.0857 4.62857 12.6 4.62857 12.9857 5.01429C13.3714 5.4 13.3714 5.91429 12.9857 6.3L10.2857 9L12.8571 11.5714Z" fill="#F47126" />
          </svg>
          <div className="flex items-center">
            <div className={` text-[#62573A] text-[12px] font-[500] ${isMobile() ? "w-[90px]" : "w-[100px]"}`}>{t('231')}</div>
            <div className="flex-1 text-[#62573A] text-[12px] font-[500]">{t('232')}</div>
            <div className={`w-[120px] text-[#62573A] text-[12px] font-[500] ${isMobile() ? "hidden" : ""}`}>{t('223')}</div>
            <div className="w-[120px] text-[#62573A] text-[12px] font-[500]">{t('239')}</div>
            <div className="w-[100px] text-[#62573A] text-[12px] font-[500]">
              {/* {t('234')} */}
              {t('225_1')}
            </div>
          </div>
          {
            list && list.map((item: any, index: number) => (
              <div className="flex items-center mt-10" key={index}>
                <div className={` text-[#000] text-[12px] font-[500] ${isMobile() ? "w-[90px]" : "w-[100px]"}`}>
                  {item?.createdAt
                    ? timestampToDateString(item?.createdAt)
                    : ""}
                </div>
                <div className="flex-1 text-[#000] text-[12px] font-[500] pl-2 line-clamp-1_1 ">{info?.symbol} / {chainCoinName(chainId)}</div>
                <div className={`w-[120px] text-[#000] text-[12px] font-[500] ${isMobile() ? "hidden" : ""}`}>{item.lossRate}%</div>
                <div className="w-[120px] text-[#000] text-[12px] font-[500]">{item.insureRateAmount}</div>
                <div className="w-[100px] text-[#000] text-[12px] font-[500]" >
                  {item.insureRateAmount}
                  {/* {t('240')} */}
                </div>
              </div>
            ))
          }
          {
            list && list.length === 0 ? <NoData /> : null
          }
          <div
            className={`${total > 20 ? "flex" : "hidden"
              } justify-center text-center mt-[20px] w-full`}
          >
            <Pagination
              current={pageNum}
              defaultPageSize={20}
              total={total}
              showSizeChanger={false}
              onChange={(page: any) => {
                setPageNum(page);
              }}
            /> 
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;