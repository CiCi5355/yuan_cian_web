let role = {
    profession:'',
}

var profession_selet = document.getElementById('profession_selet');
var profession_btn = document.getElementById('profession_btn');

// 職業選擇
document.getElementById('profession_btn').addEventListener('click', function () {
    profession_selet.style.display = (profession_selet.style.display === 'none') ? 'block' : 'none';
});
document.getElementById('assassin_btn').addEventListener('click', function () { // 刺客
    role.profession = 'assassin';
    profession_selet.style.display = 'none';
    profession_btn.innerText = '刺客';
});
document.getElementById('ranger_btn').addEventListener('click', function () { // 遊俠
    role.profession = 'ranger';
    profession_selet.style.display = 'none';
    profession_btn.innerText = '遊俠';
});
document.getElementById('elemental_mage_btn').addEventListener('click', function () { // 元素法師
    role.profession = 'elemental_mage';
    profession_selet.style.display = 'none';
    profession_btn.innerText = '元素法師';
});