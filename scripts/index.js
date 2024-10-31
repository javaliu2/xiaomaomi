const startDate = new Date('2024-08-12T21:43:00');

function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

function updateTimer() {
    const now = new Date();
    const diff = now - startDate;

    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const years = Math.floor(totalDays / 365);
    const months = Math.floor((totalDays % 365) / 30);
    const days = totalDays % 30;

    const hours = new Date(diff).getUTCHours();
    const minutes = new Date(diff).getUTCMinutes();
    const seconds = new Date(diff).getUTCSeconds();

    let timerText;

    if (isMobileDevice()) {
        timerText = `我们相恋${years}年${months}个月${days}天<br>${hours}小时${minutes}分钟${seconds}秒啦~`;
    } else {
        timerText = `我们相恋${years}年${months}个月${days}天${hours}小时${minutes}分钟${seconds}秒啦~`;
    }

    document.getElementById('timer').innerHTML = timerText;
}

setInterval(updateTimer, 1000);
