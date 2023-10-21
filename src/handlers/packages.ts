import { Packer } from '../models/Packer';

/**
* Route handler for GET /packages/:filePath API endpoint
*
* @param {Request} req Request
* @param {Response} req Response
* @param {NextFunction} next Next middleware function
* @returns {String} Package item details
*/
const getPackages = (req: any, res: any, next: any) => { // TODO: Change param types
    const filePath = "/resources/input_invalid_item_weight"; // TODO: Remove hardcoding, accept as input

    console.log('filePath inside handler----->>>', filePath);

    const packingSolution = Packer.pack(filePath);

    res.status(200).send(packingSolution); // TODO: Change - send file, add appropriate response headers
}

const packagesHandlers = {
    getPackages
};

export default packagesHandlers;