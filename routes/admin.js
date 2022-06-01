const express = require("express");
const router = express.Router();
const admin = require("../controllers/admin");
const { verifyToken } = require("../middlewares/auth");
const { isAdmin } = require("../middlewares/isAdmin");
// router.post("/admin/signup", admin.signup);
router.post("/admin/login", admin.login);
router.put("/admin/updatePassword", verifyToken, isAdmin, admin.updatePassword);
router.get("/admin/users", verifyToken, isAdmin, admin.getUsers);
router.get("/admin/hosts", verifyToken, isAdmin, admin.getHosts);
router.get("/admin/hostRequest", verifyToken, isAdmin, admin.getHostRequest);
router.put(
  "/admin/accept/hostRequest/:id",
  verifyToken,
  isAdmin,
  admin.acceptHostRequest
);
router.put(
  "/admin/reject/hostRequest/:id",
  verifyToken,
  isAdmin,
  admin.rejectHostRequest
);
router.post("/admin/addSubAdmin", verifyToken, isAdmin, admin.addSubAdmin);
router.put("/admin/blockUser/:userId", verifyToken, isAdmin, admin.blockUser);
router.put(
  "/admin/unblockUser/:userId",
  verifyToken,
  isAdmin,
  admin.unblockUser
);

//-----------------Banner-----------------------//
router.post("/admin/addBanner", verifyToken, isAdmin, admin.addBanner);
router.get("/admin/getBanner", verifyToken, isAdmin, admin.getBanner);
router.delete(
  "/admin/deleteBanner/:banner",
  verifyToken,
  isAdmin,
  admin.deleteBanner
);
//====================Wallet===============================//
router.get("/admin/getWallet", verifyToken, isAdmin, admin.getWallet);
router.post("/admin/addWallet", verifyToken, isAdmin, admin.addWallet);
router.delete(
  "/admin/deleteWallet/:wallet",
  verifyToken,
  isAdmin,
  admin.deleteWallet
);
//==========================Gift============================//
router.get("/admin/getGift", verifyToken, isAdmin, admin.getGift);
router.post("/admin/addGift", verifyToken, isAdmin, admin.addGift);
router.delete(
  "/admin/deleteGift/:gift",
  verifyToken,
  isAdmin,
  admin.deleteGift
);
//==================================emoji===========================//
router.get("/admin/getEmoji", verifyToken, isAdmin, admin.getEmoji);
router.post("/admin/addEmoji", verifyToken, isAdmin, admin.addEmoji);
router.delete(
  "/admin/deleteEmoji/:emoji",
  verifyToken,
  isAdmin,
  admin.deleteEmoji
);
module.exports = router;
