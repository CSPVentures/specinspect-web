'use client';

import { useState } from 'react';
import Link from 'next/link';
import { logoutAction, deleteAccountAction } from '@/lib/auth-actions';

async function handleManageSubscription(userId: string) {
  const res = await fetch('/api/subscriptions/portal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId }),
  });
  const data = await res.json();
  if (data.portal_url) window.location.href = data.portal_url;
}

export default function AccountClient({
  user,
  isPro,
}: {
  user: { id: string; full_name: string; email: string; created_at?: string };
  isPro: boolean;
}) {
  const [manageLoading, setManageLoading] = useState(false);

  // Change password
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwStatus, setPwStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [pwError, setPwError] = useState('');

  // Delete account
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  async function onManage() {
    setManageLoading(true);
    await handleManageSubscription(user.id);
    setManageLoading(false);
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPwError('New passwords do not match.');
      return;
    }
    if (newPassword.length < 8) {
      setPwError('New password must be at least 8 characters.');
      return;
    }
    setPwStatus('loading');
    setPwError('');
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || body.message || body.detail || 'Current password is incorrect.');
      }
      setPwStatus('success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setPwError(err instanceof Error ? err.message : 'Could not update password.');
      setPwStatus('error');
    }
  }

  const memberSince = user.created_at
    ? new Date(user.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })
    : null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-bold text-white">Account</h1>

      {/* Profile */}
      <section className="card mt-6 p-6">
        <h2 className="spec-label">Profile</h2>
        <dl className="mt-3 space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-subdued">Name</dt>
            <dd className="font-medium text-white">{user.full_name}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-subdued">Email</dt>
            <dd className="font-medium text-white">{user.email}</dd>
          </div>
          {memberSince && (
            <div className="flex justify-between gap-4">
              <dt className="text-subdued">Member since</dt>
              <dd className="font-medium text-white">{memberSince}</dd>
            </div>
          )}
        </dl>
      </section>

      {/* Subscription */}
      <section className="card mt-4 p-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h2 className="spec-label">Subscription</h2>
            <div className="mt-2">
              {isPro ? (
                <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full text-sm font-medium">
                  Pro Plan ✦
                </span>
              ) : (
                <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-sm font-medium">
                  Free Plan
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-subdued">
              {isPro
                ? 'Unlimited projects, submittal PDFs, weather checks, and compare.'
                : 'Search products, 3 projects, basic specs.'}
            </p>
          </div>
          {isPro ? (
            <button onClick={onManage} disabled={manageLoading} className="btn-secondary shrink-0">
              {manageLoading ? 'Loading…' : 'Manage Subscription'}
            </button>
          ) : (
            <Link href="/pricing" className="btn-primary shrink-0">Upgrade to Pro</Link>
          )}
        </div>
      </section>

      {/* Change Password */}
      <section className="card mt-4 p-6">
        <h2 className="spec-label mb-4">Change Password</h2>
        {pwStatus === 'success' && (
          <p className="mb-3 text-sm text-green-400 font-medium">Password updated successfully.</p>
        )}
        <form onSubmit={changePassword} className="space-y-4">
          <div>
            <label htmlFor="current-pw" className="label">Current Password</label>
            <input
              id="current-pw"
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              autoComplete="current-password"
              className="input"
            />
          </div>
          <div>
            <label htmlFor="new-pw" className="label">New Password</label>
            <input
              id="new-pw"
              type="password"
              required
              minLength={8}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password"
              className="input"
            />
          </div>
          <div>
            <label htmlFor="confirm-pw" className="label">Confirm New Password</label>
            <input
              id="confirm-pw"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              className="input"
            />
          </div>
          {pwError && <p className="text-sm text-gold">{pwError}</p>}
          <button type="submit" disabled={pwStatus === 'loading'} className="btn-primary">
            {pwStatus === 'loading' ? 'Updating…' : 'Update Password'}
          </button>
        </form>
      </section>

      {/* Sign Out */}
      <section className="card mt-4 p-6">
        <h2 className="spec-label">Session</h2>
        <form action={logoutAction} className="mt-3">
          <button className="btn-secondary">Sign out</button>
        </form>
      </section>

      {/* Delete Account — danger zone */}
      <section className="card mt-4 p-6 border-red-500/30">
        <h2 className="spec-label text-red-400">Danger Zone</h2>
        <p className="mt-3 text-sm text-subdued">
          Permanently delete your account and all associated data. This action cannot be undone.
        </p>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/20 transition-colors"
        >
          Delete My Account
        </button>
      </section>

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-title"
          onClick={(e) => e.target === e.currentTarget && setShowDeleteModal(false)}
        >
          <div className="card w-full max-w-md p-6 border-red-500/30">
            <h2 id="delete-title" className="text-lg font-semibold text-white">Delete your account?</h2>
            <p className="mt-2 text-sm text-subdued">
              This will permanently delete your account, all saved projects, and spec data. This cannot be undone.
            </p>
            <p className="mt-4 text-sm text-body">
              Type <strong className="text-red-400">DELETE</strong> to confirm:
            </p>
            <input
              type="text"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              className="input mt-2"
              placeholder="DELETE"
              autoComplete="off"
            />
            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => { setShowDeleteModal(false); setDeleteConfirmText(''); }}
                className="btn-secondary"
              >
                Cancel
              </button>
              <form action={deleteAccountAction}>
                <button
                  type="submit"
                  disabled={deleteConfirmText !== 'DELETE'}
                  className="rounded-lg bg-red-600 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Delete Account
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <p className="mt-8 text-center font-mono text-xs text-subdued">SpecInspect v1.0.0</p>
    </div>
  );
}
