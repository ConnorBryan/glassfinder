import { respondWith, success } from "../../../util";
import models from "../../models";

const { Verbiage } = models;

function read(req, res) {
  return respondWith(res, async () => {
    const verbiage = await Verbiage.findOne({ where: { id: 1 } });

    return success(res, `Successfully fetched verbiage`, {
      verbiage
    });
  });
}

export default {
  read
};
