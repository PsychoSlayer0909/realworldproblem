export default {
  async fetch(request, env) {
    // Handle preflight OPTIONS requests for CORS
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Max-Age": "86400"
        }
      });
    }
    
    // Add CORS headers to all responses
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    };
    
    const url = new URL(request.url);
    const { pathname } = url;
    
    // Sign-up endpoint logic
    if (pathname === "/api/signup" && request.method === "POST") {
      try {
        const { email, password } = await request.json();
        
        if (!email || !password) {
          return new Response(JSON.stringify({ error: "Missing email or password" }), { 
            status: 400, 
            headers: corsHeaders 
          });
        }
        
        // Check if user already exists in the database
        const existingUser = await getUserByEmail(env, email);
        if (existingUser) {
          return new Response(JSON.stringify({ error: "Email already exists" }), { 
            status: 409, 
            headers: corsHeaders 
          });
        }
        
        // Insert new user into the database
        await env.DB.prepare("INSERT INTO users (email, password) VALUES (?, ?)")
          .bind(email, password)
          .run();
          
        return new Response(JSON.stringify({ message: "User created successfully" }), { 
          status: 201, 
          headers: corsHeaders 
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: "Server error: " + error.message }), {
          status: 500,
          headers: corsHeaders
        });
      }
    }
    
    // Sign-in endpoint logic
    if (pathname === "/api/signin" && request.method === "POST") {
      try {
        const { email, password } = await request.json();
        
        if (!email || !password) {
          return new Response(JSON.stringify({ error: "Missing email or password" }), { 
            status: 400, 
            headers: corsHeaders 
          });
        }
        
        // Fetch user by email
        const user = await getUserByEmail(env, email);
        if (!user) {
          return new Response(JSON.stringify({ error: "Invalid credentials" }), { 
            status: 401, 
            headers: corsHeaders 
          });
        }
        
        // Compare the provided password
        if (user.password !== password) {
          return new Response(JSON.stringify({ error: "Invalid credentials" }), { 
            status: 401, 
            headers: corsHeaders 
          });
        }
        
        return new Response(JSON.stringify({ email: user.email }), { 
          status: 200, 
          headers: corsHeaders 
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: "Server error: " + error.message }), {
          status: 500,
          headers: corsHeaders
        });
      }
    }
    
    // Root endpoint to check if the API is running
    if (pathname === "/" && request.method === "GET") {
      return new Response(JSON.stringify({ status: "API is running" }), {
        status: 200,
        headers: corsHeaders
      });
    }
    
    // Fallback for other routes
    return new Response(JSON.stringify({ error: "Not Found" }), { 
      status: 404, 
      headers: corsHeaders 
    });
  }
};

// Helper function to get user by email from the D1 database
async function getUserByEmail(env, email) {
  try {
    const stmt = env.DB.prepare("SELECT * FROM users WHERE email = ?");
    const { results } = await stmt.bind(email).all();
    return results[0]; // Assuming results is an array of users
  } catch (error) {
    console.error("Database error:", error);
    return null;
  }
}