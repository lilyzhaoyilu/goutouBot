export const convertEpochToDate = (epoch: string) => {
  // reference: https://stackoverflow.com/questions/4631928/convert-utc-epoch-to-local-date
  const e = new Date(0);
  e.setUTCSeconds(parseInt(epoch));
  const d = new Date(e).toLocaleDateString("zh-CN", {
    hour: 'numeric', hourCycle: 'h12',
    dayPeriod: 'long', timeZone: 'Asia/Shanghai'
  });
  return d;
}

export const streamerSuperLink = (streamerId: string) => {
  switch (streamerId) {
    case "DF_Pite":
      return '[DF_Pite](https://www.douyu.com/5684726)';
      break;
    case "DF_3Mz_o":
      return '[DF_3Mz_o](https://www.douyu.com/1667826)';
      break;
    // 带鱼辰
    case "糕":
      return '[糕](https://live.bilibili.com/23504744)';
      break;
    // TODO: seprate the banned user out
    case "JackieChan":
      return '此id被屏蔽无法显示';
      break;
    default:
      return streamerId;
      break;
  }
}
