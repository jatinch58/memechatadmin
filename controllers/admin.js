const Joi = require("joi");
const admindb = require("../models/admin");
const userdb = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const hostdb = require("../models/host");
const hostRequestdb = require("../models/hostRequest");
const subAdmindb = require("../models/subAdmin");
const bannerdb = require("../models/banner");
const walletdb = require("../models/wallet");
const giftdb = require("../models/gift");
const emojidb = require("../models/emoji");
exports.login = async (req, res) => {
  try {
    const { body } = req;
    const adminSchema = Joi.object()
      .keys({
        uid: Joi.string().required(),
        password: Joi.string().required(),
      })
      .required();
    const result = adminSchema.validate(body);
    if (result.error) {
      res.status(412).send({ message: result.error.details[0].message });
    } else {
      const user = await admindb.findOne({ uid: req.body.uid });
      if (user) {
        const validPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (validPassword) {
          const token = jwt.sign(
            { uid: user.uid, password: user.password },
            "123456",
            {
              expiresIn: "24h",
            }
          );
          res.status(200).send({ token: token });
        } else {
          res.status(401).send({ message: "Invalid password" });
        }
      } else {
        res.status(401).send({ message: "Invalid username" });
      }
    }
  } catch (e) {
    res.status(500).send({ message: e.name });
  }
};
// exports.signup = async (req, res) => {
//   try {
//     const salt = await bcrypt.genSalt(10);
//     hashpassword = await bcrypt.hash(req.body.password, salt);
//     const createAdmin = new admindb({
//       uid: req.body.uid,
//       password: hashpassword,
//     });
//     await createAdmin.save();
//     res.status(200).send({ message: "Added admin sucessfully" });
//   } catch (e) {
//     res.status(500).send({ message: e.name });
//   }
// };
exports.updatePassword = async (req, res) => {
  try {
    const { body } = req;
    const adminSchema = Joi.object()
      .keys({
        password: Joi.string().required(),
      })
      .required();
    let result = adminSchema.validate(body);
    if (result.error) {
      res.status(412).send({ message: result.error.details[0].message });
    } else {
      const result = admindb.findOneAndUpdate(
        { uid: req.user.uid },
        { password: req.body.password }
      );
      if (result) {
        res.status(200).send({ message: "Password changed sucessfully" });
      } else {
        res.status(500).send({ message: "Couldn't change password" });
      }
    }
  } catch (e) {
    res.status(500).send({ message: e.name });
  }
};
exports.getUsers = async (req, res) => {
  try {
    const userData = await userdb.find(
      {},
      { _id: 0, __v: 0, followings: 0, followers: 0, likes: 0 }
    );
    res.status(200).send(userData);
  } catch (e) {
    res.status(500).send({ message: e.name });
  }
};
exports.getHosts = async (req, res) => {
  try {
    const hostData = await hostdb.find({}, { _id: 0, __v: 0, roles: 0 });
    res.status(200).send(hostData);
  } catch (e) {
    res.status(500).send({ message: e.name });
  }
};
exports.getHostRequest = async (req, res) => {
  try {
    const hostRequestData = await hostRequestdb.find({}, { _id: 0, __v: 0 });
    res.status(200).send(hostRequestData);
  } catch (e) {
    res.status(500).send({ message: e.name });
  }
};

