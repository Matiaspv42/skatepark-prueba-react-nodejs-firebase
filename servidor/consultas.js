const {Pool} = require('pg')

const config = {
    user: 'postgres',
    host:'localhost',
    password:'postgres',
    port:5432,
    database:'skatepark',
};

const pool = new Pool(config)

const getSkaters = async () =>{
    try {
        const {rows} = await pool.query('SELECT * FROM SKATERS')
        return rows
    } catch (error) {
        console.log(error)
    }
}

const registerSkater =  async (skater) => {
    try {
        const {email, nombre, password, anos_experiencia, especialidad, foto, estado=false} = skater
        const query = {
            text: "INSERT INTO skaters(email, nombre, password, anos_experiencia, especialidad, foto, estado) values ($1,$2,$3,$4,$5,$6,$7)",
            values: [email, nombre, password, anos_experiencia, especialidad, foto, estado]
        }
        const result = await pool.query(query)
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

const updateSkater = async (skater) => {
    try {
        const {email, nombre, password, anos_experiencia, especialidad} = skater
        const query = {
            text: "UPDATE skaters set nombre = $2, password = $3, anos_experiencia = $4, especialidad = $5 where email = $1",
            values: [email, nombre, password, anos_experiencia, especialidad]
        }
        const result = await pool.query(query)
        console.log(result)

    } catch (error) {
        console.log(error)
    }
}

const deleteSkater = async (email) => {
    try {
        const query = {
            text: "DELETE from skaters where email = $1",
            values: [email]
        }
        const result = await pool.query(query)
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

const loginSkater = async (skater)=>{
    const {email, password} = skater
    try {
        const query = {
            text: 'SELECT * from skaters where email = $1 and password =$2',
            values: [email, password]
        }
        const {rows} = await pool.query(query)
        if (rows.length>0){
            return rows
        }else{
            return {error: 'Email o password equivocado'}
        }
    } catch (error) {
        console.log(error)
    }
}

const approveSkater = async (id) =>{
    try {
        const query = {
            text: "UPDATE skaters set estado = true where id = $1",
            values: [id]
        }
        const result = await pool.query(query)
        console.log(result)

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getSkaters,
    registerSkater,
    updateSkater,
    deleteSkater,
    loginSkater,
    approveSkater
}