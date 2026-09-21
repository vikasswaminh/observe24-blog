// 24Observe Landing Page Interactive Script

document.addEventListener('DOMContentLoaded', () => {
  initSimulator();
  initCodeSandbox();
  initCalculator();
});

const scenarioData = {
  ssl: {
    signal: `[16:45:02] PROBE_US_EAST: GET https://api.24observe.com/v1/health<br />
[16:45:02] HTTP STATUS: 200 OK | Response Time: 42ms<br />
[16:45:03] SSL_CERT_CHECK: api.24observe.com<br />
[16:45:03] <span style="color: #fbbf24;">WARN: TLS Certificate expires in 48 hours (Issuer: Let's Encrypt E1)</span><br />
[16:45:03] Auto-dispatching payload to Autonomous AI SOC Analyst...`,
    verdict: `<span class="status-badge-green">✔ VERDICT: ACTIONABLE PREVENTATIVE INCIDENT</span><br /><br />
<strong>Root Cause:</strong> TLS Certificate renewal script failed via certbot cron on edge node us-east-4.<br />
<strong>Impacted Service:</strong> Public API Endpoint Gateway<br />
<strong>Suggested Fix:</strong> Trigger automated ACME renewal hook or execute runbook script <code>./renew_tls.sh</code>.<br />
<strong>Status:</strong> Alert routed to Slack #devops-alerts & PagerDuty.`
  },
  latency: {
    signal: `[16:48:10] OTEL_COLLECTOR: POST https://checkout.24observe.com/v2/pay<br />
[16:48:11] HTTP STATUS: 504 Gateway Timeout | Latency: 2400ms (p99 spike)<br />
[16:48:11] DB_SPAN: PostgreSQL query lock timeout on table 'orders'<br />
[16:48:12] <span style="color: #ef4444;">CRITICAL: Connection pool utilization at 98.4%</span><br />
[16:48:12] Auto-correlating metrics with active OpenTelemetry traces...`,
    verdict: `<span class="status-badge-green">VERDICT: UNINDEXED DATABASE SCAN</span><br /><br />
<strong>Root Cause:</strong> Sequential full table scan on orders(user_id, status) during peak checkout volume.<br />
<strong>Impacted Service:</strong> Checkout & Payment Processing API<br />
<strong>Suggested Fix:</strong> Apply concurrent composite index in Postgres.<br />
<code>CREATE INDEX CONCURRENTLY idx_orders_user_status ON orders(user_id, status);</code>`
  },
  siem: {
    signal: `[16:51:30] SYSLOG_SENSOR: SSH auth failure flood from IP 185.220.101.4<br />
[16:51:30] FAILED ATTEMPTS: 1,420 requests/min targeting user 'root'<br />
[16:51:31] <span style="color: #ef4444;">SECURITY ALERT: High-frequency brute-force credential attack</span><br />
[16:51:31] Threat Intelligence: Matched known malicious Tor exit node list<br />
[16:51:32] Triggering automated SIEM containment playbook...`,
    verdict: `<span class="status-badge-green">VERDICT: THREAT CONTAINED AUTOMATICALLY</span><br /><br />
<strong>Root Cause:</strong> Automated credential stuffing brute-force botnet.<br />
<strong>Action Taken:</strong> Injected iptables drop rule for IP 185.220.101.4 & disabled password auth.<br />
<strong>System Rule:</strong> <code>ufw deny from 185.220.101.4</code>`
  },
  agentsec: {
    signal: `[17:02:15] MCP_GATEWAY: Agent tool call requested by Claude 3.5 Sonnet<br />
[17:02:15] ACTION: execute_shell("rm -rf /var/db/backup")<br />
[17:02:16] <span style="color: #ef4444;">SECURITY ALERT: Destructive command detected in AI tool call payload</span><br />
[17:02:16] AI Agent Shield: Intercepted untrusted tool parameter via MCP Firewall<br />
[17:02:17] Quarantining agent execution context...`,
    verdict: `<span class="status-badge-green">VERDICT: PROMPT INJECTION ATTACK BLOCKED</span><br /><br />
<strong>Root Cause:</strong> Malicious prompt injection payload detected inside unparsed customer ticket text.<br />
<strong>Shield Action:</strong> Intercepted destructive shell call & returned sanitized mock output to agent.<br />
<strong>Status:</strong> Security alert dispatched to SOC audit log.`
  }
};

function initSimulator() {
  const tabs = document.querySelectorAll('.sim-tab-btn');
  const signalOutput = document.getElementById('sim-signal-output');
  const verdictOutput = document.getElementById('sim-verdict-output');

  if (!tabs.length || !signalOutput || !verdictOutput) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const scenarioKey = tab.getAttribute('data-scenario');
      if (scenarioData[scenarioKey]) {
        signalOutput.innerHTML = scenarioData[scenarioKey].signal;
        verdictOutput.innerHTML = scenarioData[scenarioKey].verdict;
      }
    });
  });

  // Hero comparison link interactive click handlers
  const heroChips = document.querySelectorAll('.hero-text-link');
  heroChips.forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.preventDefault();
      const target = chip.getAttribute('href').replace('#compare-', '');
      showComparisonModal(target);
    });
  });
}

