import { Pagination, Progress } from 'antd';
import React, { useState } from 'react';
import logo2 from "../../../assets/image/logo2.png"

interface MyComponentProps {
  data: any;
}
const App: React.FC<MyComponentProps> = ({ data }) => {
  const [pageNum, setPageNum] = useState(1)
  const [total, setTotal] = useState(0)
  const [list, setList] = useState<any>([])
  const handleGetFriends = async (num: number) => {
    try {
      // await getHuntRecord({
      //   pageNumber: num,
      //   pageSize: 10,
      // })
      //   .then((res: any) => {
      //     setList(res.data?.records);
      //     setTotal(res.data?.total);
      //   })
      //   .catch(() => { });
    } catch (error) { }
  };

  return (
    <div>
      <div className="flex items-center mt-22 mb-14 px-16">
        <div className="flex-1 text-[#62573A] text-[12px] font-[500]">TOKEN</div>
        <div className="w-[150px] text-[#62573A] text-[12px] font-[500]">Total Supply</div>
        <div className="w-[150px] text-[#62573A] text-[12px] font-[500]">Holder</div>
        <div className="w-[150px] text-[#62573A] text-[12px] font-[500]">Price</div>
        <div className="w-[150px] text-[#62573A] text-[12px] font-[500]">Virtual Liquidity</div>
        <div className="w-[250px] text-[#62573A] text-[12px] font-[500]">Maket Cap</div>
      </div>
      {
        [1, 2, 3, 4, 5, 6].map((item, index) => (
          <div className="bg-[#FBF8EF] rounded-[12px] px-16 py-18 flex items-center mb-10">
            <div className="flex-1 text-[#000] text-[12px] font-[500]">
              <div className="flex items-center">
                <img className="w-[46px] h-[46px] mr-10 rounded-lg" src={logo2} alt="" />
                <div className="">
                  <div className="text-[#000] text-[14px] font-[500] leading-[16px] pt-4">CATDOG</div>
                  <div className="text-[#62573A] text-[14px] font-[400]">
                    Greated by: <span className="text-[14px] text-[#000]">0xe8D0...d776</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[150px] text-[#000] text-[14px] font-[500]">10000000.24</div>
            <div className="w-[150px] text-[#000] text-[14px] font-[500]">10000000.24</div>
            <div className="w-[150px] text-[#000] text-[14px] font-[500]">0.000</div>
            <div className="w-[150px] text-[#000] text-[14px] font-[500]">0.000</div>
            <div className="w-[250px] flex items-center">
              <div className="w-[160px]">
                <Progress percent={50}
                  size="small"
                  className="home-page"
                  status="active"
                  showInfo={false}
                  strokeColor="#F47126"
                  trailColor="#DDD9CD" />
              </div>
              <div className="text-[#F47126] text-[14px] font-[500] ml-16">$1000.98K</div>
            </div>
          </div>
        ))
      }

      <div className="mt-[40px] mb-[20px] text-center">
        <div
          className={`${total > 20 ? "block" : "hidden"} text-center mt-[20px] w-full`}
        >
          <Pagination
            current={pageNum}
            defaultPageSize={20}
            total={1010}
            showSizeChanger={false}
            onChange={(page: any) => {
              setPageNum(page);
              handleGetFriends(page);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;