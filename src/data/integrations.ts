/**
 * Integrations registry — the source of truth for the supported-source / channel
 * logo walls on this site.
 *
 * Vendored from the monorepo's `@observe24/integrations` package when the
 * marketing site was extracted into its own repo. The dashboard still consumes
 * that package for its in-product catalog, so THIS FILE AND THAT PACKAGE MUST BE
 * KEPT IN SYNC BY HAND when a vendor is added or a status flips.
 *
 * That duplication is deliberate and small: it is ~100 lines of public marketing
 * copy that changed 3 times in its first 3 weeks, and a workspace dependency was
 * the only thing tying this repo to the product source.
 *
 * Honesty rules (deliberate — see CAPABILITIES.md / the universal-ingest spec):
 *   status 'native'  → a first-class path that genuinely exists today (OTLP, the
 *                      Linux Sensor, every alert channel, Terraform, MCP).
 *   status 'webhook' → ingested through the Universal Webhook + AI-authored
 *                      mapping. NOT a turnkey native connector — the page says so.
 *   verified         → we've validated ingest from this exact vendor format E2E
 *                      (FortiGate CEF, CrowdStrike JSON). Still the webhook path;
 *                      the badge only means "proven", not "one-click preset".
 *
 * `logo` is the basename of an SVG in ../icons/logos (monochrome, fill=currentColor).
 * When null, the grid renders a monogram tile from `abbr` — used for brands whose
 * marks aren't freely redistributable (Slack, AWS, Twilio, …); swap in an official
 * asset later without touching the grid.
 */
export type IntegrationStatus = 'native' | 'webhook';

export interface Integration {
  id: string;
  name: string;
  category: CategoryId;
  status: IntegrationStatus;
  /** E2E-validated ingest from this vendor's format. */
  verified?: boolean;
  /** SVG basename in ../icons/logos, or null → monogram from `abbr`. */
  logo: string | null;
  /** Monogram text when `logo` is null. Keep to 1–3 glyphs. */
  abbr?: string;
  /** Where the "set this up" docs live. */
  docHref?: string;
}

export type CategoryId = 'collect' | 'security' | 'cloud' | 'identity' | 'alert' | 'provision';

export const CATEGORIES: { id: CategoryId; title: string; blurb: string }[] = [
  { id: 'collect', title: 'Collectors & log shippers', blurb: 'OpenTelemetry-native, plus a one-line Linux Sensor for hosts and devices.' },
  { id: 'security', title: 'Security & EDR sources', blurb: 'Firewall and endpoint telemetry — normalized to ECS, fed straight into detections.' },
  { id: 'cloud', title: 'Cloud & platforms', blurb: 'Push platform and edge logs in without standing up a collector.' },
  { id: 'identity', title: 'Identity & SaaS', blurb: 'IdP, directory and SaaS audit trails — MFA, admin grants and risky sign-ins, mapped to ECS.' },
  { id: 'alert', title: 'Alerting & on-call', blurb: 'Ten routing channels. One incident per fire — never a hundred.' },
  { id: 'provision', title: 'Provision & agents', blurb: 'Manage it as code, and let an agent drive the same REST surface you do.' },
];

