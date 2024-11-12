const LUNAR_INFO = [
  0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
  0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
  0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
  0x06566, 0x0d4a0, 0x0ea50, 0x16a95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
  0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557
];

export function getLunarDate(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  let leap = 0;
  let temp = 0;
  let lunarYear = year;
  
  // Get days passed from 1900/1/31
  const baseDate = new Date(1900, 0, 31);
  let offset = Math.floor((date.getTime() - baseDate.getTime()) / 86400000);

  // Calculate lunar year
  for (let i = 1900; i < 2100 && offset > 0; i++) {
    temp = getLunarYearDays(i);
    offset -= temp;
    lunarYear++;
  }
  if (offset < 0) {
    offset += temp;
    lunarYear--;
  }

  // Calculate lunar month and day
  let lunarMonth = 1;
  let isLeapMonth = false;
  let yearInfo = LUNAR_INFO[lunarYear - 1900];

  for (let i = 1; i < 13 && offset > 0; i++) {
    // Leap month
    if (leap > 0 && i === (leap + 1) && !isLeapMonth) {
      --i;
      isLeapMonth = true;
      temp = getLeapMonthDays(lunarYear);
    } else {
      temp = getMonthDays(lunarYear, i);
    }

    if (isLeapMonth && i === (leap + 1)) isLeapMonth = false;
    offset -= temp;
    if (!isLeapMonth) lunarMonth++;
  }

  if (offset === 0 && leap > 0 && i === leap + 1) {
    if (isLeapMonth) {
      isLeapMonth = false;
    } else {
      isLeapMonth = true;
      --lunarMonth;
    }
  }

  if (offset < 0) {
    offset += temp;
    --lunarMonth;
  }

  const lunarDay = offset + 1;

  return {
    year: lunarYear,
    month: lunarMonth,
    day: lunarDay,
    isLeapMonth
  };
}

function getLunarYearDays(year: number): number {
  let sum = 348;
  for (let i = 0x8000; i > 0x8; i >>= 1) {
    sum += (LUNAR_INFO[year - 1900] & i) ? 1 : 0;
  }
  return sum + getLeapMonthDays(year);
}

function getLeapMonthDays(year: number): number {
  if (getLeapMonth(year)) {
    return (LUNAR_INFO[year - 1900] & 0x10000) ? 30 : 29;
  }
  return 0;
}

function getLeapMonth(year: number): number {
  return LUNAR_INFO[year - 1900] & 0xf;
}

function getMonthDays(year: number, month: number): number {
  return (LUNAR_INFO[year - 1900] & (0x10000 >> month)) ? 30 : 29;
}