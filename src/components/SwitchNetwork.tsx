import React, { useEffect } from 'react';
import { useAppKit, useAppKitAccount, useAppKitNetwork } from '@reown/appkit/react';
import { Dropdown } from 'antd';
import { customNetwork_BSC, customNetwork_BSC_TEST, customNetwork_Base, customNetwork_Base_TEST, customNetwork_SEI, customNetwork_SEI_TEST, customNetwork_xLayer, customNetwork_xLayer_TEST, isMain } from '../config';
import { saveChainId, saveSelectAll } from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import store from '../store';
import { wsBus } from '../utils/wsBus';

declare let window: any;
export default function App() {
  let dispatch = useDispatch();
  const token = useSelector((state: any) => state?.token);
  const { address: web3ModalAccount } = useAppKitAccount();
  const { switchNetwork, chainId } = useAppKitNetwork();
  const location = useLocation();
  const navigate = useNavigate();
  const onSwitch = async (network: any) => {
    try {
      await switchNetwork(network)
      dispatch(
        saveChainId(network.id)
      );
      dispatch(
        saveSelectAll(false)
      );

      if (location?.pathname === '/detail' || location?.pathname === '/createCoin') {
        navigate('/')
      } else {
        wsBus.emit("switchNetwork", 0);
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <Dropdown menu={{
        items: [{
          key: "1",
          label: (
            <div className="px-6 py-4">
              <div
                className='text-[#0E0E0E] text-[16px] font-[500] pb-[10px] flex items-center  '
                style={{
                  color: (chainId === 1328 || chainId === 1329 || chainId === 113329) ? '#7BFF48' : '#0E0E0E'
                }}
                onClick={() => {
                  onSwitch(isMain ? customNetwork_SEI : customNetwork_SEI_TEST)
                }}
              >
                <img src={require("../assets/image/seiIcon.png")} className="w-[20px] h-[20px] mr-4" alt="" />
                SEI
              </div>
              <div
                className='text-[#0E0E0E] text-[16px] font-[500] pb-[2px] flex items-center '
                style={{
                  color: (chainId === 56 || chainId === 97) ? '#7BFF48' : '#0E0E0E'
                }}
                onClick={() => {
                  onSwitch(isMain ? customNetwork_BSC : customNetwork_BSC_TEST)
                }}
              >
                <img src={require("../assets/image/bnbIcon.png")} className="w-[20px] h-[20px] mr-4" alt="" />
                BNB Chain
              </div>
              {/* <div
                className='text-[#0E0E0E] text-[16px] font-[500] pt-[8px] pb-[2px] flex items-center '
                style={{
                  color: (chainId === 84532 || chainId === 8453) ? '#7BFF48' : '#0E0E0E'
                }}
                onClick={() => {
                  onSwitch(isMain ? customNetwork_Base : customNetwork_Base_TEST)
                }}
              >
                <img src={require("../assets/image/BaseIcon.png")} className="w-[20px] h-[20px] mr-4" alt="" />
                Base
              </div> */}
              {/* <div
                className='text-[#0E0E0E] text-[16px] font-[500] pt-[8px] pb-[2px] flex items-center '
                style={{
                  color: (chainId === 11952 || chainId === 196) ? '#7BFF48' : '#0E0E0E'
                }}
                onClick={() => {
                  onSwitch(isMain ? customNetwork_xLayer : customNetwork_xLayer_TEST)
                }}
              >
                <img src={require("../assets/image/okIcon.png")} className="w-[20px] h-[20px] mr-4" alt="" />
                X layer
              </div> */}
            </div>
          ),
        }]
      }} placement="bottom" trigger={["hover"]}>
        <div
          className="hover-effect min-w-[69px] h-[40px] cursor-pointer mr-[16px] h5:mr-0
                flex items-center rounded-[26px] px-[16px] py-[10px] 
                bg-gradient-to-r from-[#FFFEAB] to-[#FFFEAB]
                whitespace-normal text-[#0E0E0E] font-[700] text-[14px]">
          <img src={(chainId === 56 || chainId === 97) ?
            require("../assets/image/bnbIcon.png") :
            (chainId === 11952 || chainId === 196) ?
              require("../assets/image/okIcon.png") :
              (chainId === 84532 || chainId === 8453) ?
                require("../assets/image/BaseIcon.png") :
                require("../assets/image/seiIcon.png")}
            className="w-[20px] h-[20px] mr-4" alt="" />
          {
            (chainId === 56 || chainId === 97) ?
              'BNB Chain' :
              (chainId === 11952 || chainId === 196) ?
                'X_Layer' :
                (chainId === 84532 || chainId === 8453) ?
                  'Base' :
                  'SEI'}
          <svg className=" ml-8" xmlns="http://www.w3.org/2000/svg" width="13" height="7" viewBox="0 0 13 7" fill="none">
            <path d="M12.1148 0.664855C12.0754 0.618262 12.0272 0.579916 11.973 0.55201C11.9188 0.524103 11.8596 0.507183 11.7989 0.502216C11.7382 0.497248 11.6771 0.504331 11.6191 0.523059C11.5611 0.541788 11.5073 0.571794 11.4609 0.611364L7.05003 4.36387C6.96627 4.43501 6.86006 4.47405 6.7503 4.47405C6.64053 4.47405 6.53432 4.43501 6.45056 4.36387L2.03856 0.610201C1.99205 0.570698 1.93824 0.540775 1.88019 0.522142C1.82215 0.503509 1.76101 0.496531 1.70027 0.501607C1.63954 0.506683 1.5804 0.523713 1.52623 0.551724C1.47206 0.579735 1.42393 0.618178 1.38458 0.664855L0.859317 1.28581C0.780127 1.37994 0.741393 1.50173 0.751609 1.62445C0.761825 1.74718 0.820159 1.86084 0.913815 1.9405L5.87427 6.15931H5.87891L5.89514 6.17442C6.13068 6.38416 6.43473 6.5 6.74972 6.5C7.0647 6.5 7.36875 6.38416 7.60429 6.17442L7.62052 6.15931H7.62632L12.5856 1.9405C12.6322 1.90104 12.6705 1.85277 12.6984 1.79845C12.7264 1.74412 12.7433 1.68481 12.7484 1.6239C12.7535 1.56299 12.7465 1.50168 12.7279 1.44347C12.7093 1.38526 12.6795 1.33129 12.6401 1.28465L12.1148 0.663693V0.664855Z" fill="#0E0E0E" />
          </svg>
        </div>
      </Dropdown>
    </div>
  );
}
