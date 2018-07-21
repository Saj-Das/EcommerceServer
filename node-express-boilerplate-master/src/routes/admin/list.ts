'use strict';

// Test routes
import { Router } from 'express';
import { userList,productList,offerList } from '../../controllers/admin/list';

let router = Router();
router.get('/user', userList);
router.get('/product', productList);
router.get('/offer', offerList);
export = router;
