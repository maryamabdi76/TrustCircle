import { createBusiness } from './handlers/createBusiness';
import { getBusinesses } from './handlers/getBusinesses';

export async function GET(request: Request) {
  return getBusinesses(request);
}

export async function POST(request: Request) {
  return createBusiness(request);
}
