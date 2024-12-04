document.getElementById('jwt-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const jwt = document.getElementById('jwt').value;
    fetchJWKAndDecodeJWT(jwt);
});

function fetchJWKAndDecodeJWT(jwt) {
    fetch('/path/to/jwk') // Replace with the actual path to your JWK endpoint
        .then(response => response.json())
        .then(jwk => {
            const publicKey = jwkToPem(jwk);
            const decoded = jwt_decode(jwt, publicKey);
            document.getElementById('decoded-jwt').textContent = JSON.stringify(decoded, null, 2);
        })
        .catch(error => {
            console.error('Error fetching JWK:', error);
        });
}

function jwkToPem(jwk) {
    // Convert JWK to PEM format
    // You can use a library like `jwk-to-pem` for this
    // For simplicity, this function is a placeholder
    return `-----BEGIN PUBLIC KEY-----\n${jwk.n}\n-----END PUBLIC KEY-----`;
}

function jwt_decode(token, publicKey) {
    // Decode the JWT using the public key
    // You can use a library like `jsonwebtoken` for this
    // For simplicity, this function is a placeholder
    return jwt.verify(token, publicKey);
}