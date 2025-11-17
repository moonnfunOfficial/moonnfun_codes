import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import NoData from '../../../components/NoData';
import { notification, Pagination } from 'antd';
import { getInviteList } from '../../../API';
import { useWeb3React } from '@web3-react/core';
import { useDispatch } from 'react-redux';
import { createLoginSuccessAction } from '../../../store/actions';
import { formatTimestamp, isMobile } from '../../../utils/tool';
import { truncateMiddle } from '../../../utils/truncateMiddle';
import { useAppKitAccount, useDisconnect } from '@reown/appkit/react';

const App: React.FC = () => {
    const { address: web3ModalAccount  } = useAppKitAccount(); 
          const { disconnect } = useDisconnect();  
  let { t, i18n } = useTranslation();
  const [pageNum, setPageNum] = useState(1)
  const [total, setTotal] = useState(0)
  const [list, setList] = useState<any>([])
  let dispatch = useDispatch();
  const handleGetList = async (page: number) => {
    try {
      await getInviteList({
        offset: page,
        limit: 10
      })
        .then((res: any) => {
          setList(res.data?.data);
          setTotal(res.data?.total);
        })
        .catch((error: any) => { 
        });
    } catch (error) {
    }
  }
  useEffect(() => {
    if (web3ModalAccount) {
      handleGetList(1);
    }
  }, [web3ModalAccount]);

  return (
    <div className="">
      <div className="flex items-center">
        <div className="text-[#5F5F5F] text-[12px] font-[500]">{t('139')}</div>
        <div className="text-[#5F5F5F] text-[12px] font-[500] text-right flex-1">{t('140')}</div>
      </div>
      {
        list.map((item: any, key: number) => (
          <div className="flex items-center pt-6" key={key}>
            <div className="text-[#fff] text-[12px] font-[600]">{isMobile() ? truncateMiddle(item?.address, 6, 4) : item?.address}</div>
            <div className="text-[#fff] text-[12px] font-[600] text-right flex-1">{formatTimestamp(item?.createdAt)}</div>
          </div>
        ))
      }
      <div className={`${total > 10 ? "hidden" : "hidden"} mt-[40px] mb-[20px] text-center`}>
        <div
          className={`text-center mt-[20px] w-full`}
        >
          <Pagination
            current={pageNum}
            defaultPageSize={10}
            total={total}
            showSizeChanger={false}
            onChange={(page: any) => {
              setPageNum(page);
              handleGetList(page);
            }}
          />
        </div>
      </div>
      {
        list?.length === 0 ? <NoData /> : null
      }
    </div>
  );
}

export default App;