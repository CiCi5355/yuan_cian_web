// 設置可拖動元素
let dragElements = document.querySelectorAll('.draggable');
dragElements.forEach(function (element) {
    dragElement(element);
});

function addDiv(name) {
    // 创建可拖动的 DIV 元素
    const draggableDiv = document.createElement('div');
    draggableDiv.id = name;
    draggableDiv.className = 'draggable hiddenDiv';

    // 创建标题区域
    const handleDiv = document.createElement('div');
    handleDiv.id = `${name}handle`;
    handleDiv.className = 'handle';
    handleDiv.textContent = 'Click here to move';

    // 将标题区域添加到可拖动的 DIV 中
    draggableDiv.appendChild(handleDiv);

    // 创建其他内容
    const contentParagraphs = [name, 'Move', 'this', 'DIV'];
    contentParagraphs.forEach(text => {
        const paragraph = document.createElement('p');
        paragraph.textContent = text;
        draggableDiv.appendChild(paragraph);
    });

    return draggableDiv;
}


function dragElement(elmnt) {
    // 定義四個位置變數，用於跟踪滑鼠遊標位置和元素位置的變化
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    // 檢查是否存在拖動把手
    if (document.getElementById(elmnt.id + "_handle")) {
        // 如果存在，將把手的 mousedown 事件設置為 dragMouseDown 函數
        document.getElementById(elmnt.id + "_handle").ontouchstart = dragTouchStart;
        document.getElementById(elmnt.id + "_handle").onmousedown = dragMouseDown;
    } else {
        // 如果不存在，則直接將元素的 mousedown 事件設置為 dragMouseDown 函數
        elmnt.ontouchstart = dragTouchStart;
        elmnt.onmousedown = dragMouseDown;
    }

    // 啟動拖動時觸發的函數
    function dragMouseDown(e) {
        e.preventDefault(); // 防止瀏覽器預設的拖動行為

        // 取得滑鼠遊標的起始位置
        pos3 = e.clientX;
        pos4 = e.clientY;

        // 將顯示層級設為最高
        elmnt.style.zIndex = getMaxZIndex() + 1;

        // 設置放開滑鼠按鈕時觸發的函數
        document.onmouseup = closeDragElement;

        // 每當滑鼠移動時觸發的函數
        document.onmousemove = elementDrag;
    }

    function dragTouchStart(e) {
        e.preventDefault();
        var touch = e.touches[0];
        pos3 = touch.clientX;
        pos4 = touch.clientY;
        elmnt.style.zIndex = getMaxZIndex() + 1;
        document.ontouchend = closeDragElement;
        document.ontouchmove = elementDragTouch;
    }

    // 滑鼠移動時觸發的函數
    function elementDrag(e) {
        e.preventDefault(); // 防止瀏覽器預設的拖動行為

        // 計算滑鼠的移動距離
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;

        // 更新滑鼠的起始位置
        pos3 = e.clientX;
        pos4 = e.clientY;

        // 設置元素的新位置
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function elementDragTouch(e) {
        e.preventDefault();
        var touch = e.touches[0];
        pos1 = pos3 - touch.clientX;
        pos2 = pos4 - touch.clientY;
        pos3 = touch.clientX;
        pos4 = touch.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }


    // 放開滑鼠按鈕時觸發的函數，停止拖動
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;

        // 重新排序z軸
        adjustZIndex(2)
    }
}

// 取得z軸最大值
function getMaxZIndex() {
    // 取得所有元素
    const allElements = document.querySelectorAll('.draggable');

    let maxZIndex = 0;

    // 遍歷所有元素
    allElements.forEach(element => {
        // 取得元素的 z-index 屬性值
        const zIndex = window.getComputedStyle(element).zIndex;

        // 將 z-index 轉為數字，如果無效則視為 0
        const zIndexValue = isNaN(zIndex) ? 0 : parseInt(zIndex);

        // 更新最大值
        maxZIndex = Math.max(maxZIndex, zIndexValue);
    });

    return maxZIndex;
}

function adjustZIndex(minZ = 0) { // 調整z軸
    // 取得所有具有 'draggable' 類別的元素
    const draggableElements = document.querySelectorAll('.draggable');

    // 將 NodeList 轉換為陣列並按照當前 z 軸值排序
    const sortedElements = Array.from(draggableElements).sort((a, b) => {
        const zIndexA = window.getComputedStyle(a).zIndex;
        const zIndexB = window.getComputedStyle(b).zIndex;
        return parseInt(zIndexA) - parseInt(zIndexB);
    });

    // 調整所有元素的 z 軸值，保持相對大小順序，差值為1
    let currentIndex = minZ;
    sortedElements.forEach(element => {
        element.style.zIndex = currentIndex;
        currentIndex += 1;
    });
}