exports.acceptHostRequest = async (req, res) => {
  try {
    const hostRequestData = await hostRequestdb.findOneAndUpdate(
      { userId: req.params.id, status: "pending" },
      { status: "accepted" }
    );
    if (hostRequestData) {
      res.status(200).send({ message: "Request accepted sucessfully" });
    } else {
      res.status(404).send({
        message: "No pending request found of userId: " + req.params.id,
      });
    }
  } catch (e) {
    res.status(500).send({ message: e.name });
  }
};
exports.rejectHostRequest = async (req, res) => {
  try {
    const hostRequestData = await hostRequestdb.findOneAndUpdate(
      { userId: req.params.id, status: "pending" },
      { status: "rejected" }
    );
    if (hostRequestData) {
      res.status(200).send({ message: "Request rejected sucessfully" });
    } else {
      res.status(404).send({
        message: "No pending request found of userId: " + req.params.id,
      });
    }
  } catch (e) {
    res.status(500).send({ message: e.name });
  }
};
exports.addSubAdmin = async (req, res) => {
  try {
    const { body } = req;
    const subAdminSchema = Joi.object()
      .keys({
        uid: Joi.string().required(),
        password: Joi.string().required(),
        responsibilities: Joi.array(),
      })
      .required();
    let result = subAdminSchema.validate(body);
    if (result.error) {
      res.status(403).send({ message: result.error.details[0].message });
    } else {
      const checkSubAdmin = await subAdmindb.findOne({ uid: req.body.uid });
      if (checkSubAdmin) {
        res.status(409).send({
          message:
            "SubAdmin for " +
            req.body.uid +
            " username is already present please try other username",
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        hashpassword = await bcrypt.hash(req.body.password, salt);
        const createSubAdmin = new subAdmindb({
          uid: req.body.uid,
          password: hashpassword,
          responsibilities: req.body.responsibilities,
        });
        await createSubAdmin.save();
        res.status(200).send({ message: "Added subAdmin sucessfully" });
      }
    }
  } catch (e) {
    req.status(500).send({ message: e.name });
  }
};

exports.blockUser = async (req, res) => {
  try {
    const block = await userdb.findOneAndUpdate(
      { userId: req.params.userId },
      { blockStatus: true }
    );
    if (block) {
      res.status(200).send({ message: "User blocked sucessfully" });
    } else {
      res.status(500).send({ message: "Something bad happened" });
    }
  } catch (e) {
    res.status(500).send({ message: e.name });
  }
};

exports.unblockUser = async (req, res) => {
  try {
    const block = await userdb.findOneAndUpdate(
      { userId: req.params.userId },
      { blockStatus: false }
    );
    if (block) {
      res.status(200).send({ message: "User unblocked sucessfully" });
    } else {
      res.status(500).send({ message: "Something bad happened" });
    }
  } catch (e) {
    res.status(500).send({ message: e.name });
  }
};
exports.addBanner = async (req, res) => {
  try {
    const { body } = req;
    const bannerSchema = Joi.object()
      .keys({
        name: Joi.string().required(),
        imageUrl: Joi.string().required(),
      })
      .required();
    const validate = bannerSchema.validate(body);
    if (validate.error) {
      res.status(422).send({ message: validate.error.details[0].message });
    } else {
      const newBanner = new bannerdb({
        name: req.body.name,
        imageUrl: req.body.imageUrl,
      });
      newBanner
        .save()
        .then(() => {
          res.status(200).send({ message: "Banner uploaded sucessfully" });
        })
        .catch((e) => {
          res.status(500).send({ message: e.name });
        });
    }
  } catch (e) {
    res.status(500).send({ message: e.name });
  }
};
exports.getBanner = async (req, res) => {
  try {
    const result = await bannerdb.find({});
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(500).send({ message: "Something bad happened" });
    }
  } catch (e) {
    res.status(500).send({ message: e.name });
  }
};
exports.deleteBanner = async (req, res) => {
  try {
    const result = await bannerdb.findByIdAndDelete(req.params.banner);
    if (result) {
      res.status(200).send({
        message: "Banner deleted sucessfully of id: " + req.params.banner,
      });
    } else {
      res
        .status(404)
        .send({ message: "No banner found of id: " + req.params.banner });
    }
  } catch (e) {
    res.status(500).send({ message: e.name });
  }
};
exports.getWallet = async (req, res) => {
  try {
    const result = await walletdb.find({});
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(500).send({ message: "Something bad happened" });
    }
  } catch (e) {
    res.status(500).send({ message: e.name });
  }
};
exports.addWallet = async (req, res) => {
  try {
    const { body } = req;
    const walletSchema = Joi.object()
      .keys({
        coins: Joi.number().required(),
        price: Joi.number().required(),
        offer: Joi.number().required(),
      })
      .required();
    const validate = walletSchema.validate(body);
    if (validate.error) {
      res.status(422).send({ message: validate.error.details[0].message });
    } else {
      const newWallet = new walletdb({
        coins: req.body.coins,
        price: req.body.price,
        offer: req.body.offer + "%",
      });
      newWallet
        .save()
        .then(() => {
          res.status(200).send({ message: "New wallet created sucessfully" });
        })
        .catch((e) => {
          res.status(500).send({ message: e.name });
        });
    }
  } catch (e) {
    res.status(500).send({ message: e.name });
  }
};
exports.deleteWallet = async (req, res) => {
  try {
    const result = await walletdb.findByIdAndDelete(req.params.wallet);
    if (result) {
      res.status(200).send({
        message: "Wallet deleted sucessfully of id: " + req.params.wallet,
      });
    } else {
      res
        .status(404)
        .send({ message: "No wallet found of id: " + req.params.wallet });
    }
  } catch (e) {
    res.status(500).send({ message: e.name });
  }
};
exports.getGift = async (req, res) => {
  try {
    const result = await giftdb.find();
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(500).send({ message: "Something bad happened" });
    }
  } catch (e) {
    res.status(500).send({ message: e.name });
  }
};
exports.addGift = async (req, res) => {
  try {
    const { body } = req;
    const giftSchema = Joi.object().keys({
      name: Joi.string().required(),
      giftUrl: Joi.string().required(),
      price: Joi.number().required(),
    });
    const validate = giftSchema.validate(body);
    if (validate.error) {
      res.status(422).send({ message: validate.error.details[0].message });
    } else {
      const newGift = new giftdb({
        name: req.body.name,
        giftUrl: req.body.giftUrl,
        price: req.body.price,
      });
      newGift
        .save()
        .then(() => {
          res.status(200).send({ message: "Gift added sucessfully" });
        })
        .catch((e) => {
          res.status(500).send({ message: e.name });
        });
    }
  } catch (e) {
    res.status(500).send({ message: e.name });
  }
};
exports.deleteGift = async (req, res) => {
  try {
    const result = await giftdb.findByIdAndDelete(req.params.gift);
    if (result) {
      res.status(200).send({
        message: "Gift deleted sucessfully of id: " + req.params.gift,
      });
    } else {
      res
        .status(404)
        .send({ message: "No gift found of id: " + req.params.gift });
    }
  } catch (e) {
    res.status(500).send({ message: e.name });
  }
};

