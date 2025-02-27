const knex = require('../knex');
class Grocery_list {
  constructor({ id, list_name, nova_rate, nutri_score }) {
    this.id = id;
    this.list_name = list_name;
    this.nova_rate = nova_rate;
    this.nutri_score = nutri_score;

  }

  //adding items to grocery list 
  static async create(list_name, nova_rate, nutri_score, userId) {
    try {
      const groceryList = await knex.transaction(async (trx) => {
        // Step 1: Create a grocery list
        const [createdGroceryList] = await trx('grocery_list')
          .insert({ list_name: list_name, nova_rate: nova_rate, nutri_score: nutri_score })
          .returning('*');

        // Step 2: Insert the user and grocery list IDs into user_groceries table
        const [userGrocery] = await trx('user_groceries')
          .insert({ user_id: userId, grocery_list_id: createdGroceryList.id })
          .returning('*');

        return createdGroceryList;
      });

      // Return the created grocery list
      return groceryList;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  // First, check if the item already exists in the items table
  static async addItem(groceryListId, itemData) {
    const { id, product_name, ecoscore_grade, ingredients_text, additives_original_tags, image_front_thumb_url, stores, nutriscore_grade, nova_group } = itemData;

    // First, check if the item already exists in the items table
    const [existingItem] = await knex('items')
      .select('*')
      .where({ id: id });

    let item;

    if (!existingItem) {
      // If the item does not exist in the items table, create it
      [item] = await knex('items')
        .insert({
          id: id,
          product_name: product_name,
          ecoscore_grade: ecoscore_grade,
          ingredients_text: ingredients_text,
          additives_original_tags: additives_original_tags,
          image_front_thumb_url: image_front_thumb_url,
          stores: stores,
          nutriscore_grade: nutriscore_grade,
          nova_group: nova_group
        })
        .returning('*');
    } else {
      // If the item already exists, use the existing item
      item = existingItem;
    }

    // Insert the item into the grocery_items_table
    const [groceryItem] = await knex('grocery_items_table')
      .insert({
        grocery_list_id: groceryListId,
        item_id: item.id
      })
      .returning('*');

    return groceryItem;
  }

  static async find(id) {
    try {
      const query = 'SELECT * FROM grocery_list WHERE id = ?';
      const { rows: [grocery_list] } = await knex.raw(query, [id]);
      return grocery_list ? new Grocery_list(grocery_list) : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  // updating the nova rate and nutri score 
  static async update(id, list_name, nova_rate, nutri_score) {
    try {
      const [updatedRate] = await knex('grocery_list')
        .where({ id: id })
        .update({ list_name: list_name, nova_rate: nova_rate, nutri_score: nutri_score })
        .returning('*');

      return updatedRate ? new Grocery_list(updatedRate) : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async findListsByUserId(userid) {
    try {
      const result = await knex.raw(`
          SELECT * FROM grocery_list
          JOIN user_groceries ON user_groceries.grocery_list_id = grocery_list.id
          WHERE user_id = ?;
          `, [userid])
      return result.rows;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  static async findItemByGroceryListId(id) {
    try {
      const result = await knex.raw(`
          SELECT * FROM items
JOIN grocery_items_table ON grocery_items_table.item_id = items.id
WHERE grocery_list_id = ?
          `, [id])
      return result.rows;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  //deleting all information/data
  static async destroy(id) {
    try {
      await knex.raw(`DELETE FROM grocery_items_table WHERE grocery_list_id = ? RETURNING *;`, [id])
      await knex.raw(`DELETE FROM user_groceries WHERE grocery_list_id = ? RETURNING *;`, [id])
      const deleted = await knex.raw(`DELETE FROM grocery_list WHERE id = ? RETURNING *;`, [id])
      return deleted.rowCount
    }
    catch (err) {
      console.log(err)
      return null;
    }
  }
  static async rec(id) {
    try {
      const query = `
        SELECT items.*
        FROM items
        LEFT JOIN (
          SELECT item_id
          FROM grocery_items_table
          WHERE grocery_list_id = ?
        ) AS existing_items
        ON items.id = existing_items.item_id
        WHERE existing_items.item_id IS NULL -- Exclude items already on the specified grocery list
          AND items.nova_group <= 2 -- Nova group rating lower or equal to 2
      `;
        
      const { rows } = await knex.raw(query, [id]);
      return rows;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  
  
  
  //deleting/removing an item from list
  deleteRate = async (list_name, nova_rate, nutri_score) => {
    const deletedRate = await knex('grocery_list')
      .where({ list_name, nova_rate, nutri_score })
      .del();

    return deletedRate > 0 ? "Rates deleted successfully." : "No rates deleted.";
  };
  static async deleteItem(groceryListId, itemId) {
    // Delete the item from the grocery_items_table
    try {
      const deletedRows = await knex('grocery_items_table')
        .where({
          grocery_list_id: groceryListId,
          item_id: itemId
        })
        .del();

      return deletedRows > 0 ? "Item deleted successfully." : "Item not found in the grocery list.";
    } catch (err) {
      console.log(err)
      return null;
    }
  }

  static async updateNovaScore(groceryListId) {
    try {
      // Calculate the average nova_score using SQL aggregation
      const query = `
          UPDATE grocery_list
          SET nova_rate = (
            SELECT AVG(items.nova_group)
            FROM grocery_items_table
            JOIN items ON grocery_items_table.item_id = items.id
            WHERE grocery_items_table.grocery_list_id = ?
          )
          WHERE id = ?
          RETURNING nova_rate
        `;

      const { rows } = await knex.raw(query, [groceryListId, groceryListId]);

      if (rows.length > 0) {
        const updatedNovaScore = rows[0].nova_score;
        return updatedNovaScore;
      } else {
        return null; // Grocery list not found or no items in the list
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  }





}
module.exports = Grocery_list;