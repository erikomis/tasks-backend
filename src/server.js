const expres = require('express');
const router = expres.router();
router.listen(3001, () => {
  console.log('escutando na porta 3001');
});
