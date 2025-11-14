import React, { useState } from 'react';
import { notification, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { uploadFile } from '../../../API';
import { showLoding } from '../../../utils/tool';
import { useTranslation } from 'react-i18next';


const App: React.FC = () => {
  let { t, i18n } = useTranslation();
  const [base64Head, setBase64Head] = useState<any>(null)
  const [imageUrl, setImageUrl] = useState('')
  const beforeUpload = async (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp' || file.type === 'image/gif';
    if (!isJpgOrPng) {
      notification.open({
        message: 'Type: jpeg/png/webp/gif',
      })
      return
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      notification.open({
        message: 'Max Size: 5MB',
      })
      return
    }

    showLoding(true)
    uploadFile({
      file: file
    }).then((res: any) => {
      console.info(file);
      console.log(res?.data);
      setImageUrl(res?.data)
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result;
        setBase64Head(base64String)
      };
    }).catch((err: any) => {
      console.log(err);
    }).finally(() => {
      showLoding(false)
    })
    return false
    // return isJpgOrPng && isLt2M;
  };

  return (
    <div className="">

      <ImgCrop showGrid modalTitle="" modalOk={t('Confirm')} modalCancel={t('147')}>
        <Upload
          name="avatar"
          listType="picture-card"
          showUploadList={false}
          action=""
          beforeUpload={beforeUpload}
          className="imgUpload"
          maxCount={1}
        >
          {
            base64Head ?
              <div className='flex h-[190px] justify-center items-center'>
                <img src={base64Head} alt="avatar" className='w-[80%]' />
              </div> :
              <div className="text-center pt-[30px] cursor-pointer">
                <svg className='mx-auto' xmlns="http://www.w3.org/2000/svg" width="52" height="44" viewBox="0 0 52 44" fill="none">
                  <g clipPath="url(#clip0_10_716)">
                    <path d="M47.3964 2.23983e-10H4.60435C3.51581 2.23983e-10 2.47185 0.434276 1.70213 1.20729C0.932421 1.98031 0.5 3.02874 0.5 4.12195L0.5 39.878C0.525376 40.9543 0.968974 41.9778 1.73595 42.7298C2.50294 43.4819 3.53243 43.9027 4.60435 43.9024H47.3964C48.4683 43.9027 49.4978 43.4819 50.2648 42.7298C51.0318 41.9778 51.4754 40.9543 51.5008 39.878V4.12195C51.5008 3.58064 51.3946 3.04464 51.1883 2.54454C50.9821 2.04444 50.6798 1.59003 50.2986 1.20728C49.9175 0.824517 49.465 0.520897 48.9671 0.313752C48.4691 0.106608 47.9354 -5.64255e-06 47.3964 2.23983e-10ZM40.6692 22.2439C40.3178 21.9825 39.8921 21.8414 39.4549 21.8414C39.0176 21.8414 38.5919 21.9825 38.2406 22.2439L29.3762 28.2439L16.7717 12.4634C16.5805 12.2534 16.3479 12.0857 16.0887 11.971C15.8294 11.8562 15.5492 11.797 15.2659 11.797C14.9826 11.797 14.7024 11.8562 14.4432 11.971C14.184 12.0857 13.9514 12.2534 13.7602 12.4634L4.60435 21.8049V4.12195H47.3964V25.0488L40.6692 22.2439Z" fill="#CCCCCC" />
                    <path d="M36.5891 8.34131C35.4507 8.34131 34.3378 8.68033 33.3913 9.3155C32.4448 9.95067 31.707 10.8535 31.2714 11.9097C30.8357 12.966 30.7218 14.1282 30.9439 15.2495C31.1659 16.3709 31.7141 17.4008 32.5191 18.2093C33.3241 19.0177 34.3497 19.5682 35.4662 19.7912C36.5827 20.0143 37.74 19.8998 38.7918 19.4623C39.8435 19.0248 40.7424 18.2839 41.3749 17.3333C42.0073 16.3826 42.3449 15.265 42.3449 14.1218C42.3449 12.5887 41.7384 11.1184 40.659 10.0344C39.5796 8.95036 38.1156 8.34135 36.5891 8.34135V8.34131ZM36.5891 15.6584C36.2624 15.6584 35.9431 15.5611 35.6716 15.3788C35.4 15.1966 35.1883 14.9376 35.0633 14.6345C34.9384 14.3314 34.9057 13.998 34.9694 13.6762C35.0331 13.3545 35.1904 13.059 35.4214 12.827C35.6523 12.5951 35.9466 12.4371 36.2669 12.3731C36.5873 12.3091 36.9193 12.342 37.2211 12.4675C37.5229 12.5931 37.7808 12.8056 37.9623 13.0784C38.1437 13.3511 38.2406 13.6718 38.2406 13.9998C38.2538 14.2257 38.2209 14.4519 38.1439 14.6645C38.0668 14.8772 37.9473 15.0717 37.7926 15.2362C37.6379 15.4007 37.4513 15.5317 37.2443 15.6211C37.0374 15.7104 36.8144 15.7564 36.5891 15.756V15.6584Z" fill="#CCCCCC" />
                  </g>
                  <defs>
                    <clipPath id="clip0_10_716">
                      <rect width="51" height="44" fill="white" transform="translate(0.5)" />
                    </clipPath>
                  </defs>
                </svg>
                <div className='text-[14px] text-[#CCC] font-[400] mt-[10px]'>jpeg/png/webp/gif</div>
                <div className='text-[14px] text-[#CCC] font-[400] mb-16'>{t('38')}: 5MB</div>
                <svg className='mx-auto' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <g clipPath="url(#clip0_10_749)">
                    <path d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM17.1429 12.6429C17.1429 12.7607 17.0464 12.8571 16.9286 12.8571H12.8571V16.9286C12.8571 17.0464 12.7607 17.1429 12.6429 17.1429H11.3571C11.2393 17.1429 11.1429 17.0464 11.1429 16.9286V12.8571H7.07143C6.95357 12.8571 6.85714 12.7607 6.85714 12.6429V11.3571C6.85714 11.2393 6.95357 11.1429 7.07143 11.1429H11.1429V7.07143C11.1429 6.95357 11.2393 6.85714 11.3571 6.85714H12.6429C12.7607 6.85714 12.8571 6.95357 12.8571 7.07143V11.1429H16.9286C17.0464 11.1429 17.1429 11.2393 17.1429 11.3571V12.6429Z" fill="#F47126" />
                  </g>
                  <defs>
                    <clipPath id="clip0_10_749">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
          }
        </Upload>
      </ImgCrop>
    </div>
  );
}

export default App;