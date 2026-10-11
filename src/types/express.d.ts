import { JwtPayloadOwner } from './jwt-payload.type.ts';

declare global {
  namespace Express {
    interface User extends JwtPayloadOwner {
      id: string;
      login: string;
      role: string;
    }
  }
}
