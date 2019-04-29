const config = {
   production:{
        SECRET:process.env.SECRET,
        DATABASE:process.env.MONGODB_URI
    },
    default:{
        SECRET:"My-Pass-",
        DATABASE:'mongodb://localhost:27017/node_struc'
    }
}

exports.get = function(env){
    return config[env] || config.default
}