import React, { useEffect, useState } from "react";
import banner_1 from "../../../assets/image/home/banner_1.png";
import benner1 from "../../../assets/image/home/benner1.png";
import benner2 from "../../../assets/image/home/benner2.png";
import benner3 from "../../../assets/image/home/benner3.png";
import { isMobile, showLoding } from "../../../utils/tool";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Modal, notification, Upload } from "antd";
import { useTranslation } from "react-i18next";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import {
  bannerList,
  bannerPrepare,
  bannerTime,
  getIsMainnet,
  submitBanner,
  uploadBanner,
  uploadFile,
} from "../../../API";
import { Contracts } from "../../../web3";
import { useNavigate } from "react-router-dom";
import ImgCrop from "antd-img-crop";
import { isMain } from "../../../config";
SwiperCore.use([Autoplay, Pagination]);

const App: React.FC = () => {
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [swiperRef, setSwiperRef]: any = useState(null);
  const [height, setHeight] = useState(110);
  const [open, setOpen] = useState(false);
  const { switchNetwork, chainId } = useAppKitNetwork(); 
  useEffect(() => {
    const updateHeight = () => {
      const width = window.innerWidth;
      const newHeight = width / 3.8;  
      setHeight(newHeight);
    };

    window.addEventListener("resize", updateHeight);
    updateHeight();  

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const [list, setList]: any = useState([]);
  const [isEntry, setIsEntry] = useState(false);
  const handleList = () => {
    setIsEntry(false);
    bannerList()
      .then((res: any) => {
        res?.data.map((item: any) => {
          item.bannerImageUrl = item.bannerImageUrl + '?t=' + Date.now()
          if (item.entry) {
            setIsEntry(true);
          }
        });
        setList(res?.data);
      })
      .catch((err: any) => {});
  };
  const [bannerTimeList, setBannerTime]: any = useState();
  const handleGetTime = () => {
    showLoding(true);
    bannerTime({
      tokenAddress: caAddress,
    })
      .then((res: any) => {
        setBannerTime(res?.data);
        if (res?.data?.total >= 6) {
          notification.open({
            message: t("181"),
          });
          handleList();
          setOpen(false);
          return;
        } else {
          setOpen(true);
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        showLoding(false);
      });
  };
  useEffect(() => {
    handleList();
  }, [chainId]);

  let { t, i18n } = useTranslation();
  const [caAddress, setCaAddress] = useState("");
  const handleSubmit = async () => {
    if (!web3ModalAccount) {
      notification.open({
        message: t("Please link wallet"),
      });
    }
    if (!caAddress || !imageUrl) {
      return;
    }

    showLoding(true);
    try {
      const { data } = await getIsMainnet()
      if (data !== isMain) {
        notification.open({
          message: t('201'),
          key: 'Please switch to the main network'
        })
        showLoding(false);
        return
      }
    }
    catch (err) {
      showLoding(false);
      return
    }

    try { 
      bannerTime({
        tokenAddress: caAddress,
      })
        .then(async (data: any) => {
          if (data?.data?.total >= 6) {
            notification.open({
              message: t("181"),
            });
            handleList();
            setOpen(false);
            showLoding(false);
            return;
          }
          try { 
            const _data = await bannerPrepare({
              tokenAddress: caAddress,
              cancel: "",
            });
            if (_data?.data?.total >= 6) {
              notification.open({
                message: t("181"),
              });
              handleList();
              setOpen(false);
              showLoding(false);
              return;
            }
          } catch (error: any) {
            if (error?.message && error?.message.includes("404")) {
              notification.open({
                message: t("193"),
                key: "135",
              });
            }
            showLoding(false);
            return;
          }

          try {
            const { transactionHash } = await Contracts.example?.listBannerUp(
              web3ModalAccount,
              caAddress,
              hashId
            );
            submitBanner({
              bannerImageUrl: imageUrl,
              wallet: web3ModalAccount,
              token: caAddress,
              txhash: transactionHash,
            })
              .then(() => {
                setOpen(false);
                showLoding(false);
                setBase64Head("");
                setImageUrl("");
                setCaAddress("");
                setBannerTime("");
                notification.open({
                  message: t("180"),
                });
                handleList();
                showLoding(false);
                setTimeout(() => {
                  handleList();
                }, 4000);
                setTimeout(() => {
                  handleList();
                }, 8000);
              })
              .catch(() => {
                showLoding(false);
              });
          } catch (error) {
            showLoding(false);
            console.log(error);
            bannerPrepare({ tokenAddress: caAddress, cancel: true });
          }
        })
        .catch((err: any) => {
          console.log(err);
          showLoding(false);
        });
    } catch (error) {
      showLoding(false);
      console.log(error);
    }
  };
  const { address: web3ModalAccount } = useAppKitAccount();
  const [imageUrl, setImageUrl] = useState("");
  const [base64Head, setBase64Head]: any = useState("");

  const [hashId, setHashId] = useState("");
  const beforeUpload = async (file: any) => {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/webp" ||
      file.type === "image/gif";
    if (!isJpgOrPng) {
      notification.open({
        message: "Type: jpeg/png/webp/gif",
      });
      return;
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      notification.open({
        message: "Max Size: 5MB",
      });
      return;
    }
    showLoding(true);
    uploadBanner({
      file: file,
      address: web3ModalAccount,
    })
      .then((res: any) => {
        setImageUrl(res?.data?.url);
        setHashId(res?.data?.id);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64String = reader.result;
          setBase64Head(base64String);
        };
        // setMerchantHead(file);
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        showLoding(false);
      });
    return false;
    // return isJpgOrPng && isLt2M;
  };

  const navigate = useNavigate();
  return (
    <div className="indexBanner">
      <Swiper
        spaceBetween={18}
        ref={swiperRef}
        onSwiper={setSwiperRef}
        onSlideChange={(swiper: any) => {
          setSwiperIndex(swiper.activeIndex);
        }}
        loop={true}  
        autoplay={{
          delay: 4000,
          // reverseDirection: true,  
          disableOnInteraction: false,  
        }}
        // modules={[Pagination]}
        // pagination={{ clickable: true }}
        slidesPerView={isMobile() ? 1.16 : 3}
        centeredSlides={false}
        speed={600}
        className="relative rounded-r-[22px]"
      >
        {list &&
          list.map((item: any, index: number) => {
            return (
              <SwiperSlide
                key={index}
                style={{
                  display: item?.listed ? "block" : "none",
                }}
              >
                <div className="relative">
                  <div
                    className={`${
                      item?.system && !item?.entry ? "" : "cursor-pointer"
                      } mx-auto rounded-[20px]`}
                    style={{
                      width: isMobile() ? `100%` : "387px",
                      height: isMobile() ? `102px` : "120px",
                      backgroundImage: `url(${item?.bannerImageUrl})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                    onClick={() => {
                      if (item?.token && !item?.system) {
                        navigate("/detail?address=" + item?.token);
                      } else if (item?.entry) {
                        handleGetTime();
                      }
                    }}
                  ></div>
                </div>
              </SwiperSlide>
            );
          })} 
        <div className="absolute top-0 right-[-2px] bottom-0 w-[119px] z-[inherit] rounded-r-[22px]"
          style={{
            display: isMobile() ? "none" : "block", 
            background: 'linear-gradient(90deg, rgba(14, 14, 14, 0.00) 0%, rgb(14 14 14 / 66%) 100%)'
          }}></div> 
      </Swiper>
      <div className={`${isEntry ? "block" : "hidden"} text-center`}>
        <span
          className="mx-auto mt-[34px]  text-[20px] font-[700] inline-block
           text-[#7BFF48] px-[30px] py-[6px] rounded-[40px] cursor-pointer
           animate-pulseScale2 h5:text-[16px]"
          onClick={() => handleGetTime()}
          style={{
            border: '1px solid #7BFF48'
          }}
        >
          {t("198")}
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
        <div className="p-[10px] pb-[20px] h5:px-[6px] h5:py-[14px] ">
          <div className="relative ">
            <div
              className=" text-[#F47126] text-[24px] font-[600] pb-16
            h5:text-[20px] h5:pb-14 h5:leading-6
            "
            >
              {t("172_1")}
            </div>
          </div>
          <svg
            className="absolute top-[18px] right-[18px] cursor-pointer"
            onClick={() => {
              setOpen(false);
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M9 0C4.11429 0 0 4.11429 0 9C0 13.8857 4.11429 18 9 18C13.8857 18 18 13.8857 18 9C18 4.11429 13.8857 0 9 0ZM12.8571 11.5714C13.2429 11.9571 13.2429 12.4714 12.8571 12.7286C12.4714 13.1143 11.9571 13.1143 11.7 12.7286L9.12857 10.1571L6.42857 12.8571C6.04286 13.2429 5.52857 13.2429 5.14286 12.8571C4.75714 12.4714 4.75714 11.8286 5.14286 11.5714L7.84286 8.87143L5.27143 6.3C4.88571 6.04286 4.88571 5.52857 5.27143 5.14286C5.65714 4.75714 6.17143 4.75714 6.42857 5.14286L9 7.71429L11.7 5.01429C12.0857 4.62857 12.6 4.62857 12.9857 5.01429C13.3714 5.4 13.3714 5.91429 12.9857 6.3L10.2857 9L12.8571 11.5714Z"
              fill="#F47126"
            />
          </svg>
          <div className="bg-[#FBF8EF] px-[20px] py-[16px] rounded-[20px] h5:px-16 h5:pt-10 h5:pb-0">
            <ImgCrop
              modalTitle={t("172_1")}
              showGrid
              aspect={724 / 200}
              modalOk={t("Confirm")}
              modalCancel={t("147")}
              modalClassName="bannerCarousel"
            >
              <Upload
                name="avatar"
                listType="picture-card"
                showUploadList={false}
                action=""
                beforeUpload={beforeUpload}
                className="flex justify-center w-full upBanner"
                maxCount={1}
              >
                {base64Head ? (
                  <div className="flex justify-center items-center">
                    <img
                      src={base64Head}
                      alt="avatar"
                      className="w-[60%] max-h-[150px] rounded-[10px]"
                    />
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="51"
                        height="44"
                        viewBox="0 0 51 44"
                        fill="none"
                      >
                        <g clipPath="url(#clip0_1364_2495)">
                          <path
                            d="M46.4769 2.23983e-10H4.52387C3.45667 2.23983e-10 2.43319 0.434276 1.67856 1.20729C0.923942 1.98031 0.5 3.02874 0.5 4.12195L0.5 39.878C0.524879 40.9543 0.959778 41.9778 1.71172 42.7298C2.46366 43.4819 3.47297 43.9027 4.52387 43.9024H46.4769C47.5278 43.9027 48.5371 43.4819 49.289 42.7298C50.041 41.9778 50.4759 40.9543 50.5008 39.878V4.12195C50.5008 3.58064 50.3967 3.04464 50.1945 2.54454C49.9922 2.04444 49.6958 1.59003 49.3222 1.20728C48.9485 0.824517 48.5049 0.520897 48.0167 0.313752C47.5285 0.106608 47.0053 -5.64255e-06 46.4769 2.23983e-10ZM39.8815 22.2439C39.5371 21.9825 39.1197 21.8414 38.691 21.8414C38.2624 21.8414 37.845 21.9825 37.5005 22.2439L28.81 28.2439L16.4526 12.4634C16.2652 12.2534 16.0372 12.0857 15.783 11.971C15.5289 11.8562 15.2542 11.797 14.9764 11.797C14.6987 11.797 14.424 11.8562 14.1698 11.971C13.9156 12.0857 13.6876 12.2534 13.5002 12.4634L4.52387 21.8049V4.12195H46.4769V25.0488L39.8815 22.2439Z"
                            fill="#CCCCCC"
                          />
                          <path
                            d="M35.8812 8.34148C34.7652 8.34148 33.6742 8.6805 32.7462 9.31567C31.8182 9.95084 31.0949 10.8536 30.6678 11.9099C30.2407 12.9661 30.129 14.1284 30.3467 15.2497C30.5645 16.371 31.1019 17.401 31.8911 18.2094C32.6803 19.0178 33.6858 19.5684 34.7804 19.7914C35.875 20.0144 37.0096 19.9 38.0407 19.4624C39.0718 19.0249 39.9532 18.284 40.5732 17.3334C41.1933 16.3828 41.5242 15.2652 41.5242 14.1219C41.5242 12.5889 40.9296 11.1186 39.8714 10.0346C38.8131 8.95052 37.3778 8.34152 35.8812 8.34152V8.34148ZM35.8812 15.6585C35.561 15.6585 35.248 15.5613 34.9817 15.379C34.7155 15.1968 34.508 14.9377 34.3854 14.6347C34.2629 14.3316 34.2308 13.9981 34.2933 13.6764C34.3558 13.3547 34.51 13.0591 34.7364 12.8272C34.9629 12.5953 35.2514 12.4373 35.5654 12.3733C35.8795 12.3093 36.205 12.3422 36.5009 12.4677C36.7967 12.5932 37.0496 12.8058 37.2275 13.0786C37.4054 13.3513 37.5004 13.672 37.5004 14C37.5134 14.2259 37.4811 14.4521 37.4056 14.6647C37.33 14.8773 37.2128 15.0719 37.0612 15.2364C36.9095 15.4009 36.7266 15.5318 36.5237 15.6212C36.3207 15.7106 36.1021 15.7565 35.8812 15.7561V15.6585Z"
                            fill="#CCCCCC"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1364_2495">
                            <rect
                              width="50"
                              height="44"
                              fill="white"
                              transform="translate(0.5)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      <div className="pl-10 w-[210px]">
                        <div className="text-[14px] font-[400] text-[#CCC] leading-5">
                          jpg/jpeg/png/webp
                        </div>
                        <div className="text-[14px] font-[400] text-[#CCC] leading-5">
                          Max Size: 5MB，1448x400
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center pt-10 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                      >
                        <g clipPath="url(#clip0_1364_2502)">
                          <path
                            d="M12.5 0C5.87321 0 0.5 5.37321 0.5 12C0.5 18.6268 5.87321 24 12.5 24C19.1268 24 24.5 18.6268 24.5 12C24.5 5.37321 19.1268 0 12.5 0ZM17.6429 12.6429C17.6429 12.7607 17.5464 12.8571 17.4286 12.8571H13.3571V16.9286C13.3571 17.0464 13.2607 17.1429 13.1429 17.1429H11.8571C11.7393 17.1429 11.6429 17.0464 11.6429 16.9286V12.8571H7.57143C7.45357 12.8571 7.35714 12.7607 7.35714 12.6429V11.3571C7.35714 11.2393 7.45357 11.1429 7.57143 11.1429H11.6429V7.07143C11.6429 6.95357 11.7393 6.85714 11.8571 6.85714H13.1429C13.2607 6.85714 13.3571 6.95357 13.3571 7.07143V11.1429H17.4286C17.5464 11.1429 17.6429 11.2393 17.6429 11.3571V12.6429Z"
                            fill="#F47126"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1364_2502">
                            <rect
                              width="24"
                              height="24"
                              fill="white"
                              transform="translate(0.5)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                )}
              </Upload>
            </ImgCrop>
          </div>
          <div className="text-[16px] font-[500] text-[#000] pt-[16px] pb-4">
            {t("173")}
          </div>
          <div
            className=" text-[16px] font-[600] text-[#000] bg-[#FBF8EF] px-[20px] py-[16px] rounded-[20px]
          h5:px-[16px] h5:py-[10px]"
          >
            <input
              type="text"
              value={caAddress}
              onChange={(e) => setCaAddress(e.target.value)}
              className="w-full bg-transparent text-[16px] text-[#000] font-[600]
              h5:text-[14px]"
              placeholder={t("174")}
            />
          </div>
          <div className=" pt-[16px] pb-4 mb-[40px] h5:mb-[30px]">
            <div className="text-[16px] font-[400] text-[#62573A] h5:text-[14px] ">
              {t("194")}
            </div>
            <div className="flex items-start">
              <div className="text-[16px] font-[400] text-[#62573A] pr-4 h5:text-[14px]">
                1.
              </div>
              <div className="text-[16px] font-[400] text-[#62573A] h5:text-[14px] ">
                {t("195")}
              </div>
            </div>
            <div className="flex items-start">
              <div className="text-[16px] font-[400] text-[#62573A] pr-4 h5:text-[14px]">
                2.
              </div>
              <div className="text-[16px] font-[400] text-[#62573A] h5:text-[14px] ">
                {t("196")}
              </div>
            </div>
            <div className="flex items-start">
              <div className="text-[16px] font-[400] text-[#62573A] pr-4 h5:text-[14px]">
                3.
              </div>
              <div className="text-[16px] font-[400] text-[#62573A] h5:text-[14px] ">
                {t("197")}
              </div>
            </div>
          </div>
          {/* <div className="text-[16px] font-[400] text-[#62573A] pt-[16px] pb-4 mb-[50px] h5:text-[14px] h5:mb-[30px]">
            {t("175")}
            {bannerTimeList?.total}
            {t("176")}
            {t("177")}
            {secondsToHMS(bannerTimeList?.wait)}
          </div> */}
          <div
            className="hover-effect bg-[#F47126] text-[#fff] text-[20px] font-[600] text-center justify-center rounded-full py-10 cursor-pointer
          h5:text-[16px] h5:h-[46px]
        "
            style={{
              cursor: caAddress ? "pointer" : "not-allowed",
              opacity: caAddress && imageUrl ? 1 : 0.5,
            }}
            onClick={handleSubmit}
          >
            {web3ModalAccount ? t("Confirm") : t("0")}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default App;
