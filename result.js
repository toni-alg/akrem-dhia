document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const skinType = urlParams.get('type');
    const problems = urlParams.get('problems');

    const results = {
        oily: {
            title: 'بشرتك دهنية',
            analysis: 'بشرتك تنتج زيوت طبيعية بكثرة، مما يجعلها لامعة خاصة في منطقة T (الجبهة والأنف والذقن).',
            tips: [
                'استخدمي غسول لطيف مرتين يومياً',
                'تجنبي المنتجات الزيتية الثقيلة',
                'استخدمي تونر قابض للمسام',
                'احرصي على تقشير بشرتك مرتين أسبوعياً'
            ],
            didYouKnow: 'نوع بشرتك قد يتغير مع الوقت بسبب عوامل مختلفة مثل العمر، المناخ، والهرمونات. يُنصح بإعادة تقييم نوع بشرتك كل 6 أشهر.'
        },
        dry: {
            title: 'بشرتك جافة',
            analysis: 'بشرتك تفتقر للزيوت الطبيعية، مما يجعلها مشدودة، باهتة، وقد تظهر عليها قشور.',
            tips: [
                'استخدمي غسول كريمي مرطب',
                'رطبي بشرتك بكريم غني بعد غسلها مباشرة',
                'تجنبي الاستحمام بالماء الساخن لفترات طويلة',
                'استخدمي جهاز ترطيب الهواء في المنزل'
            ],
            didYouKnow: 'البشرة الجافة أكثر عرضة لظهور الخطوط الدقيقة والتجاعيد المبكرة. الترطيب المستمر هو مفتاحك لبشرة شابة.'
        },
        combination: {
            title: 'بشرتك مختلطة',
            analysis: 'تجمع بشرتك بين نوعين، حيث تكون دهنية في منطقة T (الجبهة، الأنف، الذقن) وجافة أو عادية في باقي أجزاء الوجه.',
            tips: [
                'استخدمي منتجات موازنة للبشرة',
                'يمكنك استخدام منتجات مختلفة للمناطق المختلفة من وجهك',
                'رطبي المناطق الجافة وتجنبي المنتجات الثقيلة على المناطق الدهنية',
                'التقشير اللطيف يساعد على توحيد ملمس البشرة'
            ],
            didYouKnow: 'البشرة المختلطة هي النوع الأكثر شيوعاً. العناية بها تتطلب تحقيق التوازن بين الترطيب والتحكم في الزيوت.'
        },
        normal: {
            title: 'بشرتك عادية',
            analysis: 'بشرتك متوازنة، ليست دهنية جداً ولا جافة جداً. المسام غير واضحة والمشاكل قليلة.',
            tips: [
                'حافظي على روتين عناية بسيط ومنتظم',
                'نظفي ورطبي بشرتك يومياً',
                'استخدمي واقي الشمس لحماية بشرتك',
                'لا تهملي العناية ببشرتك حتى لو كانت مشاكلها قليلة'
            ],
            didYouKnow: 'حتى البشرة العادية تحتاج إلى عناية للحفاظ على توازنها وحمايتها من العوامل البيئية التي قد تسبب مشاكل مستقبلية.'
        },
        'oily-sensitive': {
            title: 'بشرتك دهنية وحساسة',
            analysis: 'بشرتك تجمع بين إنتاج الزيوت الزائدة والتهيج والاحمرار بسهولة.',
            tips: [
                'استخدمي غسول جل لطيف وخالي من العطور',
                'ابحثي عن منتجات تحمل علامة \'للبشرة الحساسة\'',
                'تجنبي المقشرات القوية والمكونات المهيجة مثل الكحول',
                'استخدمي مرطب خفيف الوزن ومخصص للبشرة الحساسة'
            ],
            didYouKnow: 'البشرة الدهنية يمكن أن تكون حساسة أيضاً. استخدام منتجات قاسية لإزالة الزيوت قد يزيد من حساسيتها ويفاقم المشكلة.'
        },
        'dry-sensitive': {
            title: 'بشرتك جافة وحساسة',
            analysis: 'بشرتك تعاني من الجفاف والتقشر، وفي نفس الوقت تتهيج وتحمر بسهولة عند استخدام منتجات معينة.',
            tips: [
                'استخدمي منظفات كريمية غنية بالمرطبات',
                'ابحثي عن مكونات مهدئة مثل الصبار والبابونج',
                'تجنبي المنتجات التي تحتوي على عطور وأصباغ',
                'رطبي بشرتك بكثافة بمنتجات مخصصة للبشرة الجافة والحساسة'
            ],
            didYouKnow: 'حاجز البشرة الواقي يكون ضعيفاً في البشرة الجافة والحساسة، مما يجعلها أكثر عرضة للعوامل الخارجية. تقوية هذا الحاجز هي أولوية.'
        }
    };

    const resultData = results[skinType] || results['normal'];

    document.getElementById('skin-type').textContent = resultData.title;
    document.getElementById('analysis').textContent = resultData.analysis;
    document.getElementById('did-you-know-text').textContent = resultData.didYouKnow;

    const tipsList = document.getElementById('tips-list');
    resultData.tips.forEach(tip => {
        const li = document.createElement('li');
        li.textContent = tip;
        tipsList.appendChild(li);
    
        const exploreButton = document.querySelector('.cta-button');
        exploreButton.addEventListener('click', () => {
            const skinTypeTitle = resultData.title;
            const searchQuery = `العناية ب${skinTypeTitle}`;
            const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
            window.open(googleSearchUrl, '_blank');
        });
    });

    const problemsSection = document.getElementById('problems-section');
    if (problems) {
        const problemsList = document.getElementById('problems-list');
        const problemItems = problems.split(',');
        problemItems.forEach(problem => {
            const li = document.createElement('li');
            li.textContent = problem;
            problemsList.appendChild(li);
        });
    } else {
        problemsSection.style.display = 'none';
    }
});
