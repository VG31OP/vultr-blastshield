"""Generates high-resolution 16:9 cover image and pitch presentation PDF."""
import matplotlib
import matplotlib.pyplot as plt
from matplotlib.backends.backend_pdf import PdfPages
from pathlib import Path

output_dir = Path("assets")
output_dir.mkdir(parents=True, exist_ok=True)

# -------------------------------------------------------------
# 1. GENERATE 16:9 COVER IMAGE (1920x1080)
# -------------------------------------------------------------
fig, ax = plt.subplots(figsize=(16, 9), dpi=120)
fig.patch.set_facecolor('#0B0F19')
ax.set_facecolor('#0B0F19')
ax.axis('off')

# Cyber grid aesthetic / accents
ax.axhline(0.88, color='#007BFC', linewidth=3, alpha=0.9)
ax.axhline(0.12, color='#00F0FF', linewidth=2, alpha=0.6)

# Main Title & Subtitle
ax.text(0.5, 0.72, "VULTR BLASTSHIELD", 
        fontsize=44, fontweight='bold', color='white', ha='center', va='center',
        family='sans-serif')

ax.text(0.5, 0.62, "Autonomous DevSecOps & Data Agent with Blast Radius Zero Sandboxing", 
        fontsize=18, fontweight='medium', color='#00F0FF', ha='center', va='center')

# Badge
bbox_props = dict(boxstyle="round,pad=0.6", fc="#001833", ec="#007BFC", lw=2)
ax.text(0.5, 0.50, "Track 1: Blast Radius Zero  |  Vultr: Agent Rush Hackathon  |  LabLab.ai", 
        fontsize=14, fontweight='bold', color='#E2E8F0', ha='center', va='center', bbox=bbox_props)

# Feature Highlights in 3 Cards
cards = [
    ("Vultr Cloud VM Control", "Central FastAPI orchestrator\nTask planning & ReAct loops\nStrict lifecycle discipline"),
    ("Vultr Serverless Inference", "Powered by llama-3.3-70b\nLow-latency code synthesis\nAutonomous self-healing"),
    ("Blast Radius Zero Sandbox", "256MB RAM cap & 0.5 CPU quota\nZero network egress (--network none)\nAST Sentinel secret hygiene")
]

for i, (title, desc) in enumerate(cards):
    x = 0.20 + i * 0.30
    box = dict(boxstyle="round,pad=0.8", fc="#111827", ec="#1F2937", lw=1.5)
    ax.text(x, 0.28, f"{title}\n\n{desc}", fontsize=11, color='#94A3B8', ha='center', va='center', 
            bbox=box, linespacing=1.4)

# Footer
ax.text(0.5, 0.06, "Built on Vultr Cloud Compute & Vultr Serverless Inference  •  MIT Open Source",
        fontsize=11, color='#64748B', ha='center', va='center')

plt.subplots_adjust(left=0, right=1, top=1, bottom=0)
cover_path = output_dir / "cover_image.png"
plt.savefig(cover_path, dpi=120, bbox_inches='tight', facecolor=fig.get_facecolor())
plt.close()
print(f"[OK] Generated Cover Image: {cover_path}")


# -------------------------------------------------------------
# 2. GENERATE PROFESSIONAL MULTI-PAGE SLIDE DECK PDF
# -------------------------------------------------------------
pdf_path = output_dir / "presentation.pdf"

