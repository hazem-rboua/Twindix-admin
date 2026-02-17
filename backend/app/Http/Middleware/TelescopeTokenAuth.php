<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TelescopeTokenAuth
{
    public function handle(Request $request, Closure $next): Response
    {
        // Always allow locally.
        if (app()->environment('local')) {
            return $next($request);
        }

        // Optional: allow by IP (comma-separated).
        $allowedIps = array_values(array_filter(array_map(
            static fn (string $ip) => trim($ip),
            explode(',', (string) env('TELESCOPE_ALLOWED_IPS', ''))
        )));

        if ($allowedIps !== [] && in_array((string) $request->ip(), $allowedIps, true)) {
            return $next($request);
        }

        // Token-based access for browser usage without app login.
        // 1) hit `/telescope?telescope_token=...` once (sets cookie)
        // 2) subsequent XHR requests work via cookie
        $token = (string) env('TELESCOPE_TOKEN', '');
        if ($token === '') {
            abort(403);
        }

        $provided =
            (string) $request->header('x-telescope-token', '') ?:
            (string) $request->query('telescope_token', '') ?:
            (string) $request->cookie('telescope_token', '');

        if (! hash_equals($token, (string) $provided)) {
            abort(403);
        }

        $response = $next($request);

        // If token came from query/header, persist it for the UI with a cookie.
        if ($request->query->has('telescope_token') || $request->headers->has('x-telescope-token')) {
            $secure = $request->isSecure();

            $response->headers->setCookie(cookie(
                name: 'telescope_token',
                value: $token,
                minutes: (int) env('TELESCOPE_TOKEN_TTL', 60 * 24 * 7),
                path: '/telescope',
                domain: null,
                secure: $secure,
                httpOnly: true,
                raw: false,
                sameSite: 'lax'
            ));
        }

        return $response;
    }
}

