/**
        table.increments("id").primary();
        table.string("name");
        table.integer("food_rating");
        table.integer("nutri_score_quality");
        table.string("ingredients");
        table.string("addivites");
        table.integer("nova_score");
        table.integer("eco_score");
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
        exports.seed = async function (knex) {
            // Deletes ALL existing entries
          
            await knex("items").insert([
              {"id": "20341046", product_name: "Apple juice - Solevita - 2 L", ecoscore_grade: "c", ingredients_text: "made from pasteurized concentrate", additives_original_tags: "404", image_front_thumb_url: "https://images.openfoodfacts.org/images/products/20341046/front_fr.65.400.jpg", stores: "Key-Food", nutriscore_grade: "c", nova_group: "1"},
              {"id": "3017620422003", product_name: "Nutella-400 g", ecoscore_grade: "d", ingredients_text: "sugar, palm oil, hazelnut, skim milk powder, fat-reduced cocoa, soy lecithins, vanillin", additives_original_tags: "E332 , E332i", image_front_thumb_url: "https://images.openfoodfacts.org/images/products/301/762/042/2003/front_en.536.100.jpg", stores: "Trade Fair", nutriscore_grade: "e", nova_group: "4"},
              {"id": "8002270014901", product_name: "S. Pellegrino Water - San Pellegrino - 1 L", ecoscore_grade: "A", ingredients_text: "water", additives_original_tags: "404", image_front_thumb_url: "https://images.openfoodfacts.org/images/products/800/227/001/4901/front_en.304.400.jpg", stores: "cvs", nutriscore_grade: "a", nova_group: "1"},
              {"id": "37622300336738", product_name: "Oreo - 154g", ecoscore_grade: "e", ingredients_text: "trigo flour, sugar, palm fat, nabina oil, lean cocoa powder 4,5%, trigo starch, glucose and fructose syrup, gasificants (potassium carbonates, ammonium carbonates, sodium carbonates), salt, emulgeants (soy lecithin, sunflower lecithin), aroma, may contain milk", additives_original_tags: "E332 , E332i", image_front_thumb_url: "https://images.openfoodfacts.org/images/products/762/230/033/6738/front_en.145.400.jpg", stores: "cvs", nutriscore_grade: "e", nova_group: "4"},
              {"id": "9556183960996", product_name: "Instant Oatmeal Refill Pack", ecoscore_grade: "d", ingredients_text : "100% _oat_", additives_original_tags: [], image_front_thumb_url:  "https://images.openfoodfacts.org/images/products/955/618/396/0996/front_en.4.400.jpg", stores: "Redmart,NTUC Fairprice", nutriscore_grade: "a", nova_group: 1},
              {"id": "3258561412306", product_name: "Carottes en rondelles",ecoscore_grade: "b", ingredients_text: "Carottes.", additives_original_tags: [],image_front_thumb_url: "https://images.openfoodfacts.org/images/products/325/856/141/2306/front_fr.4.400.jpg",stores: "", nutriscore_grade: "a", nova_group: 1},
            ]);
          };
