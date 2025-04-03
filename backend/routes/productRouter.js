const Router = require("express");

const router = new Router(); // получаем обьект

router.post('/'); // для создания
router.get('/'); // для получения
router.delete('/');

module.exports = router;