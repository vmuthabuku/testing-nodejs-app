const config = {
    testing:{
        SECRET:"My-Pass-",
        DATABASE:'mongodb://localhost:27017/test_struc'
    }
}

exports.get = function(env){
    return config.testing
}