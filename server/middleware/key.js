const jwt = require("jsonwebtoken")
const { object } = require("webidl-conversions")

const publicKey = `-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAK56a8EBkiiL1KMJsjgRJFcIJGDyro2x
gETzBrB3f5fUF3n33lhqfIGnMfp1hpMxpz3YfhAYfQylXD2cGOw+lMsCAwEAAQ==
-----END PUBLIC KEY-----
`
const privateKey = `-----BEGIN PRIVATE KEY-----
MIIBVgIBADANBgkqhkiG9w0BAQEFAASCAUAwggE8AgEAAkEArnprwQGSKIvUowmy
OBEkVwgkYPKujbGARPMGsHd/l9QXeffeWGp8gacx+nWGkzGnPdh+EBh9DKVcPZwY
7D6UywIDAQABAkEAqta/r0oEfKL9323dDTzrojQcurik5aSJffmf8SXwzw2Eiei5
nSX7dFGVLfjW6tINWj+BCZ9ni1A7jsR+fPdoYQIhANuGeTddKQeiPSu8Zsb2HRvb
gWX+maWbOCdj/MMz7go5AiEAy3fdtrNBrXMAgbVPC9ADWXWlP9BzUtEFhLS6avpI
pyMCIQCIGxriqZ77vapBiKEMcKFhmTnkO/OVSuSI/6RCftryeQIhAIqOfPBOj9oi
52Rs6IBdzfocsESNmgr6hiyBujThbZpLAiAAuaExTLN9BOukdbcNfMh/kAhEi71V
FcDIss/DBgz/Lg==
-----END PRIVATE KEY-----
`

//sign jwt
exports.signJWT = (payload, expiresIn) =>{
    return jwt.sign(payload, privateKey, {algorithm: 'RS256', expiresIn});    
}

//verify jwt
exports.verifyJWT = (token) =>{
    try{
        const decoded = jwt.verify(token, publicKey);
        return {payload: decoded, expired: false}
    }catch(error){
        return {payload: null, expired: error.message.include("jwt expired")};
    }
}