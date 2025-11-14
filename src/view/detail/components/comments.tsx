import React from 'react';
import logo2 from "../../../assets/image/logo2.png"
import { tokenComment } from '../../../API';
import { useWeb3React } from '@web3-react/core';
import { notification } from 'antd';
import { getQueryParam } from '../../../utils/getUrlParamsLegacy';
import { truncateMiddle } from '../../../utils/truncateMiddle';
import { formatTimestamp, timestampToDateString } from '../../../utils/tool';
import { useTranslation } from 'react-i18next';

interface MyComponentProps {
  info: any;
  backFun: any;
}
const App: React.FC<MyComponentProps> = ({ info, backFun }) => {
  const web3React = useWeb3React();
  let { t, i18n } = useTranslation();
  const [content, setContent] = React.useState<string>('')
  const handleComment = () => {
    tokenComment({
      address: getQueryParam("address"),
      content: content,
      creator: web3React.account
    }).then((res) => {
      setContent('')
      notification.open({
        message: 'Comment success',
      })
      backFun()
    }).catch((err) => {
    })
  }
  return (
    <div className="">
      <div className="bg-[#1A1A1A] rounded-2xl mt-20 p-16">
        <textarea placeholder={t('112')}
          value={content}
          onChange={(e) => {
            if (e.target.value.length <= 100)
              setContent(e.target.value)
          }}
          className='text-[14px] text-[#fff] w-full h-[160px] bg-transparent' />
        <div className="flex items-center">
          <div className="flex-1 text-[12px] text-[#5F5F5F]">{content.length}/100</div>
          <div className="hover-effect bg-[#FFFD41] rounded-full px-[26px] py-6 cursor-pointer text-[16px] text-[#1E1E1E]
           h5:text-[14px]"
            onClick={handleComment}
          >{t('113')}</div>
        </div>
        {
          info?.comments && info?.comments.length > 0 ?
            <div className="h-1 bg-[#DDD9CD] my-24"></div>
            : null
        }
        <div className="max-h-[542px] overflow-y-auto scrollbar_style">
          {
            info?.comments && info?.comments.map((item: any, index: number) => (
              <div key={index}>
                <div className="flex items-center">
                  <img src={logo2} className='w-[24px] h-[24px] mr-10 rounded-full' alt="" />
                  <div className="text-[12px] text-[#fff] font-[600] mr-16">{item?.creator ? truncateMiddle(item?.creator, 10, 4) : ""}</div>
                  <div className="text-[12px] text-[#5F5F5F]">{formatTimestamp(item?.createdAt)}</div>
                </div>
                <div className="text-[16px] text-[#fff] mt-2 mb-16">
                  {item?.content || '0'}
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;