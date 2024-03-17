const express= require('express');
const app= express();
const port= 3000;
const jwt= require('jsonwebtoken');
const secretkey= 'secretkey';
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
}
);
app.post('/login', (req, res) => {
    const user = {
        id: 1,
        username: 'brad',
        email: "nand8@gmail.com",
    };
    jwt.sign({ user: user }, secretkey, (err, token) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to generate token' });
        } else {
            res.json({ token: token });
        }
    });
});
app.post('/profile' , verifyToken, (req, res) => {
    jwt.verify(req.token, secretkey, (err, authData) => {
        if (err) {
            res.status(403).json({ error: 'token is not valid try again' });
        } else {
            res.json({
                message: 'profile login with token is successful',
                authData: authData
            });
        }
    });

});
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        next();
    } else {
        res.status(403).json({ error: 'token is not valid' });
    }
}

app.listen(port, () => {    
    console.log(`Example app listening at http://localhost:${port}`);
}
);