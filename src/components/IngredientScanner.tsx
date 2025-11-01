import { useState } from 'react';
import { Scan, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase, Ingredient } from '../lib/supabase';

interface ScannerProps {
  onScanComplete: (results: ScanResult) => void;
}

interface ScanResult {
  productName: string;
  ingredients: Ingredient[];
  safeCount: number;
  cautionCount: number;
  harmfulCount: number;
}

export default function IngredientScanner({ onScanComplete }: ScannerProps) {
  const [productName, setProductName] = useState('');
  const [ingredientText, setIngredientText] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = async () => {
    if (!productName || !ingredientText) return;

    setIsScanning(true);

    const ingredientNames = ingredientText
      .split(/[,،\n]/)
      .map(i => i.trim().toLowerCase())
      .filter(i => i.length > 0);

    const { data: ingredients, error } = await supabase
      .from('ingredients')
      .select('*');

    if (error) {
      console.error('Error fetching ingredients:', error);
      setIsScanning(false);
      return;
    }

    const matchedIngredients: Ingredient[] = [];
    let safeCount = 0;
    let cautionCount = 0;
    let harmfulCount = 0;

    ingredientNames.forEach(name => {
      const found = ingredients?.find(
        ing =>
          ing.name_en.toLowerCase().includes(name) ||
          ing.name_ar.includes(name) ||
          name.includes(ing.name_en.toLowerCase())
      );

      if (found) {
        matchedIngredients.push(found);
        if (found.safety_rating === 'safe') safeCount++;
        else if (found.safety_rating === 'caution') cautionCount++;
        else if (found.safety_rating === 'harmful') harmfulCount++;
      }
    });

    setIsScanning(false);

    onScanComplete({
      productName,
      ingredients: matchedIngredients,
      safeCount,
      cautionCount,
      harmfulCount
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-emerald-100 rounded-xl">
            <Scan className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            تحليل المكونات
          </h2>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              اسم المنتج
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="مثال: كريم مرطب للوجه"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              قائمة المكونات
            </label>
            <textarea
              value={ingredientText}
              onChange={(e) => setIngredientText(e.target.value)}
              placeholder="ادخلي المكونات مفصولة بفواصل أو أسطر جديدة&#10;مثال: Aloe Vera, Coconut Oil, Vitamin C"
              rows={6}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors resize-none"
            />
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-800 leading-relaxed">
              💡 <strong>نصيحة:</strong> يمكنك نسخ قائمة المكونات من عبوة المنتج أو من موقع الشركة المصنعة مباشرةً
            </p>
          </div>

          <button
            onClick={handleScan}
            disabled={!productName || !ingredientText || isScanning}
            className="w-full py-4 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isScanning ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                جاري التحليل...
              </>
            ) : (
              <>
                <Scan className="w-5 h-5" />
                تحليل المكونات
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mt-6 bg-gray-50 rounded-2xl p-6">
        <h3 className="font-semibold text-gray-800 mb-4">معايير التقييم:</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-gray-700">
              <strong className="text-green-600">آمن:</strong> مكون طبيعي وآمن للاستخدام
            </span>
          </div>
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            <span className="text-gray-700">
              <strong className="text-yellow-600">حذر:</strong> يحتاج استخدام حذر أو قد لا يناسب الجميع
            </span>
          </div>
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="text-gray-700">
              <strong className="text-red-600">مضر:</strong> مادة كيميائية قد تسبب مشاكل صحية
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
