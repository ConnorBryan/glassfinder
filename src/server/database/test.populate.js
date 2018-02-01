/**
 * @overview
 * The "Test" population contains pseudo-real-world data that is meant to be kept semi-persistant.
 */
import bcrypt from "bcrypt-nodejs";
import Chance from "chance";
import _ from "lodash";

import * as config from "../../config";

const chance = new Chance();
const sleep = ms => new Promise(r => setTimeout(r, ms));

export default async function populate() {

}

/**
 * Bob
 *    Artist
 */
const bob = {
  email: chance.email(),
  password: await createSafePassword(config.DEFAULT_PASSWORD),
  verified: true,
  verificationCode: null,
  linked: true,
  type: null,
  createdAt: new Date(),
  updatedAt: new Date()
};

