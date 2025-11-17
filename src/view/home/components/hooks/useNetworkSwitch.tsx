import { useCallback } from 'react';
import { notification } from "antd";
import { useAppKitNetwork } from "@reown/appkit/react";
import { useDispatch } from "react-redux";
import { saveChainId, saveSelectAll } from "../../../../store/actions";
import { customNetwork_BSC, customNetwork_BSC_TEST, customNetwork_SEI, customNetwork_SEI_TEST, customNetwork_xLayer, customNetwork_xLayer_TEST, isMain } from '../../../../config';
import { useTranslation } from "react-i18next";

const useNetworkSwitch = () => {

  const { switchNetwork, chainId } = useAppKitNetwork();
  let { t, i18n } = useTranslation();

  let dispatch = useDispatch();
  const onSwitch = async (network: any) => {
    try {
      await switchNetwork(network)
      dispatch(
        saveChainId(network.id)
      ); 
      dispatch(
        saveSelectAll(false)
      );

    } catch (err) {
      console.error(err)
    }
  }

  const checkNetworkAndNotify = useCallback((item: any) => { 
    if (item?.chain === "sei" && (chainId !== 113329 && chainId !== 1328 && chainId !== 1329)) {
      notification.open({
        message: `${t('242')}${item?.chain}${t('243')}`,
        description: (
          <div
            onClick={() => {
              onSwitch(isMain ? customNetwork_SEI : customNetwork_SEI_TEST);
              notification.destroy('switch network');
            }}
            className="text-[#1E1E1E] hover:text-[#1E1E1E] text-[14px] font-[500] cursor-pointer underline"
          >
            {t('244')}
          </div>
        ),
        key: 'switch network'
      });
      return false;
    }

    else if (item?.chain === "bsc" && (chainId !== 56 && chainId !== 97)) {
      notification.open({
        message: `${t('242')}${item?.chain}${t('243')}`,
        description: (
          <div
            onClick={() => {
              onSwitch(isMain ? customNetwork_BSC : customNetwork_BSC_TEST);
              notification.destroy('switch network');
            }}
            className="text-[#1E1E1E] hover:text-[#1E1E1E] text-[14px] font-[500] cursor-pointer underline"
          >
            {t('244')}
          </div>
        ),
        key: 'switch network'
      });
      return false;
    } 
    else if (item?.chain === "xlayer" && (chainId !== 196 && chainId !== 11952)) {
      notification.open({
        message: `${t('242')}${item?.chain}${t('243')}`,
        description: (
          <div
            onClick={() => {
              onSwitch(isMain ? customNetwork_xLayer : customNetwork_xLayer_TEST);
              notification.destroy('switch network');
            }}
            className="text-[#1E1E1E] hover:text-[#1E1E1E] text-[14px] font-[500] cursor-pointer underline"
          >
            {t('244')}
          </div>
        ),
        key: 'switch network'
      });
      return false;
    }

    else {
      return true;
    }
  }, [chainId]);

  return { checkNetworkAndNotify };
};

export default useNetworkSwitch;