const startDate = new Date('2024-08-12T21:43:00');

function isMobileDevice() {
   return /Mobi|Android/i.test(navigator.userAgent);
}

function updateTimer() {
    const now = new Date();
    const diff = new Date(now - startDate);
    const years = diff.getUTCFullYear() - 1970;
    const months = diff.getUTCMonth();
    const days = diff.getUTCDate() - 1;
    const hours = diff.getUTCHours();
    const minutes = diff.getUTCMinutes();
    const seconds = diff.getUTCSeconds();

    let timerText;

    if (isMobileDevice()) {
        // 如果是移动设备，在“日”字后换行
        timerText = `我们相恋${years}年${months}月${days}日<br>${days}小时${minutes}分钟${seconds}秒啦~`;
    } else {
        // 否则，正常显示
        timerText = `我们相恋${years}年${months}月${days}日${days}小时${minutes}分钟${seconds}秒啦~`;
    }

    document.getElementById('timer').innerHTML = timerText;
}

setInterval(updateTimer, 1000);
