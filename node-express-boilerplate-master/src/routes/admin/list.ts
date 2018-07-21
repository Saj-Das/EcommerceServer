'use strict';

// Test routes
import { Router } from 'express';
import { userList, productList, offerList } from '../../controllers/admin/list';

let router = Router();
router.get('/api/List/getUser', userList);
router.get('/api/List/getProduct', productList);
router.get('/api/List/getOffer', offerList);
export = router;
