import { useState, useEffect } from 'react';
import { Droplets, Sun, Sparkles, AlertCircle } from 'lucide-react';

interface QuizProps {
  onComplete: (skinType: string, concerns: string[]) => void;
}

const allQuestions = [
  {
    id: 1,
    question: 'كيف تشعرين ببشرتك في منتصف النهار؟',
    options: [
      { value: 'oily', label: 'لامعة ودهنية', icon: Droplets },
      { value: 'dry', label: 'جافة ومشدودة', icon: Sun },
      { value: 'normal', label: 'متوازنة ومريحة', icon: Sparkles },
      { value: 'combination', label: 'دهنية في الجبهة والأنف فقط', icon: AlertCircle }
    ]
  },
  {
    id: 2,
    question: 'هل تعانين من مسام واسعة؟',
    options: [
      { value: 'oily', label: 'نعم، خاصة في منطقة T', icon: Droplets },
      { value: 'dry', label: 'لا، مساماتي صغيرة', icon: Sun },
      { value: 'normal', label: 'مسامات عادية', icon: Sparkles },
      { value: 'combination', label: 'في الجبهة والأنف فقط', icon: AlertCircle }
    ]
  },
  {
    id: 3,
    question: 'كيف تتفاعل بشرتك مع المنتجات الجديدة؟',
    options: [
      { value: 'oily', label: 'تصبح أكثر دهنية', icon: Droplets },
      { value: 'sensitive', label: 'تتهيج بسهولة', icon: AlertCircle },
      { value: 'normal', label: 'تتقبلها جيداً', icon: Sparkles },
      { value: 'dry', label: 'تحتاج ترطيب إضافي', icon: Sun }
    ]
  },
  {
    id: 4,
    question: 'بعد غسل وجهك، كيف تشعرين ببشرتك قبل وضع أي منتج؟',
    options: [
      { value: 'dry', label: 'مشدودة وغير مريحة', icon: Sun },
      { value: 'oily', label: 'ناعمة ولكن تبدأ باللمعان بسرعة', icon: Droplets },
      { value: 'combination', label: 'جافة في الخدين ودهنية في الجبهة والأنف', icon: AlertCircle },
      { value: 'normal', label: 'مريحة وغير مشدودة', icon: Sparkles }
    ]
  },
  {
    id: 5,
    question: 'هل تظهر لك بثور أو حبوب بشكل متكرر؟',
    options: [
      { value: 'oily', label: 'نعم، وبشكل مستمر', icon: Droplets },
      { value: 'combination', label: 'أحياناً، في منطقة T', icon: AlertCircle },
      { value: 'sensitive', label: 'نعم، مع احمرار وتهيج', icon: AlertCircle },
      { value: 'normal', label: 'نادراً جداً', icon: Sparkles }
    ]
  },
  {
    id: 6,
    question: 'هل تلاحظين احمراراً في بشرتك بسهولة؟',
    options: [
      { value: 'sensitive', label: 'نعم، تتأثر بالطقس والمنتجات', icon: AlertCircle },
      { value: 'dry', label: 'أحياناً، مع جفاف', icon: Sun },
      { value: 'oily', label: 'نادراً، إلا مع وجود حبوب', icon: Droplets },
      { value: 'normal', label: 'لا، بشرتي هادئة', icon: Sparkles }
    ]
  },
  {
    id: 7,
    question: 'كيف تبدو بشرتك في نهاية اليوم؟',
    options: [
      { value: 'oily', label: 'دهنية جداً ومظهرها متعب', icon: Droplets },
      { value: 'dry', label: 'باهتة وتظهر عليها خطوط دقيقة', icon: Sun },
      { value: 'combination', label: 'لامعة في منطقة T وجافة في أماكن أخرى', icon: AlertCircle },
      { value: 'normal', label: 'لا تزال تبدو جيدة', icon: Sparkles }
    ]
  },
  {
    id: 8,
    question: 'هل تعانين من تقشر في البشرة؟',
    options: [
      { value: 'dry', label: 'نعم، بشكل متكرر', icon: Sun },
      { value: 'sensitive', label: 'أحياناً، مع تهيج', icon: AlertCircle },
      { value: 'combination', label: 'فقط في المناطق الجافة', icon: AlertCircle },
      { value: 'oily', label: 'نادراً جداً', icon: Droplets }
    ]
  }
];

const concerns = [
  { id: 'acne', label: 'حب الشباب' },
  { id: 'wrinkles', label: 'التجاعيد' },
  { id: 'dark_spots', label: 'البقع الداكنة' },
  { id: 'redness', label: 'الاحمرار' },
  { id: 'dryness', label: 'الجفاف' },
  { id: 'oiliness', label: 'الدهون الزائدة' }
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const shuffleArray = (array: any[]) => {
  return array.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export default function SkinTypeQuiz({ onComplete }: QuizProps) {
  const [questions, setQuestions] = useState<typeof allQuestions>([]);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);

  useEffect(() => {
    setQuestions(shuffleArray(allQuestions).slice(0, 5));
  }, []);

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setStep(questions.length);
    }
  };

  const determineSkinType = () => {
    const counts: Record<string, number> = {};
    answers.forEach(answer => {
      counts[answer] = (counts[answer] || 0) + 1;
    });

    return Object.keys(counts).reduce((a, b) =>
      counts[a] > counts[b] ? a : b
    );
  };

  const handleComplete = () => {
    const skinType = determineSkinType();
    const skinTypeMap: Record<string, string> = {
      'oily': 'دهنية',
      'dry': 'جافة',
      'normal': 'عادية',
      'combination': 'مختلطة',
      'sensitive': 'حساسة'
    };

    onComplete(skinTypeMap[skinType], selectedConcerns);
  };

  const toggleConcern = (concernId: string) => {
    if (selectedConcerns.includes(concernId)) {
      setSelectedConcerns(selectedConcerns.filter(c => c !== concernId));
    } else {
      setSelectedConcerns([...selectedConcerns, concernId]);
    }
  };

  if (step < questions.length) {
    const currentQuestion = questions[step];

    return (
      <div className="max-w-2xl mx-auto p-6 animate-fade-in">
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {questions.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 flex-1 mx-1 rounded transition-all duration-300 ${
                  idx <= step ? 'bg-emerald-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600 text-center">
            سؤال {step + 1} من {questions.length}
          </p>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center animate-slide-in-down">
          {currentQuestion.question}
        </h2>

        <div className="grid gap-4">
          {currentQuestion.options.map((option, index) => {
            const Icon = option.icon;
            return (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className="flex items-center gap-4 p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all animate-slide-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Icon className="w-8 h-8 text-emerald-600" />
                <span className="text-lg text-gray-800">{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        هل لديك أي مشاكل بشرة؟
      </h2>
      <p className="text-gray-600 mb-8 text-center">
        اختاري كل ما ينطبق عليك
      </p>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {concerns.map((concern) => (
          <button
            key={concern.id}
            onClick={() => toggleConcern(concern.id)}
            className={`p-4 rounded-xl border-2 transition-all ${
              selectedConcerns.includes(concern.id)
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
            }`}
          >
            {concern.label}
          </button>
        ))}
      </div>

      <button
        onClick={handleComplete}
        className="w-full py-4 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
      >
        عرض النتائج
      </button>
    </div>
  );
}
