import { Request, Response, NextFunction } from 'express';
import { Packer } from '../components/Packer';

/**
* Route handler for GET /packages API endpoint
*
* @param {Request} req Request
* @param {Response} req Response
* @param {NextFunction} next Next middleware function
* @returns {String} Package item details
*/
const getPackages = async (req: Request, res: Response, next: NextFunction) => { 
    const filePath = "/resources/example_input_valid"; // TODO: Remove hardcoding, accept as input

    const packingSolution = await Packer.pack(filePath);

    res.set('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(packingSolution);
}

const packagesHandlers = {
    getPackages
};

export default packagesHandlers;