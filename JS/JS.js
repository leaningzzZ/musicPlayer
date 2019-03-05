var Oaudio = document.getElementsByTagName("audio")[0];
var Obtn1 = document.getElementById("btn-bofang");
var logo = document.getElementsByTagName("img")[0];
var CurrentTime = document.getElementsByClassName("currentTime")[0];
var DurationTime = document.getElementsByClassName("allTime")[0];
var oProActive = document.getElementsByClassName("pro-active")[0];
var OradioBox = document.getElementsByClassName("radio-box")[0];
var OproBox = document.getElementsByClassName("pro-box")[0];
var tool = document.getElementsByClassName("tool")[0];
var valume = document.getElementById("valume");
var valumeLogo = document.getElementById("valumeLogo");
var valumeBox = document.getElementById("valumeBox");
var btn_shangyishou = document.getElementById("btn-shangyishou");
var btn_xiayishou = document.getElementById("btn-xiayishou");
var m, s, timer, transfome;


var songList = ["./source/杨宗纬 - 初爱.mp3", "./source/安河桥.mp3", "./source/子午大道旁.mp3"];
var logoList = ["./img/logo1.jpg", "./img/logo2.jpg", "./img/logo3.jpg"]
console.log(songList);
console.log(logoList);
var songNum = 0;
logo.src = logoList[songNum];
Oaudio.src = songList[songNum];
// 切歌
btn_shangyishou.onclick = function() {
    clearInterval(transfome);
    songNum--;
    if (songNum < 0) {
        songNum = songList.length - 1;
    }
    console.log(songNum);
    Oaudio.src = songList[songNum];
    logo.src = logoList[songNum];
    Oaudio.load();
    if (Obtn1.className = "iconfont icon-bofang") {
        Obtn1.className = "iconfont icon-zanting";
        // transfome = setInterval(logoTransform, 50);
        timer = setInterval(movepro, 200);
    }
    Oaudio.play(); //audio播放

}
btn_xiayishou.onclick = function() {
    clearInterval(transfome);
    songNum++;
    if (songNum >= songList.length) {
        songNum = 0;
    }
    console.log(songNum);
    Oaudio.src = songList[songNum];
    logo.src = logoList[songNum];
    Oaudio.load();
    if (Obtn1.className = "iconfont icon-bofang") {
        Obtn1.className = "iconfont icon-zanting";
        // transfome = setInterval(logoTransform, 50);
        timer = setInterval(movepro, 200);
    }
    Oaudio.play(); //audio播放
}

// 音量
valume.onmousedown = function() {
    Oaudio.volume = (valume.value) / 100;
}
valume.onmouseup = function() {
    Oaudio.volume = (valume.value) / 100;
}
valumeLogo.onclick = function() {
    valume.style.display = "block";
}
valumeBox.onmouseleave = function() {
        valume.style.display = "none";
    }
    // 进度条计时器
function movepro() {
    oProActive.style.width = (Oaudio.currentTime / Oaudio.duration) * 232 + 8 + "px";
    CurrentTime.innerHTML = "<span>" + time(Oaudio.currentTime) + "</span>";

}
// logo旋转
// function logoTransform() {
//     logo.style.transform += "rotate(" + 5 + "deg)";
// }
// // 点击播放，audio开始播放，当前时间开始计时，logo旋转
// Obtn1.onmouseup = function() {
//         if (Oaudio.paused) {
//             Oaudio.play(); //audio播放
//             Obtn1.className = "iconfont icon-zanting"; //播放图标样式更改
//             transfome = setInterval(logoTransform, 50); // logo旋转计时器
//             timer = setInterval(movepro, 200);
//         } else {
//             Oaudio.pause();
//             Obtn1.className = "iconfont icon-bofang";
//             clearInterval(transfome);
//             clearInterval(timer);
//         }
//     }
    //时长单位换算
function time(x) {
    s = parseInt(x % 60);
    m = parseInt(x / 60);
    if (m < 10) {
        m = "0" + m;
    }
    if (s < 10) {
        s = "0" + s;
    }
    return m + ":" + s;
}
// 开始时间和总时长ondurationchange(总时长变化)
Oaudio.oncanplay = function() {
    CurrentTime.innerHTML = "<span>" + time(Oaudio.currentTime) + "</span>";
    DurationTime.innerHTML = "<span>" + time(Oaudio.duration) + "</span>";

}
Oaudio.onended = function() {
        songNum++;
        if (songNum >= songList.length) {
            songNum = 0;
        }
        console.log(songNum);
        Oaudio.src = songList[songNum];
        logo.src = logoList[songNum];
        Oaudio.load();
        Oaudio.play(); //audio播放
        oProActive.style.width = 0 + "px";
        Oaudio.currentTime = 0;
        // clearInterval(transfome);
        CurrentTime.innerHTML = "<span>" + time(Oaudio.currentTime) + "</span>";
    }
    // OproBox.getBoundingClientRect().left当前元素距离左侧的距离
OradioBox.onmousedown = function() {
    var c = Oaudio.CurrentTime;
    clearInterval(timer);
    document.body.onmousemove = function() {
        clearInterval(timer);
        var newwidth = event.clientX - OproBox.getBoundingClientRect().left;
        if (newwidth < 8) {
            newwidth = 8;
        } else if (newwidth > 240) {
            newwidth = 240;
        } else {
            oProActive.style.width = newwidth + "px";
            c = (newwidth - 8) / 232 * Oaudio.duration;
            // Oaudio.CurrentTime = c;
            clearInterval(transfome);
            CurrentTime.innerHTML = "<span>" + time(c) + "</span>";
        }
    }
    document.body.onmouseup = function() {
        document.body.onmousemove = null;
        document.body.onmouseup = null;
        Oaudio.play(); //audio播放
        Obtn1.className = "iconfont icon-zanting"; //播放图标样式更改
        timer = setInterval(movepro, 200);
        // transfome = setInterval(logoTransform, 50);
        Oaudio.currentTime = c;
    }
}