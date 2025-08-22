// Lightweight API client with token handling and auto-refresh support

const API_ORIGIN = import.meta.env.VITE_API_URL || "http://localhost:3000";
const API_PREFIX = "/api/v1";

export const apiOrigin = API_ORIGIN;

export async function apiRequest(path, options = {}, tokens) {
	const { method = "GET", body, headers = {}, signal } = options;
	const requestHeaders = {
		"Content-Type": body instanceof FormData ? undefined : "application/json",
		...(tokens?.accessToken
			? { Authorization: `Bearer ${tokens.accessToken}` }
			: {}),
		...headers,
	};

	const fetchOptions = {
		method,
		headers: Object.fromEntries(
			Object.entries(requestHeaders).filter(([, v]) => v !== undefined)
		),
		credentials: "include",
		body:
			body instanceof FormData
				? body
				: body !== undefined
				? JSON.stringify(body)
				: undefined,
		signal,
	};

	const response = await fetch(`${API_ORIGIN}${API_PREFIX}${path}`, fetchOptions);
	if (response.status !== 401) {
		return response;
	}

	// Attempt refresh if we have a refresh token and got 401
	if (!tokens?.refreshToken) return response;

	const refreshRes = await fetch(`${API_ORIGIN}${API_PREFIX}/auth/refresh-token`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify({ refreshToken: tokens.refreshToken }),
	});

	if (!refreshRes.ok) {
		return response; // original 401
	}
	const refreshData = await refreshRes.json();
	const newAccessToken = refreshData?.data?.accessToken;
	if (!newAccessToken) return response;

	// retry original request with new access token
	const retryHeaders = {
		...requestHeaders,
		Authorization: `Bearer ${newAccessToken}`,
	};
	return fetch(`${API_ORIGIN}${API_PREFIX}${path}`, {
		...fetchOptions,
		headers: retryHeaders,
	});
}

export async function apiJson(path, options = {}, tokens) {
	const res = await apiRequest(path, options, tokens);
	let data = null;
	try {
		data = await res.json();
	} catch (_) {
		data = null;
	}
	return { ok: res.ok, status: res.status, data };
}


