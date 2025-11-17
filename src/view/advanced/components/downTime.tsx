import React, { useEffect, useState } from "react";

interface MyComponentProps {
  time?: any;
}
const App: React.FC<MyComponentProps> = ({ time }) => {
  const [remainingTime, setRemainingTime] = useState(time);  

  useEffect(() => {
    setRemainingTime(time); 
    const interval = setInterval(() => {
      setRemainingTime((prev: number) => {
        if (prev <= 1000) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);  
  }, [time]);
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return (
      `${hours.toString().padStart(2, "0")}:` +
      `${minutes.toString().padStart(2, "0")}:` +
      `${seconds.toString().padStart(2, "0")}`
    );
  };
  return (
    <div className="flex items-center text-[14px] text-[#F47126]">
      <svg
        className="ml-4 mr-1"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M13.926 4.58847C13.2438 3.53027 12.2892 2.65469 11.1673 2.05653C10.9367 1.93362 10.6488 2.0179 10.5246 2.24382C10.4003 2.46974 10.4851 2.75185 10.7145 2.87358C11.6954 3.39566 12.5282 4.16121 13.1244 5.08596C13.2152 5.22643 13.3681 5.30251 13.5258 5.30251C13.613 5.30251 13.7002 5.2791 13.7791 5.23111C14.0001 5.09298 14.067 4.80619 13.926 4.58847ZM7.47432 5.94398C7.21267 5.94398 7 6.15234 7 6.4087V8.4689C7.00358 8.59415 7.05854 8.70652 7.14337 8.78729L8.08843 9.84197C8.18162 9.94615 8.31305 10 8.44447 10C8.55558 10 8.6667 9.96137 8.7575 9.88411C8.95463 9.71438 8.97375 9.42174 8.80051 9.2286L7.94745 8.27692V6.4087C7.94864 6.15234 7.73597 5.94398 7.47432 5.94398Z"
          fill="#F47126"
        />
        <path
          d="M7.83359 2.96179V2.46678C7.83359 2.20929 7.62521 2 7.36883 2C7.11246 2 6.90408 2.20929 6.90408 2.46678V2.98413C6.57278 3.02058 6.24032 3.0876 5.91019 3.18871C3.00695 4.06937 1.35865 7.15814 2.23548 10.0741C2.3104 10.321 2.56912 10.4597 2.81496 10.3857C3.0608 10.3116 3.2001 10.0506 3.12518 9.80365C2.39586 7.38036 3.76553 4.81364 6.17827 4.0823C8.59101 3.35097 11.1466 4.72546 11.8747 7.14874C12.604 9.57202 11.2344 12.1387 8.82163 12.8701C7.08319 13.398 5.19843 12.8419 4.02074 11.4533C3.85451 11.2569 3.56067 11.2334 3.36517 11.4004C3.16967 11.5673 3.14625 11.8624 3.31249 12.0588C4.37662 13.3098 5.91487 14 7.50112 14C8.03143 14 8.56759 13.9224 9.09088 13.7637C11.9941 12.8818 13.6412 9.79306 12.7644 6.87831C12.0819 4.6067 10.0649 3.10053 7.83359 2.96179Z"
          fill="#F47126"
        />
      </svg>
      {formatTime(remainingTime)}
    </div>
  );
};

export default App;
