import { CheckCircle, AlertTriangle, AlertCircle, Leaf, X } from 'lucide-react';
import { Ingredient } from '../lib/supabase';

interface AnalysisResultsProps {
  productName: string;
  ingredients: Ingredient[];
  safeCount: number;
  cautionCount: number;
  harmfulCount: number;
  onClose: () => void;
}

export default function AnalysisResults({
  productName,
  ingredients,
  safeCount,
  cautionCount,
  harmfulCount,
  onClose
}: AnalysisResultsProps) {
  const total = safeCount + cautionCount + harmfulCount;
  const safePercentage = total > 0 ? Math.round((safeCount / total) * 100) : 0;

  const getOverallRating = () => {
    if (harmfulCount > 0) return { text: 'غير موصى به', color: 'red', icon: AlertTriangle };
    if (cautionCount > safeCount) return { text: 'استخدام بحذر', color: 'yellow', icon: AlertCircle };
    if (safePercentage >= 70) return { text: 'موصى به', color: 'green', icon: CheckCircle };
    return { text: 'مقبول', color: 'blue', icon: Leaf };
  };

  const rating = getOverallRating();
  const RatingIcon = rating.icon;

  const getSafetyBadge = (safetyRating: string) => {
    switch (safetyRating) {
      case 'safe':
        return (
          <div className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
            <CheckCircle className="w-4 h-4" />
            آمن
          </div>
        );
      case 'caution':
        return (
          <div className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
            <AlertCircle className="w-4 h-4" />
            حذر
          </div>
        );
      case 'harmful':
        return (
          <div className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
            <AlertTriangle className="w-4 h-4" />
            مضر
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">نتائج التحليل</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{productName}</h3>

            <div className={`inline-flex items-center gap-2 px-4 py-2 bg-${rating.color}-100 text-${rating.color}-700 rounded-xl font-semibold text-lg`}>
              <RatingIcon className="w-6 h-6" />
              {rating.text}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-green-600">{safeCount}</div>
                <div className="text-sm text-gray-600 mt-1">مكونات آمنة</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-yellow-600">{cautionCount}</div>
                <div className="text-sm text-gray-600 mt-1">تحتاج حذر</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-red-600">{harmfulCount}</div>
                <div className="text-sm text-gray-600 mt-1">مكونات مضرة</div>
              </div>
            </div>

            {total > 0 && (
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>نسبة المكونات الآمنة</span>
                  <span className="font-semibold">{safePercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${safePercentage}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {ingredients.length === 0 ? (
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 text-center">
              <AlertCircle className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
              <p className="text-yellow-800 font-semibold">
                لم نتمكن من التعرف على المكونات في قاعدة البيانات
              </p>
              <p className="text-yellow-700 text-sm mt-2">
                تأكدي من كتابة الأسماء باللغة الإنجليزية أو العربية بشكل صحيح
              </p>
            </div>
          ) : (
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                تفاصيل المكونات ({ingredients.length})
              </h3>

              <div className="space-y-4">
                {ingredients.map((ingredient) => (
                  <div
                    key={ingredient.id}
                    className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:border-emerald-300 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-gray-800 text-lg">
                          {ingredient.name_ar}
                        </h4>
                        <p className="text-sm text-gray-600">{ingredient.name_en}</p>
                      </div>
                      {getSafetyBadge(ingredient.safety_rating)}
                    </div>

                    <p className="text-gray-700 mb-3 leading-relaxed">
                      {ingredient.description_ar}
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                      {ingredient.benefits && ingredient.benefits.length > 0 && (
                        <div>
                          <h5 className="font-semibold text-green-700 text-sm mb-2">
                            ✓ الفوائد:
                          </h5>
                          <ul className="space-y-1">
                            {ingredient.benefits.map((benefit, idx) => (
                              <li key={idx} className="text-sm text-gray-700">
                                • {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {ingredient.concerns && ingredient.concerns.length > 0 && (
                        <div>
                          <h5 className="font-semibold text-red-700 text-sm mb-2">
                            ⚠ التحذيرات:
                          </h5>
                          <ul className="space-y-1">
                            {ingredient.concerns.map((concern, idx) => (
                              <li key={idx} className="text-sm text-gray-700">
                                • {concern}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {ingredient.is_natural && (
                      <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold">
                        <Leaf className="w-3 h-3" />
                        مكون طبيعي
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-gray-50 rounded-xl p-6">
            <h4 className="font-semibold text-gray-800 mb-2">ملاحظة هامة:</h4>
            <p className="text-gray-700 text-sm leading-relaxed">
              هذا التحليل مبني على معلومات علمية عامة. قد تختلف استجابة البشرة من شخص لآخر.
              في حالة وجود حساسية أو مشاكل جلدية، يُنصح باستشارة طبيب الجلدية.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
