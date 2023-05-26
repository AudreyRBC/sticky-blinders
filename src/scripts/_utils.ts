export function debounce(func: any, time?: number){
  time = time || 100; // 100 by default if no param
  let timer: any;
  return function(event: Event){
      if(timer) clearTimeout(timer);
      timer = setTimeout(func, time, event);
  };
  }