slides = [
    {
        "title": "Vultr BlastShield",
        "subtitle": "Autonomous DevSecOps Agent with Blast Radius Zero Sandboxing on Vultr",
        "badge": "Vultr: Agent Rush Hackathon — Track 1",
        "bullets": [
            "• Core Philosophy: 'An agent that only chats is a demo; an agent that executes safely is a product.'",
            "• Combines autonomous data engineering with mathematical containment guarantees.",
            "• Built natively on Vultr Cloud Compute and Vultr Serverless Inference (llama-3.3-70b-instruct).",
            "• 100% open-source under the MIT License."
        ],
        "footer": "Slide 1 / 6  |  Executive Overview"
    },
    {
        "title": "The Problem: The Unconstrained Agent Crisis",
        "subtitle": "Why enterprise adoption of autonomous agents has stalled",
        "badge": "Security & Containment Challenge",
        "bullets": [
            "• Dangerous Privileges: Unsandboxed agents risk executing destructive commands (rm -rf, fork bombs).",
            "• Secret Exfiltration: LLMs given shell access can snoop os.environ, leaking host cloud keys and credentials.",
            "• Runaway Compute: Recursive or hallucinated loops consume host CPU and memory, causing denial of service.",
            "• Blast Radius Disaster: A single compromised tool call can compromise the entire underlying host OS."
        ],
        "footer": "Slide 2 / 6  |  Problem Statement"
    },
    {
        "title": "The Solution: End-to-End System Architecture",
        "subtitle": "Central control on Vultr Cloud VM with segregated execution layers",
        "badge": "Architectural Design",
        "bullets": [
            "• User Interface: High-polish React 19 + Tailwind dashboard with live Blast Radius Zero monitoring.",
            "• Control Layer: FastAPI backend on Vultr VM orchestrating task planning and ReAct loops.",
            "• Intelligence Layer: Vultr Serverless Inference API (https://api.vultrinference.com/v1) with llama-3.3-70b.",
            "• Pre-Execution Sentinel: Static AST security filter blocks dangerous imports and environment probing.",
            "• Ephemeral Runner: Isolated containers created per task and wiped immediately on exit."
        ],
        "footer": "Slide 3 / 6  |  System Architecture"
    },
    {
        "title": "The 4 Blast Radius Zero Containment Pillars",
        "subtitle": "How Vultr BlastShield guarantees host integrity",
        "badge": "Track 1 Core Compliance",
        "bullets": [
            "1. Process Isolation: Execution drops root privileges (-u 1000:1000) and runs in ephemeral workspaces.",
            "2. Secret Hygiene: Exactly 0 host secrets or Vultr keys injected into sandbox. AST blocks os.environ.",
            "3. Resource Bounds: Hard 256MB RAM cap, 0.5 CPU quota, and 10.0-second watchdog termination cutoff.",
            "4. Lifecycle Discipline: Ephemeral sandbox wiped clean from disk immediately upon completion."
        ],
        "footer": "Slide 4 / 6  |  Containment Guarantees"
    },
    {
        "title": "Live Demonstration & The Containment Moment",
        "subtitle": "Autonomous execution with verifiable receipts and attack defense",
        "badge": "Verified Demo Results",
        "bullets": [
            "• Pattern A (Data Engineering): Ingests ecommerce_sales.csv, groups trends, and renders category_performance.png.",
            "• Autonomous Self-Healing: Captures runtime tracebacks, analyzes errors, and repairs the script automatically.",
            "• Containment Moment 1 (Secret Leak): Intercepts os.environ scan, reporting 0 secrets leaked to dashboard.",
            "• Containment Moment 2 (CPU Runaway): Watchdog halts tight infinite spin after 10.0s, killing container.",
            "• Containment Moment 3 (Socket Block): Blocks raw TCP socket exfiltration before execution starts."
        ],
        "footer": "Slide 5 / 6  |  Demo & Containment Proofs"
    },
    {
        "title": "Deployment, Impact & Future Roadmap",
        "subtitle": "Zero-touch deployment on Vultr Cloud Compute",
        "badge": "Production Viability",
        "bullets": [
            "• One-Click Deployment: Automated bash script installs Docker, builds sandbox, and launches stack in < 2 mins.",
            "• Production Hardware: Runs on standard Vultr Cloud Compute VMs with zero GPU requirements.",
            "• Business Impact: Unlocks autonomous agent execution in healthcare, finance, and enterprise DevSecOps.",
            "• Roadmap: Sandboxed Playwright browser use, multi-agent red-teaming, and SIEM event streaming."
        ],
        "footer": "Slide 6 / 6  |  Conclusion & Next Steps"
    }
]

with PdfPages(pdf_path) as pdf:
    for slide in slides:
        fig, ax = plt.subplots(figsize=(13.33, 7.5), dpi=100) # 16:9 standard slide
        fig.patch.set_facecolor('#0B0F19')
        ax.set_facecolor('#0B0F19')
        ax.axis('off')

        # Header bar
        ax.axhline(0.92, color='#007BFC', linewidth=3)
        ax.text(0.06, 0.85, slide["title"], fontsize=24, fontweight='bold', color='white', ha='left', va='center')
        ax.text(0.06, 0.79, slide["subtitle"], fontsize=13, color='#00F0FF', ha='left', va='center')

        # Badge
        badge_box = dict(boxstyle="round,pad=0.4", fc="#001833", ec="#007BFC", lw=1)
        ax.text(0.94, 0.85, slide["badge"], fontsize=10, fontweight='bold', color='#93C5FD', ha='right', va='center', bbox=badge_box)

        # Bullets Container Card
        card_box = dict(boxstyle="round,pad=1.0", fc="#111827", ec="#1F2937", lw=1.2)
        bullet_text = "\n\n".join(slide["bullets"])
        ax.text(0.06, 0.44, bullet_text, fontsize=13, color='#E2E8F0', ha='left', va='center', linespacing=1.3, bbox=card_box)

        # Footer
        ax.axhline(0.08, color='#1E293B', linewidth=1)
        ax.text(0.06, 0.04, "Vultr BlastShield  |  Track 1: Blast Radius Zero  |  LabLab.ai", fontsize=9, color='#64748B', ha='left', va='center')
        ax.text(0.94, 0.04, slide["footer"], fontsize=9, color='#64748B', ha='right', va='center')

        plt.subplots_adjust(left=0, right=1, top=1, bottom=0)
        pdf.savefig(fig, facecolor=fig.get_facecolor())
        plt.close()

print(f"[OK] Generated Slide Presentation PDF: {pdf_path}")
