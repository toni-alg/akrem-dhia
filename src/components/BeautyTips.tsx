import { useState, useEffect } from 'react';
import { Lightbulb } from 'lucide-react';

const allTips = [
  'اشربي الكثير من الماء كل يوم للحفاظ على ترطيب بشرتك من الداخل.',
  'لا تهملي استخدام واقي الشمس يوميًا، حتى في الأيام الغائمة.',
  'احرصي على إزالة المكياج بالكامل قبل النوم للسماح لبشرتك بالتنفس.',
  'النوم الكافي لمدة 7-8 ساعات ليلاً يساعد على تجديد خلايا البشرة.',
  'استخدمي مرطبًا مناسبًا لنوع بشرتك مرتين في اليوم.',
  'نظفي فرش المكياج بانتظام لتجنب تراكم البكتيريا.',
  'النظام الغذائي الصحي الغني بالفواكه والخضروات ينعكس إيجابًا على بشرتك.',
];

const BeautyTips = () => {
  const [tip, setTip] = useState('');

  useEffect(() => {
    setTip(allTips[Math.floor(Math.random() * allTips.length)]);
  }, []);

  const refreshTip = () => {
    let newTip = tip;
    while (newTip === tip) {
      newTip = allTips[Math.floor(Math.random() * allTips.length)];
    }
    setTip(newTip);
  };

  return (
    <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-amber-100 rounded-xl">
          <Lightbulb className="w-6 h-6 text-amber-600" />
        </div>
        <h3 className="text-xl font-bold text-amber-800">نصيحة اليوم</h3>
      </div>
      <p className="text-amber-900 text-lg mb-4">
        {tip}
      </p>
      <button 
        onClick={refreshTip}
        className="text-sm font-semibold text-amber-700 hover:text-amber-900 transition-colors"
      >
        نصيحة أخرى
      </button>
    </div>
  );
};

export default BeautyTips;