exports.getEmoji = async (req, res) => {
  try {
    const result = await emojidb.find();
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(500).send({ message: "Something bad happened" });
    }
  } catch (e) {
    res.status(500).send({ message: e.name });
  }
};

exports.addEmoji = async (req, res) => {
  try {
    const { body } = req;
    const emojiSchema = Joi.object().keys({
      emojiUrl: Joi.string().required(),
    });
    const validate = emojiSchema.validate(body);
    if (validate.error) {
      res.status(422).send({ message: validate.error.details[0].message });
    } else {
      const newEmoji = new emojidb({
        emojiUrl: req.body.emojiUrl,
      });
      newEmoji
        .save()
        .then(() => {
          res.status(200).send({ message: "Emoji added sucessfully" });
        })
        .catch((e) => {
          res.status(500).send({ message: e.name });
        });
    }
  } catch (e) {
    res.status(500).send({ message: e.name });
  }
};
exports.deleteEmoji = async (req, res) => {
  try {
    const result = await emojidb.findByIdAndDelete(req.params.emoji);
    if (result) {
      res.status(200).send({
        message: "Emoji deleted sucessfully of id: " + req.params.emoji,
      });
    } else {
      res
        .status(404)
        .send({ message: "No emoji found of id: " + req.params.emoji });
    }
  } catch (e) {
    res.status(500).send({ message: e.name });
  }
};
