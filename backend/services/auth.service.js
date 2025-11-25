import bcrypt from 'bcrypt';
const saltRounds = 10;
import client from '../db/db.js';



export async function registerUser(username, password) {

    const row = await client.query('SELECT * FROM users WHERE username = ($1)', [username]);
    
    if (row.rowCount > 0){
        const error = new Error('Usuario ya existe');
        error.code = 'USERNAME_ALREADY_IN_USE';
        throw error;
        // como aqui estas en un servicio no puedes enviar cosas al cliente desde aqui por eso se ponen detalles del error, se crea un codigo. no puedes poner un return res.status().json()...
    } 

    try{
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);    


        await client.query('INSERT INTO users(username, password_hash) VALUES($1, $2)', [username, hash]);
        const row = await client.query('SELECT * FROM users WHERE username = ($1)', [username]);
        const id = row.rows[0]?.id;
        return { id, username };

    }catch (e){
        e.code = 'DB_ERROR';
        throw e; 
    }
};



export async function loginUser(username, password) {

    const row = await client.query('SELECT * FROM users WHERE username = ($1)', [username]);

    if (row.rowCount === 0){
        const error = new Error('Usuario no existe');
        error.code = 'USER_NOT_EXISTS';
        throw error;
    } 


    try{


    const user = row.rows[0];

    
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
        throw new Error('INVALID_CREDENTIALS');
    }

    return { id: user.id };

    }catch (e){
        e.code = 'DB_ERROR';
        throw e; 
    }

}


export default { registerUser, loginUser };