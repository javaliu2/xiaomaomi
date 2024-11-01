// 获取相关元素
const audio = document.getElementById('audio');
const playPauseButton = document.getElementById('play-pause');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const progressBar = document.getElementById('progress');
const currentTimeDisplay = document.getElementById('current-time');
const totalTimeDisplay = document.getElementById('total-time');
const menuButton = document.getElementById('menu');
const sidebar = document.getElementById('sidebar');
const playlistItems = document.querySelectorAll('#playlist li');
const songImage = document.getElementById('song-image');
const songDescription = document.getElementById('song-description');

// 轮播图相关
const carouselImages = ['../images/fig1.jpg', '../images/fig2.jpg', '../images/fig3.jpg',
    '../images/fig4.jpg', '../images/fig5.jpg', '../images/fig6.jpg',
    '../images/fig7.jpg', '../images/fig8.jpg', '../images/fig9.jpg'];
let currentCarouselIndex = 0;
let carouselTimeout;
const carouselImage = document.getElementById('carousel-image');

// 歌曲列表
const playlist = [
    { src: '../audio/gouzhiqishi.m4a', image: '../images/fig_gou.jpg', description: '勾指起誓-洛天依' },
    { src: '../audio/xihuanni.mp3', image: '../images/fig_xi.png', description: '喜欢你-Beyond' },
    { src: '../audio/zhendeaini.mp3', image: '../images/fig_zhen.jpg', description: '真的爱你-Beyond' },
    { src: '../audio/guiqulaixi.m4a', image: '../images/fig_gui.png', description: '归去来兮-花粥' },
    { src: '../audio/shanzhashuzhilian.m4a', image: '../images/fig_shan.jpg', description: '山楂树之恋-程佳佳' }
];

let currentSongIndex = 0;
let isPlaying = false;

// 播放器控制
function loadSong(index) {
    const song = playlist[index];
    audio.src = song.src;
    songImage.src = song.image;
    songDescription.textContent = song.description;
    playlistItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);  // 加黑当前歌曲
    });
    playPauseButton.textContent = '⏸';
    document.getElementById('audio').play();
}

audio.addEventListener('ended', () => {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    audio.play();
});

function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        isPlaying = true;
        playPauseButton.textContent = '⏸';
    } else {
        audio.pause();
        isPlaying = false;
        playPauseButton.textContent = '▶';
    }
}

function updateProgress() {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
}

function setProgress(e) {
    const width = progressBar.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
}

audio.addEventListener('loadedmetadata', () => {
    totalTimeDisplay.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', updateProgress);

progressBar.addEventListener('click', setProgress);
playPauseButton.addEventListener('click', togglePlayPause);

prevButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
    audio.play();
});
nextButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    audio.play();
});

playlistItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        loadSong(index);
        audio.play();
    });
});

// 三条杠菜单
let isShow = false;  // 歌单是否显示
menuButton.addEventListener('click', (e) => {
    if (!isShow) {
        e.stopPropagation(); // 防止冒泡
        sidebar.style.display = sidebar.style.display === 'none' || !sidebar.style.display ? 'block' : 'none';
        isShow = true;
    } else {
        sidebar.style.display = 'none';
        isShow = false;
    }
});


// 轮播图自动切换
function showNextCarouselImage() {
    currentCarouselIndex = (currentCarouselIndex + 1) % carouselImages.length;
    carouselImage.src = carouselImages[currentCarouselIndex];
}

function startCarousel() {
    carouselTimeout = setTimeout(() => {
        showNextCarouselImage();
        startCarousel();
    }, 8000);
}

startCarousel(); // 开始自动轮播
loadSong(currentSongIndex); // 初始化第一首歌

const ball = document.getElementById('bouncing-ball');
let posX = 0, posY = 0;
let speedX = 3, speedY = 2;
let gravity = 0.98;
let bounce = 0.8;
let minBounceSpeed = 5;  // 设置最小反弹速度
// 绑定点击事件
ball.addEventListener('click', () => {
    window.location.href = "dialogue.html";
});

function moveBall() {
    posX += speedX;
    speedY += gravity;
    posY += speedY;

    // 碰撞检测：左右边界
    if (posX <= 0 || posX >= window.innerWidth - ball.offsetWidth) {
        speedX = -speedX * bounce;
        posX = Math.max(0, Math.min(posX, window.innerWidth - ball.offsetWidth));
    }

    // 碰撞检测：上下边界
    if (posY >= window.innerHeight - ball.offsetHeight) {
        speedY = -speedY * bounce;

        // 确保反弹速度不低于最小速度
        if (Math.abs(speedY) < minBounceSpeed) {
            speedY = -minBounceSpeed;
        }

        posY = window.innerHeight - ball.offsetHeight;
    } else if (posY <= 0) {
        speedY = -speedY * bounce;
        posY = 0;
    }

    ball.style.left = posX + 'px';
    ball.style.top = posY + 'px';

    requestAnimationFrame(moveBall);
}

moveBall();
