import { Progress } from 'antd';
import React from 'react';
import benner1 from "../../../assets/image/home/benner1.png"
import { useNavigate } from 'react-router-dom';
import NoData from '../../../components/NoData';
import { truncateMiddle } from '../../../utils/truncateMiddle';
import { formatAmount, getBit } from '../../../utils/tool';
import { browserUrl } from '../../../config';
import { useTranslation } from 'react-i18next';
import List from "./list"

interface MyComponentProps {
  list: any[];
}
const
  App: React.FC<MyComponentProps> = ({ list }) => {

    let { t, i18n } = useTranslation();
    const navigate = useNavigate();
    return (
      <div className="flex flex-wrap mx-[-10px] h5:mx-0 h5:px-[16px] h5:block">
        {
          list && list.map((item: any, index: number) => (
            <List item={item} index={index} key={index} />
          ))
        }
        {
          list?.length === 0 ? <NoData /> : null
        }
      </div>
    );
  }

export default App;