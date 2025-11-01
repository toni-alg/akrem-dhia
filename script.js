document.addEventListener('DOMContentLoaded', function() {
    const dailyTip = document.querySelector('#daily-tip p');
    const anotherTipButton = document.querySelector('#daily-tip button');

    const tips = [
        'نظفي فرش المكياج بانتظام لتجنب تراكم البكتيريا.',
        'استخدمي واقي الشمس يوميًا لحماية بشرتك من أشعة الشمس الضارة.',
        'اشربي كمية كافية من الماء للحفاظ على ترطيب بشرتك.',
        'احصلي على قسط كافٍ من النوم لتجديد خلايا بشرتك.',
        'تناولي الأطعمة الغنية بمضادات الأكسدة لمحاربة شيخوخة البشرة.'
    ];

    anotherTipButton.addEventListener('click', function() {
        let currentTip = dailyTip.textContent;
        let newTip = currentTip;
        while (newTip === currentTip) {
            newTip = tips[Math.floor(Math.random() * tips.length)];
        }
        dailyTip.textContent = newTip;
    });
});
