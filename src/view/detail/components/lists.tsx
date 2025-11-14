import React from 'react';
import Trades from './trades';
import Comments from './comments';
import { useTranslation } from 'react-i18next';

interface MyComponentProps {
  info: any;
  refreshTrades: any;
  backFun: any;
}
const App: React.FC<MyComponentProps> = ({ info, refreshTrades, backFun }) => {
  const [tabIndex2, setTabIndex2] = React.useState(1);
  let { t, i18n } = useTranslation();

  return ( 
    <div className={`${info?.insurance ? 'top-[-124px] relative h5:top-[0px]' : ''} w-[810px] h5:w-full h5:pt-[22px]`}>
      <div className="flex items-center">
        <div className="text-[20px] font-[600] cursor-pointer relative h5:text-[16px] h5:leading-[10px]"
          style={{
            color: tabIndex2 === 1 ? '#FFFD41' : '#cacac9',
          }}
          onClick={() => {
            setTabIndex2(1)
          }}
        >
          {t("105")}
          <div className={`${tabIndex2 === 1 ? "bg-[#FFFD41]" : "bg-transparent"} h-[2px] rounded-full mt-10`}></div>
        </div>
        <div className="w-[50px] h5:w-[24px]"></div>
        <div className="text-[20px] font-[600] cursor-pointer h5:text-[16px] h5:leading-[10px]"
          style={{
            color: tabIndex2 === 2 ? '#FFFD41' : '#cacac9',
          }}
          onClick={() => {
            setTabIndex2(2)
          }}
        >
          {t("106")}
          <div className={`${tabIndex2 === 2 ? "bg-[#FFFD41]" : "bg-transparent"} h-[2px] rounded-full mt-10`}></div>
        </div>
      </div>
      <div className="h-1 bg-[#cacac9] mt-[-1px]"></div>
      <div className={`${tabIndex2 === 1 ? 'block' : 'hidden'}`}>
        <Trades refreshTrades={refreshTrades} info={info} />
      </div>
      <div className={`${tabIndex2 === 2 ? 'block' : 'hidden'}`}>
        <Comments info={info} backFun={backFun} />
      </div>
    </div>
  );
}

export default App;