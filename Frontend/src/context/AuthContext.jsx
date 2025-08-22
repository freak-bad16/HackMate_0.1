import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { apiJson } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [accessToken, setAccessToken] = useState(null);
	const [refreshToken, setRefreshToken] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const stored = localStorage.getItem("hm_tokens");
		if (stored) {
			try {
				const parsed = JSON.parse(stored);
				setAccessToken(parsed.accessToken || null);
				setRefreshToken(parsed.refreshToken || null);
			} catch {}
		}
	}, []);

	useEffect(() => {
		if (accessToken || refreshToken) {
			localStorage.setItem(
				"hm_tokens",
				JSON.stringify({ accessToken, refreshToken })
			);
		} else {
			localStorage.removeItem("hm_tokens");
		}
	}, [accessToken, refreshToken]);

	const login = useCallback(async ({ identifier, password }) => {
		setLoading(true);
		try {
			const body = identifier.includes("@")
				? { email: identifier, password }
				: { userName: identifier, password };
			const { ok, data } = await apiJson("/auth/login", {
				method: "POST",
				body,
			});
			if (!ok) throw new Error(data?.message || "Login failed");
			setAccessToken(data?.data?.accessToken || null);
			setRefreshToken(data?.data?.refreshToken || null);
			setUser(data?.data?.user || null);
			return { ok: true };
		} catch (e) {
			return { ok: false, error: e.message };
		} finally {
			setLoading(false);
		}
	}, []);

	const register = useCallback(async (payload) => {
		setLoading(true);
		try {
			const { ok, data } = await apiJson("/auth/register", {
				method: "POST",
				body: payload,
			});
			if (!ok) throw new Error(data?.message || "Register failed");
			return { ok: true };
		} catch (e) {
			return { ok: false, error: e.message };
		} finally {
			setLoading(false);
		}
	}, []);

	const logout = useCallback(async () => {
		try {
			await apiJson("/auth/logout", { method: "POST" }, { accessToken, refreshToken });
		} finally {
			setUser(null);
			setAccessToken(null);
			setRefreshToken(null);
		}
	}, [accessToken, refreshToken]);

	const fetchMe = useCallback(async () => {
		if (!accessToken && !refreshToken) return;
		const { ok, data } = await apiJson(
			"/user/user-info",
			{ method: "GET" },
			{ accessToken, refreshToken }
		);
		if (ok) setUser(data?.data || null);
	}, [accessToken, refreshToken]);

	useEffect(() => {
		fetchMe();
	}, [fetchMe]);

	const value = useMemo(
		() => ({ user, accessToken, refreshToken, loading, login, register, logout, setUser }),
		[user, accessToken, refreshToken, loading, login, register, logout]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within AuthProvider");
	return ctx;
}


