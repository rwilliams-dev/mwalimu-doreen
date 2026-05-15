import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const path = request.nextUrl.pathname;

  // Protect dashboard, booking, messages
  const authRequired = ["/dashboard", "/book", "/messages"];
  if (authRequired.some((p) => path.startsWith(p)) && !user) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Gate course modules 2+ behind subscription
  const courseMatch = path.match(/^\/courses\/(\d+)/);
  if (courseMatch && parseInt(courseMatch[1]) > 1) {
    if (!user) {
      return NextResponse.redirect(new URL("/auth/login?next=" + path, request.url));
    }
    const { data: sub } = await supabase
      .from("subscriptions")
      .select("status")
      .eq("user_id", user.id)
      .single();

    if (!sub || sub.status !== "active") {
      return NextResponse.redirect(new URL("/pricing", request.url));
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
