/**
 * 时间戳格式化函数（适配Vue2）
 * @param {Number} timestamp 时间戳（支持秒级/毫秒级）
 * @returns {String} 格式化后的时间字符串
 */
export function formatTime(timestamp) {
  // 处理时间戳单位：如果是秒级（长度10位），转为毫秒级
  const time = timestamp.toString().length === 10 
    ? timestamp * 1000 
    : timestamp;

  // 创建日期对象
  const targetDate = new Date(time);
  const now = new Date();

  // 格式化工具函数：补零（如9→09）
  const padZero = (num) => num.toString().padStart(2, '0');

  // 获取目标时间的时分
  const hours = padZero(targetDate.getHours());
  const minutes = padZero(targetDate.getMinutes());
  const timeHM = `${hours}:${minutes}`;

  // 标准化日期（重置时分秒为0，方便对比）
  const normalizeDate = (date) => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate.getTime();
  };

  // 今天、昨天、目标时间的起始时间戳
  const todayStart = normalizeDate(now);
  const yesterdayStart = normalizeDate(new Date(todayStart - 24 * 60 * 60 * 1000));
  const targetStart = normalizeDate(targetDate);

  // 年月日格式化（2025/12/12）
  const year = targetDate.getFullYear();
  const month = padZero(targetDate.getMonth() + 1); // 月份从0开始
  const day = padZero(targetDate.getDate());
  const dateYMD = `${year}/${month}/${day}`;

  // 核心判断逻辑
  if (targetStart === todayStart) {
    // 今天：仅显示时分
    return timeHM;
  } else if (targetStart === yesterdayStart) {
    // 昨天：显示「昨天 时分」
    return `昨天 ${timeHM}`;
  } else {
    // 前天及更早：仅显示年月日
    return dateYMD;
  }
}