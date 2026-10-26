# PAL Tech private backend

Status: PAL Tech project `hgcnadtdhfkllekhboqp` is provisioned in eu-west-1. Backup and cohort/assignment migrations are applied. Local public configuration is connected. Production configuration and first adult account are pending. PAL Evaluation remains separate and untouched.

Database verification: transaction-rolled-back synthetic identities confirmed owner reads, cross-owner isolation, spoofed owner write denial and unapproved account write denial. Security advisors returned no findings. Authenticated browser flows still require an approved adult account.

The first backend release supports approved adult sign-in and private, explicit cloud backups. It does not automatically synchronise devices or expose learner rankings. Children retain offline nickname profiles. Local data is uploaded only after a signed-in adult confirms permission and clicks Save cloud backup.

## Provisioning

1. Select or create an approved Supabase project and review its billing and region.
2. Initial migrations are already applied: `pal_hub_private_backups` and `pal_hub_cohorts_and_assignments`. Do not rerun `schema.sql` or `cohorts.sql` on the provisioned project. They are retained as the reviewed source for recreating a separate environment.
3. Create/invite the adult account using Supabase Auth. Add its UUID to `public.pal_hub_facilitators` through an administrator connection. Browser clients cannot add members.
4. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in the Vercel production environment and local `.env.local`. Never use a secret or service-role key in a VITE variable.
5. Configure and test adult password reset/invitation email delivery. No public signup UI is provided.
6. Deploy and test with two approved adults plus an unapproved account: each approved adult can create/read/delete only their own snapshots; others and anonymous callers cannot access them. Verify direct REST requests, not just hidden UI.
7. Test offline failure, sign-out, reload, backup restore and permanent snapshot deletion using synthetic nicknames before any real learner data.

Snapshots are immutable; there is no UPDATE grant. Restore requires an explicit replacement confirmation. Adult sessions remain in memory only, and do not survive page reload. Sign-out does not clear the local device's learner profiles; use device access controls and the existing removal tools for shared machines. Cloud backup deletion does not delete local copies. Do not treat device points as trusted exam grades.

Cohort planning stores a group name and stage assignments with optional due dates. It does not yet enrol children, send notifications, or calculate assignment completion across snapshots. Automatic multi-device sync, the 100-question-per-topic bank, certificates and the revised facilitator deck are not part of this implemented backend release.

Deployment blocker (26 October 2026): the saved Vercel project ID returns 404 under the connected jadeleke-forecast team; a project search for PAL returns no matches. CLI authentication is also logged out. Resolve hosting access/target before production environment configuration or release. No replacement hosting project or domain reassignment has been performed.

Sources: https://supabase.com/docs/guides/database/postgres/row-level-security and https://supabase.com/docs/guides/auth/passwords
