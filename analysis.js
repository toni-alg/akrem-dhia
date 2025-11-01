document.addEventListener('DOMContentLoaded', () => {
    const analyzeBtn = document.getElementById('analyze-btn');
    const ingredientsInput = document.getElementById('ingredients-list');
    const productNameInput = document.getElementById('product-name');
    
    // Modal elements
    const resultsModal = document.getElementById('results-modal');
    const closeModalBtn = resultsModal.querySelector('.close-btn');
    const resultsListModal = document.getElementById('results-list-modal');
    const resultProductNameModal = document.getElementById('result-product-name-modal');

    const ingredientDatabase = {
        'aloe vera': { rating: 'safe', emoji: '🌿', aliases: ['aloe barbadensis', 'صبار'] },
        'coconut oil': { rating: 'safe', emoji: '🥥', aliases: ['cocos nucifera oil', 'زيت جوز الهند'] },
        'vitamin c': { rating: 'safe', emoji: '🍊', aliases: ['ascorbic acid', 'فيتامين سي', 'حمض الأسكوربيك', 'الفيتامين C'] },
        'parabens': { rating: 'harmful', emoji: '☠️', aliases: ['paraben', 'methylparaben', 'propylparaben', 'butylparaben', 'بارابين'] },
        'sulfates': { rating: 'caution', emoji: '⚠️', aliases: ['sulfate', 'sls', 'sles', 'sodium lauryl sulfate', 'sodium laureth sulfate', 'كبريتات', 'سلفات'] },
        'alcohol': { rating: 'caution', emoji: '⚠️', aliases: ['alcohol denat', 'ethanol', 'كحول'] },
        'fragrance': { rating: 'caution', emoji: '👃', aliases: ['parfum', 'perfume', 'عطر'] },
        'silicones': { rating: 'caution', emoji: '🤔', aliases: ['silicone', 'dimethicone', 'cyclomethicone', 'سيليكون'] },
        'hyaluronic acid': { rating: 'safe', emoji: '💧', aliases: ['sodium hyaluronate', 'حمض الهيالورونيك'] },
        'glycerin': { rating: 'safe', emoji: '🧴', aliases: ['glycerol', 'جلسرين'] },
        'salicylic acid': { rating: 'safe', emoji: '🔬', aliases: ['bha', 'حمض الساليسيليك'] },
        'retinol': { rating: 'caution', emoji: '⏳', aliases: ['vitamin a', 'فيتامين أ', 'ريتينول'] },
        'niacinamide': { rating: 'safe', emoji: '💊', aliases: ['vitamin b3', 'فيتامين ب3', 'نياسيناميد'] },
        'shea butter': { rating: 'safe', emoji: '🧈', aliases: ['butyrospermum parkii', 'زبدة الشيا'] },
        'jojoba oil': { rating: 'safe', emoji: '🌱', aliases: ['simmondsia chinensis seed oil', 'زيت الجوجوبا'] },
        'tea tree oil': { rating: 'safe', emoji: '🌳', aliases: ['melaleuca alternifolia leaf oil', 'زيت شجرة الشاي'] },
        'phenoxyethanol': { rating: 'caution', emoji: '🤔', aliases: ['فينوكسي إيثانول'] },
        'mineral oil': { rating: 'caution', emoji: '🛢️', aliases: ['paraffinum liquidum', 'زيت معدني'] },
        'phthalates': { rating: 'harmful', emoji: '☠️', aliases: ['phthalate', 'فثالات'] },
        'formaldehyde': { rating: 'harmful', emoji: '☠️', aliases: ['formalin', 'فورمالديهايد'] },
    };

    const ratingTranslations = {
        safe: 'آمن',
        caution: 'حذر',
        harmful: 'مضر',
        unknown: 'غير معروف'
    };

    function findIngredient(name) {
        const lowerCaseName = name.trim().toLowerCase();
        for (const key in ingredientDatabase) {
            if (key === lowerCaseName || ingredientDatabase[key].aliases.includes(lowerCaseName)) {
                return ingredientDatabase[key];
            }
        }
        return null;
    }

    function analyzeIngredients() {
        const ingredients = ingredientsInput.value.split(/[,\n]+/).map(ing => ing.trim()).filter(ing => ing);
        const productName = productNameInput.value.trim();

        if (ingredients.length === 0) {
            alert('الرجاء إدخال قائمة المكونات.');
            return;
        }

        resultProductNameModal.textContent = productName || 'المنتج';
        resultsListModal.innerHTML = '';

        ingredients.forEach(ingredient => {
            const dbEntry = findIngredient(ingredient);
            const ratingInfo = dbEntry ? dbEntry : { rating: 'unknown', emoji: '❓' };
            
            const resultItem = document.createElement('div');
            resultItem.className = `result-item ${ratingInfo.rating}`;

            const ingredientName = document.createElement('div');
            ingredientName.className = 'ingredient-name';
            ingredientName.textContent = `${ratingInfo.emoji} ${ingredient}`;

            const ratingText = document.createElement('span');
            ratingText.textContent = ratingTranslations[ratingInfo.rating];

            resultItem.appendChild(ingredientName);
            resultItem.appendChild(ratingText);

            resultsListModal.appendChild(resultItem);
        });

        resultsModal.classList.remove('hidden');
    }

    function closeModal() {
        resultsModal.classList.add('hidden');
    }

    analyzeBtn.addEventListener('click', analyzeIngredients);
    closeModalBtn.addEventListener('click', closeModal);
    resultsModal.addEventListener('click', (e) => {
        if (e.target === resultsModal) {
            closeModal();
        }
    });
});
