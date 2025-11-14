import React from "react";
import { useTranslation } from "react-i18next";
import noDataImg from "../assets/image/noData.png";

export default function NoData() {
  const { t } = useTranslation();
  return (
    <div className="NoData py-[40px] bottom-0">
      <div className="box">
        <img className="w-[120px] " src={noDataImg} alt="" />
        <div className="text-[#5F5F5F] text-[16px] pt-10">
          {t("No Data")}
        </div>
      </div>
    </div>
  );
}
