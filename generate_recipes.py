
import json
import random

def generate_recipes():
    ingredients_db = {
        "base": [
            {"name": "طين البنتونيت", "suitable_for": ["oily", "combination"]},
            {"name": "طين الكاولين", "suitable_for": ["sensitive", "normal", "dry"]},
            {"name": "دقيق الشوفان", "suitable_for": ["sensitive", "dry", "normal"]},
            {"name": "زبادي طبيعي", "suitable_for": ["all"]},
            {"name": "أفوكادو", "suitable_for": ["dry", "normal"]},
            {"name": "موز", "suitable_for": ["dry", "normal"]},
            {"name": "خيار", "suitable_for": ["oily", "sensitive"]},
            {"name": "كركم", "suitable_for": ["oily", "combination", "normal"]},
        ],
        "liquid": [
            {"name": "ماء ورد", "suitable_for": ["all"]},
            {"name": "شاي أخضر", "suitable_for": ["oily", "combination", "sensitive"]},
            {"name": "حليب", "suitable_for": ["dry", "normal"]},
            {"name": "جل الصبار", "suitable_for": ["all"]},
            {"name": "ماء", "suitable_for": ["all"]},
        ],
        "active": [
            {"name": "عسل طبيعي", "benefit": "مضاد للبكتيريا ومرطب", "suitable_for": ["all"]},
            {"name": "زيت شجرة الشاي", "benefit": "مضاد لحب الشباب", "suitable_for": ["oily"]},
            {"name": "زيت الجوجوبا", "benefit": "مرطب وموازن للدهون", "suitable_for": ["oily", "combination", "dry"]},
            {"name": "زيت اللافندر", "benefit": "مهدئ وملطف", "suitable_for": ["sensitive", "normal"]},
            {"name": "عصير ليمون", "benefit": "مفتح للبشرة", "suitable_for": ["oily", "combination"]},
            {"name": "زيت فيتامين E", "benefit": "مغذي ومضاد للأكسدة", "suitable_for": ["dry", "normal"]}
        ]
    }

    skin_types_ar = {
        "oily": "دهنية",
        "dry": "جافة",
        "combination": "مختلطة",
        "sensitive": "حساسة",
        "normal": "عادية"
    }

    recipe_templates = [
        {
            "title_template": "قناع {base} و{active} ل{benefit_ar}",
            "description_template": "قناع {benefit_ar} باستخدام {base} و{active}، مثالي للبشرة {skin_type_ar}.",
            "instructions_template": "1. امزجي ملعقة كبيرة من {base} مع ملعقة صغيرة من {active}.\n2. أضيفي {liquid} تدريجياً حتى تحصلي على قوام متجانس.\n3. طبقي القناع على وجه نظيف لمدة 15 دقيقة ثم اشطفيه بالماء الفاتر.",
            "benefits_templates": ["{benefit_ar}", "تنظيف عميق", "تحسين ملمس البشرة"]
        },
        {
            "title_template": "ماسك {base} المنعش مع {liquid}",
            "description_template": "ماسك منعش ومرطب يعتمد على {base} و{liquid} ليمنح بشرتك إشراقة فورية.",
            "instructions_template": "1. اخلطي ملعقتين من {base} مع كمية كافية من {liquid} لتكوين عجينة.\n2. يمكنكِ إضافة قطرات من {active} لتعزيز الفائدة.\n3. اتركيه على البشرة لمدة 10-15 دقيقة ثم اغسليه.",
            "benefits_templates": ["ترطيب فوري", "إشراقة ونضارة", "تهدئة البشرة"]
        },
        {
            "title_template": "مقشر {base} الطبيعي",
            "description_template": "مقشر لطيف من {base} لإزالة خلايا الجلد الميتة وتجديد البشرة.",
            "instructions_template": "1. امزجي {base} مع القليل من {liquid} وفركيه بلطف على بشرة رطبة بحركات دائرية.\n2. ركزي على المناطق التي تحتاج إلى تقشير.\n3. اشطفيه جيداً بالماء.",
            "benefits_templates": ["تقشير لطيف", "تجديد الخلايا", "بشرة أنعم"]
        }
    ]
    
    generated_recipes = set()
    recipes = []

    while len(recipes) < 50:
        template = random.choice(recipe_templates)
        base = random.choice(ingredients_db["base"])
        liquid = random.choice(ingredients_db["liquid"])
        active = random.choice(ingredients_db["active"])

        possible_skin_types = set(skin_types_ar.keys())
        if "all" not in base["suitable_for"]:
            possible_skin_types.intersection_update(base["suitable_for"])
        if "all" not in liquid["suitable_for"]:
            possible_skin_types.intersection_update(liquid["suitable_for"])
        if "all" not in active["suitable_for"]:
            possible_skin_types.intersection_update(active["suitable_for"])
            
        if not possible_skin_types:
            continue

        title = template["title_template"].format(base=base["name"], active=active["name"], benefit_ar=active["benefit"])
        
        if title in generated_recipes:
            continue
        generated_recipes.add(title)

        skin_type_key = random.choice(list(possible_skin_types))
        skin_type_ar = skin_types_ar[skin_type_key]

        description = template["description_template"].format(base=base["name"], active=active["name"], skin_type_ar=skin_type_ar, benefit_ar=active["benefit"])
        instructions = template["instructions_template"].format(base=base["name"], active=active["name"], liquid=liquid["name"])
        
        benefits = [b.format(benefit_ar=active["benefit"]) for b in template["benefits_templates"]]
        
        final_ingredients = [
            {"name": base["name"], "amount": "1-2 ملعقة كبيرة"},
            {"name": liquid["name"], "amount": "حسب الحاجة"},
            {"name": active["name"], "amount": "1 ملعقة صغيرة"}
        ]

        recipe = {
            "title_ar": title,
            "description_ar": description,
            "ingredients": json.dumps(final_ingredients, ensure_ascii=False),
            "instructions": instructions,
            "suitable_for": list(set([skin_types_ar[st] for st in possible_skin_types])),
            "benefits": benefits
        }
        recipes.append(recipe)

    sql_start = "INSERT INTO natural_recipes (title_ar, description_ar, ingredients, instructions, suitable_for, benefits) VALUES \n"
    sql_values = []
    for recipe in recipes:
        # Basic escaping for single quotes
        title = recipe['title_ar'].replace("'", "''")
        description = recipe['description_ar'].replace("'", "''")
        instructions = recipe['instructions'].replace("'", "''")
        ingredients_json = recipe['ingredients'].replace("'", "''")
        
        suitable_for_str = ",".join([f"'{t}'" for t in recipe['suitable_for']])
        benefits_str = ",".join([f"'{b}'" for b in recipe['benefits']])

        values = f"('{title}', '{description}', '{ingredients_json}'::jsonb, '{instructions}', ARRAY[{suitable_for_str}], ARRAY[{benefits_str}])"
        sql_values.append(values)
    
    print(sql_start + ",\n".join(sql_values) + ";")

generate_recipes()
