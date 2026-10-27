# PAL Tech security

## Controls

- Production responses restrict scripts to this site and network connections to this site and the PAL Tech Supabase project. Framing, plugins, camera, microphone, geolocation, payments and USB are blocked.
- Cloud authorization is enforced by Supabase row-level policies: approved adults can access only their own records. Anonymous clients have no table grants. Clients cannot approve facilitator accounts.
- The dashboard verifies approval before showing cloud controls. Only the public publishable key is bundled.
- Adult sessions remain in memory. A 15-minute browser inactivity lock reloads the page to discard the in-memory session, including when returning from a sleeping tab. This is a shared-device safeguard, not server-side token revocation or a replacement for RLS. Local learner profiles remain on the device.
- Backup imports reject oversized files (1 MB), malformed profiles, reserved object keys, mismatched IDs and invalid scores. At most 500 profiles are accepted per import.
- Cloud snapshots are manual and require facilitator consent. Neither cloud data nor authentication responses are included in the offline cache.

## Verification and remaining work

Run `pnpm test`, `pnpm build`, `pnpm lint` and `pnpm audit` before release. Verify the deployed response headers and browser flows after release.

Supabase's security advisor reported leaked-password protection disabled on 2026-10-27. Changing this requires dashboard access (and may depend on the project's plan). It has not been enabled by this update. MFA enrollment, server-side session timeouts and signup settings also require a separate verified configuration pass. Do not describe this site as immune to attacks or independently penetration-tested.

Device backups contain learning data. Use trusted devices, protect downloaded backups, and remove local profiles when retiring a shared device. Offline local profiles are not encrypted or protected by an adult sign-in.
