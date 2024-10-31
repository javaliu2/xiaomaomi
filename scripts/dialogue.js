const conversationDiv = document.getElementById('conversation');
const optionsDiv = document.getElementById('options');
const backImg = document.getElementById('back');

backImg.addEventListener('click', () => {
    window.location.href = "story.html";
});

let conversations = [
    { text: "小猫咪~", options: ["呜呜呜~", "哥哥~哥哥~哥哥~~"] },
    { text: "你喜欢哥哥嘛？", options: ["猫咪喜欢哥哥！", "不。"] },
    { text: "爱哥哥吗？", options: ["爱哥哥！", "不。"] },
    { text: "听哥哥话嘛？", options: ["不。", "嗯嗯嗯~，宝宝听话"] },
    { text: "那好，我们携手同行，共觐弥陀。", options: ["嗯嗯嗯。"] },
    { text: "让我们一起进入阿弥陀佛的西方净土。", options: ["嗯嗯嗯。"] },
];

let currentIndex = 0;
function startConversation() {
    nextMessage();
}

function nextMessage() {
    if (currentIndex < conversations.length) {
        const item = conversations[currentIndex];
        addMessage('sent', item.text);
        showOptions(item.options);
        currentIndex++;
    }else {
        window.location.href="https://guangguang.cloudvideocdn.taobao.com/12d44507488eadfa/5a33a758c5468c54/20221228_b0b1136053d8bf99_393115415861_17906701283325_published_mp4_264_hd_taobao.mp4?auth_key=1730353603-0-0-630f6cbe7f8656df3a9625002e6d42fe&biz=guangguang-ab400eb7d06e4f4e&t=2131178817303509038974788e1364&t=2131178817303509038974788e1364&b=guangguang&p=cloudvideo_http_pc_video_daren_publish&autoplay=1&playsinline=1";
    }
}

function showOptions(options) {
    optionsDiv.innerHTML = options.map(option => `
            <div class="option" onclick="selectOption('${option}')">${option}</div>
        `).join('');
}

function selectOption(option) {
    if (option === "不。") {
        addMessage('received', option);
        optionsDiv.innerHTML = "";
        addMessage('sent', "再见。");
    } else {
        addMessage('received', option);
        optionsDiv.innerHTML = "";
        nextMessage();
    }
}

function addMessage(type, text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    const messageBox = document.createElement('div');
    messageBox.className = 'message-box';
    messageBox.innerText = text;


    if (type === 'sent') {
        messageDiv.appendChild(messageBox);
        messageDiv.appendChild(document.createElement('img')).src = '../images/wei_song.jpg';
    } else {
        messageDiv.appendChild(document.createElement('img')).src = '../images/wei_rui.jpg';
        messageDiv.appendChild(messageBox);
    }
    conversationDiv.appendChild(messageDiv);
    conversationDiv.scrollTop = conversationDiv.scrollHeight; // 滚动到底部
}
startConversation();