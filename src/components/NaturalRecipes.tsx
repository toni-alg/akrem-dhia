import { useEffect, useState } from 'react';
import { Leaf, Clock, Sparkles } from 'lucide-react';
import { supabase, NaturalRecipe } from '../lib/supabase';

interface RecipesProps {
  skinType?: string;
}

export default function NaturalRecipes({ skinType }: RecipesProps) {
  const [recipes, setRecipes] = useState<NaturalRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState<NaturalRecipe | null>(null);

  useEffect(() => {
    fetchRecipes();
  }, [skinType]);

  const fetchRecipes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('natural_recipes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching recipes:', error);
    } else {
      let filteredRecipes = data || [];
      if (skinType) {
        filteredRecipes = filteredRecipes.filter(recipe =>
          recipe.suitable_for.includes(skinType)
        );
      }
      setRecipes(filteredRecipes);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">وصفات طبيعية</h2>
        <p className="text-gray-600">
          {skinType
            ? `وصفات مناسبة لبشرتك ${skinType}`
            : 'اكتشفي وصفات طبيعية آمنة لبشرتك'}
        </p>
      </div>

      {recipes.length === 0 ? (
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-8 text-center">
          <Leaf className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
          <p className="text-yellow-800 font-semibold text-lg">
            لا توجد وصفات متاحة حالياً
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => setSelectedRecipe(recipe)}
              className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-emerald-500 hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-emerald-100 rounded-xl">
                  <Leaf className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>15-20 دقيقة</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {recipe.title_ar}
              </h3>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {recipe.description_ar}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex flex-wrap gap-2">
                  {recipe.suitable_for.slice(0, 3).map((type, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex flex-wrap gap-2">
                  {recipe.benefits.slice(0, 2).map((benefit, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1 text-xs text-emerald-700"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
}

interface RecipeModalProps {
  recipe: NaturalRecipe;
  onClose: () => void;
}

function RecipeModal({ recipe, onClose }: RecipeModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-6 rounded-t-2xl">
          <h2 className="text-2xl font-bold mb-2">{recipe.title_ar}</h2>
          <p className="text-emerald-50">{recipe.description_ar}</p>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-emerald-600" />
              المكونات المطلوبة:
            </h3>
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              {recipe.ingredients.map((ing, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="text-gray-800 font-medium">{ing.name}</span>
                  <span className="text-gray-600 text-sm">{ing.amount}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3">
              طريقة التحضير:
            </h3>
            <div className="bg-emerald-50 rounded-xl p-4">
              <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                {recipe.instructions}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3">الفوائد:</h3>
            <div className="grid gap-2">
              {recipe.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3">
              مناسبة لأنواع البشرة:
            </h3>
            <div className="flex flex-wrap gap-2">
              {recipe.suitable_for.map((type, idx) => (
                <span
                  key={idx}
                  className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}
