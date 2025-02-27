/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 *  
 */
exports.up = (knex) => {
    return knex.schema.createTable("items",(table)=>{
        table.string("id").primary().unique();
        table.string("product_name");
        table.string("ecoscore_grade");
        table.string("ingredients_text", 1000);
        table.string("additives_original_tags", 1000);
        table.string("image_front_thumb_url");
        table.string("stores");
        table.string("nutriscore_grade");
        table.integer("nova_group");
    })
    };
    /**
     * @param { import("knex").Knex } knex
     * @returns { Promise<void> }
     */
    exports.down = (knex) => {
        return knex.schema.dropTable("items")
    };
