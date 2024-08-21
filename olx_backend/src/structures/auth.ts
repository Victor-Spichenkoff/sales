const creation =
{
    "name": "Victor",
    "email": "v@gmail.com",
    "state": "SP",
    "password": "12345"
}
//retorno == true ou { error: "" }



const login =
{
    "email": "v@gmail.com",
    "password": "12345"
}

const loginReturn =
{
    "user": {
        "id": "05950405-871c-461c-bb45-d00b44fd2b72",
        "name": "Victor",
        "email": "v@gmail.com",
        "state": "SP",
        "passwordHash": "$2a$10$HV5azesPfIPdP49FNqCBweY.sWeQXJZMAEITe9XvbSp/70Lr069p.",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA1OTUwNDA1LTg3MWMtNDYxYy1iYjQ1LWQwMGI0NGZkMmI3MiIsImlhdCI6MTcyNDE5Nzc5NiwiZXhwIjoxNzI0MjA4NTk2fQ.9vrkpwNVVyQ9PCgweMCp87PEL7EMv4gGEZp4M02Lb7U"
    }
}


const isTokenValid =
{
    "token": "token..."
}

const isTokenValidResposne = {
    //{ error } 401
    //true
}

//Retorna 401 em caso de erro e um { error: "msg" }
