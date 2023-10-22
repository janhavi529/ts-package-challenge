import Packer from "jt-packer-utility";

import { Request, Response, NextFunction } from "express";

/**
 * Route handler for GET /packages API endpoint
 *
 * @param {Request} req Request
 * @param {Response} req Response
 * @param {NextFunction} next Next middleware function
 * @returns {String} Package item details
 */
const getPackages = async (req: Request, res: Response, next: NextFunction) => {
  const fileName = req.params.fileName;
  const filePath = `/resources/${fileName}`; // TODO: Remove hardcoding

  const packingSolution = await Packer.pack(
    filePath
  );

  console.log('packingSolution------->>>', packingSolution);
  
  res.set("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(packingSolution);
};

const packagesHandlers = {
  getPackages,
};

export default packagesHandlers;
