import { Request, Response } from 'express';

import Packer from 'jt-packer-utility';

/**
 * Route handler for GET /packages/:fileName API endpoint
 *
 * @param {Request} req Request
 * @param {Response} req Response
 * @param {NextFunction} next Next middleware function
 * @returns {String} Package solution
 */
const getPackages = async (req: Request, res: Response) => {
  try {
    const fileName = req.params.fileName;
    const filePath = `/resources/${fileName}`;

    // Get packing solution by passing in relative file path for various test scenarios.
    const packingSolution = await Packer.pack(filePath);

    res.set('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(packingSolution);
  } catch (err: any) {
    let statusCode = 500;

    if (err && err.name && err.name.includes('NotFound')) {
      statusCode = 404;
    }

    if (err && err.name && err.name.includes('PackingError')) {
      statusCode = 400;
    }

    res.set('Content-Type', 'application/json');
    res.status(statusCode).send({ error: err.name, message: err.message });
  }
};

const packagesHandlers = {
  getPackages
};

export default packagesHandlers;
