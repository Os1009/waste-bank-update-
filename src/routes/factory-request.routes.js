const express = require('express');

const router = express.Router();

const controller =
  require('../controllers/factory-request.controller');

const authMiddleware =
  require('../middlewares/auth.middleware');

const authorizeRoles =
  require('../middlewares/role.middleware');

const validate =
  require('../middlewares/validation.middleware');

const {
  createFactoryRequestSchema,
  updateFactoryRequestSchema,
} = require('../validations/factory-request.validation');

router.post(
  '/',

  authMiddleware,

  authorizeRoles('factory'),

  validate(createFactoryRequestSchema),

  controller.createFactoryRequest
);

router.get(
  '/my-requests',

  authMiddleware,

  authorizeRoles('factory'),

  controller.getMyRequests
);


router.put(
  '/:id',

  authMiddleware,

  authorizeRoles('factory'),

  validate(updateFactoryRequestSchema),

  controller.updateFactoryRequest
);


router.patch(
  '/:id/cancel',

  authMiddleware,

  authorizeRoles('factory'),

  controller.cancelFactoryRequest
);

module.exports = router;