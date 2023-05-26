const HelloMe = () => {
  const emoji = '🧦'
  // dark-mode media query matched or not
  const matched = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const color = matched ? '#ffffff' : '#000000';

  setTimeout(
    console.log.bind(
      console, `%chttps://audrey.robic.be \n %c${emoji} Worker in socks  \n%c Currently at\r https://vanksen.com`,
      `font-size:11px; font-weight: 600; padding-top: 20px; color:${color}`,
      `
      padding-bottom: 20px;
      font-size:15px; 
      font-weight: 600;
       width:10px;
       height:10px;
       color:${color}
      background-repeat: no-repeat;`,
      
      `padding-top: 100px; text-align:right; font-size:11px; font-weight: 600;padding-bottom: 20px; color:${color}`,
     
    )
  );
}

export default HelloMe