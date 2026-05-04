import { useState } from "react";
import { api } from "@/lib/api";
import { saveAuth } from "@/lib/auth";

interface Props {
  onLogin: () => void;
  adminMode?: boolean;
}

export default function LoginPage({ onLogin, adminMode = false }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.login(username.trim(), password);
      saveAuth(res.token, {
        discordUsername: res.discordUsername,
        isAdmin: res.isAdmin,
      });
      onLogin();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen bg-black flex flex-col items-center justify-center p-4"
      style={{
        backgroundImage: "url('/assets/background.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <img src="/assets/psy-logo.png" alt="PSY" className="w-12 h-12 rounded-xl" />
            <h1 className="text-4xl font-black text-cyan-400 tracking-widest drop-shadow-[0_0_20px_rgba(0,212,255,0.8)]">
              PSY
            </h1>
          </div>
          <h2 className="text-3xl font-black text-white tracking-widest">ZOMBIE FIGHTER</h2>
          <p className="text-cyan-400/70 mt-2 tracking-wider text-sm">
            {adminMode ? "ADMIN ACCESS" : "TOURNAMENT"}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-black/80 border border-cyan-500/30 rounded-lg p-8 shadow-[0_0_40px_rgba(0,212,255,0.15)]"
        >
          {adminMode && (
            <div className="mb-5 text-center">
              <span className="text-xs font-bold text-yellow-400 bg-yellow-400/10 border border-yellow-500/30 px-3 py-1 rounded-full tracking-widest">
                🔐 ADMINISTRATOR LOGIN
              </span>
            </div>
          )}

          {!adminMode && (
            <div className="mb-5 p-3 bg-cyan-500/10 border border-cyan-500/20 rounded text-center">
              <p className="text-cyan-400 text-xs tracking-wide">
                Enter your Discord username and the tournament password provided by the organiser
              </p>
            </div>
          )}

          <div className="mb-5">
            <label className="block text-cyan-400 text-sm font-bold mb-2 tracking-widest uppercase">
              Discord Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={adminMode ? "admin" : "YourDiscordName"}
              required
              autoComplete="username"
              className="w-full bg-black/60 border border-cyan-500/40 text-white placeholder-cyan-900 rounded px-4 py-3 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition"
            />
          </div>

          <div className="mb-6">
            <label className="block text-cyan-400 text-sm font-bold mb-2 tracking-widest uppercase">
              {adminMode ? "Password" : "Tournament Password"}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              className="w-full bg-black/60 border border-cyan-500/40 text-white placeholder-cyan-900 rounded px-4 py-3 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition"
            />
            {!adminMode && (
              <p className="text-white/30 text-xs mt-1">
                The password is specific to each tournament
              </p>
            )}
          </div>

          {error && (
            <div className="mb-4 text-red-400 text-sm text-center bg-red-900/20 border border-red-500/30 rounded p-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black font-black py-3 rounded tracking-widest text-lg transition-all hover:shadow-[0_0_20px_rgba(0,212,255,0.5)] uppercase"
          >
            {loading ? "Logging in..." : adminMode ? "Access Admin Panel" : "Join Tournament"}
          </button>
        </form>
      </div>
    </div>
  );
}
