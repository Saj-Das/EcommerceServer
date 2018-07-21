'use strict';
import * as multer from 'multer'
// Test routes
import { Router } from 'express';
import { userAdd, Populatedropdown, AddOffer, PostFile } from '../../controllers/admin/form';
const DB_NAME = 'db.json';
const COLLECTION_NAME = 'images';
const UPLOAD_PATH = 'uploads/product';
const upload = multer({ dest: `${UPLOAD_PATH}/` });
let router = Router();
router.post('/api/Form/UserAdd', userAdd);
router.post('/api/Form/AddOffer', AddOffer);
router.get('/api/Form/Populatedropdown', Populatedropdown);
router.post('/api/Form/PostFile', upload.single('file'), (req, res) => {
    res.send(PostFile(req));
})

export = router;
