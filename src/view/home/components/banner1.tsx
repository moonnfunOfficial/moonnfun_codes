import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import HowWorksModal from "../../../components/HowWorksModal";
import { isMobile } from "../../../utils/tool";

const ComponentName: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="relative max-w-[1920px] mx-auto">
      <div className="h-[857px] h5:h-[364px]"
        style={{
          backgroundImage: `url(${isMobile() ?
            require("../../../assets/image/home/bg_h5.png") :
            require("../../../assets/image/home/bg_pc.png")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",

        }}>
        <img src={require("../../../assets/image/home/banner_text.png")}
          className="w-[980px] h-[180px] mx-auto 
          h5:w-[342px] h5:h-[72px]" />
        <div className="flex justify-center items-center pt-[64px]
        h5:pt-[22px]">
          <div className="w-[200px] h-[52px] rounded-full cursor-pointer
          animate-pulse-scale
        text-[#0E0E0E] text-[20px] font-[700] flex justify-center items-center
        h5:w-[150px] h5:h-[42px] h5:text-[14px]"
            style={{
              background: 'linear-gradient(90deg, #FFFEAB 0%, #7BFF48 100%)'
            }}
            onClick={() => {
              navigate("/createCoin")
            }
            }
          >
            Create
            <span className="text-[#0E0E0E] text-[20px] font-[700] ml-4 relative top-[2px]
             h5:text-[14px]">🎨</span>
          </div>
        </div>

        <HowWorksModal />
      </div>
      <div className="bg-[#FFFD41] h-[60px] absolute left-0 right-0 bottom-[29px] 
      w-full flex items-center overflow-hidden
      h5:h-[20px] h5:bottom-[19px]
      ">
        <div className="flex animate-scroll">
          {
            [...Array(2)].map((_, repeatIndex) => (
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13, 14].map((item, index) => (
                <div key={`${repeatIndex}-${index}`}>
                  {index % 2 === 0 ?
                    <img src={require("../../../assets/image/home/Vector1.png")}
                      className="min-w-[161px] h-[24px] mx-[9px]
                      h5:min-w-[53px] h5:h-[9px] h5:mx-[7px]"
                      alt="" />
                    :
                    <img src={require("../../../assets/image/home/Vector2.png")}
                      className="min-w-[161px] h-[24px] mx-[9px]
                      h5:min-w-[53px] h5:h-[9px] h5:mx-[7px]"
                      alt="" />
                  }
                </div>
              ))
            ))
          }
        </div>
      </div>

      <div className="h-[29px]"></div>
    </div>
  );
};

export default ComponentName;
