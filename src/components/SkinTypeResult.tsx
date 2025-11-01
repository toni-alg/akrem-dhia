import { Sparkles, Droplets, Sun, Heart } from 'lucide-react';

interface SkinTypeResultProps {
  skinType: string;
  concerns: string[];
  onContinue: () => void;
}

const skinTypeInfo: Record<string, { icon: typeof Sparkles; color: string; description: string; tips: string[] }> = {
  'دهنية': {
    icon: Droplets,
    color: 'blue',
    description: 'بشرتك تنتج زيوت طبيعية بكثرة، مما يجعلها لامعة خاصة في منطقة T (الجبهة والأنف والذقن)',
    tips: [
      'استخدمي غسول لطيف مرتين يومياً',
      'تجنبي المنتجات الزيتية الثقيلة',
      'استخدمي تونر قابض للمسام',
      'احرصي على تقشير بشرتك مرتين أسبوعياً'
    ]
  },
  'جافة': {
    icon: Sun,
    color: 'orange',
    description: 'بشرتك تفتقر للرطوبة والزيوت الطبيعية، مما قد يسبب الشعور بالشد والتقشر',
    tips: [
      'استخدمي مرطب غني بالزيوت الطبيعية',
      'تجنبي الماء الساخن عند الغسل',
      'احرصي على شرب الماء بكثرة',
      'استخدمي ماسكات مرطبة 2-3 مرات أسبوعياً'
    ]
  },
  'مختلطة': {
    icon: Sparkles,
    color: 'purple',
    description: 'بشرتك تجمع بين الدهنية في منطقة T والجافة في الخدين',
    tips: [
      'استخدمي منتجات متوازنة',
      'ضعي مرطب خفيف على منطقة T',
      'استخدمي مرطب أغنى على الخدين',
      'نظفي بشرتك بمنتج لطيف متوازن'
    ]
  },
  'عادية': {
    icon: Heart,
    color: 'green',
    description: 'بشرتك متوازنة ولا تعاني من مشاكل كبيرة، لكن تحتاج للعناية للحفاظ على صحتها',
    tips: [
      'حافظي على روتين بسيط ومنتظم',
      'استخدمي واقي شمس يومياً',
      'نظفي ورطبي بشرتك مرتين يومياً',
      'استخدمي مقشر لطيف مرة أسبوعياً'
    ]
  },
  'حساسة': {
    icon: Heart,
    color: 'pink',
    description: 'بشرتك تتفاعل بسهولة مع المنتجات والعوامل الخارجية، وقد تصاب بالاحمرار والتهيج',
    tips: [
      'اختاري منتجات خالية من العطور',
      'تجنبي المواد الكيميائية القاسية',
      'اختبري المنتجات الجديدة على منطقة صغيرة أولاً',
      'استخدمي منتجات مهدئة تحتوي على الصبار والبابونج'
    ]
  }
};

const concernsMap: Record<string, string> = {
  'acne': 'حب الشباب',
  'wrinkles': 'التجاعيد',
  'dark_spots': 'البقع الداكنة',
  'redness': 'الاحمرار',
  'dryness': 'الجفاف',
  'oiliness': 'الدهون الزائدة'
};

export default function SkinTypeResult({ skinType, concerns, onContinue }: SkinTypeResultProps) {
  const info = skinTypeInfo[skinType] || skinTypeInfo['عادية'];
  const Icon = info.icon;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl shadow-xl p-8 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className={`p-4 bg-${info.color}-100 rounded-2xl`}>
            <Icon className={`w-12 h-12 text-${info.color}-600`} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              بشرتك {skinType}
            </h2>
            <p className="text-gray-600">نتيجة التحليل</p>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-6">
          {info.description}
        </p>

        {concerns.length > 0 && (
          <div className="bg-white rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">
              مشاكل البشرة التي اخترتيها:
            </h3>
            <div className="flex flex-wrap gap-2">
              {concerns.map((concern) => (
                <span
                  key={concern}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold"
                >
                  {concernsMap[concern] || concern}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl p-6">
          <h3 className="font-bold text-gray-800 mb-4 text-lg">
            نصائح للعناية ببشرتك:
          </h3>
          <ul className="space-y-3">
            {info.tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  {idx + 1}
                </span>
                <span className="text-gray-700 leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
        <p className="text-blue-800 font-semibold mb-2">
          هل تعلمين؟
        </p>
        <p className="text-blue-700 text-sm leading-relaxed">
          نوع بشرتك قد يتغير مع الوقت بسبب عوامل مختلفة مثل العمر، المناخ، والهرمونات.
          يُنصح بإعادة تقييم نوع بشرتك كل 6 أشهر.
        </p>
      </div>

      <button
        onClick={onContinue}
        className="w-full py-4 bg-emerald-600 text-white rounded-xl font-semibold text-lg hover:bg-emerald-700 transition-colors"
      >
        استكشاف المزيد
      </button>
    </div>
  );
}
