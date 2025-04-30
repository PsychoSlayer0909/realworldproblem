import bcrypt from 'bcryptjs';
export async function POST(request) {
  const { email, password } = await request.json();
  // initialize KV binding USER_KV
  const exists = await USER_KV.get(email);
  if (exists) return new Response('User already exists', { status: 409 });
  const pwHash = await bcrypt.hash(password, 10);
  await USER_KV.put(email, JSON.stringify({ email, pwHash }));
  // (optional) auto-issue JWT here
  return new Response('OK', { status: 201 });
}
