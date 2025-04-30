import bcrypt from 'bcryptjs';
import { createJWT } from './jwt-utils'; // your JWT helper
export async function POST(request) {
  const { email, password } = await request.json();
  const raw = await USER_KV.get(email);
  if (!raw) return new Response('Unauthorized', { status: 401 });
  const { pwHash } = JSON.parse(raw);
  if (!await bcrypt.compare(password, pwHash))
	return new Response('Unauthorized', { status: 401 });
  const token = await createJWT({ sub: email });
  return new Response(JSON.stringify({ email }), {
	status: 200,
	headers: {
  	'Set-Cookie': `session=${token}; HttpOnly; Secure; SameSite=Strict`
	}
  });
}