const codeSnippets = {
  mcp: `<pre><code>// 24Observe Model Context Protocol (MCP) Server Tool Definition for AI Agents
{
  "name": "query_24observe_telemetry",
  "description": "Query live OpenTelemetry logs, active incident alerts, and AI verdicts",
  "parameters": {
    "type": "object",
    "properties": {
      "query": { "type": "string", "example": "status:504 service:api-gateway" },
      "time_range": { "type": "string", "example": "15m" }
    },
    "required": ["query"]
  }
}</code></pre>`,
  curl: `<pre><code># Send OpenTelemetry OTLP JSON Log Stream directly via cURL
curl -X POST "https://ingest.24observe.com/v1/logs" \\
  -H "Authorization: Bearer 24obs_live_sk_948271048" \\
  -H "Content-Type: application/json" \\
  -d '{
    "resourceLogs": [{
      "scopeLogs": [{
        "logRecords": [{
          "timeUnixNano": "1740000000000000000",
          "severityText": "ERROR",
          "body": { "stringValue": "Database connection timeout on pool us-east-1" }
        }]
      }]
    }]
  }'</code></pre>`,
  python: `<pre><code># Python OpenTelemetry SDK Integration with 24Observe Exporter
from opentelemetry import trace
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.trace import TracerProvider

provider = TracerProvider()
processor = BatchSpanProcessor(OTLPSpanExporter(
    endpoint="ingest.24observe.com:4317",
    headers={"authorization": "Bearer 24obs_live_sk_948271048"}
))
provider.add_span_processor(processor)
trace.set_tracer_provider(provider)</code></pre>`,
  node: `<pre><code>// Node.js Winston / Pino 24Observe Transport
import pino from 'pino';

const logger = pino({
  transport: {
    target: '@24observe/pino-transport',
    options: {
      apiKey: process.env.OBSERVE24_API_KEY,
      dataset: 'production-api'
    }
  }
});

logger.error({ err: new Error("Payment Gateway 504") }, "Checkout transaction failed");</code></pre>`
};

function initCodeSandbox() {
  const codeBtns = document.querySelectorAll('.code-tab-btn');
  const codeBox = document.getElementById('code-snippet-box');

  if (!codeBtns.length || !codeBox) return;

  codeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      codeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const langKey = btn.getAttribute('data-lang');
      if (codeSnippets[langKey]) {
        codeBox.innerHTML = codeSnippets[langKey];
      }
    });
  });
}

function initCalculator() {
  const logSlider = document.getElementById('log-slider');
  const hostSlider = document.getElementById('host-slider');
  const logVal = document.getElementById('log-val');
  const hostVal = document.getElementById('host-val');
  const savingsDisplay = document.getElementById('savings-display');

  if (!logSlider || !hostSlider || !savingsDisplay) return;

  function updateSavings() {
    const gb = parseInt(logSlider.value);
    const hosts = parseInt(hostSlider.value);

    logVal.textContent = `${gb} GB/day`;
    hostVal.textContent = `${hosts} Hosts`;

    // Datadog cost est: $15/host/mo APM + $0.10/GB log ingest = (hosts * 15 * 12) + (gb * 30 * 0.10 * 12)
    const datadogCost = (hosts * 18 * 12) + (gb * 30 * 0.12 * 12);
    // 24Observe cost est: flat volume (~30% of Datadog)
    const observeCost = datadogCost * 0.28;
    const savings = Math.round(datadogCost - observeCost);

    savingsDisplay.textContent = `$${savings.toLocaleString()} / yr`;
  }

  logSlider.addEventListener('input', updateSavings);
  hostSlider.addEventListener('input', updateSavings);
  updateSavings();
}

function showComparisonModal(competitor) {
  const compNames = {
    datadog: 'Datadog',
    splunk: 'Splunk',
    pagerduty: 'PagerDuty'
  };

  const name = compNames[competitor] || competitor;
  const alertText = `24Observe vs ${name}:\n\n` +
    `• Cost Savings: Save 70% compared to legacy ${name} pricing.\n` +
    `• Autonomous AI Analyst: Instant 10-second root cause triage.\n` +
    `• OpenTelemetry Native: Zero vendor lock-in with flat-rate log retention.\n\n` +
    `Would you like to explore our plans and schedule a comparison demo?`;

  if (confirm(alertText)) {
    const pricingEl = document.getElementById('pricing');
    if (pricingEl) {
      pricingEl.scrollIntoView({ behavior: 'smooth' });
    }
  }
}


