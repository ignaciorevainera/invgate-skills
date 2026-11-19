# Operations & Administration — Asset Management

Operational behavior for Tier 3 topics. No instance-specific values: replace `[instance]`, names and IDs with the target environment.

## Agent

- Supported: Windows 7+/Server 2008+, Ubuntu 14.04+, Debian 8+, CentOS/RHEL/Oracle 7+, SUSE 15.3+, macOS 10.13+, Android 5.0+.
- Prerequisites: Windows — administrator, WMI and PowerShell enabled. Linux — sudo and `dmidecode`. macOS — sudo and Rosetta.
- The agent must reach the instance or a proxy, and can auto-update from InvGate's update host.
- Deployment methods: manual, GPO (AD), Intune, SCCM/PDQ/Automox, or remote deployment through the proxy (requires credentials per machine and WMI/SSH access), plus agentless discovery (WMI or SSH) when the agent is prohibited.
- Hardening: approve agents flagged as "unsafe", distribute a secret key with GPO, and confirm antivirus exclusions.

## Proxy

- Bidirectional bridge between agents and the server. It also performs network discovery and remote agent deployment into networks the server cannot reach.
- Supported: RHEL 8/9, Ubuntu 22.04 LTS, Windows 10 / Windows Server 2018.
- Minimum 8 GB RAM and 4 cores; ports 80/443 open between proxy, server and agents.
- Proxy URL changes live in the proxy `.env`. Legacy CentOS proxies are deprecated and must migrate.

## Discovery Sources

- Network scan: ICMP, TCP ports, DNS reverse, mDNS, ARP.
- External sources: Active Directory (requires proxy 2.0+), Entra ID/Intune, AWS, Azure, Google Workspace, Google Cloud, VMware, Hyper-V, JAMF, Workspace ONE, SOTI, Kubernetes, Apple Business/School Manager, Nmap, InvGate Discovery.
- Each source has its own credentials and scope; import is read-only from the external system.
- Discovered devices are reviewed in `Assets > Discovery` and converted to assets. Unauthenticated database discovery exists for SQL Server and PostgreSQL.

## Asset Profile Signals (Windows)

With the agent installed, the profile exposes: Windows updates, services, startup programs, licenses (OS and Office), shared resources, users and groups. Use these to diagnose security posture, not as a license-compliance source.

## Financial Model

- **Depreciation** (`Settings > Assets > Depreciation`): straight-line only. Rule = asset type + manufacturer + start period (acquisition or retirement year/month) + useful life + residual value. "Overwrite current information" recalculates existing prices.
- **Cost centers** are CIs with a unique case-insensitive code (max 50 chars), a name (max 80), optional parent for hierarchy, owner and tags. They link to assets, contracts, purchase orders and people, and feed chargeback reports.
- **License types** for contracts: users (Named, Concurrent, CAL) and devices (Installations, CAL). Compliance math depends on the type.

## Software and Updates

- **Application services** are discovered automatically (Apache, Nginx, IIS, Tomcat, JBoss, WildFly, MySQL, MariaDB, PostgreSQL, SQL Server, Oracle, MongoDB, Redis, Exchange, MailEnable, hMailServer, FTP, FileZilla, Samba, NFS, TFTP) and can be registered as assets and used in business applications.
- **OS update explorer** consolidates pending/installed Windows updates with severity and KB identifier; the KB summary is AI-generated.
- **Cloud subscriptions** can be imported in bulk; **software metering** requires the agent (Windows only).

## Digital Assets and AI Tools

- **Digital assets** are CIs of subtype `Certificado` or `Workflow` (automations running on external platforms). They carry owner, expiry and custom fields, and support expiry alerts through automations.
- **AI tool detection** requires the agent. Current version detects Claude and Codex, including accounts, and third-party components (MCP servers, skills, plugins, marketplaces). It is inventory telemetry, not a DLP or content-monitoring tool.

## Automation and Data Exchange

- AM → SM: a **Scheduler** automation on contracts (`Expiration date`) can call `POST /api/v1/incident` on the Service Management instance through a Web Service action (Basic auth), creating renewal requests automatically.
- **View-based data export**: no row limit, up to 1,500 columns, scheduled daily/weekly/monthly, exposing a UUID, a stable unique URL for BI, and a Public API v2 endpoint. Only custom views expose it, not predefined ones.
- **Stock alerts**: schedule a custom view by email with the condition "send only if result count matches" instead of sending a fixed report.
- **Governance**: for the database CI family, editing governed properties requires evidence (who, when, why), stored immutably. It does not trigger on bulk edit, CSV import or API changes.
- **M365 integration** imports license usage and subscription data for cost analysis.
