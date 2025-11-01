import { useState } from 'react';
import { Leaf, Scan, BookOpen, Sparkles } from 'lucide-react';
import SkinTypeQuiz from './components/SkinTypeQuiz';
import SkinTypeResult from './components/SkinTypeResult';
import IngredientScanner from './components/IngredientScanner';
import AnalysisResults from './components/AnalysisResults';
import NaturalRecipes from './components/NaturalRecipes';
import BeautyTips from './components/BeautyTips';

type View = 'home' | 'quiz' | 'result' | 'scanner' | 'analysis' | 'recipes';

interface ScanResult {
  productName: string;
  ingredients: {
    id: string;
    name_en: string;
    name_ar: string;
    safety_rating: 'safe' | 'caution' | 'harmful';
    is_natural: boolean;
    benefits: string[];
    concerns: string[];
    description_ar: string;
  }[];
  safeCount: number;
  cautionCount: number;
  harmfulCount: number;
}

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [skinType, setSkinType] = useState<string>('');
  const [concerns, setConcerns] = useState<string[]>([]);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);

  const handleQuizComplete = (type: string, selectedConcerns: string[]) => {
    setSkinType(type);
    setConcerns(selectedConcerns);
    setCurrentView('result');
  };

  const handleScanComplete = (result: ScanResult) => {
    setScanResult(result);
    setCurrentView('analysis');
  };

  const renderView = () => {
    switch (currentView) {
      case 'quiz':
        return <SkinTypeQuiz onComplete={handleQuizComplete} />;

      case 'result':
        return (
          <SkinTypeResult
            skinType={skinType}
            concerns={concerns}
            onContinue={() => setCurrentView('home')}
          />
        );

      case 'scanner':
        return <IngredientScanner onScanComplete={handleScanComplete} />;

      case 'analysis':
        return scanResult ? (
          <AnalysisResults
            productName={scanResult.productName}
            ingredients={scanResult.ingredients}
            safeCount={scanResult.safeCount}
            cautionCount={scanResult.cautionCount}
            harmfulCount={scanResult.harmfulCount}
            onClose={() => setCurrentView('home')}
          />
        ) : null;

      case 'recipes':
        return <NaturalRecipes skinType={skinType} />;

      default:
        return (
          <div className="max-w-6xl mx-auto p-4 md:p-6 animate-fade-in">
            {/* Hero Section */}
            <div className="text-center bg-gradient-to-br from-emerald-50 to-green-100 rounded-3xl p-8 md:p-12 mb-12 animate-slide-in-down">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="p-3 bg-white rounded-2xl shadow-md">
                  <Leaf className="w-10 h-10 md:w-12 md:h-12 text-emerald-600" />
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-emerald-900">
                  بيوتي لايف
                </h1>
              </div>
              <p className="text-lg md:text-xl text-emerald-800 max-w-2xl mx-auto mb-8">
                جمالكِ يبدأ من معرفة بشرتك. دليلك العلمي لاختيار المنتجات الطبيعية الآمنة.
              </p>
              <button 
                onClick={() => setCurrentView('quiz')}
                className="bg-emerald-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-emerald-700 transition-all transform hover:scale-105"
              >
                ابدئي اختبار نوع البشرة
              </button>
              {skinType && (
                <div className="mt-6 inline-block px-5 py-2 bg-white/80 backdrop-blur-sm text-emerald-700 rounded-full font-semibold shadow-sm">
                  نوع بشرتك المحدد: {skinType}
                </div>
              )}
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div
                onClick={() => setCurrentView('scanner')}
                className="bg-white rounded-3xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-emerald-500 transform hover:-translate-y-2 animate-slide-in-up"
                style={{ animationDelay: '200ms' }}
              >
                <div className="p-4 bg-emerald-100 rounded-2xl w-fit mb-4">
                  <Scan className="w-8 h-8 md:w-10 md:h-10 text-emerald-600" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
                  تحليل المكونات
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  امسحي مكونات أي منتج واحصلي على تحليل علمي مفصل لكل مكوّن.
                </p>
              </div>

              <div
                onClick={() => setCurrentView('recipes')}
                className="bg-white rounded-3xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-emerald-500 transform hover:-translate-y-2 animate-slide-in-up"
                style={{ animationDelay: '400ms' }}
              >
                <div className="p-4 bg-emerald-100 rounded-2xl w-fit mb-4">
                  <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-emerald-600" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
                  وصفات طبيعية
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  اكتشفي وصفات طبيعية آمنة ومجربة تناسب نوع بشرتك.
                </p>
              </div>

              <div
                onClick={() => setCurrentView('quiz')}
                className="bg-white rounded-3xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-emerald-500 transform hover:-translate-y-2 animate-slide-in-up"
                style={{ animationDelay: '600ms' }}
              >
                <div className="p-4 bg-emerald-100 rounded-2xl w-fit mb-4">
                  <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-emerald-600" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
                  اختبار نوع البشرة
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  أجيبي على أسئلة بسيطة لتحديد نوع بشرتك والحصول على نصائح مخصصة.
                </p>
              </div>
            </div>

            {/* Beauty Tips Section */}
            <div className="mb-12 animate-fade-in" style={{ animationDelay: '800ms' }}>
              <BeautyTips />
            </div>

            {/* Why Us Section */}
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-8 text-white animate-fade-in" style={{ animationDelay: '1000ms' }}>
              <h3 className="text-2xl font-bold mb-4">لماذا بيوتي لايف؟</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2 text-emerald-100">
                    معلومات علمية موثوقة
                  </h4>
                  <p className="text-emerald-50 text-sm">
                    جميع البيانات مبنية على أبحاث علمية في مجال البيولوجيا والكيمياء التجميلية
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-emerald-100">
                    تحليل شامل للمكونات
                  </h4>
                  <p className="text-emerald-50 text-sm">
                    تعرفي على تأثير كل مكون على بشرتك بشكل مفصل وسهل الفهم
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-emerald-100">
                    بدائل طبيعية آمنة
                  </h4>
                  <p className="text-emerald-50 text-sm">
                    وصفات طبيعية يمكنك تحضيرها في المنزل بمكونات آمنة ومتوفرة
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfaf6]" dir="rtl">
      {currentView !== 'home' && (
        <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <button
              onClick={() => setCurrentView('home')}
              className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors font-semibold"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              الرجوع للرئيسية
            </button>
          </div>
        </div>
      )}

      <div className="py-8">
        {renderView()}
      </div>
    </div>
  );
}

export default App;