export const INTEGRATIONS: Integration[] = [
  // ── Collectors & log shippers ──────────────────────────────────────────────
  { id: 'opentelemetry', name: 'OpenTelemetry', category: 'collect', status: 'native', logo: 'opentelemetry', docHref: '/docs/collector' },
  { id: 'linux-sensor', name: 'Linux Sensor', category: 'collect', status: 'native', logo: null, abbr: 'SEN', docHref: '/docs/sensor' },
  { id: 'docker', name: 'Docker', category: 'collect', status: 'native', logo: 'docker', docHref: '/docs/sensor' },
  { id: 'kubernetes', name: 'Kubernetes', category: 'collect', status: 'native', logo: 'kubernetes', docHref: '/docs/collector' },
  { id: 'syslog', name: 'Syslog / CEF', category: 'collect', status: 'webhook', logo: null, abbr: 'sys', docHref: '/docs/logs' },

  // ── Security & EDR sources ─────────────────────────────────────────────────
  { id: 'fortigate', name: 'FortiGate', category: 'security', status: 'webhook', verified: true, logo: 'fortigate', docHref: '/docs/logs' },
  { id: 'crowdstrike', name: 'CrowdStrike', category: 'security', status: 'webhook', verified: true, logo: null, abbr: 'CS', docHref: '/docs/logs' },
  { id: 'paloalto', name: 'Palo Alto Networks', category: 'security', status: 'webhook', logo: 'paloalto', docHref: '/docs/logs' },
  { id: 'cisco', name: 'Cisco', category: 'security', status: 'webhook', logo: 'cisco', docHref: '/docs/logs' },
  { id: 'falco', name: 'Falco', category: 'security', status: 'webhook', verified: true, logo: null, abbr: 'FAL', docHref: '/docs/logs' },
  { id: 'wazuh', name: 'Wazuh', category: 'security', status: 'webhook', verified: true, logo: null, abbr: 'WZ', docHref: '/docs/logs' },
  { id: 'carbon-black', name: 'VMware Carbon Black', category: 'security', status: 'webhook', verified: true, logo: null, abbr: 'CB', docHref: '/docs/logs' },

  // ── Cloud & platforms ──────────────────────────────────────────────────────
  { id: 'cloudflare', name: 'Cloudflare Logpush', category: 'cloud', status: 'webhook', logo: 'cloudflare', docHref: '/docs/logs' },
  { id: 'aws', name: 'AWS / CloudWatch', category: 'cloud', status: 'webhook', logo: null, abbr: 'aws', docHref: '/docs/logs' },
  { id: 'vercel', name: 'Vercel', category: 'cloud', status: 'webhook', logo: 'vercel', docHref: '/docs/logs' },
  { id: 'heroku', name: 'Heroku', category: 'cloud', status: 'webhook', logo: null, abbr: 'H', docHref: '/docs/logs' },
  { id: 'aws-cloudtrail', name: 'AWS CloudTrail', category: 'cloud', status: 'webhook', verified: true, logo: null, abbr: 'CT', docHref: '/docs/logs' },
  { id: 'aws-guardduty', name: 'AWS GuardDuty', category: 'cloud', status: 'webhook', verified: true, logo: null, abbr: 'GD', docHref: '/docs/logs' },
  { id: 'azure-activity', name: 'Azure Activity Logs', category: 'cloud', status: 'webhook', verified: true, logo: null, abbr: 'AZ', docHref: '/docs/logs' },
  { id: 'gcp-audit', name: 'GCP Cloud Audit', category: 'cloud', status: 'webhook', verified: true, logo: null, abbr: 'GCP', docHref: '/docs/logs' },
  { id: 'gcp-scc', name: 'GCP Security Command Center', category: 'cloud', status: 'webhook', verified: true, logo: null, abbr: 'SCC', docHref: '/docs/logs' },

  // ── Identity & SaaS ────────────────────────────────────────────────────────
  { id: 'okta', name: 'Okta', category: 'identity', status: 'webhook', verified: true, logo: null, abbr: 'OKT', docHref: '/docs/logs' },
  { id: 'azure-entra', name: 'Microsoft Entra ID', category: 'identity', status: 'webhook', verified: true, logo: null, abbr: 'ENT', docHref: '/docs/logs' },
  { id: 'auth0', name: 'Auth0', category: 'identity', status: 'webhook', verified: true, logo: null, abbr: 'A0', docHref: '/docs/logs' },
  { id: 'google-workspace', name: 'Google Workspace', category: 'identity', status: 'webhook', verified: true, logo: null, abbr: 'GW', docHref: '/docs/logs' },
  { id: 'm365-audit', name: 'Microsoft 365', category: 'identity', status: 'webhook', verified: true, logo: null, abbr: 'M365', docHref: '/docs/logs' },
  { id: 'github-audit', name: 'GitHub Audit Log', category: 'identity', status: 'webhook', verified: true, logo: null, abbr: 'GH', docHref: '/docs/logs' },
  { id: 'cloudflare-audit', name: 'Cloudflare Audit Logs', category: 'identity', status: 'webhook', verified: true, logo: 'cloudflare', docHref: '/docs/logs' },

  // ── Alerting & on-call ─────────────────────────────────────────────────────
  { id: 'slack', name: 'Slack', category: 'alert', status: 'native', logo: null, abbr: 'S', docHref: '/features#alerts' },
  { id: 'discord', name: 'Discord', category: 'alert', status: 'native', logo: 'discord', docHref: '/features#alerts' },
  { id: 'msteams', name: 'Microsoft Teams', category: 'alert', status: 'native', logo: null, abbr: 'T', docHref: '/features#alerts' },
  { id: 'telegram', name: 'Telegram', category: 'alert', status: 'native', logo: 'telegram', docHref: '/features#alerts' },
  { id: 'pagerduty', name: 'PagerDuty', category: 'alert', status: 'native', logo: 'pagerduty', docHref: '/features#alerts' },
  { id: 'opsgenie', name: 'Opsgenie', category: 'alert', status: 'native', logo: 'opsgenie', docHref: '/features#alerts' },
  { id: 'twilio', name: 'Twilio SMS & Voice', category: 'alert', status: 'native', logo: null, abbr: 'Tw', docHref: '/features#alerts' },
  { id: 'email', name: 'Email', category: 'alert', status: 'native', logo: null, abbr: '@', docHref: '/features#alerts' },
  { id: 'webhook-out', name: 'Webhook (HMAC)', category: 'alert', status: 'native', logo: null, abbr: '</>', docHref: '/docs/webhooks' },

  // ── Provision & agents ─────────────────────────────────────────────────────
  { id: 'terraform', name: 'Terraform', category: 'provision', status: 'native', logo: 'terraform', docHref: '/docs' },
  { id: 'mcp', name: 'MCP server', category: 'provision', status: 'native', logo: null, abbr: 'MCP', docHref: '/docs/api-for-agents' },
];

/** Logos chosen for the homepage / features marquee (visually strongest marks). */
export const MARQUEE_IDS = [
  'opentelemetry', 'kubernetes', 'docker', 'cloudflare', 'fortigate',
  'cisco', 'paloalto', 'pagerduty', 'opsgenie', 'discord', 'telegram', 'terraform', 'vercel',
];
