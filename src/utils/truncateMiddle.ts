

export function truncateMiddle(str: any, pull?: number, push?: number) {
  const maxLength = pull ? pull : 8;  
  const frontLength = push ? push : 4; 

  if (!str) {
    return;
  }

  if (str.length <= maxLength) {
    return str;  
  }

  const frontPart = str.slice(0, maxLength);  
  const backPart = str.slice(-frontLength);  

  return `${frontPart}...${backPart}`;  
}
