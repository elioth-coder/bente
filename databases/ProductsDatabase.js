import DBConnection from "../utils/DBConnection";

const db = new DBConnection("pos");

class ProductsDatabase {
    static async getAll() {
        const sql = `SELECT * FROM product`;
 
        try {
            const items = await db.exec(sql);

            return items;
        } catch (e) {
            throw e;
        }
    }

    static async add(product) {
        const {photo, code, name, price} = product;
        const sql = `INSERT INTO product (photo, code, name, price) 
        VALUES ('${photo}', '${code}','${name}',${price})`;
 
        try {
            const id = await db.exec(sql);

            return { id, ...product };
        } catch (e) {
            throw e;
        }
    }

    static async update(product) {
        const {id, code, name, price } = product;
        const sql = `UPDATE product SET code='${code}', name='${name}', price=${price}
            WHERE id=${id}`;

        try {
            const rowsAffected = await db.exec(sql);

            return rowsAffected;
        } catch (e) {
            throw e;
        }
    }

    static async remove(id) {
        const sql = `DELETE FROM product WHERE id=${id}`;

        try {
          const rowsAffected = await db.exec(sql);

          return rowsAffected;
        } catch (e) {
          throw e;
        }    
    }
}

export default ProductsDatabase;