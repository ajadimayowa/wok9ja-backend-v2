import { Request, Response, NextFunction } from 'express';

const basicAuth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Swagger API Docs"');
    res.status(401).send('Authentication required.');
    return; // Return here to ensure the return type is void
  }

  const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString('ascii').split(':');
  const [username, password] = credentials;

  const SWAGGER_USER = process.env.SWAGGER_USER || 'admin';
  const SWAGGER_PASS = process.env.SWAGGER_PASS || 'password';

  if (username === SWAGGER_USER && password === SWAGGER_PASS) {
    next(); // Call next() when authentication is successful
    return; // Return here to ensure the return type is void
  }

  res.setHeader('WWW-Authenticate', 'Basic realm="Swagger API Docs"');
  res.status(401).send('Invalid credentials.'); // Return when authentication fails
};

export default basicAuth;